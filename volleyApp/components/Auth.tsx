import 'react-native-gesture-handler';
import React from "react";
import {Component} from 'react';
import type {Node} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {LoginScreen} from './Login';
import {RegisterScreen} from './Register';


const Stack= createStackNavigator();

const Auth_menu = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>        
    );
}

export {Auth_menu}
