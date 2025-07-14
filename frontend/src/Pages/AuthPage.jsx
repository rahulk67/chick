import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPage.css";
import BannerSlider from "./BannerSlider";
import NoticeBar from "./NoticeBar";
import WinningInfo from "./WInningInfo";
import Footer from "./Footer";

const AuthPage = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);


  // const apiUrl = "http://localhost:8000";
  const apiUrl = 'https://chicken-api-zeta.vercel.app';

  const apiUrl22 = import.meta.env.VITE_API_URL;
  console.log(apiUrl22,"apii ulldklfdlkf")


  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const route = isLogin ? "/user/login" : "/user/register";
    console.log(route, "route");
  
    // Basic client-side validation
    if (
      !formData.phone ||
      !formData.password ||
      (!isLogin && (!formData.email || !formData.confirmPassword))
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
  
    axios
      .post(`${apiUrl}${route}`, formData)
      .then((res) => {
        console.log(res, "user data");
      if(isLogin)
         { 
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Something went wrong.");
      }).finally(() => {
        setLoading(false); // ✅ stop loading
      });
  };



    const [isAuthenticated, setIsAuthenticated] = useState(false); // null = unknown, true/false = known
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
  
      axios
        .get(`${apiUrl}/user/validate`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data, "User is authenticated");
          setIsAuthenticated(true);
          // navigate("/play");
        })
        .catch((err) => {
          console.warn("Token invalid:", err.response?.data?.message);
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        });
    }, []);
  

  return (
    <div style={{ backgroundColor: "#042d56" }}>
      {/* Header Bar */}
      <div
        className="w-100 d-flex justify-content-between align-items-center px-3 py-2"
        style={{
          backgroundColor: "#084b93",
          color: "white",
        }}
      >
        <div className="fw-bold fs-5 d-flex align-items-center">
          <img
            src="/images/authlogo.png"
            alt="logo not found"
            className="rounded-circle"
            style={{ width: "48px", height: "48px", objectFit: "cover" }}
          />
          {apiUrl22}zxzxfv22
        </div>

        {!isAuthenticated ? <div className="d-flex align-items-center gap-2 fw-bold small">
          <button
            className="btn text-uppercase"
            style={{
              backgroundColor: "#FA6315",
              color: "white",
              border: "none",
            }}
            onClick={() => {
              setShowRegisterModal(true);
              setIsLogin(false);
            }}
          >
            Register
          </button>
          <button
            className="btn text-uppercase"
            style={{
              backgroundColor: "#5292D8",
              color: "white",
              border: "none",
            }}
            onClick={() => {
              setShowLoginModal(true);
              setIsLogin(true);
            }}
          >
            Log In
          </button>
        </div> : <div className="d-flex align-items-center gap-2 fw-bold small">  <button
            className="btn text-uppercase"
            style={{
              backgroundColor: "#5292D8",
              color: "white",
              border: "none",
            }}
            onClick={() => {
             navigate("/play");
            }}
          >
            Play 
          </button> $0.00</div>}
      </div>

      {/* Register Modal */}
      {showRegisterModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050 }}
        >
          <div
            className="bg-dark text-white p-4 rounded-4 shadow w-100"
            style={{ maxWidth: "400px", position: "relative" }}
          >
            <button
              className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
              onClick={() => setShowRegisterModal(false)}
            ></button>
            <h2 className="text-center fw-bold mb-4">Create an Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-light">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control bg-secondary text-white"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label text-light">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control bg-secondary text-white"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-light">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control bg-secondary text-white"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="form-label text-light"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control bg-secondary text-white"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Enter confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
    {loading ? (
      <>
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        ></span>
        Registering...
      </>
    ) : (
      "Register"
    )}
  </button>
             
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050 }}
        >
          <div
            className="bg-dark text-white p-4 rounded-4 shadow w-100"
            style={{ maxWidth: "400px", position: "relative" }}
          >
            <button
              className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
              onClick={() => setShowLoginModal(false)}
            ></button>
            <h2 className="text-center fw-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label text-light">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control bg-secondary text-white"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone "
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-light">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control bg-secondary text-white"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button disabled={loading} type="submit" className="btn btn-primary w-100">
              {loading ? (
    <>
      <span
        className="spinner-border spinner-border-sm me-2"
        role="status"
        aria-hidden="true"
      ></span>
      Logging in...
    </>
  ) : (
    "Login"
  )}
              </button>
            </form>
          </div>
        </div>
      )}

      <BannerSlider />
      <NoticeBar />
      <div
        className="mt-2 rounded-3 overflow-hidden p-2"
        style={{ cursor: "pointer" }}
      >
        <Link to="/play">
          <img
            src="/images/Play.png"
            alt="Chicken Road Game"
            className="img-fluid w-100 d-block"
          />
        </Link>

        <WinningInfo />
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;

// <div className="auth-page">

// <div className="auth-box">
//     <img style={{ width: "100px", height: "100px", }} src='/images/chiken.png' />
//     <div className="auth-tabs">
//         <button
//             className={!isLogin ? "active" : ""}
//             onClick={() => setIsLogin(false)}
//         >
//             Register
//         </button>
//         <button
//             className={isLogin ? "active" : ""}
//             onClick={() => setIsLogin(true)}
//         >
//             Login
//         </button>
//     </div>

//     <form className="auth-form" onSubmit={handleSubmit}>
//         <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             required
//             value={formData.phone}
//             onChange={handleChange} />
//         <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             value={formData.password}
//             onChange={handleChange} />
//         <button type="submit">
//             {isLogin ? "Login" : "Register"}
//         </button>
//     </form>
// </div>
// </div>
