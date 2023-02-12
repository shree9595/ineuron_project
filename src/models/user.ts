import mongoose, { Schema } from "mongoose";
import { Iuser } from "../types/Iuser";

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            maxlength: [40, "Name should be under 40 characters"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [6, "password should be atleast 6 char"],
        },
    },

    { timestamps: true }
);
const User = mongoose.model<Iuser>("User", UserSchema);
export default User;
