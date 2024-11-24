import jwt from "jsonwebtoken"

const tokengeneration = async(data)=>{
    const token = jwt.sign(data,process.env.JWT_SECRET,{
        expiresIn:'48h'
    });
    return token;
}
export default tokengeneration;