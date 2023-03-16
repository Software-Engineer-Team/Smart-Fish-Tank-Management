import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Dashboard, Settings, Temperature } from "../screens";
export default function SmartFishTank() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Temperature" component={Temperature} />
    </Stack.Navigator>
  );
}
