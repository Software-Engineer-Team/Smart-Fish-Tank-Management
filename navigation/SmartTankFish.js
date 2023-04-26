import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Dashboard,
  Settings,
  LightSettings,
  Temperature,
  Reminder,
  Create_reminder,
  Login,
  Register,
  Statistics,
} from "../screens";

export default function SmartFishTank() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Login" component={Login} /> */}
      {/* <Stack.Screen name="Register" component={Register} /> */}
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="Temperature" component={Temperature} />
      <Stack.Screen name="Light-Settings" component={LightSettings} />
      <Stack.Screen name="Reminder" component={Reminder} />
      <Stack.Screen name="Create-reminder" component={Create_reminder} />
    </Stack.Navigator>
  );
}
