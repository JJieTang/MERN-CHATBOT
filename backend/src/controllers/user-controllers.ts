import { NextFunction, Request, Response } from "express"
import User from "../models/User.js"
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";

export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {

    try {
        //get all users        
        const users = await User.find();
        return res.status(200).json({ message:"OK", users });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message:"ERROR", cause:error.message });
    }
}

export const userSignup = async (req:Request, res:Response, next:NextFunction) => {

    try {
        //user signup      
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(401).send("User already existed.");
        const hashedPassword = await hash(password, 10);
        const user = new User({name, email, hashedPassword})
        await user.save();
        return res.status(201).json({ message:"OK", id:user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message:"ERROR", cause:error.message });
    }
}


export const userLogin = async (req:Request, res:Response, next:NextFunction) => {

    try {
        //user login   
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(401).send("User not registered.");
        const isPasswordCorrect = compare(password, user.password);
        if(!isPasswordCorrect) return res.status(401).send("Incorrect Password.");
        const token = createToken(user._id.toString(), user.email, "7d");
        return res.status(200).json({ message:"OK", id:user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message:"ERROR", cause:error.message });
    }
}

