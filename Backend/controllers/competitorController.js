import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";
import { ObjectId } from "mongodb";

//Delete competitor
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