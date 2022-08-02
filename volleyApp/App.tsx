global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest

import 'react-native-gesture-handler';
import 'react-native-reanimated';

import React from "react";
import {Component} from 'react';
import { useState, useEffect } from 'react';
import type {Node} from 'react';
import {LogBox, View, Text } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {AuthContext} from './context/AuthContext';
import {AuthProvider} from './context/AuthContext';
import {Auth_menu} from './components/Auth';
import {Home_menu} from './components/Home';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(AuthContext);
  const onAuthStateChanged =(user)=>{
    setUser(user);
    if (initializing)setInitializing(false);
  }

  useEffect(()=>{
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);
  if (initializing) return null;
  return (
    <AuthProvider>
      <NavigationContainer>
        {user? <Home_menu/> : <Auth_menu/>}
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;