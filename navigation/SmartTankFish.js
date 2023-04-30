import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Dashboard,
  Settings,
  LightSettings,
  Temperature,
  Reminder,
  CreateReminder,
  Login,
  Register,
  Statistics,
  TemperatureSettings,
  Feeding,
  FeedingSetting,
} from "../screens";

export default function SmartFishTank() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="Temperature" component={Temperature} />
      <Stack.Screen name="Light-Settings" component={LightSettings} />
      <Stack.Screen name="Reminder" component={Reminder} />
      <Stack.Screen name="Create-reminder" component={CreateReminder} />
      <Stack.Screen name="Feeding-Setting" component={FeedingSetting} />
      <Stack.Screen name="Feeding" component={Feeding} />
      <Stack.Screen
        name="Temperature-Settings"
        component={TemperatureSettings}
      />
    </Stack.Navigator>
  );
}
