import Axios from "axios";

// Define the base URL
const url = "http://localhost:3001";

const Room = {
  get: async (roomId = null) => {
    try {
      const urlWithParams = roomId
        ? `${url}/rooms?roomId=${roomId}`
        : `${url}/rooms`;
      const res = await Axios.get(urlWithParams); // Use await to get the response
      return res.data; // Return the data
    } catch (error) {
      console.error(error); // Log the error
      throw error; // Rethrow the error if you want to handle it later
    }
  },

  create: async (body) => {
    try {
      await Axios.post(`${url}/rooms/create`, {
        roomId: body.roomId,
        roomType: body.roomType,
        roomGender: body.roomGender,
        roomPrice: body.roomPrice,
        bedQuantity: body.bedQuantity,
        bedId: body.bedId,
        bedStatus: body.bedStatus,
        roomStatus: body.roomStatus,
      });
    } catch (error) {
      console.error(error); // Log the error
      throw error; // Rethrow the error if you want to handle it later
    }
  },
};

export default Room; // Export the Room object
