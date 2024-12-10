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
    image: "",                                 
  })

const { spotId, guestId } = useParams();

  useEffect(() => {
    const fetchSpot = async () => {
        const spotData = await spotService.show(spotId);
        const guestToEdit = spotData?.guests?.find((guest) => guest._id === guestId); 
        if (guestToEdit) {
          setFormData(guestToEdit);                                        
        }
      }
      if (spotId && guestId) fetchSpot();
    }, [spotId, guestId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

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
          value={formData.status || "Pending"} 
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

  return (
    <form className={styles.guestFormContainer} onSubmit={handleSubmit}>
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

      <label htmlFor="date">Date<span style={{ color: "red" }}>*</span></label>
      <input
        required
        type="date"
        name="date"
        id="date"
        value={formData.date || ""}
        onChange={handleChange}
      />

      <label htmlFor="time">Time<span style={{ color: "red" }}>*</span></label>
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
        value={formData.status || "Pending"} 
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

      <button type="submit">Submit and Invite
      </button>
    </form>
  )
}

export default GuestForm

