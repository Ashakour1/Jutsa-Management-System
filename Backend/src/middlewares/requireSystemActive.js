import prisma from "../config/db.js";

export const ALLOWED_FORM_KEYS = Object.freeze([
  "sportsForm",
  "presidentForm",
  "facultyForm",
]);

export const isAllowedFormKey = (key) => ALLOWED_FORM_KEYS.includes(key);

export const requireSystemActive = (key) => {
  if (!isAllowedFormKey(key)) {
    return (req, res) =>
      res.status(500).json({ message: "Server misconfiguration: invalid form key." });
  }

  return async (req, res, next) => {
    try {
      const control = await prisma.systemControl.findUnique({
        where: { key },
        select: { isActive: true },
      });

      // safer default: if key not found -> CLOSED
      const isActive = control?.isActive ?? false;

      if (!isActive) {
        return res.status(403).json({
          message: `This action is closed right now (${key}).`,
        });
      }

      return next();
    } catch (err) {
      console.error("requireSystemActive error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  };
};
