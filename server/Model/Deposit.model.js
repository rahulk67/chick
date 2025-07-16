// models/MsmeApplication.js
import mongoose from 'mongoose';

const depositSchema = new mongoose.Schema({
  

  name: String,
  file: String, // File path to uploaded document
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const depositModel = mongoose.model('DepositMethod', depositSchema);

export default depositModel;
