import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import {
  signUpAPI,
  loginAPI,
  googleAPI,
  addDataAPI,
  getVenderDataAPI,
} from "../API/api";

const initialState = {
  user: JSON.parse(localStorage.getItem("userData")) || {},
  gUser: JSON.parse(localStorage.getItem("gUserData")) || {},
  token: "",
  vendorAddRes: {},
  vendorData: JSON.parse(localStorage.getItem("vendorData")) || [],
  status: "idle",
  error: {},
  responseCode: "",
};

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await signUpAPI(userData);
      // console.log("from slice", res);
      return res;
    } catch (error) {
      return error;
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await loginAPI(userData);
      // console.log("from slice", res);
      return res;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }
);

export const getGoogleUser = createAsyncThunk("auth/googleUser", async () => {
  try {
    const res = await googleAPI();
    console.log("from googleAPI slice", res);
    return res;
  } catch (error) {
    return error;
  }
});

export const addVendorData = createAsyncThunk(
  "addVendor/data-save",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await addDataAPI(userData);
      console.log("from slice", res);
      return res;
    } catch (error) {
      return rejectWithValue(error.res);
    }
  }
);
export const getVendorData = createAsyncThunk("client/get-data", async () => {
  try {
    const res = await getVenderDataAPI();
    return res;
  } catch (error) {
    return error;
  }
});

const userSlice = createSlice({
  name: "userBase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.status = "error";
      state.user = action.payload;
      state.error = action.payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
      state.user.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("userData", JSON.stringify(action.payload));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "error";
      state.user = action.payload;
      state.error = action.payload;
      console.log("error code", action.payload);
    });
    builder.addCase(getGoogleUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getGoogleUser.fulfilled, (state, action) => {
      state.status = "success";
      state.gUser = action.payload;
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("gUserData", JSON.stringify(action.payload));
    });
    builder.addCase(getGoogleUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      console.log("error code", action.payload);
    });
    builder.addCase(addVendorData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addVendorData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.vendorAddRes = action.payload;
      console.log(action.payload);
    });
    builder.addCase(addVendorData.rejected, (state, action) => {
      state.status = "failed";

      state.error = action.payload;
    });
    builder.addCase(getVendorData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getVendorData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.vendorData = action.payload;
      localStorage.setItem("vendorData", JSON.stringify(action.payload));
    });
    builder.addCase(getVendorData.rejected, (state) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
