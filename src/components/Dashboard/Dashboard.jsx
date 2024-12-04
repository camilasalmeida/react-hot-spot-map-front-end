// src/components/Dashboard.jsx

const Dashboard = ({ user }) => {

    return (
        <main>
            <h1>Welcome, {user.username}</h1>
            <p>
            This is the dashboard page where you, and only you, can see a list
            of all of your secrets Spots. 🗝️
            </p>
        </main>
    )
}


export default Dashboard