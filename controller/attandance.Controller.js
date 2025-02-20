import Attendance, { find as findAttendance } from '../model/attandance.js';
import { ApiError } from '../utils/apiError.js'; // Import your custom error class
import { ApiResponse } from '../utils/apiResponse.js'; // Import your custom response class
import { asyncHandler } from '../utils/asyncHandler.js'; // Import async handler for error handling

// Create Attendance
export const createAttendance = asyncHandler(async (req, res) => {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
        throw new ApiError(400, 'All fields are required: employeeId, date, status');
    }

    const attendance = new Attendance({ employeeId, date, status });
    await attendance.save();

    res.status(201).json(new ApiResponse(201, attendance, 'Attendance created successfully'));
});

// Get All Attendance Records
export const getAllAttendance = asyncHandler(async (req, res) => {
    const attendanceRecords = await findAttendance();

    if (!attendanceRecords.length) {
        throw new ApiError(404, 'No attendance records found');
    }

    res.status(200).json(new ApiResponse(200, attendanceRecords, 'Attendance records retrieved successfully'));
});

// Get Attendance By ID
export const getAttendanceById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const attendance = await Attendance.findById(id).populate('employeeId', 'name');

    if (!attendance) {
        throw new ApiError(404, 'Attendance record not found');
    }

    res.status(200).json(new ApiResponse(200, attendance, 'Attendance record retrieved successfully'));
});

// Update Attendance
export const updateAttendance = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { date, status } = req.body;

    const attendance = await Attendance.findByIdAndUpdate(
        id,
        { date, status },
        { new: true, runValidators: true }
    );

    if (!attendance) {
        throw new ApiError(404, 'Attendance record not found');
    }

    res.status(200).json(new ApiResponse(200, attendance, 'Attendance record updated successfully'));
});

// Delete Attendance
export const deleteAttendance = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
        throw new ApiError(404, 'Attendance record not found');
    }

    res.status(200).json(new ApiResponse(200, null, 'Attendance record deleted successfully'));
});
