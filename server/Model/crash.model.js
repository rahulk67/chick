// backend/models/crash.model.js
import mongoose from 'mongoose';

const crashSchema = new mongoose.Schema({
  number: { type: Number, default: null, },
  x: { type: String, default:"" },
});

export default mongoose.model('Crash', crashSchema);
