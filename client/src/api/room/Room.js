import Axios from 'axios';

// Define the base URL
const url = 'http://localhost:3001';

const Room = {
    get: async () => {
        try {
            const res = await Axios.get(`${url}/rooms`); // Use await to get the response
            console.log("res", res.data); // Log the data
            return res.data; // Return the data
        } catch (error) {
            console.error(error); // Log the error
            throw error; // Rethrow the error if you want to handle it later
        }
    }
};

export default Room; // Export the Room object
