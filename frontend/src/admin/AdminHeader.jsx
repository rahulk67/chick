import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-dark text-white p-3 d-flex justify-content-between align-items-center position-relative">
      {/* Left Menu Buttons */}
      <div className="d-flex gap-3">
      <Link to={'admin-setting'}>  <button  className="btn btn-outline-light">Admin Setting</button></Link>
        <button className="btn btn-outline-light">Game Setting</button>
        <button className="btn btn-outline-light">Users</button>
      </div>

      {/* Profile Section */}
      <div className="position-relative" ref={dropdownRef}>
        <button
          className="btn btn-outline-light rounded-circle"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <i className="bi bi-person-circle fs-4"></i>
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div
            className="position-absolute bg-white text-dark p-3"
            style={{
              top: '100%',
              right: 0,
              border: '1px solid #ddd',
              borderRadius: '0.5rem',
              minWidth: '200px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              zIndex: 1000,
            }}
          >
            <p className="mb-2">📧 user@example.com</p>
            <button className="btn btn-sm btn-danger w-100">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
