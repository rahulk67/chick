import bcrypt from "bcrypt";
import UserModel from "../Model/User.model.js";
import jwt from 'jsonwebtoken';
import crashModel from "../Model/crash.model.js";
import adminModel from "../Model/admin.model.js"
import depositModel from "../Model/Deposit.model.js";
import rechargeRequestModel from "../Model/recharge.model.js";

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
    res.status(500).json({ message: error });
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
    // const ww = await admin.find()
    // console.log("All admins:", ww);
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

const DepositMethod = async (req, res) => {
  try {
    // console.log(req.user.id,"admin ka token id")
    const { name } = req.body;
    const filePath = req.file?.path || '';

    await depositModel.deleteMany({}); 
  
    const updated = await depositModel.findOneAndUpdate(
      { name }, // Find by unique identifier (e.g., name)
      { name, file: filePath }, // Update fields
      { new: true, upsert: true } // Create if not found (first time), else update
    );
  
    res.status(200).json({ message: 'Deposit Detail updated successfully.', data: updated });
  } catch (error) {
    console.error('❌ Error updating:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
  
};


const GetDepositDetail = async (req, res) => {
  try {
    const userId = req.user.id;

    
    // console.log(req.user.id,"dfgffgffdf")
    const data = await depositModel.find({});

    if (!data) {
      return res.status(404).json({ message: 'No data found for this name' });
    }

    res.status(200).json({ message: 'Deposit detail fetched successfully.', data });
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};


const handleRechargeRequest = async (req, res) => {
  try {
    const { amount, utr } = req.body;
    const userId = req.user.id;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if this is user's first recharge
    const previousRecharge = await rechargeRequestModel.findOne({ userId });

    const newRecharge = new rechargeRequestModel({
      userId,
      phone: user.phone,
      amount,
      utr,
      // firstDeposit,
      // nextDeposit,
    });

    
    if(previousRecharge){
      user.nextDeposit = true
      user.firstDeposit = false
    }else{
      user.firstDeposit = true
      user.nextDeposit = false
    }
   
    await user.save();

    await newRecharge.save();

    res.status(201).json({ message: 'Recharge request submitted successfully.' });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const approveRecharge = async (req, res) => {
  try {
    const { userId , amount , id  } = req.body;
    console.log(userId , amount ,"hvnb")

    const user = await UserModel.findById(userId);
    const pwallet = user.wallet
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log(user, "nbn")
    
   
    user.wallet = amount + pwallet
    user.save();

     // Update recharge request status
  const rechargeRequest = await rechargeRequestModel.findById(id);
  if (!rechargeRequest) {
    return res.status(404).json({ message: 'Recharge request not found' });
  }

  rechargeRequest.status = 'Approved';
  await rechargeRequest.save();



    res.status(201).json({ message: 'Recharge request submitted successfully.' });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllRechargeRequests = async (req, res) => {
  try {
    const allRequests = await rechargeRequestModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: 'All recharge requests fetched successfully.',
      data: allRequests,
    });
  } catch (error) {
    console.error('❌ Error fetching recharge requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ extracted from token via verifyToken middleware

    const user = await UserModel.findById(userId).select('-plain'); // exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      message: 'User data fetched successfully',
      data: user,
    });
  } catch (error) {
    console.error('❌ Error fetching user info:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



export default { PP, getUserInfo , register,login, sendnum, getNum, AdminLogin , createAdmin ,DepositMethod ,GetDepositDetail , handleRechargeRequest , getAllRechargeRequests , approveRecharge };
