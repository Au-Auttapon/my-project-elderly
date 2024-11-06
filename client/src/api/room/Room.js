import Axios from "axios";

// Define the base URL
const url = "http://localhost:3001";

const Room = {
  get: async (search = null) => {
    try {
      const urlWithParams = search
        ? `${url}/rooms?search=${search}`
        : `${url}/rooms`;
      const res = await Axios.get(urlWithParams);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getById: async (roomId = null) => {
    try {
      const urlWithParams = roomId
        ? `${url}/rooms/edit/${roomId}`
        : `${url}/rooms`;
      const res = await Axios.get(urlWithParams);
      return res.data;
    } catch (error) {
      console.error("Error fetching room data:", error);
      throw error;
    }
  },

  create: async (body) => {
    try {
      await Axios.post(`${url}/rooms/create`, body);
    } catch (error) {
      console.error(error); // Log the error
      throw error; // Rethrow the error if you want to handle it later
    }
  },
};

export default Room; // Export the Room object
