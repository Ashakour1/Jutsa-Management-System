// finance controller
import { ObjectId } from "mongodb";
import prisma from "../config/db.js";
import asyncHandler from "express-async-handler";

// Create
export const createFinance = asyncHandler(async(req,res)=>{
    const { title, amount, type, userId,  category } = req.body;

    if(!title ||!amount ||!type ||!userId || !category){
        res.status(400);
        throw new Error("All fields are required");
    }

    const finance = await prisma.finance.create({
        data:{
            title,
            amount:Number(amount),
            type,
            category,
            userId
        }
    })

    if(!finance){
        res.status(501);
        throw new Error("Finance not created");
    }

    res.status(201).json({
        success: true,
        error: null,
        data: finance,
    });
})

// Read financial information

export const getFinances = asyncHandler(async(req,res)=>{
    const finances = await prisma.finance.findMany()

    if(finances.length === 0){
        res.status(404);
        throw new Error("Unable to find:No finances found");
    }

    res.status(200).json({
        success: true,
        error: null,
        data: finances,
    });
})

// Read single financial information

export const getFinance = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const finance = await prisma.finance.findUnique({
        where:{
            id
        }
    })

    if(!finance){
        res.status(404);
        throw new Error("Unable to find:No finance found");
    }

    res.status(200).json({
        success: true,
        error: null,
        data: finance,
    });
})

// Delete Finance using unique ID

export const deleteFinance = asyncHandler(async(req,res)=>{
    const { id } = req.params;

    if(!ObjectId.isValid(id)){
        res.status(400);
        throw new Error("Please provide a valid id");
    }

    const finance = await prisma.finance.delete({
        where:{
            id
        }
    })

    if(!finance){
        res.status(501);
        throw new Error("Unable to delete: unexpected error occurred");
    }

    res.status(200).json({
        success: true,
        error: null,
        data: {
            message: "Deleted successfully",
        },
    });
})