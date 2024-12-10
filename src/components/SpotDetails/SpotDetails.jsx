
import { useState, useEffect, useContext } from "react"
import * as spotService from '../../services/spotService'
import GuestForm from "../GuestForm/GuestForm";
import { AuthedUserContext } from '../../App';                       
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from './SpotDetails.module.css'

const SpotDetails = (props) => {
    const [spot, setSpot] = useState(null)
    const user = useContext(AuthedUserContext);

    const { spotId } = useParams();                           

    useEffect(() => {                                                  
        const fetchSpot = async () => {
            const spotData = await spotService.show(spotId)
            setSpot(spotData)
        }
        fetchSpot()
    }, [spotId])                                                        

const handleAddGuest = async (guestFormData) => {
    const newGuest = await spotService.createGuest(spotId, guestFormData)
    setSpot({ ...spot, guests: [...spot.guests, newGuest] })
}

const handleDeleteGuest = async (guestId) => {
    const deletedGuest = await spotService.deleteGuest(spotId, guestId)
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
    })
}

if (!spot) return <main>Loading...</main>
return (
    
        <main className={styles.container}> 
            <header className={styles.headerSection}>
                <article className={styles.card}>
                            <h1>{spot.spotName.toUpperCase()}</h1>
                            <p> <strong> 
                                    {spot.author?.username || 'Unknown'}</strong> created on {' '}
                                    {new Date(spot.createdAt).toLocaleDateString()} at {' '}
                                    {new Date(spot.createdAt).toLocaleTimeString()}
                                </p>
                            <p><strong>Address:</strong> {spot.address}</p>
                            <p><strong>Category:</strong> {spot.category}</p>
                            <p><strong>Dresscode:</strong> {spot.dresscode}</p>
                            {spot.author._id === user._id && (
                                <> 
                        <div className={styles.buttonContainer}>             
                            <Link to={`/spots/${spotId}/edit`} 
                            style={{
                                display: 'inline-block',
                                padding: '10px 20px',
                                color: '#fff',
                                backgroundColor: '#007bff',
                                textDecoration: 'none',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '16px',
                                textAlign: 'center',   
                            }}
                            >Edit</Link>
                            <button onClick={() => props.handleDeleteSpot(spotId)}>Delete</button>
                        </div>      
                                </>     
                    )}
                </article>
            </header>










            
            <section>
                <h1>Guest Form</h1>
                <GuestForm handleAddGuest={handleAddGuest}/>

                <h1>GUEST LIST:</h1>
                {!spot.guests?.length && <p>There are no guests.</p>}
                {spot.guests.map((guest) => (
                    <article key={guest._id}> 
                        <header>
                            <p>
                            <strong>{guest.author.username}</strong> posted on {' '}            
                            {new Date(spot.createdAt).toLocaleDateString()} at {' '}
                            {new Date(spot.createdAt).toLocaleTimeString()}
                            </p>
                            <p><strong>{guest.name.toUpperCase()}</strong> ({guest.email})</p>
                            <p><strong>Hosted by:</strong>{" "}{guest.author.username || "Unknown"}</p>
                            <p><strong>Status:</strong> {guest.status}</p>
                            <p><strong>Date:</strong>{" "}{guest.date ? new Date(guest.date).toLocaleDateString() : "N/A"}{" "}at {guest.time || "N/A"}</p>
                            <p><strong>Message:</strong> {guest.message || "No message provided"}</p>
                            <p><strong>Image:</strong>ADD IMAGE</p>
                            

                           {guest.author._id === user._id && (
                            <>

                            <Link to={`/spots/${spotId}/guests/${guest._id}/edit`}>Edit</Link>
                            <button onClick={()=> handleDeleteGuest(guest._id)}>Delete Guest</button>
                            </>
                        )}
                        
                        </header>
                    </article>
                ))}
            </section>
        </main>
    )
}


export default SpotDetails

