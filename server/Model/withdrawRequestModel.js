import mongoose from "mongoose";

const withdrawRequestSchema = new mongoose.Schema({
  amount: Number,
  account_number: String,
  account_holder_name: String,
  bank_name: String,
  ifsc_code: String,
  upi_id: String,
  mobile_number: String,
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Approved', 'Rejected'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model('withdrawRequest', withdrawRequestSchema);