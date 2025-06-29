// index.js
import express from 'express';
import cors from 'cors';
import User from './Routes/user.routes.js'; // ✅ must include .js extension
import connection from './Database/connection.js';

const app = express();
const PORT = process.env.PORT || 8000;
connection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

app.use('/user', User);

// Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
export default app;