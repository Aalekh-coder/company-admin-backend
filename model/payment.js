// ../model/payment.js
import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ['Cash', 'Card', 'Bank Transfer'], required: true },
    date: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;

// Export the find function
export const find = async (query = {}) => {
    return await Payment.find(query).populate('employeeId', 'name');
};
