import mongoose from "mongoose";

const connectDb = ()=>{
    try {
        mongoose.connect(process.env.MONGODB_URI,{
            dbName:"Resume"
        }).then(()=>console.log("DataBase Connected")).catch((e)=>console.log(e));
        }
 catch (error) {
        console.log(error);   
    }
}
export default connectDb;