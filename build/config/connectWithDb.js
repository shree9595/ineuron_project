"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.default = () => {
    mongoose
        .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(console.log(`DB GOT CONNECTED`))
        .catch((error) => {
        console.log(`DB CONNECTION ISSUES`);
        console.log(error);
        process.exit(1);
    });
};
