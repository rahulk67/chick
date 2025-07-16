// models/rechargeRequestModel.js
import mongoose from 'mongoose';

const rechargeRequestSchema = new mongoose.Schema({
  userId: {
    type: String, // you can also use: mongoose.Schema.Types.ObjectId if needed
    // required: true,
  },
  phone: {
    type: String,

    // required: true,
  },
  amount: {
    type: Number,
    // required: true,
  },
  utr: {
    type: String,
    required: true,
    // maxlength: 12,
  },
  firstDeposit: {
    type: Boolean,
    default: false,
  },
  nextDeposit: {
    type: Boolean,
    default: false,
  },
  status:{
    type:String,
    default:"Pending"
  }
}, {
  timestamps: true,
});

const rechargeRequestModel = mongoose.model('rechargerequest', rechargeRequestSchema);
export default rechargeRequestModel;
