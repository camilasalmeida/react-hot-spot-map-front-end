// src/services/authService.js

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;                  // This is our Express API url.
console.log('Backend URL:', BACKEND_URL);

const signup = async (formData) => {                                           // Accepst formData as a parameter, formData is an object containing the user's signup details(username, email and password).
    try {
        const res = await fetch(`${BACKEND_URL}/users/signup`, {               // API Request with Fetch.
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },                  // This line indicates the request body contains JSON data.
            body: JSON.stringify(formData),                                   // JSON.stringify(formData) converts the formData object into a JSON string suitable for the request body.
        })
        const json = await res.json()                                         // When you make a request using fetch, the response (res) contains the data returned by the server. However, this data is not directly usable—it’s usually in a raw format, such as JSON, text, or binary. The .json() method converts the raw response into a JavaScript object (or array), making it easier to work with.
        if (json.error) {
            throw new Error(json.error)
        }
        if (json.token) {                                                       // json.token: Checks if the server response includes a token property (the JWT).
            localStorage.setItem('token', json.token)   
        }
            return json
    } catch (error) {
        console.log(error)
        throw error
    }
}

const signin = async (user) => {                                              // The signin function sends a login request to the backend API and processes the server’s response. If successful, it extracts the user details from the returned JWT token and returns them. If there’s an error, it handles it appropriately.
    try {                                                                     // Defines an asynchronous function that takes a user object as its argument. The user object contains the credentials (username, email, password) provided by the user during login.
      const res = await fetch(`${BACKEND_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },                     // Headers: Sets the Content-Type to application/json to indicate the type of data being sent.
        body: JSON.stringify(user),                                          // Body: Converts the user object into a JSON string using JSON.stringify(user) to include it in the request body.
      })
      const json = await res.json()                                           // res.json(): Extracts the JSON data from the API response (res). Waits for the JSON parsing to complete, then stores the result in the json variable.
        if (json.error) {
      throw new Error(json.error)
    }
      if (json.token) {                                                       // json.token: Checks if the server response includes a token property (the JWT).
        localStorage.setItem('token', json.token)                             // localStorage is a built-in browser storage mechanism that allows you to store data persistently across browser sessions. Unlike sessionStorage, which clears data when the browser tab is closed, localStorage retains data even when the browser is closed and reopened. setItem is a method of localStorage that stores a key-value pair. key: The name of the item you want to store. In this case, "token" is the key. value: The data you want to store. Here, json.token is the value being saved. It’s the JWT (JSON Web Token) returned from your backend upon successful login.
        const user = JSON.parse(atob(json.token.split('.')[1]));              // Extracts user details from token. son.token.split('.')[1]: Splits the JWT into its three parts (header, payload, signature) and extracts the second part (payload). atob(...): Decodes the Base64-encoded payload into a readable string. JSON.parse(...): Converts the decoded JSON string into a JavaScript object (the user details).
        return user
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export { signup, signin, }