import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Dashboard, Settings } from "../screens";
export default function SmartFishTank() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Dashboard} />
      <Stack.Screen name="Notifications" component={Settings} />
    </Stack.Navigator>
  );
}
