import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store";
import SmartTankFish from "./navigation/SmartTankFish";

navigator.__defineGetter__("userAgent", function () {
  // you have to import rect native first !!
  return "react-native";
});

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SmartTankFish />
      </Provider>
    </NavigationContainer>
  );
}
