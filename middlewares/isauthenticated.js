import jwt from "jsonwebtoken"
import Student from "../models/student.js"
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
const isauthenticated = async(req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(400).json(new ApiResponse(false,"Please Login First"));
        }
        let decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(400).json(new ApiResponse(false,"Invalid Token"));
        }
        const user = await Student.findById(decoded._id);
        if(!user){
            return res.status(404).json(new ApiResponse(false,"User Not Found"));
        }
        req.student = user;
        next();  
    } catch (error) {
        res.status(500).json(new ApiError(false,error.message));
    }

}
