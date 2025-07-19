import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    // unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  plain: {
    type: String,
    // required: true,
  },
  wallet:{
    type:Number,
    default:0,
  },
  firstDeposit: {
    type: Boolean,
    default: null,
  },
  nextDeposit: {
    type: Boolean,
    default: false,
  },
  ekyc: {
    type: String,
    default: 'Pending',
  },
  stage: {
    type: String,
    default: 'Beginner',
  },
}, {
  timestamps: true
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
