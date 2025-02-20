// ../model/salary.js
import mongoose from 'mongoose';

const SalarySchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const Salary = mongoose.model('Salary', SalarySchema);

export default Salary;

// Export the find function
export const find = async (query = {}) => {
    return await Salary.find(query).populate('employeeId', 'name');
};
