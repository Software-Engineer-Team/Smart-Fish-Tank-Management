import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { Provider } from "react-redux";
// import { store } from "./store";
import SmartTankFish from "./navigation/SmartTankFish";

export default function App() {
  return (
    <NavigationContainer>
      {/* <Provider store={store}> */}
      <SmartTankFish />
      {/* </Provider> */}
    </NavigationContainer>
  );
}
