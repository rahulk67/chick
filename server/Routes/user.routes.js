
import { Router } from "express";
import User from "../Controllers/UserController.js"

const router = Router();


router.get('/multiplier', User.PP);
router.post('/register', User.register);
router.post('/login', User.login);



export default router