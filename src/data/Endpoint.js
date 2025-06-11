import axios from 'axios';

const BASE_URL = "https://dsa-sheet-page.onrender.com/api";
const TOKEN = localStorage.getItem('authToken');

export const ApiEndPoint = {

  post: async (formdata, end_points) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/${end_points}`,
        formdata,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },  

  get: async (end_points) => {
    try{
      const response = await axios.get(`${BASE_URL}/${end_points}`, {
        headers: {
          Authorization : `${TOKEN}`
        }
      })
    return response.data;
    }
    catch(err){
      console.log("Error In Fetching Transactions", err);
      throw err;
    }
  }
  
};
