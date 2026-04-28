/**
 * Requires the authenticated user to have ANY of the listed permissions.
 */
export function requirePermission(...required) {
  return (req, res, next) => {
    const granted = new Set(req.user?.permissions || []);
    const ok = required.some((p) => granted.has(p));
    if (!ok) {
      return res.status(403).json({
        message: `Forbidden. Missing one of permissions: ${required.join(", ")}.`,
      });
    }
    next();
  };
}

export function requireRole(...allowedNames) {
  return (req, res, next) => {
    const roles = req.user?.roles || [];
    if (!allowedNames.some((n) => roles.includes(n))) {
      return res.status(403).json({
        message: `Forbidden. Required role: ${allowedNames.join(", ")}.`,
      });
    }
    next();
  };
}
