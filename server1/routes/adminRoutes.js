import express from "express";
import { loginAdminUser } from "../controllers/adminController.js";

const router = express.Router();
router.post("/login", loginAdminUser);


export default router;
