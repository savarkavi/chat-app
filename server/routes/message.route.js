import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { authorization } from "../middleware/authorization.js";

const router = express.Router();

router.get("/:id", authorization, getMessages);
router.post("/send/:id", authorization, sendMessage);

export default router;
