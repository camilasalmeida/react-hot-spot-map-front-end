// src/components/GuestForm/GuestForm.jsx

import { useState, useEffect } from 'react';
import * as spotService from '../../services/spotService';

const GuestForm = (props) => {
  const [formData, setFormData] = useState({ 
    name: '',
    email: '',
    date: '',
    time: '',
    message: '',
    status: 'Pending',
    image: '',                     // Treated as a string
   });

  const handleChange = (evt) => {
    if (evt.target.type === "file") {
        console.log(evt.target.files[0]); // Log the file object
    } else {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }};


  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddGuest(formData);
    setFormData({ 
        name: '',
      email: '',
      date: '',
      time: '',
      message: '',
      status: 'Pending',
      image: '',
     });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name <span style={{ color: 'red' }}>*</span>
      </label>
      <input
        required
        type="text"
        name="name"
        id="name"
        placeholder="example: Blake Peak"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="email">
        Email <span style={{ color: 'red' }}>*</span>
      </label>
      <input
        required
        type="email"
        name="email"
        id="email"
        placeholder="blakepeak@example.com"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        id="date"
        value={formData.date}
        onChange={handleChange}
      />

      <label htmlFor="time">Time</label>
      <input
        type="time"
        name="time"
        id="time"
        value={formData.time}
        onChange={handleChange}
      />

      <label htmlFor="message">Message</label>
      <textarea
        name="message"
        id="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Write your message or note here (optional)"
      />

      <label htmlFor="status">Status<span style={{ color: 'red' }}>*</span></label>
      <select
        required
        name="status"
        id="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Rejected">Rejected</option>
      </select>

      <label htmlFor="imageUpload">Upload Image (Optional)</label>
      <input
        type="file"
        name="image"
        id="imageUpload"
        accept="image/*"
        onChange={handleChange}
      />
      <small>Accepted file types: JPG, PNG, etc.</small>


      <button type="submit">SUBMIT GUEST</button>
    </form>
  );
};

export default GuestForm;
