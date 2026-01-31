import express from "express";
import { getAnalytics } from "../controllers/analytics.controller";
const router =express.Router()
router.get("/analytics",getAnalytics)
export default router