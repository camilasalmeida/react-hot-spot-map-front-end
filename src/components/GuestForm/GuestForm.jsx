// src/components/GuestForm/GuestForm.jsx

import { useState, useEffect } from "react"
import * as spotService from '../../services/spotService'
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';
import styles from './GuestForm.module.css'


const GuestForm = (props) => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: "",
    status: "Pending",
    image: "",                                 // Treated as a string
  })

const { spotId, guestId } = useParams();
   console.log('Guest Form, spotId:', spotId, 'guestId: ', guestId)
   console.log('Guest Object:', guestId);
  

  useEffect(() => {
    const fetchSpot = async () => {
        const spotData = await spotService.show(spotId);
        //setFormData(spotData.guests.find((guest) => guest._id === guestId));
        const guestToEdit = spotData?.guests?.find((guest) => guest._id === guestId); // Find the specific guest
        if (guestToEdit) {
          setFormData(guestToEdit);                                        // Update the form data if guest is found
        }
      }
      if (spotId && guestId) fetchSpot();
    }, [spotId, guestId]);


  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  // Send an email to the guest upon submission.
  const handleSubmit = async (evt) => {           
    evt.preventDefault();
      if (spotId && guestId) {
          spotService.updateGuest(spotId, guestId, formData);
         navigate(`/spots/${spotId}`);
       } else {
     props.handleAddGuest(formData);
       }
  
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
//-------------------------------------------------------------------------------\\
  if (spotId && guestId)
    return (
  <main className={styles.container}> 
      <form onSubmit={handleSubmit}>
        <h2>Edit Guest</h2>
        <label htmlFor="name">
          Name <span style={{ color: "red" }}>*</span>
        </label>
        <input
          required
          type="text"
          name="name"
          id="name"
          placeholder="example: Blake Peak"
          value={formData.name || ""}
          onChange={handleChange}
        />

        <label htmlFor="email">
          Email <span style={{ color: "red" }}>*</span>
        </label>
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="blakepeak@example.com"
          value={formData.email || ""}
          onChange={handleChange}
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date || ""}
          onChange={handleChange}
        />

        <label htmlFor="time">Time</label>
        <input
          type="time"
          name="time"
          id="time"
          value={formData.time || ""}
          onChange={handleChange}
        />

        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          value={formData.message || ""}
          onChange={handleChange}
          placeholder="Write your message or note here (optional)"
        />

        <label htmlFor="status">
          Status<span style={{ color: "red" }}>*</span>
        </label>
        <select
          required
          name="status"
          id="status"
          value={formData.status || "Pending"} // Default to 'Pending' if undefined
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

        <button type="submit">SUBMIT UPDATE</button>
      </form>
      </main>
    )
//-------------------------------------------------------------------------------------\\
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name <span style={{ color: "red" }}>*</span>
      </label>
      <input
        required
        type="text"
        name="name"
        id="name"
        placeholder="example: Blake Peak"
        value={formData.name || ""}
        onChange={handleChange}
      />

      <label htmlFor="email">
        Email <span style={{ color: "red" }}>*</span>
      </label>
      <input
        required
        type="email"
        name="email"
        id="email"
        placeholder="blakepeak@example.com"
        value={formData.email || ""}
        onChange={handleChange}
      />

      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        id="date"
        value={formData.date || ""}
        onChange={handleChange}
      />

      <label htmlFor="time">Time</label>
      <input
        type="time"
        name="time"
        id="time"
        value={formData.time || ""}
        onChange={handleChange}
      />

      <label htmlFor="message">Message</label>
      <textarea
        name="message"
        id="message"
        value={formData.message || ""}
        onChange={handleChange}
        placeholder="Write your message or note here (optional)"
      />

      <label htmlFor="status">
        Status<span style={{ color: "red" }}>*</span>
      </label>
      <select
        required
        name="status"
        id="status"
        value={formData.status || "Pending"} // Default to 'Pending' if undefined
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

      <button type="submit">submit
        {/* {spotId && guestId ? "SUBMIT UPDATE" : "SUBMIT GUEST"} */}
      </button>
    </form>
  )
}

export default GuestForm


// The warnings you’re encountering in React indicate issues with controlled and uncontrolled components. Specifically:
// 	1.	Warning: value prop on input should not be null.
// 	•	React expects value in controlled inputs to always be a defined value. If value becomes null, it leads to this warning. You need to ensure value is either an empty string ("") or some defined value, not null.
// 	2.	Warning: A component is changing a controlled input to be uncontrolled.
// 	•	This occurs when value is initially controlled (bound to a state) and later becomes undefined. For example, if formData initially lacks a property or the value for a specific field is removed, this can trigger the warning.
//Ensure all value props in your controlled inputs default to an empty string ("") if they are null or undefined. You can achieve this by applying a fallback value using the || operator in your value attributes.
