import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { Iuser } from "../types/Iuser";
import { UserValidation, UserEmailValidation } from '../validations/userValidation'



export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const userModelValidation: Iuser = await UserValidation.validateAsync(
            req.body
        );

        if (!userModelValidation) {
            return next({
                status: 400,
                message: "Enter valid user datails",
            });
        }

        const { name, email, password } = req.body;

        if (!email || !name || !password) {
            return next({
                status: 400,
                message: "Name, email and password are required",
            });
        }

        const user = await User.create({
            name,
            email,
            password,

        });

        res.status(200).json({
            success: true,
            user
        });

    } catch (err: any) {
        next(err);
    }
};


export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const email = req.params.email
        const userEmailValidation = await UserEmailValidation.validateAsync(
            email
        );

        if (!userEmailValidation) {
            return next({
                status: 400,
                message: "Enter valid user email datails",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return next({
                status: 400,
                message: "user not found",
            });
        }

        // send user
        res.status(200).json({
            success: true,
            user,
        });

    }
    catch (err: any) {
        next(err);
    }

};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const emailId = req.params.email
        const newData = {
            name: req.body.name,
            email: req.body.email,
        };
        const userEmailValidation = await UserEmailValidation.validateAsync(
            emailId
        );

        if (!userEmailValidation) {
            return next({
                status: 400,
                message: "Enter valid user email datails",
            });
        }

        const user = await User.findOneAndUpdate({ email: emailId }, newData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });


        if (!user) {
            return next({
                status: 400,
                message: "No user found",
            });
        }

        // send user
        res.status(200).json({
            success: true,
            user,
        });

    }
    catch (err: any) {
        next(err);
    }

};

export const daleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const emailId = req.params.email

        const userEmailValidation = await UserEmailValidation.validateAsync(
            emailId
        );

        if (!userEmailValidation) {
            return next({
                status: 400,
                message: "Enter valid user email datails",
            });
        }

        const user = await User.findOneAndDelete({ email: emailId });


        if (!user) {
            return next({
                status: 400,
                message: "No user found",
            });
        }

        // send user
        res.status(200).json({
            success: true,
            user,
        });

    }
    catch (err: any) {
        next(err);
    }

};









