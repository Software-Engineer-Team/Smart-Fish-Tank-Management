import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store";
import SmartFishTank from "./navigation/SmartFishTank";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SmartFishTank />
      </Provider>
    </NavigationContainer>
  );
}
