import puppeteer from "puppeteer"
import ApiResponse from "../utils/ApiResponse.js"
import Student from "../models/student.js"
import bcrypt from "bcrypt"
import fs from 'fs';
import path from 'path';
import ApiError from "../utils/ApiError.js"
import { fileURLToPath } from 'url';
import tokengeneration from "../middlewares/tokegeneration.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const makepdf = async (req, res) => {
  try {
    const { data } = req.body;
    const htmlContent = `${data}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfPath = path.join(__dirname, 'output.pdf');
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');

    const fileStream = fs.createReadStream(pdfPath);
    fileStream.pipe(res);

    res.on('finish', () => {
      fs.unlink(pdfPath, (err) => {
        if (err) console.error('Error deleting the PDF file:', err);
      });
    });;

  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }

};
const registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json(new ApiResponse(false, "Name,Email and Password is Required"));
    }
    const user = await Student.findOne({
      email: email
    });
    if (user) {
      return res.status(400).json(new ApiResponse(false, "User Already Exists"));
    }
    const hasedpassword = bcrypt.hash(password, 10);
    const newuser = await Student.create({
      name: name,
      email: email,
      password: hasedpassword
    })
    res.status(201).json(new ApiResponse(true, "User Created Successfully"));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
}
const loginuser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json(new ApiResponse(false, "Email and Password is required"));
      }
      const user = await Student.findOne({
        email: email
      })
      if (!user) {
        return res.status(400).json(new ApiResponse(false, "Invalid Email Id"));
      }
      const ismatched = bcrypt.compare(password, user.password);
      if (!ismatched) {
        return res.status(400).json(new ApiResponse(false, "Invalid Password"));
      }
      const token = tokengeneration(user._id);
      res.cookie("token", token, {
        maxAge: 48 * 60 * 60 * 1000,
        sameSite: 'None'
      })
      res.status(200).json(new ApiResponse(true, "User Login Successfully"));
    } catch (error) {
      res.status(500).json(new ApiError(false, error.message));
    }
  }
export { makepdf ,registeruser,loginuser };