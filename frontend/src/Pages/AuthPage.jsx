

// TwoForms.jsx


import React, { useState } from 'react'
import axios from "axios"
import "./AuthPage.css"
import { useNavigate } from 'react-router-dom';



const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({ phone: "", password: "" });
    // const apiUrl = "http://localhost:8000";
    const apiUrl = "https://chicken-api-zeta.vercel.app";



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const route = isLogin ? "/user/login" : "/user/register";
        try {
            const res = await axios.post(`${apiUrl}${route}`, formData);
            alert(res.data.message);
            navigate("/")
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="auth-page">
           
            <div className="auth-box">
            <img style={{width:"100px" , height:"100px", }} src='/images/chiken.png'/>
                <div className="auth-tabs">
                    <button
                        className={!isLogin ? "active" : ""}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                    <button
                        className={isLogin ? "active" : ""}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthPage;