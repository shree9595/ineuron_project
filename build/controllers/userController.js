"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.daleteUser = exports.updateUser = exports.getUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const userValidation_1 = require("../validations/userValidation");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModelValidation = yield userValidation_1.UserValidation.validateAsync(req.body);
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
        const user = yield user_1.default.create({
            name,
            email,
            password,
        });
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createUser = createUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const userEmailValidation = yield userValidation_1.UserEmailValidation.validateAsync(email);
        if (!userEmailValidation) {
            return next({
                status: 400,
                message: "Enter valid user email datails",
            });
        }
        const user = yield user_1.default.findOne({ email });
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
    catch (err) {
        next(err);
    }
});
exports.getUser = getUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailId = req.params.email;
        const newData = {
            name: req.body.name,
            email: req.body.email,
        };
        const userEmailValidation = yield userValidation_1.UserEmailValidation.validateAsync(emailId);
        if (!userEmailValidation) {
            return next({
                status: 400,
                message: "Enter valid user email datails",
            });
        }
        const user = yield user_1.default.findOneAndUpdate({ email: emailId }, newData, {
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
    catch (err) {
        next(err);
    }
});
exports.updateUser = updateUser;
const daleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailId = req.params.email;
        const userEmailValidation = yield userValidation_1.UserEmailValidation.validateAsync(emailId);
        if (!userEmailValidation) {
            return next({
                status: 400,
                message: "Enter valid user email datails",
            });
        }
        const user = yield user_1.default.findOneAndDelete({ email: emailId });
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
    catch (err) {
        next(err);
    }
});
exports.daleteUser = daleteUser;
