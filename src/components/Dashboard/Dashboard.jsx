// src/components/Dashboard.jsx
//import Footer from './Footer'; // Adjust the path as per your folder structure

const Dashboard = ({ user }) => {

    return (
        <main>
            <h1>Welcome, {user.username}</h1>
            <p>
            This is the dashboard page where you, and only you, can see a list
            of all of your secrets Spots. 🗝️
            </p>


           {/* <Footer /> */}
        </main>
    )
}


export default Dashboard