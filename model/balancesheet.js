// ../model/balancesheet.js
import mongoose from 'mongoose';

const BalanceSheetSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    details: String,
    date: { type: Date, default: Date.now },
});

const BalanceSheet = mongoose.model('BalanceSheet', BalanceSheetSchema);

export default BalanceSheet;

// Exporting `find` method for use in the controller
export const find = async (query = {}) => {
    return await BalanceSheet.find(query);
};
