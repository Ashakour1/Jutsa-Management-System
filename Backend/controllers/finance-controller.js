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