import bcrypt from "bcryptjs";
import User from "../models/user.js"
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import jwt from "jsonwebtoken";
import { response } from "express";
export const register = async (req, res) => {
    try {
        const {username , password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User ({
            username,
            password: hashedPassword,
            isMfaActive: false,
        });
        console.log(newUser);
        await newUser.save();
        res.status(201).json({message: "User registered successfully"});    
    } catch (error) {
        res.status(500).json({error:"Error registering a user", message: error})
    }
};
export const login = async (req, res) => {
    console.log("User logged in:", req.user);
    res.status(200).json({message: "User logged in successfully", username: req.user.username,
    isMfaActive: req.user.isMfaActive});
};
export const authStatus = async (req, res) => {
    if(req.user) {
        res.status(200).json({message: "User logged in successfully", username: req.user.username,
    isMfaActive: req.user.isMfaActive});
    } else{
        res.status(401).json({message: "User not authenticated"});
    }

};
export const logout = async (req, res) => {
    if(!req.user)
        return res.status(401).json({message: "User not authenticated"});   
     req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.session.destroy((err)=>{
            if(err){
                return next(err);
            }
            res.clearCookie("connect.sid");
            res.status(200).json({message: "User logged out successfully"});
        })
    })
};
export const setup2FA = async (req, res) => {
    try {
        console.log("user detail", req.user);
        const user = req.user;
        var secret = speakeasy.generateSecret();
        console.log("secret", secret);
        user.twoFactorSecret = secret.base32;
        user.isMfaActive = true;
        await user.save();
        const url = speakeasy.otpauthURL({
            secret: secret.base32,
              encoding: "base32",
            label:`${req.user.username}`,
            issuer:"www.kkFormer.com"
        });
        const qrCodeImageUrl = await qrcode.toDataURL(url);
        res.status(200).json({message: "2FA setup successful", 
          qrcode:qrCodeImageUrl,token: url, secret: secret.base32});

    }catch (error) {
        res.status(500).json({error:"Error setting up 2FA", message: error})
};
};
export const verify2FA = async (req, res) => {
    const {token} = req.body;
    const user = req.user;

    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding:'base32',
        token,
    })
    if(verified){
        const jwtToken = jwt.sign({username: user.username}, 
            process.env.TOKEN_SECRET,
            {expiresIn:"1hr"}
        );
        res.status(200).json({message: "2FA successful", token:jwtToken})
    } else{
        res.status(400).json({message:"Invalid 2FA token"})
    }
};
export const reset2FA = async (req, res) => {
    try {
        const user = req.user;
        user.twoFactorSecret = "";
        user.isMfaActive = false;
        await user.save();
        res.status(200).json({message:"2FA reset successful"})  
    } catch (error) {
        res.status(500).json({error:"error reseting 2FA", message:error})
    }
};