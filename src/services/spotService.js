// src/services/spotService.js

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/spots`

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },                   // The headers property is an object containing any headers that need to be sent along with the request. In this case, we are including an 'Authorization' header with a bearer token. This token is decoded by the verifyToken middleware function on our server, allowing us to indentify the logged in user, and ensuring that only a logged in user can access this functionality.
        })
        return res.json()
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
    } catch {error}{
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

async function update(spotId, spotFormData) {
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



export { index, show, create, createGuest, deleteSpot, update }
