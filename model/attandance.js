// ../model/attandance.js
import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'On Leave'], required: true },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;

// Export the find function
export const find = async (query = {}) => {
    return await Attendance.find(query).populate('employeeId', 'name');
};
