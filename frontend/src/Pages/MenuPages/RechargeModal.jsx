import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RechargeModal = ({ show, onClose }) => {
  const [amount, setAmount] = useState('');
  const [utr, setUtr] = useState('');

  const handlePresetClick = (val) => setAmount(val.toString());

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle recharge logic here
    console.log('Amount:', amount);
    console.log('UTR:', utr);
  };

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static" className="text-white">
      <Modal.Body className="bg-dark rounded-4 p-4 text-white">
        <Button variant="link" className="position-absolute top-0 end-0 text-white fs-4 p-2" onClick={onClose}>
          &times;
        </Button>

        <h4 className="text-center fw-bold mt-2">Recharge</h4>

        <div className="text-center my-3">
          <img
            src="https://root.chicken-road.zone/uploads/qrcodexs/1751430493.jpg"
            alt="QR Code"
            className="img-fluid rounded-4 mb-2"
            style={{ maxHeight: '200px' }}
          />
          <div className="d-flex align-items-center justify-content-center gap-2 bg-secondary px-3 py-1 rounded-pill">
            <small className="text-truncate" title="BHARATPE.8B0Z0I8Y9O34915@fbpe">
              BHARATPE.8...
            </small>
            <Button variant="link" className="text-white p-0" title="Copy to clipboard">
              <i className="bi bi-clipboard"></i>
            </Button>
          </div>
        </div>

        <hr className="bg-secondary" />

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-muted small">MINIMUM RECHARGE: <span className="text-white fw-bold">500</span></Form.Label>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter amount"
              className="bg-secondary text-white border-secondary"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="d-flex flex-wrap gap-2 mt-2">
              {[500, 1000, 2000, 5000, 10000].map((val) => (
                <Button
                  key={val}
                  variant="secondary"
                  size="sm"
                  className="rounded-pill px-3"
                  onClick={() => handlePresetClick(val)}
                >
                  {val}
                </Button>
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>UTR Number</Form.Label>
            <Form.Control
              type="text"
              maxLength={12}
              placeholder="Enter 12-digit UTR number"
              className="bg-secondary text-white border-secondary"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="w-100 bg-success text-white fw-bold">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RechargeModal;
