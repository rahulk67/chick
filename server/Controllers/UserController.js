import bcrypt from "bcrypt";
import UserModel from "../Model/User.model.js";
import jwt from 'jsonwebtoken';
import crashModel from "../Model/crash.model.js";
import adminModel from "../Model/admin.model.js";

const PP = async (req, res) => {
  const multipliers = [
    1.2, 1.5, 2.0, 2.5, 3.0, 3.6, 4.5, 5.2, 6.3, 7.1, 8.0, 9.2, 10.3, 12.0,
    13.2, 15.4, 16.3, 17.2, 18.5, 19.4, 20.6, 22.1, 23.3, 24.9, 26.0, 27.5,
  ];
  const random = multipliers[Math.floor(Math.random() * multipliers.length)];
  res.json({ multiplier: random });
};


console.log("UserController loaded");
const register = async (req, res) => {
  console.log(req.body,"req body")
  const saltRounds = 10;
  console.log(req.body,"req body")

  try {
    const { phone, password , email } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required." });
    }

    const existingUser = await UserModel.findOne({ phone });
    console.log("Existing user:", existingUser);  
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this phone number." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      email,
      phone,
      password: hashedPassword,
      plain: password
    });

    await newUser.save();

    // Create token
    const token = jwt.sign({ id: newUser._id, phone: newUser.phone }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        id: newUser._id,
        phone: newUser.phone
      }
    });

  } catch (error) {
    console.log("Registration error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


const login = async (req, res) => {
  console.log("Login request received:", req.body);
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required." });
    }

    const user = await UserModel.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Create token
    const token = jwt.sign({ id: user._id, phone: user.phone }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const sendnum = async (req, res) => {
  try {
    let { number } = req.body;
    number = Number(number);

    if (isNaN(number)) {
      return res.status(400).json({ message: "Invalid input. Please provide a valid number." });
    }

    // 👉 If number is 2025, treat it as null
    if (number === 2025) {
      number = null;
    }

    // Update existing or create if not exists
    const updated = await crashModel.findOneAndUpdate(
      {},
      { number },
      {
        new: true,
        upsert: true,
      }
    );

    console.log("Number saved to DB as:", number);

    res.status(200).json({
      message: "Number saved/updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating number:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const getNum = async (req, res) => {
  try {
    const data = await crashModel.findOne();

    if (!data) {
      return res.status(404).json({ message: "No number found yet." });
    }

    res.status(200).json({
      message: "Number fetched successfully.",
      number: data.number,
    });
  } catch (error) {
    console.error("Error fetching number:", error);
    res.status(500).json({ message: "Server error." });
  }
};


const generateToken = (id) => {
  return jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const AdminLogin = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    if (!email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const ww = await adminModel.find()
    console.log("All admins:", ww);
    const cleanEmail = email.trim();
    const admin = await adminModel.findOne({  email: new RegExp(`^${cleanEmail}$`, 'i')  });
    console.log("Admin found:", admin);

    if (!admin || admin.phone !== phone) {
      return res.status(401).json({ message: 'Invalid email or phone' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        phone: admin.phone,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createAdmin = async (req, res) => {
  console.log("Create Admin request received:", req.body);
  const { email, phone, password } = req.body;

  if (!email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const adminExists = await adminModel.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const newAdmin = new adminModel({ email, phone, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    console.error('Admin creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export default { PP, register,login, sendnum, getNum, AdminLogin , createAdmin };
