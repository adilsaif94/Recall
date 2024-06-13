import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SignUp from '../Screen/LoginSignup/SignUp'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../Screen/LoginSignup/Login';
import Welcome from '../Screen/Welcome';
import Home from '../Screen/Home';

const Stack = createNativeStackNavigator();




const Navigators = () => {
  return (


    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      
    </Stack.Navigator>


  );
};


export default Navigators

