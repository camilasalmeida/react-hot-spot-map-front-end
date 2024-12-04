// src/components/SpotForm/SpotForm.jsx

import { useState } from "react"

const SpotForm = (props) => {
  const [formData, setFormData] = useState({
    spotName: '',
    address: '',
    category: '',
    dresscode: '',
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("formData", formData);
    props.handleAddSpot(formData)
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="spotName">Spot Name*</label>
        <input
          required
          type="text"
          name="spotName"
          id="spotName"
          value={formData.spotName}
          onChange={handleChange}
        />
        <label htmlFor="address">Address</label>
        <textarea
          type="text"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
        />
        <label htmlFor="category">Category*</label>
        <select
          required
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Bar">Bar</option>
          <option value="NightClub">NightClub</option>
          <option value="Party">Party</option>
          <option value="CoffeeShop">CoffeeShop</option>
          <option value="WineTasting">WineTasting</option>
          <option value="Concert">Concert</option>
          <option value="ComedyClub">ComedyClub</option>
          <option value="MovieTheater">MovieTheater</option>
          <option value="EscapeRoom">EscapeRoom</option>
          <option value="AmusementPark">AmusementPark</option>
          <option value="Game">Game</option>
          <option value="ArtGallery">ArtGallery</option>
          <option value="Museum">Museum</option>
          <option value="Theater">Theater</option>
          <option value="Exhibition">Exhibition</option>
          <option value="Sports">Sports</option>
          <option value="OutdoorActivity">OutdoorActivity</option>
          <option value="Beach">Beach</option>
          <option value="Hike">Hike</option>
          <option value="Ski">Ski</option>
          <option value="Spa">Spa</option>
          <option value="Workshop">Workshop</option>
          <option value="Class">Class</option>
          <option value="Trip">Trip</option>
          <option value="Camping">Camping</option>
        </select>
        <label htmlFor="dresscode">Dress Code*</label>
        <select 
        required 
        name="dresscode" 
        id="dresscode"
        value={formData.dresscode} 
        onChange={handleChange}
        >
          <option value="">Select a dress code</option>
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
          <option value="Business Casual">Business Casual</option>
          <option value="Smart Casual">Smart Casual</option>
          <option value="Black Tie">Black Tie</option>
          <option value="Theme Specific">Theme Specific</option>
          <option value="None">None</option>
        </select>

        <button type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default SpotForm
