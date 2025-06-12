import axios from 'axios';

const BASE_URL = "http://localhost:3200/api";
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
  },

  login: async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
  
};
