
import { Router } from "express";
import User from "../Controllers/UserController.js"
import { verifyToken } from "../Middleware/auth.js";
import upload from "../Middleware/upload.js";

const router = Router();


router.get('/multiplier', verifyToken, User.PP);
router.post('/register', User.register);
router.post('/login', User.login); 
router.post('/send-num', User.sendnum); 
router.get('/get-num', User.getNum); 
router.post('/admin-login', User.AdminLogin); 
// router.post('/create', User.createAdmin); 


router.post('/deposit-method', verifyToken , upload.single('file'), User.DepositMethod);
router.get('/get-pay-detail',verifyToken , User.GetDepositDetail);

router.post('/recharge-request',verifyToken , User.handleRechargeRequest);
router.get('/all-recharge-request', verifyToken, User.getAllRechargeRequests); 
router.post('/approve-recharge', verifyToken, User.approveRecharge); 
router.get('/user-info', verifyToken, User.getUserInfo); 







router.get('/validate', verifyToken, (req, res) => {
    res.status(200).json({ message: "Token is valid", user: req.user });
  });



export default router;