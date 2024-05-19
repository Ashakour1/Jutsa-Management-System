import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";

/**
 * @controller getAllCompetitors
 * @description Get all competitors
 * @route GET /api/competitors
 * @access Private
 * @method GET
 */
export const getAllCompetitors = asyncHandler(async (req, res) => {
  try {
    const competitors = await prisma.competitor.findMany();
    res.status(200).json({
      success: true,
      data: competitors,
    });
  } catch (error) {
    console.error("Error fetching competitors:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


// End of Competitor Controller