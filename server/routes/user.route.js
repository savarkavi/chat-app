import express from "express";
import { authorization } from "../middleware/authorization.js";
import { getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authorization, getUsers);

export default router;
