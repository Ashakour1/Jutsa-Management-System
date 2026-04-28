import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { P } from "../constants/permissions.js";
import { buildAuthPayload } from "../lib/auth-payload.js";

const userAuthInclude = {
  userRoles: {
    include: {
      role: {
        include: {
          permissions: { include: { permission: true } },
        },
      },
    },
  },
};

function toPublicUser(user) {
  const auth = buildAuthPayload(user);
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    roles: (user.userRoles || []).map((ur) => ({
      id: ur.role.id,
      name: ur.role.name,
    })),
    permissions: auth.permissions,
  };
}

async function fetchUserForAuth(where) {
  return prisma.user.findUnique({
    where,
    include: userAuthInclude,
  });
}

/**
 * @description Create a new user
 * @route POST /api/users/auth/reg
 */
export const UserRegister = asyncHandler(async (req, res) => {
  const {
    email,
    name,
    username,
    password,
    roleName,
    roleIds,
    newRole,
  } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    throw new Error("email, name, and password are required");
  }

  const uname =
    username ||
    email
      .toLowerCase()
      .replace(/@/g, "_at_")
      .replace(/[^a-z0-9._-]/gi, "_");

  const userExists = await prisma.user.findFirst({
    where: { OR: [{ email }, { username: uname }] },
  });

  if (userExists) {
    res.status(400);
    throw new Error("User with this email or username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const created = await prisma.$transaction(async (tx) => {
    const assembledRoleIds = [];

    const nr = newRole;
    if (nr?.name?.trim?.() && Array.isArray(nr.permissionIds) && nr.permissionIds.length > 0) {
      const nameTaken = await tx.role.findUnique({
        where: { name: nr.name.trim() },
      });
      if (nameTaken) {
        res.status(409);
        throw new Error(`A role named "${nr.name.trim()}" already exists`);
      }
      const uniquePermIds = [...new Set(nr.permissionIds)];
      const permCount = await tx.permission.count({
        where: { id: { in: uniquePermIds } },
      });
      if (permCount !== uniquePermIds.length) {
        res.status(400);
        throw new Error("One or more permission ids are invalid");
      }

      const createdRole = await tx.role.create({
        data: {
          name: nr.name.trim(),
          description:
            nr.description != null ? String(nr.description).trim() || null : null,
          permissions: {
            create: uniquePermIds.map((permissionId) => ({ permissionId })),
          },
        },
      });
      assembledRoleIds.push(createdRole.id);
    }

    if (Array.isArray(roleIds) && roleIds.length > 0) {
      assembledRoleIds.push(...roleIds);
    }

    const uniqueRoleIds = [...new Set(assembledRoleIds)];

    let finalRoleIds = uniqueRoleIds;
    if (finalRoleIds.length === 0) {
      const roleKey = roleName || "USER";
      const fallback = await tx.role.findUnique({
        where: { name: roleKey },
      });
      if (!fallback) {
        res.status(400);
        throw new Error(`Unknown role: ${roleKey}`);
      }
      finalRoleIds = [fallback.id];
    }

    const rolesFound = await tx.role.findMany({
      where: { id: { in: finalRoleIds } },
    });
    if (rolesFound.length !== finalRoleIds.length) {
      res.status(400);
      throw new Error("One or more role ids are invalid");
    }

    return tx.user.create({
      data: {
        email,
        username: uname,
        name,
        passwordHash: hashedPassword,
        userRoles: {
          create: finalRoleIds.map((roleId) => ({ roleId })),
        },
      },
      include: userAuthInclude,
    });
  });

  res.status(201).json({
    success: true,
    error: null,
    data: toPublicUser(created),
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    include: userAuthInclude,
    orderBy: { createdAt: "desc" },
  });
  res.status(200).json({
    success: true,
    error: null,
    data: users.map(toPublicUser),
  });
});

