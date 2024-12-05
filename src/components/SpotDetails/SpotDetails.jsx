// src/components/SpotDetails/SpotDetails.jsx

import { useState, useEffect, useContext } from "react"
import * as spotService from '../../services/spotService'
                                                                       // This imports the useParams hook from react-router-dom. The useParams hook allows you to access the dynamic portions of the URL, known as route parameters. When your app uses routes like /spots/:spotId, the spotId part of the URL is dynamic and changes depending on the spot. useParams makes it easy to extract that dynamic value so you can use it within your component.
import GuestForm from "../GuestForm/GuestForm";
import { AuthedUserContext } from '../../App';                        // This makes the logged in user object easily accessible throughout our component tree.
import { useParams, useNavigate, Link } from "react-router-dom";

const SpotDetails = (props) => {
    const [spot, setSpot] = useState(null)
    const user = useContext(AuthedUserContext);
    //console.log('User CONTEXT:', user);

    const { spotId } = useParams();                                    // Extracts the spotId parameter from the URL. If your route is /spots/:spotId, the value of :spotId in the URL will be assigned to the spotId variable.
    // //console.log('spotId is: ', spotId)

    useEffect(() => {                                                  // The useEffect hook in React runs a piece of code after the component renders. It allows you to perform side effects, such as fetching data or interacting with APIs. The useEffect will re-run only if the hootId value changes. If the hootId remains the same, the effect will not re-run. (Dependency Array([spotId]))
        const fetchSpot = async () => {
            const spotData = await spotService.show(spotId)
            //console.log('spotData is: ', spotData)
            setSpot(spotData)
        }
        fetchSpot()
    }, [spotId])                                                        // Remember to include spotId in the dependency array of your useEffect(). This tells the useEffect() to fire off whenever the value of the spotId changes.
    //console.log('spot state is: ', spot)

const handleAddGuest = async (guestFormData) => {
    //console.log('guestFormData is: ', guestFormData)
    const newGuest = await spotService.createGuest(spotId, guestFormData)
    setSpot({ ...spot, guests: [...spot.guests, newGuest] })
}

const handleDeleteGuest = async (guestId) => {
    console.log('delete guest function is working and the guestId is:', guestId);
    const deletedGuest = await spotService.deleteGuest(spotId, guestId)
    console.log('deletedGuest is: ', deletedGuest)
    setSpot({
        ...spot,
        guests: spot.guests.filter((guest) => guest._id !== guestId),
    })
  };

const handleResponse = async (guestId, status) => {
    const updatedGuest = await spotService.respondToInvitation(spotId, guestId, status);
    setSpot({
        ...spot,
        guests: spot.guests.map((guest) =>
            guest._id === guestId ? { ...guest, status } : guest
        ),
    });
};


if (!spot) return <main>Loading...</main>
return (
        <main> 
            <header>
                <p>{spot.category.toUpperCase()}</p>
                <h1>{spot.spotName.toUpperCase()}</h1>
                <p> <strong> 
                    {spot.author?.username || 'Unknown'}</strong> created on {' '}
                    {new Date(spot.createdAt).toLocaleDateString()} at {' '}
                    {new Date(spot.createdAt).toLocaleTimeString()}
                </p>
                <p><strong>Address:</strong> {spot.address}</p>
                <p><strong>Category:</strong> {spot.category}</p>
                <p><strong>Dresscode:</strong> {spot.dresscode}</p>
                {/* <h3>Author: {spot.author.username}</h3>
                <h3>Guests: {spot.guests._guestId}</h3> */}
           
           {spot.author._id === user._id && (
            <>
              <Link to={`/spots/${spotId}/edit`}>Edit</Link>
              <button onClick={() => props.handleDeleteSpot(spotId)}>Delete</button>
            </>
          )}
            </header>
            <section>

                <h1>Guests, guest Form</h1>
                <GuestForm handleAddGuest={handleAddGuest}/>

                <h1>Guests</h1>
                {!spot.guests?.length && <p>There are no guests.</p>}
                {spot.guests.map((guest) => (
                    <article key={guest._id}> 
                        <header>
                            <p>
                            <strong>{guest.author.username.toUpperCase()}</strong> posted on {' '}            
                            {new Date(spot.createdAt).toLocaleDateString()} at {' '}
                            {new Date(spot.createdAt).toLocaleTimeString()}
                            </p>
                            <p><strong>{guest.name}</strong> ({guest.email})</p>
                            <p><strong>Hosted by:</strong>{" "}{guest.author.username || "Unknown"}</p>
                            <p><strong>Status:</strong> {guest.status}</p>
                            <p><strong>Date:</strong>{" "}{guest.date ? new Date(guest.date).toLocaleDateString() : "N/A"}{" "}at {guest.time || "N/A"}</p>
                            <p><strong>Message:</strong> {guest.message || "No message provided"}</p>
                            <p><strong>Image:</strong>ADD IMAGE</p>
                            

                           {guest.author._id === user._id && (
                            <>

                            <Link to={`/spots/${spotId}/guests/${guest._id}/edit`}>Edit</Link>
                            <button onClick={()=> handleDeleteGuest(guest._id)}>delete Guest</button>
                            </>
                        )}
                        
                        </header>
                    </article>
                ))}
            </section>
        </main>
    )
}

//Ensures that if spot.author or user is null or undefined, it won’t throw an error. Instead, it will safely return undefined. {guest.author?.username || 'Unknown' }

export default SpotDetails

// <button onClick={() => props.handleDeleteGuest(guest._id)}>REMOVE GUEST</button>