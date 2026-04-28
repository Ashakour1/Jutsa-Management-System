/** @param {import("@prisma/client").User & { userRoles: ({ role: import("@prisma/client").Role & { permissions: { permission: import("@prisma/client").Permission }[] } })[] }} user */
export function buildAuthPayload(user) {
  const roles = [];
  const permissions = new Set();
  for (const ur of user.userRoles || []) {
    if (ur.role?.name) roles.push(ur.role.name);
    for (const rp of ur.role?.permissions || []) {
      if (rp.permission?.name) permissions.add(rp.permission.name);
    }
  }
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    status: user.status,
    roles,
    permissions: [...permissions],
  };
}

