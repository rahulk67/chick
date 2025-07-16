// index.js
import express from 'express';
import cors from 'cors';
import User from './Routes/user.routes.js'; // ✅ must include .js extension
import connection from './Database/connection.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
connection();

// Middleware
app.use(cors({
  // origin: 'https://chicken-road-omega.vercel.app', // ✅ your frontend URL
  origin:"http://localhost:5173", // ✅ your frontend URL for local development
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Make uploads folder public
app.use('/uploads', express.static('uploads'));


// Routes
app.get('/', (req, res) => {
  res.send('API is running 🚀');
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/user', User);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;