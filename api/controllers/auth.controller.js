import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


// This is for sign up..!
export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    console.log(req.body);
    const newUser = new User({ username, email, password: hashedPassword });
    try{
        await newUser.save();
        res.status(201).json({ message: "User created successfully"})
    } catch(error){
        next(error);
    }
};

// This is for sign in..!
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not fount..!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong password..!'));
        const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET)  // Createing jsonwebtoken..!
        // Next line: Destrecture the password property for avoid password leaking and security..!
        const { password: pass, ...rest } = validUser._doc; 
        res.cookie('access_token', token, { httpOnly: true})
        .status(200)
        .json(rest);
    } catch (error) {
        next(error);
    }
};