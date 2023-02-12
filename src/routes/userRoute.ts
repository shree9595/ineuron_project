import { Router } from "express";
import { createUser, getUser, updateUser, daleteUser } from "../controllers/userController";
const router: Router = Router();

//create user
router.post("/user/create", createUser);

//get user
router.get("/user/:email", getUser);

//update user
router.put("/user/update/:email", updateUser);

//delete user
router.delete("/user/delete/:email", daleteUser);

export default router;
