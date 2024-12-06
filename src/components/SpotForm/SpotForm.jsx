// src/components/SpotForm/SpotForm.jsx

import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import * as spotService from '../../services/spotService'

const SpotForm = (props) => {
  const [formData, setFormData] = useState({
    spotName: '',
    address: '',
    category: '',
    dresscode: '',
  })

  const { spotId } = useParams()
  //console.log('spotId in spotForm is:', spotId)

  useEffect(() => {
    const fetchSpot = async () => {
        const spotData = await spotService.show(spotId)
        setFormData(spotData)
    }
    if (spotId) fetchSpot()
}, [spotId])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (spotId) {
        props.handleUpdateSpot(spotId, formData)
    } else {
    //console.log("formData", formData);
    props.handleAddSpot(formData)
  }
}

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{spotId ? 'Edit Spot' : 'New Spot'}</h1>
        <label htmlFor="spotName">Spot Name <span style={{ color: 'red' }}>*</span></label>
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
        <label htmlFor="category">Category <span style={{ color: 'red' }}>*</span></label>
        <select
          required
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >

<option value="">Select a category</option>
<option value="AmusementPark">Amusement Park</option>
<option value="ArtGallery">Art Gallery</option>
<option value="Bar">Bar</option>
<option value="Beach">Beach Day</option>
<option value="BikeRide">Bike Ride</option>
<option value="BoardGames">Board Games</option>
<option value="BoatRide">Boat Ride</option>
<option value="Camping">Camping</option>
<option value="ComedyClub">Comedy Club</option>
<option value="Concert">Concert</option>
<option value="CookingClassSession">Cooking Class Session</option>
<option value="CookingTogether">Cooking Together</option>
<option value="CoffeeShop">CoffeeShop</option>
<option value="DayTrip">Day Trip</option>
<option value="DigitalDetox">Digital Detox Night</option>
<option value="Dinner">Dinner</option>
<option value="EscapeRoom">Escape Room</option>
<option value="Exhibition">Exhibition</option>
<option value="FireplaceChill">Fireplace Chill</option>
<option value="ForestWalk">Forest Walk</option>
<option value="Game">Game</option>
<option value="GymSession">Gym Session</option>
<option value="HolidayMarkets">Holiday Markets</option>
<option value="HomeSpa">Home Spa</option>
<option value="HotStoneMassage">Hot Stone Massage at Home</option>
<option value="IceBathRecoverySession">Ice Bath Recovery Session</option>
<option value="IndoorMovieNight">Indoor Movie Night</option>
<option value="IndoorPhotoshoot">Indoor Photoshoot</option>
<option value="ManicureAndPedicureSession">Manicure & Pedicure Session</option>
<option value="MassageSession">Massage Session</option>
<option value="MeditationSession">Meditation Session</option>
<option value="MiniGolf">Mini Golf</option>
<option value="MovieNight">Movie Night</option>
<option value="MovieTheater">Movie Theater</option>
<option value="Museum">Museum</option>
<option value="MusicJam">Music Jam Session</option>
<option value="NatureWalk">Nature Walk</option>
<option value="NightClub">NightClub</option>
<option value="PajamaParty">Pajama Session</option>
<option value="Picnic">Picnic</option>
<option value="Potluck">Potluck Gathering</option>
<option value="Restaurant">Restaurant</option>
<option value="RooftopSession">Rooftop Session</option>
<option value="ScienceMuseum">Science Museum Visit</option>
<option value="SkiingSession">Skiing Session</option>
<option value="SnowboardingSession">Snowboarding Session</option>
<option value="SnowfallWatching">Watching the Snowfall</option>
<option value="SpaSession">Spa Session</option>
<option value="Sports">Sports</option>
<option value="TacoNight">Taco Night</option>
<option value="Theater">Theater</option>
<option value="Trip">Trip</option>
<option value="VintageShopping">Vintage Shopping</option>
<option value="VideoGameSession">Video Game Session</option>
<option value="WineTasting">Wine Tasting</option>
<option value="WinterSaunaSession">Winter Sauna Session</option>

        </select>
        <label htmlFor="dresscode">Dress Code <span style={{ color: 'red' }}>*</span></label>
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
