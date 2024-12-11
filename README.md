 


![Screenshot 2024-12-11 at 5 42 39 AM (2)](https://github.com/user-attachments/assets/0e1bbf44-aa85-417a-b60b-582812db2de8)

# HotSpotMap App 
 
The **HotSpotMap App** is a full-stack system engineered to optimize the organization, management, and sharing of user-defined locations.

### Backend Overview
The backend features a robust architecture designed for optimal scalability and data integrity. Leveraging MongoDB for schema-defined persistent storage, it supports CRUD operations for spot metadata and guest associations. JWT-based authentication ensures stateless session management across API endpoints. Additionally, Nodemailer dynamically constructs and dispatches personalized email invitations, embedding relevant details such as spot attributes, event schedules, and guest-specific parameters.

### Frontend Overview


The frontend, developed with React, delivers a dynamic and intuitive interface that ensures seamless interaction with backend services. It includes:

- **React**: Manages client-side routing, enabling smooth transitions between views for enhanced user navigation.
- **React Router**: Manages client-side routing for dynamic navigation.
- **CSS Modules**: Enables scoped styling for consistent and maintainable UI design.
- **State Management**: Utilizes React’s `useState` and `useEffect` hooks  to handle local state and component lifecycles effectively.
- **JWT-based Authentication:** Integrates secure authentication flows to protect user interactions.

The frontend prioritizes UI/UX with a responsive, intuitive design for a seamless user experience across devices.

### Link to the planning materials: 
[Click here](https://trello.com/b/OYk9rDC0/hotspotsmap-app)


### Deployment Links

- **Deployed Backend:**  
  [HotSpot Backend](https://hotspottest-d5803b1c8bd9.herokuapp.com/)

- **Deployed Frontend:**  
  [HotSpot Frontend](https://hotspottestfrontend-8619e223172f.herokuapp.com/)

### Code Repositories

- **BackEnd Repository:**  
https://github.com/camilasalmeida/express-api-hot-spot-map-back-end

### Stretch Goals

#### Email-Related Enhancements:
- Implement interactive email actions with buttons for Accept, Reject, or Maybe options, allowing the guest to easily respond.
- Integrate real-time response tracking to provide the user with instant feedback when a guest responds to the invitation.
- Allow guests to submit their responses along with optional comments when accepting or rejecting the invitation.
- Add support for image attachments in email invitations, dynamically including media content (images or GIFs) to enhance personalization, potentially using file storage services like Amazon S3.

#### Map-Related Features:
- Integrate an interactive map feature using a mapping API (Such as Google Maps, Mapbox, GeoApi) to display the user’s current location and provide turn-by-turn directions to selected spots.
- Implement address auto-completion by integrating a geolocation API (Such as Google Places API) to assist users in filling out the address field dynamically.
- Add search functionality for spots on the map, enabling users to query spots by name, leveraging geospatial queries or indexed search capabilities in the backend.
- Enable proximity-based search for nearby spots, using the user’s GPS coordinates and radius-based queries to display relevant results on the map.
- Integrate a mini-map feature within the spot detail page for quick visual reference, making use of embedded map widgets for better usability.

#### General App Enhancements:
- Implement a custom email domain for the app’s email communications.
- Register the app with relevant platforms (Such as App Store, Google Play) and legal entities for intellectual property protection, ensuring the app’s branding is officially recognized and protected.
- Develop a full branding strategy, including the design and implementation of a logo, color scheme, and app-wide visual elements, ensuring a cohesive user experience across all platforms.
- Add a background video on the landing page for a dynamic and engaging user experience.
- Add a button to quickly add guests under the first guest entry, streamlining the process.
- For better spot management, implement a categorization system where spots are organized into predefined categories (Amusement Park, Restaurant) and tagged with activities (Picnic, Hiking) to enable efficient filtering and management.
- Provide users with the ability to filter spots based on selected categories or activity types, integrating advanced query mechanisms in the backend for optimized performance.


