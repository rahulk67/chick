
import { Router } from "express";
import User from "../Controllers/UserController.js"
import { verifyToken } from "../Middleware/auth.js";

const router = Router();


router.get('/multiplier', verifyToken, User.PP);
router.post('/register', User.register);
router.post('/login', User.login); 
router.post('/send-num', User.sendnum); 
router.get('/get-num', User.getNum); 
router.post('/admin-login', User.AdminLogin); 
// router.post('/create', User.createAdmin); 






router.get('/validate', verifyToken, (req, res) => {
    res.status(200).json({ message: "Token is valid", user: req.user });
  });



export default router;