import bcrypt from "bcrypt";
import UserModel from "../Model/User.model.js";

const PP = async (req, res) => {
  const multipliers = [
    1.2, 1.5, 2.0, 2.5, 3.0, 3.6, 4.5, 5.2, 6.3, 7.1, 8.0, 9.2, 10.3, 12.0,
    13.2, 15.4, 16.3, 17.2, 18.5, 19.4, 20.6, 22.1, 23.3, 24.9, 26.0, 27.5,
  ];
  const random = multipliers[Math.floor(Math.random() * multipliers.length)];
  res.json({ multiplier: random });
};

const register = async (req, res) => {
    const saltRounds = 10;
    console.log(req.body,"sdfddfdf")
  try {
    const { phone, password } = req.body;


    if (!phone || !password) {
      return res
        .status(400)
        .json({ message: "Phone and password are required." });
    }

    const existingUser = await UserModel.findOne({ phone });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this phone number." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      phone,
      password: hashedPassword,
      plain:password
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const login = async (req, res) => {
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
  
      // Success
      res.status(200).json({
        message: "Login successful.",
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

export default { PP, register,login };
