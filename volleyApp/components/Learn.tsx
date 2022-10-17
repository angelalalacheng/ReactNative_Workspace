import 'react-native-gesture-handler';
import React from "react";
import {Component} from 'react';
import type {Node} from 'react';
import {LogBox} from "react-native";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import {Practice_menu} from './practice1';
import {Tactics_menu} from './tactics2';
import {Warmup_menu} from './warmup3';
import {Hurt_menu} from './hurt4';

const Tab = createBottomTabNavigator();

const Learn_menu = () =>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="練習" component={Practice_menu} options={{ headerShown: false, tabBarIcon: ({focused}) =>{return <Icon name="star" size={30} color={focused? '#1E90FF':'#A9A9A9'}/>;}}} />
            <Tab.Screen name="戰術" component={Tactics_menu} options={{ headerShown: false ,tabBarIcon: ({focused}) =>{return <Icon name="lightbulb" size={30} color={focused? '#1E90FF':'#A9A9A9'}/>;}}}/>
            <Tab.Screen name="熱身" component={Warmup_menu} options={{ headerShown: false ,tabBarIcon: ({focused}) =>{return <Icon name="human-handsup" size={30} color={focused? '#1E90FF':'#A9A9A9'}/>;}}}/>
            <Tab.Screen name="運動傷害" component={Hurt_menu} options={{ headerShown: false,tabBarIcon: ({focused}) =>{return <Icon name="stethoscope" size={30} color={focused? '#1E90FF':'#A9A9A9'}/>;} }}/>
        </Tab.Navigator>
    );
}

export {Learn_menu};