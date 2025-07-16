import React, { useState } from 'react'

const AdminSetting = () => {


  const [formData, setFormData] = useState({
    name: '',
    file: null,
  });

  const apiUrl = import.meta.env.VITE_API_URL;


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    console.log('Submitting data:', formData);

    try {
      const response = await fetch(`${apiUrl}/user/deposit-method`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      alert(result.message || 'Detail submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the form');
    }
  };


  return (
    <div>
      <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
            Upi id
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="file-upload" className="form-label">
              Upload QR Code Image
            </label>
            <input
              type="file"
              className="form-control"
              id="file-upload"
              name="file"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Send Now
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AdminSetting
