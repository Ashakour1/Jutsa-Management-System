import AsyncHandler from "express-async-handler";
import prisma from "../config/db.js";

export const getAllCandidates = AsyncHandler(async (req, res) => {
  const candidate = await prisma.candidate.findMany();
  res.json(candidate);
});

export const getCandidateById = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const candidate = await prisma.candidate.findUnique({
    where: {
      id: id,
    },
  });

  if (!candidate) {
    res.status(404);
    throw new Error("not found");
  }

  res.status(200).json({
    success: true,
    data: candidate,
  });
});

export const registerCandidate = AsyncHandler(async (req, res) => {
  // id            String   @id  @map("_id")
  // name          String
  // number        Int
  // email         String
  // gpa          Float
  // faculty       String
  // yearOfStudy   String
  // semester      String
  // className     String
  // isFinanceRequired Boolean @default(false)
  // isExamRequired Boolean @default(false)
  // experience    String
  // campaignPlan      String

  const {
    name,
    number,
    email,
    gpa,
    faculty,
    yearOfStudy,
    semester,
    className,
    isFinanceRequired,
    isExamRequired,
    experience,
    campaignPlan,
  } = req.body;

  const candidate = await prisma.candidate.create({
    data: {
      name,
      number,
      email,
      gpa,
      faculty,
      yearOfStudy,
      semester,
      className,
      isFinanceRequired,
      isExamRequired,
      experience,
      campaignPlan,
    },
  });

  res.status(201).json({
    success: true,
    data: candidate,
    message: "you registered successfully",
  });
});

export const updateCandidate = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    number,
    email,
    gpa,
    faculty,
    yearOfStudy,
    semester,
    className,
    isFinanceRequired,
    isExamRequired,
    experience,
    campaignPlan,
  } = req.body;

  const candidate = await prisma.candidate.update({
    where: {
      id: id,
    },
    data: {
      name,
      number,
      email,
      gpa,
      faculty,
      yearOfStudy,
      semester,
      className,
      isFinanceRequired,
      isExamRequired,
      experience,
      campaignPlan,
    },
  });

  res.status(200).json({
    success: true,
    data: candidate,
    message: "Candidate updated",
  });
});

export const deleteCandidate = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const candidate = await prisma.candidate.delete({
    where: {
      id: id,
    },
  });

  res.status(200).json({
    success: true,
    data: candidate,
    message: "Candidate deleted successfully",
  });
});
