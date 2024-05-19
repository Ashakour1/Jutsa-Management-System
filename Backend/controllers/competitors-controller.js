import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";

/**
 * @controller create a new competitor
 * @route POST /api/competitors
 * @access Public
 * @method POST
 * @description This route is used to create a new competitor
 */

// id            String    @id @db.ObjectId @default(auto()) @map("_id")
// name          String
// number        String
// email         String
// semester      String
// class         String
// skill        String
// project_name  String
// status String @default("pending")

export const registerCompetitor = asyncHandler(async (req, res) => {
  const { name, number, email, semester, skill, className, project_name } =
    req.body;

  if ((!name, !number, !email, !semester, !skill, !className, !project_name)) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // create a new competitor
  const competitor = await prisma.competitor.create({
    data: {
      name,
      number: Number(number),
      email,
      semester: Number(semester),
      className: className,
      skill,
      project_name,
    },
  });
  // send a response
  res.status(400).json({
    success: true,
    error: null,
    message: "Competitor created successfully",
    data: {
      results: competitor,
    },
  });
});
