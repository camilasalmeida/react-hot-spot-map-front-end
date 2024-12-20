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

  const handleFocus = (e) => {
    e.target.style.outline = "none";
    e.target.style.border = "1px solid #bc002f";
    e.target.style.boxShadow = "0px 0px 5px rgba(188, 0, 47, 0.5)";
  };
  
  const handleBlur = (e) => {
    e.target.style.border = "1px solid black";      // Reset to default
    e.target.style.boxShadow = "none";
  };


  if (spotId && guestId)
    return (
  <main className={styles.EditContainer}> 
      <form onSubmit={handleSubmit}>
        <h2>Edit Guest</h2>
        <div className={styles.editForm}> 
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: '8px' }}
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: "8px" }}
      />
      <label htmlFor="date">Date<span style={{ color: "red" }}>*</span></label>
      <input
        required
        type="date"
        name="date"
        id="date"
        value={formData.date || ""}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: "8px" }}
      />
      <label htmlFor="time">Time<span style={{ color: "red" }}>*</span></label>
      <input
        type="time"
        name="time"
        id="time"
        value={formData.time || ""}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: "8px" }}
      />
      <label htmlFor="message">Message</label>
      <textarea
        name="message"
        id="message"
        value={formData.message || ""}
        onChange={handleChange}
        placeholder="Write your message or note here (optional)"
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: "8px", height: "60px" }}
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: "8px" }}
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: "8px" }}
      />
      <small>Accepted file types: JPG, PNG, etc.</small>

        <button type="submit">SUBMIT UPDATE</button>
        </div>
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: '8px' }}
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: "8px" }}
      />

      <label htmlFor="date">Date<span style={{ color: "red" }}>*</span></label>
      <input
        required
        type="date"
        name="date"
        id="date"
        value={formData.date || ""}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: "8px" }}
      />

      <label htmlFor="time">Time<span style={{ color: "red" }}>*</span></label>
      <input
        
        type="time"
        name="time"
        id="time"
        value={formData.time || ""}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: "8px" }}
      />

      <label htmlFor="message">Message</label>
      <textarea
        name="message"
        id="message"
        value={formData.message || ""}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Write your message or note here (optional)"
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: "8px", height: "60px" }}
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: "8px" }}
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: "100%", padding: "7px", marginBottom: "10px", fontSize: "18px", borderRadius: "8px" }}
      />
      <small>Accepted file types: JPG, PNG, etc.</small>

      <button type="submit" style={{ marginTop: "15px"}}>Submit and Invite
      </button>
    </form>
  )
}

export default GuestForm

