import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";

const PROTECTED_ROLE_NAMES = new Set(["SUPER_ADMIN", "ADMIN", "USER"]);

function toCatalogShape(role) {
  return {
    id: role.id,
    name: role.name,
    description: role.description,
    permissionIds: role.permissions.map((rp) => rp.permissionId),
    permissions: role.permissions.map((rp) => ({
      id: rp.permission.id,
      name: rp.permission.name,
      module: rp.permission.module,
    })),
    assignedUserCount: role._count?.users ?? 0,
  };
}

/** @route GET /api/roles/:id */
export const getRoleDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await prisma.role.findUnique({
    where: { id },
    include: {
      permissions: { include: { permission: true } },
      _count: { select: { users: true } },
    },
  });

  if (!role) {
    res.status(404);
    throw new Error("Role not found");
  }

  res.status(200).json({
    success: true,
    data: toCatalogShape(role),
  });
});

/** @route PUT /api/roles/:id */
export const updateRoleAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, permissionIds } = req.body;

  const existing = await prisma.role.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error("Role not found");
  }

  const isProtected = PROTECTED_ROLE_NAMES.has(existing.name);
  let resolvedName = existing.name;

  if (typeof name === "string" && name.trim() !== "") {
    const trimmed = name.trim();
    if (trimmed !== existing.name) {
      if (isProtected) {
        res.status(403);
        throw new Error("Built-in roles cannot be renamed");
      }
      if (PROTECTED_ROLE_NAMES.has(trimmed)) {
        res.status(400);
        throw new Error(`Name "${trimmed}" is reserved for a built-in role`);
      }
      const taken = await prisma.role.findFirst({
        where: { name: trimmed, NOT: { id } },
      });
      if (taken) {
        res.status(409);
        throw new Error(`Role "${trimmed}" already exists`);
      }
      resolvedName = trimmed;
    }
  }

  if (permissionIds !== undefined) {
    if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
      res.status(400);
      throw new Error("Select at least one permission");
    }
    const uniquePermIds = [...new Set(permissionIds)];
    const permCount = await prisma.permission.count({
      where: { id: { in: uniquePermIds } },
    });
    if (permCount !== uniquePermIds.length) {
      res.status(400);
      throw new Error("One or more permission ids are invalid");
    }

    await prisma.$transaction([
      prisma.rolePermission.deleteMany({ where: { roleId: id } }),
      prisma.rolePermission.createMany({
        data: uniquePermIds.map((permissionId) => ({
          roleId: id,
          permissionId,
        })),
      }),
    ]);
  }

  await prisma.role.update({
    where: { id },
    data: {
      name: resolvedName,
      ...(description !== undefined && {
        description:
          description === null ? null : String(description).trim() || null,
      }),
    },
  });

  const role = await prisma.role.findUnique({
    where: { id },
    include: {
      permissions: { include: { permission: true } },
      _count: { select: { users: true } },
    },
  });

  res.status(200).json({
    success: true,
    data: toCatalogShape(role),
  });
});

/** @route DELETE /api/roles/:id */
export const deleteRoleAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await prisma.role.findUnique({ where: { id } });
  if (!role) {
    res.status(404);
    throw new Error("Role not found");
  }

  if (PROTECTED_ROLE_NAMES.has(role.name)) {
    res.status(403);
    throw new Error("Cannot delete built-in system roles");
  }

  const userCount = await prisma.userRole.count({ where: { roleId: id } });
  if (userCount > 0) {
    res.status(409);
    throw new Error(
      `Assign users elsewhere first — ${userCount} account(s) still use this role.`
    );
  }

  await prisma.role.delete({ where: { id } });

  res.status(200).json({
    success: true,
    message: "Role deleted",
    data: null,
  });
});
