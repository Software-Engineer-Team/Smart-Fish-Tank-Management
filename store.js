import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    ada_key: "",
    username: "",
  },
  reducers: {
    setUser(state, action) {
      console.log(state);
      state.name = action.payload.name;
      state.ada_key = action.payload.ada_key;
      state.username = action.payload.username;
    },
  },
});

export const { setUser } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
