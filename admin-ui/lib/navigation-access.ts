/**
 * Route access rules (admin panel).
 * - `undefined` permission: open to any authenticated dashboard user with a valid session (roles / permissions payload).
 * - Otherwise: JWT `permissions` array must include that string (see Backend constants).
 */
export const ROUTE_REQUIRES_PERMISSION: Record<string, string | undefined> = {
  "/dashboard": undefined,
  "/finance": "finance.read",
  "/members": "members.read",
  "/positions": "positions.read",
  "/competitors": "competitors.read",
  "/sports": "sports.read",
  "/activities": "activities.read",
  "/caawiye": "caawiye.read",
  "/candidates": "candidates.read",
  "/users": "users.read",
  "/users/create": "users.write",
  "/roles": "users.read",
  "/roles/create": "users.write",
  "/forms": "forms.read",
}

/** Seed / backend role names treated as administrators (system configuration). */
export const ELEVATED_ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"] as const

/**
 * Prefer longest match so `/users/create` wins over `/users`.
 * Paths like `/users/:id/edit` need `users.write` (narrower prefix than `/users` read).
 */
export function getRequiredPermissionForPath(pathname: string): string | undefined {
  if (pathname === "/users/create") {
    return "users.write";
  }
  if (pathname === "/roles/create") {
    return "users.write";
  }
  if (/^\/users\/[^/]+\/edit$/.test(pathname)) {
    return "users.write";
  }
  if (/^\/roles\/[^/]+\/edit$/.test(pathname)) {
    return "users.write";
  }

  const entries = Object.entries(ROUTE_REQUIRES_PERMISSION)
    .filter(([, perm]) => perm != null)
    .sort((a, b) => b[0].length - a[0].length)

  for (const [route, perm] of entries) {
    if (pathname === route || pathname.startsWith(`${route}/`)) {
      return perm as string
    }
  }
  return undefined
}

export function canAccessPath(pathname: string, permissions: string[]): boolean {
  const need = getRequiredPermissionForPath(pathname)
  if (!need) return true
  return permissions.includes(need)
}

/** Sidebar: exact paths only */
export function canAccessRoute(href: string, permissions: string[]): boolean {
  const need = ROUTE_REQUIRES_PERMISSION[href]
  if (!need) return true
  return permissions.includes(need)
}

export function hasElevatedAdminRole(roleNames: string[]): boolean {
  const set = new Set(roleNames)
  return ELEVATED_ADMIN_ROLES.some((r) => set.has(r))
}
