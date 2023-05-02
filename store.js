import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    ada_key: "",
    username: "",
    ObjectID: "",
  },
  reducers: {
    setUser(state, action) {
      state.ada_key = action.payload.ada_key;
      state.username = action.payload.username;
      state.ObjectID = action.payload.ObjectID;
    },
  },
});

export const { setUser } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
