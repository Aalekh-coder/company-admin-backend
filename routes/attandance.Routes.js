import express from "express";
import {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from "../controller/attendance.Controller.js";
import authMiddleware from "../middleware/auth.Middleware.js";

const router = express.Router();
router.use(authMiddleware);
// Routes
router.post("/", createAttendance); // Create Attendance
router.get("/", getAllAttendance); // Get All Attendance Records
router.get("/:id", getAttendanceById); // Get Attendance by ID
router.put("/:id", updateAttendance); // Update Attendance
router.delete("/:id", deleteAttendance); // Delete Attendance

export default router;
