import prisma from "../config/db.js";

// GET /system-control/:key
export const getControlStatus = async (req, res) => {
  try {
    const { key } = req.params;

    const control = await prisma.systemControl.findUnique({
      where: { key },
      select: { key: true, isActive: true, updatedAt: true },
    });

    // safer default: if not found -> closed
    return res.json({
      key,
      isActive: control?.isActive ?? false,
      updatedAt: control?.updatedAt ?? null,
      exists: !!control,
    });
  } catch (err) {
    console.error("getControlStatus error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /system-control/:key   body: { isActive: true/false }
export const updateControlStatus = async (req, res) => {
  try {
    const { key } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({ message: "isActive must be boolean" });
    }

    const updated = await prisma.systemControl.upsert({
      where: { key },
      update: {
        isActive,
        updatedBy: req.user?.id ?? null,
      },
      create: {
        key,
        isActive,
        updatedBy: req.user?.id ?? null,
      },
      select: { key: true, isActive: true, updatedBy: true, updatedAt: true },
    });

    return res.json(updated);
  } catch (err) {
    console.error("updateControlStatus error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// (Optional) POST /system-control/seed
// body: { keys: ["candidate_submission", "competitor_registration"] }
export const seedControls = async (req, res) => {
  try {
    const { keys } = req.body;

    if (!Array.isArray(keys) || keys.length === 0) {
      return res.status(400).json({ message: "keys must be a non-empty array" });
    }

    const created = [];
    for (const key of keys) {
      const row = await prisma.systemControl.upsert({
        where: { key },
        update: {},
        create: { key, isActive: false },
        select: { key: true, isActive: true },
      });
      created.push(row);
    }

    res.json({ message: "Seed done", data: created });
  } catch (err) {
    console.error("seedControls error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
