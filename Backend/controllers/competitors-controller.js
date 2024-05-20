import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";
import { ObjectId } from "mongodb";

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

// Delete existing competitor using unique ID
export const  deleteCompetitor = asyncHandler(async(req,res)=>{
  const { id } = req.params

  if(!ObjectId.isValid(id)){
      res.status(400)
      throw new Error('Please enter a valid id')
  }
  
  const competitor = await prisma.competitor.findUnique({
      where: {
          id
      }
  })

  if (!competitor){
      res.status(404)
      throw new Error("Unable to find: not registered competitor")
  }

  const deletedComp = await prisma.competitor.delete({
      where: {
          id
      }
  })

  if (!deletedComp) {
      res.status(400)
      throw new Error("Unable to delete: unexpected error occurred")
  }

  res.status(200).json({
      success: true,
      error: null,
      data:{
          message:'Deleted successfully'
      },
  });
})