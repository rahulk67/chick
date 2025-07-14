import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import AuthPage from "../Pages/AuthPage";
import Home from "../Pages/Home";

const UserLayout = () => {


  const audioRef = useRef(null);

  useEffect(() => {
    const handlePlay = () => {
      audioRef.current?.play().catch((e) => {
        console.warn("Autoplay failed:", e);
      });
    };

    document.addEventListener("click", handlePlay, { once: true });

    return () => {
      document.removeEventListener("click", handlePlay);
    };
  }, []);

  // useEffect(() => {
  //     const fetchNumber = async () => {
  //       try {
  //         const res = await axios.get('http://localhost:8000/user/get-num');
  //         console.log("Fetched number:", res);
  //         // setNumber(res.data.number);
  //       } catch (error) {
  //         console.error("Failed to fetch number:", error);
  //       }
  //     };

  //     fetchNumber(); // initial call immediately

  //     const interval = setInterval(fetchNumber, 1000); // call every 1 second

  //     return () => clearInterval(interval); // cleanup on unmount
  //   }, []);

  return (
    <div className="">
      <audio src="/images/audio.mp3" ref={audioRef} loop preload="auto"></audio>
      {/* <Navbar /> */}
      <main className="">
        <Routes>
          <Route path="/" element={<Navigate to={"/auth"} />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/play" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default UserLayout;
