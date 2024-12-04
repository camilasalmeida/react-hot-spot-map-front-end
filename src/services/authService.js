// src/services/authService.js

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;               // This is our Express API url.
console.log('Backend URL:', BACKEND_URL);

const signup = async (formData) => {                                         // Accepst formData as a parameter, formData is an object containing the user's signup details(username, email and password).
    try {
        const res = await fetch(`${BACKEND_URL}/users/signup`, {             // API Request with Fetch.
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },                 // This line indicates the request body contains JSON data.
            body: JSON.stringify(formData),                                 // JSON.stringify(formData) converts the formData object into a JSON string suitable for the request body.
        })
        const json = await res.json()                                       // When you make a request using fetch, the response (res) contains the data returned by the server. However, this data is not directly usable—it’s usually in a raw format, such as JSON, text, or binary. The .json() method converts the raw response into a JavaScript object (or array), making it easier to work with.
        if (json.error) {
            throw new Error(json.error)
        }
        return json
    } catch (error) {
        console.log(error)
        throw error
    }
}





export { signup, }