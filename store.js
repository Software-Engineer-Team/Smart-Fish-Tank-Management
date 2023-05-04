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

const logSlice = createSlice({
  name: "log",
  initialState: {
    temp1: 0,
    temp2: 0,
    moisture: 0,
    light: 0,
    lamp: 0,
    fan: 0,
    heat: 0,
  },
  reducers: {
    setLog(state, action) {
      state.temp1 = action.payload.temp1;
      state.temp2 = action.payload.temp2;
      state.moisture = action.payload.moisture;
      state.light = action.payload.light;
      state.lamp = action.payload.lamp;
      state.fan = action.payload.fan;
      state.heat = action.payload.heat;
    },
    setLight(state, action) {
      state.light = action.payload.light;
    },
  },
});

export const { setLog, setLight } = logSlice.actions;

const cmdSlice = createSlice({
  name: "cmd",
  initialState: {
    light_unit: 0,
    light_mode: 0,
    tempA: 0,
    tempB: 0,
    feedData: "", // hour.minute.level
  },
  reducers: {
    setCmd(state, action) {
      state.light_unit = action.payload.light_unit;
      state.light_mode = action.payload.light_mode;
      state.tempA = action.payload.tempA;
      state.tempB = action.payload.tempB;
      state.feedData = action.payload.feedData;
    },
    setLightUnit(state, action) {
      state.light_unit = action.payload.light_unit;
    },
    setLightMode(state, action) {
      state.light_mode = action.payload.light_mode;
    },
    setTempA(state, action) {
      state.tempA = action.payload.tempA;
    },
    setTempB(state, action) {
      state.tempB = action.payload.tempB;
    },
    setFeedData(state, action) {
      state.feedData = action.payload.feedData;
    },
  },
});

export const {
  setCmd,
  setLightUnit,
  setLightMode,
  setTempA,
  setTempB,
  setFeedData,
} = cmdSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cmd: cmdSlice.reducer,
    log: logSlice.reducer,
  },
});
