import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigators from './Navigator/Navigators';
const Stack = createNativeStackNavigator();
import { firebase } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBSvSslAz6WUVnzV-LLvSIDZrl_Xh5ycAI",
  authDomain: "recall-1bbe3.firebaseapp.com",
  databaseURL: "https://recall-1bbe3.firebaseio.com",
  projectId: "recall-1bbe3",
  storageBucket: "recall-1bbe3.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:723986091886:android:fa4fd719dbbd3ed6f2bb7f",
  measurementId: "YOUR_MEASUREMENT_ID"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const App = () => {
  return (
    
      <NavigationContainer>
          <Navigators/>
      </NavigationContainer>

  );
};
export default App

