import React, { useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator, useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";
import { BlurView } from "expo-blur";

import { screens } from "../helpers/consts";
import axios from "axios";
import { setCategories } from "../store/slices/screenSlice";
import { useDispatch } from "react-redux";

const Tab = createBottomTabNavigator();
const screensValues = Object.values(screens);

const ScreensContainer = () => {
   const theme = {
      ...DefaultTheme,
      colors: {
         ...DefaultTheme.colors,
         background: "#fff", // f4f6f8
      },
   };

   const backURL = "https://79b4-31-162-87-187.ngrok-free.app";
   const dispatch = useDispatch();

   useEffect(() => {
      axios
         .get(`${backURL}/calc/cat_list`)
         .then(({ data }) => {
            dispatch(setCategories(data.categories));
         })
         .catch(() => alert("Ошибка БД"));
   }, []);

   return (
      <NavigationContainer theme={theme}>
         <Tab.Navigator
            initialRouteName={screens.BestCategories.title}
            screenOptions={({ route }) => {
               return {
                  tabBarActiveTintColor: "#1677ff",
                  tabBarIcon: ({ focused, color, size }) => {
                     const routeName = route.name;
                     const screen =
                        screens[
                           Object.keys(screens).find(
                              (screen) => screens[screen].title === routeName,
                           )
                        ];
                     const iconName = focused ? screen.icon : screen.iconOutline;

                     return <IonIcons name={iconName} size={size} color={color} />;
                  },
               };
            }}>
            {screensValues.map((screen) => (
               <Tab.Screen
                  name={screen.title}
                  component={screen.component}
                  options={{ headerTitle: screen.headerTitle }}
               />
            ))}
         </Tab.Navigator>
      </NavigationContainer>
   );
};

export default ScreensContainer;

// screenOptions={({ route }) => ({
//    tabBarIcon: ({ focused, color, size }) => {
//       const routeName = route.name;
//       const screen =
//          screens[
//             Object.keys(screens).find((screen) => screens[screen].title === routeName)
//          ];
//       const iconName = focused ? screen.icon : screen.iconOutline;

//       return <IonIcons name={iconName} size={size} color={color} />;
//    },
// })}
