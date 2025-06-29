import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AuthPage from './Pages/AuthPage';



const App = () => {
  return (
    <Router>
      <div className="">
        {/* <Navbar /> */}
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/auth" element={<AuthPage />} />
            {/* <Route path="/register" element={<Register />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
