import React from 'react';

const UserMenu = () => {
  return (
    <div
    className="position-absolute shadow-lg rounded border border-secondary"
    style={{
      top: '4rem',
      right: '1.25rem',
      width: '18rem',
      backgroundColor: '#3A3D51',
      zIndex: 50,
      padding: '1rem',
      color: 'white',
    }}
  >
    {/* Close Button */}
    <button
      type="button"
      onClick={() => setShowmenu(!menu)}
      className="btn-close btn btn-sm text-light  text-white position-absolute"
      style={{ top: '0.75rem', right: '0.75rem', fontSize: '0.8rem', color:"white" }}
    >
    
    </button>

    <div className="mt-3 small">
      {/* Avatar Row */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <img
          src="https://cdn-icons-png.flaticon.com/128/10438/10438143.png"
          alt="avatar"
          className="rounded-circle"
          width="24"
          height="24"
        />
        <p className="fw-bold mb-0">User_2264</p>
        <button className="btn btn-sm text-light p-0 small">Change avatar</button>
      </div>

      {/* Sound Toggle */}
      <div className="d-flex align-items-center justify-content-between py-2">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-volume-up"></i>
          <span>Sound</span>
        </div>
        <div className="form-check form-switch m-0">
          <input className="form-check-input" type="checkbox" role="switch" />
        </div>
      </div>

      {/* Music Toggle */}
      <div className="d-flex align-items-center justify-content-between py-2">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-music-note-list"></i>
          <span>Music</span>
        </div>
        <div className="form-check form-switch m-0">
          <input className="form-check-input" type="checkbox" role="switch" defaultChecked />
        </div>
      </div>

      {/* Menu Links */}
      {[
        { label: 'Game rules', icon: 'bi bi-book' },
        { label: 'My bet history', icon: 'bi bi-clock-history' },
        { label: 'Recharge', icon: 'bi bi-wallet2' },
        { label: 'Withdraw', icon: 'bi bi-arrow-down-circle' },
        { label: 'Deposit History', icon: 'bi bi-wallet' },
        { label: 'Withdraw History', icon: 'bi bi-clock' },
        { label: 'Referral', icon: 'bi bi-people' },
      ].map((item, idx) => (
        <div key={idx} className="py-2">
          <button className="btn text-start text-white d-flex w-100 align-items-center gap-2 p-0">
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </button>
        </div>
      ))}

      {/* Logout */}
      <div className="py-2">
        <button className="btn text-start text-danger d-flex w-100 align-items-center gap-2 p-0">
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
  );
};

export default UserMenu;
