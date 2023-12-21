import axios from "axios";

export const signUpAPI = async (userData) => {
  console.log("userDAta", userData);
  try {
    const response = await axios.post(
      `http://localhost:8080/auth/signup`,
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
      `http://localhost:8080/auth/login`,
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
      `http://localhost:8080/auth/google/success`
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
    const res = await axios.post("http://localhost:8080/data/add", userData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getVenderDataAPI = async () => {
  try {
    const res = await axios.get("http://localhost:8080/data/get");
    return res.data;
  } catch (error) {
    throw error;
  }
};
