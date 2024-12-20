// src/services/spotService.js

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/spots`

const index = async (userId) => {
    console.log('hello from spots index')
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },                   // The headers property is an object containing any headers that need to be sent along with the request. In this case, we are including an 'Authorization' header with a bearer token. This token is decoded by the verifyToken middleware function on our server, allowing us to indentify the logged in user, and ensuring that only a logged in user can access this functionality.
        })
        const data = await res.json() 
        //filter data by the user who is current logged in _id
        //const filterData = data.filter((datum) => datum.author._id === userId )
        
        //console.log({ userId, data, filterData })
        console.log({ userId, data })
        return data
    } catch (error) {
        console.log(error)
    }
}

const show = async (spotId) => {
    try {
        const res = await fetch(`${BASE_URL}/${spotId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },                   // The headers property is an object containing any headers that need to be sent along with the request. In this case, we are including an 'Authorization' header with a bearer token. This token is decoded by the verifyToken middleware function on our server, allowing us to indentify the logged in user, and ensuring that only a logged in user can access this functionality.
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const create = async (spotFormData) => {
    console.log("in create spot")
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(spotFormData),                                                        // Body: Converts the user object into a JSON string using JSON.stringify(user) to include it in the request body.
        })
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const createGuest = async (spotId, guestFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${spotId}/guests`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(guestFormData),                                                 // Body: Converts the user object into a JSON string using JSON.stringify(user) to include it in the request body. 
        })
        return res.json()
    } catch { error } {
        console.log(error)
    }
}

const deleteSpot = async (spotId) => {
    try {
        const res = await fetch(`${BASE_URL}/${spotId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

async function updateSpot(spotId, spotFormData) {
    try {
        const res = await fetch(`${BASE_URL}/${spotId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(spotFormData),
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const deleteGuest = async (spotId, guestId) => {
    try {
        const res = await fetch(`${BASE_URL}/${spotId}/guests/${guestId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log('Error deleting guest: ', error)
    }
}

const updateGuest = async (spotId, guestId, guestFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${spotId}/guests/${guestId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(guestFormData),
        })
        return res.json();
    } catch (error) {
        console.log('Error updating guest: ', error);
    }
}

const respondToInvitation = async (spotId, guestId, status) => {
    try {
        const res = await fetch(`${BASE_URL}/${spotId}/guests/${guestId}/respond`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};


export { index, show, create, createGuest, deleteSpot, updateSpot, deleteGuest, updateGuest, respondToInvitation }
