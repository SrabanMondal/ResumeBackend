import app from "./app.js";
import express from 'express';
// Increase the payload size limit
//app.use(express.json({ limit: '100mb' }));
//app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use((req, res, next) => {
    const contentLength = req.headers['content-length'];
    console.log('Request size:', contentLength, 'bytes');
    next();
});

app.listen(process.env.PORT,()=>{
console.log(`Server is running on ${process.env.PORT}`)
})