export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await fetchUserForAuth({ id });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    error: null,
    data: toPublicUser(user),
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email, name, username, password, roleIds, status } = req.body;

  const user = await prisma.user.findUnique({
    where: { id },
    include: userAuthInclude,
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const nextEmail = email?.trim?.() ? email.trim() : user.email;
  if (nextEmail !== user.email) {
    const emailTaken = await prisma.user.findFirst({
      where: { email: nextEmail, NOT: { id } },
    });
    if (emailTaken) {
      res.status(409);
      throw new Error("That email is already in use.");
    }
  }

  const unameTrim =
    username !== undefined && username !== null
      ? String(username).trim()
      : user.username;

  if (unameTrim !== user.username) {
    const unameTaken = await prisma.user.findFirst({
      where: { username: unameTrim, NOT: { id } },
    });
    if (unameTaken) {
      res.status(409);
      throw new Error("That username is already in use.");
    }
  }

  const hashedPassword = password
    ? await bcrypt.hash(password, 10)
    : undefined;

  let nextStatus = user.status;
  if (status === "ACTIVE" || status === "INACTIVE") {
    nextStatus = status;
  } else if (status !== undefined) {
    res.status(400);
    throw new Error("status must be ACTIVE or INACTIVE");
  }

  const updated = await prisma.$transaction(async (tx) => {
    if (Array.isArray(roleIds)) {
      const uniq = [...new Set(roleIds)];
      if (uniq.length === 0) {
        res.status(400);
        throw new Error("Select at least one role");
      }
      const cnt = await tx.role.count({ where: { id: { in: uniq } } });
      if (cnt !== uniq.length) {
        res.status(400);
        throw new Error("One or more roles are invalid");
      }
      await tx.userRole.deleteMany({ where: { userId: id } });
      await tx.userRole.createMany({
        data: uniq.map((roleId) => ({ userId: id, roleId })),
      });
    }

    return tx.user.update({
      where: { id },
      data: {
        email: nextEmail,
        username: unameTrim,
        ...(name !== undefined && { name }),
        ...(hashedPassword && { passwordHash: hashedPassword }),
        status: nextStatus,
      },
      include: userAuthInclude,
    });
  });

  res.status(200).json({
    success: true,
    error: null,
    data: toPublicUser(updated),
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user?.id === id) {
    res.status(400);
    throw new Error("You cannot delete your own account.");
  }

  const user = await prisma.user.delete({
    where: { id },
  });

  res.status(200).json({
    success: true,
    error: null,
    results: {
      message: "Successfully User Deleted",
      data: { id: user.id, email: user.email },
    },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const isUserExists = await fetchUserForAuth({ email });

  if (!isUserExists) {
    res.status(404);
    throw new Error("Invalid email provided");
  }

  if (isUserExists.status !== "ACTIVE") {
    res.status(403);
    throw new Error("Account is inactive");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    isUserExists.passwordHash
  );
  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid password provided");
  }

  const auth = buildAuthPayload(isUserExists);
  const secret = process.env.JWT_SECRET;
  const expiresIn = 24 * 60 * 60;
  const token = jwt.sign(
    {
      id: auth.id,
      email: auth.email,
      username: auth.username,
      roles: auth.roles,
      permissions: auth.permissions,
    },
    secret,
    { expiresIn }
  );

  res.status(200).json({
    success: true,
    error: null,
    message: "Login Successfully",
    token,
    data: toPublicUser(isUserExists),
  });
});

/** Flat list for permission picker (create role UI) */
export const getPermissionsCatalog = asyncHandler(async (_req, res) => {
  const rows = await prisma.permission.findMany({
    orderBy: [{ module: "asc" }, { name: "asc" }],
  });
  res.status(200).json({
    success: true,
    data: rows,
  });
});

/**
 * Create a role and attach permissions.
 */
export const createRole = asyncHandler(async (req, res) => {
  const { name, description, permissionIds } = req.body;

  if (!name?.trim?.()) {
    res.status(400);
    throw new Error("Role name is required");
  }
  if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
    res.status(400);
    throw new Error("Select at least one permission");
  }

  const trimmed = name.trim();
  const taken = await prisma.role.findUnique({ where: { name: trimmed } });
  if (taken) {
    res.status(409);
    throw new Error(`Role "${trimmed}" already exists`);
  }

  const uniquePermIds = [...new Set(permissionIds)];
  const permCount = await prisma.permission.count({
    where: { id: { in: uniquePermIds } },
  });
  if (permCount !== uniquePermIds.length) {
    res.status(400);
    throw new Error("One or more permission ids are invalid");
  }

  const role = await prisma.role.create({
    data: {
      name: trimmed,
      description:
        description != null ? String(description).trim() || null : null,
      permissions: {
        create: uniquePermIds.map((permissionId) => ({ permissionId })),
      },
    },
    include: {
      permissions: { include: { permission: true } },
    },
  });

  res.status(201).json({
    success: true,
    data: {
      id: role.id,
      name: role.name,
      description: role.description,
      permissionIds: role.permissions.map((rp) => rp.permissionId),
      permissions: role.permissions.map((rp) => ({
        id: rp.permission.id,
        name: rp.permission.name,
        module: rp.permission.module,
      })),
      assignedUserCount: 0,
    },
  });
});

/** List roles + permissions for admin UI role pickers */
export const getRolesCatalog = asyncHandler(async (_req, res) => {
  const roles = await prisma.role.findMany({
    orderBy: { name: "asc" },
    include: {
      permissions: {
        include: { permission: true },
      },
      _count: { select: { users: true } },
    },
  });
  res.status(200).json({
    success: true,
    data: roles.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      permissionIds: r.permissions.map((rp) => rp.permissionId),
      permissions: r.permissions.map((rp) => ({
        id: rp.permission.id,
        name: rp.permission.name,
        module: rp.permission.module,
      })),
      assignedUserCount: r._count.users,
    })),
  });
});
