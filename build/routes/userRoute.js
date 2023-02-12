"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
//create user
router.post("/user/create", userController_1.createUser);
//get user
router.get("/user/:email", userController_1.getUser);
//update user
router.put("/user/update/:email", userController_1.updateUser);
//delete user
router.delete("/user/delete/:email", userController_1.daleteUser);
exports.default = router;
