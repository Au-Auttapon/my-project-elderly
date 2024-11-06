import Axios from "axios";

// Define the base URL
const url = "http://localhost:3001";

const Medicine = {
  get: async (search = null) => {
    try {
      const urlWithParams = search
        ? `${url}/medicines?search=${search}`
        : `${url}/medicines`;
      const res = await Axios.get(urlWithParams);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getById: async (medicId = null) => {
    try {
      const urlWithParams = medicId
        ? `${url}/medicines/${medicId}`
        : `${url}/medicines`;
      const res = await Axios.get(urlWithParams);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  create: async (body) => {
    try {
      await Axios.post(`${url}/medicines/create`, body);
    } catch (error) {
      console.error(error); // Log the error
      throw error; // Rethrow the error if you want to handle it later
    }
  },

  update: async (body) => {
    try {
      await Axios.patch(`${url}/medicines/update/${body.medicId}`, {
        medicName: body.medicName,
        medicType: body.medicType,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  delete: async (medicId) => {
    try {
      await Axios.delete(`${url}/medicines/${medicId}`, {});
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default Medicine;
