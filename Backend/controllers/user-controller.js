import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";
import bcrypt from "bcrypt";
// Implement user controller logic here

/** 
@controller Get all users
@description Create a new user
@route POST /api/users
@access private
@method POST
*/
export const UserRegister = asyncHandler(async (req, res) => {

  console.log(req.body);
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if user already exists
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Check if user already exists
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // send the response
  res.status(201).json({
    success: true,
    error: null,
    data: user,
  });
});

// get all users controller
/**
@controller getUsersController
@description Get all users
@route GET /api/users
@access private
@method GET
 */
export const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json({
    suceses: true,
    error: null,
    results: {
      data: users,
    }
  }
  )
});

// get user by id controller
/**
@controller getUserByIdController  
@description Get user by id
@route GET /api/users/:id
@access private
@method GET
 */

// update user controller
/**
@controller updateUserController
@description Update user
@route PUT /api/users/:id
@access private
@method PUT
 */

// delete user controller
/**
@controller deleteUserController
@description Delete user
@route DELETE
@access private
@method DELETE
  */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      error: null,
      results: {
        message: "Successfully User Deleted",
        data: user,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      results: null,
    });
  }
});

// login user controller
/**
@controller loginUser
@description Login user
@route POST /api/users/login
@access public
@method POST
 */

// End of User Controller
