import React from "react";

const WithdrawForm =({ show, onClose }) => {
  return (
    <>

   { show && <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1050 }}
    >
      <div
        className="position-relative bg-dark text-white rounded-4 shadow-lg w-100"
        style={{ maxWidth: "24rem", maxHeight: "90vh", overflowY: "auto" }}
      >
        <button
        onClick={onClose}
          className="btn-close position-absolute text-white"
          style={{ top: "1rem", right: "1rem" }}
        ></button>

        <h2 className="fs-5 fw-bold text-center mt-5 mb-3">Withdrawal</h2>

        <form className="px-4 pb-4">
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              name="amount"
              className="form-control bg-secondary text-white border-secondary"
              placeholder="Enter amount"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Account Number</label>
            <input
              type="text"
              name="account_number"
              className="form-control bg-secondary text-white border-secondary"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Account Holder Name</label>
            <input
              type="text"
              name="account_holder_name"
              className="form-control bg-secondary text-white border-secondary"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Bank Name</label>
            <input
              type="text"
              name="bank_name"
              className="form-control bg-secondary text-white border-secondary"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">IFSC Code</label>
            <input
              type="text"
              name="ifsc_code"
              className="form-control bg-secondary text-white border-secondary"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">UPI ID</label>
            <input
              type="text"
              name="upi_id"
              className="form-control bg-secondary text-white border-secondary"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Mobile Number</label>
            <input
              type="text"
              name="mobile_number"
              className="form-control bg-secondary text-white border-secondary"
            />
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold text-white"
            style={{ backgroundImage: "linear-gradient(to right, #22c55e, #059669)" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div> }
    </>
  );
};

export default WithdrawForm;
