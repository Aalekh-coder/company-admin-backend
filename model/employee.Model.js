import { Schema, model } from 'mongoose';

const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    createdAt: { type: Date, default: Date.now },
});

export default model('Employee', EmployeeSchema);
