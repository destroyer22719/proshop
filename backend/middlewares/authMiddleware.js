import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded._id).select("-password");
            next();
        };
    
        if(!token) {
            res.status(401);
            throw new Error("Not authorized, no token found")
        }
    } catch (error) {
        next(error);
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) next();
        else {
            res.status(401);
            throw new Error("Not authorized as admin")
        }
    } catch (error) {
        next(error);
    }

}

