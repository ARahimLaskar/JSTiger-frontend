import axios from "axios";

export const signUpAPI = async (userData) => {
  console.log("userDAta", userData);
  try {
    const response = await axios.post(
      `https://jstiger-backend.onrender.com/auth/signup`,
      userData
    );
    console.log(" from signup api function", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const loginAPI = async (userData) => {
  try {
    const response = await axios.post(
      `https://jstiger-backend.onrender.com/auth/login`,
      userData
    );
    console.log(" from login api function", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleAPI = async () => {
  try {
    const response = await axios.get(
      `https://jstiger-backend.onrender.com/auth/google/success`
    );
    console.log(" from google api function", response.data);
    localStorage.setItem("gdata", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const addDataAPI = async (userData) => {
  try {
    const res = await axios.post(
      "https://jstiger-backend.onrender.com/data/add",
      userData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getVenderDataAPI = async () => {
  try {
    const res = await axios.get(
      "https://jstiger-backend.onrender.com/data/get"
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
