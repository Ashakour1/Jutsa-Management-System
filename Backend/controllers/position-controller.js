import { ObjectId } from "mongodb";
import prisma from "../config/db.js";
import asyncHandler from "express-async-handler";

export const getAllPositions = asyncHandler(async (req, res) => {
  const positions = await prisma.position.findMany();

  res.status(200).json({
    success: true,
    error: null,
    data: positions,
  });
});

export const registerPosition = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(404);
    throw new Error("All fields are required ");
  }

  const findPosition = await prisma.position.findUnique({
    where: {
      title,
    },
  });

  if (findPosition) {
    res.status(400);
    throw new Error("This position already exists");
  }
  const createdPosition = await prisma.position.create({
    data: {
      title,
      description,
    },
  });

  // response status
  res.status(200).json({
    success: true,
    error: null,
    data: createdPosition,
  });
});

export const updatePosition = asyncHandler(async (req, res) => {
  // get id from request params
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Invalid id");
  }
  //
  const { title, description } = req.body;

  const findPosition = await prisma.position.findUnique({
    where: {
      id,
    },
  });

  // check if position is available
  if (!findPosition) {
    res.status(404);
    throw new Error("this position is not existing");
  }

  // updatePosition
  const updatePosition = await prisma.position.update({
    data: {
      title,
      description,
    },
    where: {
      id,
    },
  });
  // response status
  res.status(200).json({
    success: true,
    error: null,
    data: updatePosition,
  });
});

export const deletePosition = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Delete the position
  if (!ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Invalid id");
  }

  // find the position
  const findPosition = await prisma.position.findUnique({
    where: {
      id,
    },
  });

  // check if the position is available
  if (!findPosition) {
    res.status(404);
    throw new Error("Position not found");
  }

  // delete the position
  const deletePosition = await prisma.position.delete({
    where: {
      id,
    },
  });

  // response status
  res.status(200).json({
    success: true,
    error: null,
    data: deletePosition,
  });
});
