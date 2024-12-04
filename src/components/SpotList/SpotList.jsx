// src/components/SpotList/SpotList.jsx

import { Link } from "react-router-dom";

const SpotList = (props) => {
  //console.log('props have been passed ✅', props.spots)

  return (
    <main>
      {props.spots.map((spot) => (
        <Link key={spot._id} to={`/spots/${spot._id}`}>
          <article>
            <header>
              <h2><strong>{spot.spotName.toUpperCase()}</strong></h2>
              <p>
                {spot.author.username} listed on{" "}
                {new Date(spot.createdAt).toLocaleDateString()} at{" "}
                {new Date(spot.createdAt).toLocaleTimeString()}
              </p>
            </header>
            <p></p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default SpotList;
