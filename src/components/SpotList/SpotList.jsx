import { Link } from "react-router-dom"
import styles from './SpotList.module.css'
import logo from '../../assets/images/logo.png'

const SpotList = (props) => {

  return (
    <main className={styles.container}>
      <section className={styles.header}>
      <h1>HotSpots </h1>
      </section>

      {props.spots.length === 0 ? (
        <p>There are no spots listed yet. Personalize your app by adding your favorite HotSpots now!</p>
      ) : (
        props.spots.map((spot) => (
          <Link key={spot._id} to={`/spots/${spot._id}`}>
            <article>
              <header>
                <h2><strong>{spot.spotName.toUpperCase()}</strong></h2>
                <p>
                  {spot.author.username} listed on{" "}
                  {new Date(spot.createdAt).toLocaleDateString()} 
                </p>
              </header>
            </article>
          </Link>
        ))
      )}
    </main>
  )
}

export default SpotList