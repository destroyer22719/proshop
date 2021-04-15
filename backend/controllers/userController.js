import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";

export const authUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).send({ message: "User not found" });
        }
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).send({ message: "Incorrect password" });
        }
    } catch (error) {
        next(error);
    }
};

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userDupe = await User.findOne({ email });

        if (userDupe) {
            res.status(409).send({ message: "Email already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("invalid user data");
        }
    } catch (error) {
        next(error);
    }
};

export const getUserProfile = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).send({ message: "User not found" });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } catch (error) {
        next(error);
    }
};

export const updateUserProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        let users = await User.find();
        res.send(users);
    } catch (error) {
        next(error);
    }
};

export const deleteUserController = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        if (user) {
            await user.remove();
            res.send({ message: "User removed" });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id).select("-select");
        if (user) {
            res.send(user);
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (typeof req.body.isAdmin === "boolean") {
            user.isAdmin = req.body.isAdmin;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } catch (error) {
        next(error);
    }
};
