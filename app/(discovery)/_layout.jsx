import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="username" />
      <Stack.Screen name="lastMenstrualCycleStart" />
      <Stack.Screen name="questionsSeries" />
      <Stack.Screen name="confidentiality" />
      <Stack.Screen name="login" />
      <Stack.Screen name="selectlanguage" />
    </Stack>
  );
};

export default _layout;
