import express from "express";
import { authorization } from "../middleware/authorization.js";
import { getUsers, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authorization, getUsers);
router.post("/updateUser", authorization, updateUser);

export default router;
