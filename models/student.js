import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{versionKey:false});

const Student = mongoose.model("Student",StudentSchema);

export default Student;