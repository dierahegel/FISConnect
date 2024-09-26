// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   FlatList,
//   Switch,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useSelector } from "@legendapp/state/react";
// import { preferenceState } from "@/services/AmpelaStates";
// import { COLORS, SIZES, FONT } from "@/constants";

// const NotificationSettings = () => {
//   const { theme } = useSelector(() => preferenceState.get());
//   const [selectedFrequency, setSelectedFrequency] = useState("quotidien");
//   const [selectedDays, setSelectedDays] = useState([]);
//   const [alarmTimes, setAlarmTimes] = useState([]);
//   const [newTime, setNewTime] = useState("");

//   const frequencyOptions = [
//     { label: "Quotidien", value: "quotidien" },
//     { label: "Hebdomadaire", value: "hebdomadaire" },
//     { label: "Chaque deux jours", value: "chaquedeuxjours" },
//     { label: "Chaque trois jours", value: "chaquetroisjours" },
//   ];

//   const daysOfWeek = [
//     { label: "Lundi", value: "monday" },
//     { label: "Mardi", value: "tuesday" },
//     { label: "Mercredi", value: "wednesday" },
//     { label: "Jeudi", value: "thursday" },
//     { label: "Vendredi", value: "friday" },
//     { label: "Samedi", value: "saturday" },
//     { label: "Dimanche", value: "sunday" },
//   ];

//   const handleDayToggle = (day) => {
//     if (selectedFrequency === "hebdomadaire") {
//       setSelectedDays([day]);
//     } else {
//       setSelectedDays((prevSelectedDays) =>
//         prevSelectedDays.includes(day)
//           ? prevSelectedDays.filter((d) => d !== day)
//           : [...prevSelectedDays, day]
//       );
//     }
//   };

//   const handleAddAlarm = () => {
//     if (newTime) {
//       setAlarmTimes((prevTimes) => [
//         ...prevTimes,
//         { time: newTime, days: selectedDays, isActive: true },
//       ]);
//       setNewTime("");
//     }
//   };

//   const toggleAlarm = (time) => {
//     setAlarmTimes((prevTimes) =>
//       prevTimes.map((alarm) =>
//         alarm.time === time ? { ...alarm, isActive: !alarm.isActive } : alarm
//       )
//     );
//   };

//   const renderDayItem = ({ item }) => {
//     const isSelected = selectedDays.includes(item.value);
//     const dayStyle = {
//       backgroundColor: isSelected
//         ? theme === "pink"
//           ? COLORS.accent600
//           : COLORS.accent800
//         : COLORS.neutral100,
//       color: isSelected ? COLORS.white : COLORS.black,
//       padding: SIZES.small,
//       borderRadius: SIZES.small,
//       textAlign: "center",
//       marginHorizontal: SIZES.small,
//       ...FONT.medium,
//     };
//     return (
//       <TouchableOpacity
//         onPress={() => handleDayToggle(item.value)}
//         style={{ marginVertical: SIZES.small }}
//       >
//         <Text style={dayStyle}>{item.label}</Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderAlarmItem = ({ item }) => (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginVertical: 10,
//       }}
//     >
//       <View>
//         <Text style={{ fontSize: 24, color: "white" }}>{item.time}</Text>
//         <Text style={{ fontSize: 14, color: "gray" }}>
//           {item.days.length ? item.days.join(" ") : "Pas de jours spécifiés"}
//         </Text>
//       </View>
//       <Switch
//         value={item.isActive}
//         onValueChange={() => toggleAlarm(item.time)}
//         thumbColor={item.isActive ? "#0f0" : "#f00"}
//       />
//     </View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg100 }}>
//       <ScrollView contentContainerStyle={{ padding: SIZES.medium }}>
//         <Text
//           style={[
//             FONT.large,
//             { textAlign: "center", marginBottom: SIZES.large },
//           ]}
//         >
//           Paramètres de Notification
//         </Text>

//         <Text style={[FONT.medium, { marginBottom: SIZES.small }]}>
//           Périodicité
//         </Text>
//         <FlatList
//           data={frequencyOptions}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() => setSelectedFrequency(item.value)}
//               style={{
//                 backgroundColor:
//                   item.value === selectedFrequency
//                     ? theme === "pink"
//                       ? COLORS.accent600
//                       : COLORS.accent800
//                     : COLORS.neutral100,
//                 padding: SIZES.medium,
//                 borderRadius: SIZES.small,
//                 marginBottom: SIZES.medium,
//               }}
//             >
//               <Text
//                 style={{
//                   color:
//                     item.value === selectedFrequency
//                       ? COLORS.white
//                       : COLORS.black,
//                   ...FONT.medium,
//                   textAlign: "center",
//                 }}
//               >
//                 {item.label}
//               </Text>
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item) => item.value}
//           scrollEnabled={false}
//         />

//         {selectedFrequency !== "quotidien" && (
//           <View>
//             <Text style={[FONT.medium, { marginBottom: SIZES.small }]}>
//               Jours de notification
//             </Text>
//             <FlatList
//               data={daysOfWeek}
//               renderItem={renderDayItem}
//               keyExtractor={(item) => item.value}
//               scrollEnabled={false}
//               contentContainerStyle={{ justifyContent: "space-between" }}
//               numColumns={4}
//             />
//           </View>
//         )}

//         <Text style={[FONT.medium, { marginBottom: SIZES.small }]}>
//           Heure de notification
//         </Text>
//         <TextInput
//           style={{
//             borderWidth: 1,
//             borderColor: COLORS.neutral300,
//             padding: SIZES.medium,
//             borderRadius: SIZES.small,
//             marginBottom: SIZES.medium,
//             ...FONT.medium,
//           }}
//           keyboardType="number-pad"
//           placeholder="Heure (hh:mm)"
//           value={newTime}
//           onChangeText={setNewTime}
//         />
//         <Button
//           title="Ajouter l'alarme"
//           onPress={handleAddAlarm}
//           color={theme === "pink" ? COLORS.accent600 : COLORS.accent800}
//         />

//         <View style={{ marginTop: SIZES.medium }}>
//           <Text style={[FONT.medium, { marginBottom: SIZES.small }]}>
//             Liste des Alarmes
//           </Text>
//           <FlatList
//             data={alarmTimes}
//             renderItem={renderAlarmItem}
//             keyExtractor={(item) => item.time}
//             contentContainerStyle={{ padding: SIZES.small }}
//             scrollEnabled={false}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default NotificationSettings;
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 1, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function BackgroundFetchScreen() {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  React.useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text>
          Background fetch status:{' '}
          <Text style={styles.boldText}>
            {status && BackgroundFetch.BackgroundFetchStatus[status]}
          </Text>
        </Text>
        <Text>
          Background fetch task name:{' '}
          <Text style={styles.boldText}>
            {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
          </Text>
        </Text>
      </View>
      <View style={styles.textContainer}></View>
      <Button
        title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
        onPress={toggleFetchTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    margin: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
