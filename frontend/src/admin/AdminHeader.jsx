import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);


  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    // <nav className="bg-dark text-white px-3 py-2 shadow-sm">
    //   <div className="container-fluid d-flex justify-content-between align-items-center">
    //     {/* Brand */}
    //     <Link className="navbar-brand text-white fw-bold" to="/">
    //       Admin Panel
    //     </Link>

    //     {/* Hamburger Button */}
    //     <button
    //       className="btn d-lg-none text-white"
    //       onClick={() => setMenuOpen((prev) => !prev)}
    //     >
    //       <i className="bi bi-list fs-3"></i>
    //     </button>

    //     {/* Menu Items (Responsive) */}
    //     <div
    //       className={`${
    //         menuOpen ? 'd-flex' : 'd-none'
    //       } flex-column flex-lg-row gap-3 align-items-start align-items-lg-center mt-3 mt-lg-0 d-lg-flex`}
    //     >
    //       <Link to="/admin-setting" className="text-white text-decoration-none">
    //         Admin Setting
    //       </Link>
    //       <Link to="/game-setting" className="text-white text-decoration-none">
    //         Game Setting
    //       </Link>
    //       <Link to="/users" className="text-white text-decoration-none">
    //         Users
    //       </Link>
    //       <Link to="/recharge-request" className="text-white text-decoration-none">
    //         Recharge Request
    //       </Link>
    //     </div>

    //     {/* Profile Section */}
    //     <div className="position-relative ms-3" ref={profileRef}>
    //       <button
    //         className="btn btn-outline-light rounded-circle"
    //         onClick={() => setProfileOpen((prev) => !prev)}
    //         style={{ width: 40, height: 40 }}
    //       >
    //         <i className="bi bi-person-circle fs-5"></i>
    //       </button>

    //       {/* Dropdown */}
    //       {profileOpen && (
    //         <div
    //           className="position-absolute bg-white text-dark p-3 mt-2"
    //           style={{
    //             right: 0,
    //             border: '1px solid #ddd',
    //             borderRadius: '0.5rem',
    //             minWidth: '200px',
    //             boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    //             zIndex: 1000,
    //           }}
    //         >
    //           <p className="mb-2 small">📧 user@example.com</p>
    //           <button className="btn btn-sm btn-danger w-100">Logout</button>
    //         </div>
    //       )}
    //     </div>
    //   </div>

   
    // </nav>


    <header className="sticky-top bg-white shadow-sm z-50">
    <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white border-top border-bottom shadow-sm px-3">
      <div className="container-fluid">
        {/* Logo */}
        <div className="position-relative ms-3" ref={profileRef}>
        <button
          className="btn btn-ligfht btn-outline-none roundfed-circle text-center"
          onClick={() => setProfileOpen((prev) => !prev)}
          style={{ width: 40, height: 40 }}
        >
          <i className="bi bi-person-circle fs-5 text-light"></i>
        </button>

        {/* Dropdown */}
        {profileOpen && (
          <div
            className="position-absolute bg-white text-dark p-3 mt-2"
            style={{
              right: 0,
              border: '1px solid #ddd',
              borderRadius: '0.5rem',
              minWidth: '200px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 1000,
            }}
          >
            <p className="mb-2 small">📧 user@example.com</p>
            <button className="btn btn-sm btn-danger w-100">Logout</button>
          </div>
        )}
      </div>

        {/* Hamburger toggle */}
        <button
          className="navbar-toggler border-0 bg-light"
          type="button"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="navbar-toggler-icon "></span>
        </button>

        {/* Collapsible Menu */}
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
          {/* Left Menu */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-warning fw-medium " to="">Admin</Link>
            </li>

            

            <li className="nav-item">
              <Link className="nav-link text-warning fw-medium" to="game-setting"> Game Setting</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-warning fw-medium" to="#">  Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-warning fw-medium" to="recharge-request">RechargeRequest</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-warning fw-medium" to="#">About Us</Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  </header>
  );
};

export default AdminHeader;
