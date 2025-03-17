import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://16.171.241.113/api/users";

// ✅ Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// ✅ Get user by ID
export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

// ✅ Create a new user
export const createUser = createAsyncThunk("users/createUser", async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
});

// ✅ Update user
export const updateUser = createAsyncThunk("users/updateUser", async ({ id, userData }) => {
  try {
    console.log("Sending update request:", { id, userData });
    const response = await axios.put(`${API_URL}/${id}`, userData);
    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error.response ? error.response.data : error.message);
    throw error;
  }
});

// ✅ Delete user
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => { state.user = action.payload; })
      .addCase(createUser.fulfilled, (state, action) => { state.users.push(action.payload); })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
