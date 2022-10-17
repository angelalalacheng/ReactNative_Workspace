import 'react-native-gesture-handler';
import React from "react";
import {Component} from 'react';
import type {Node} from 'react';
import {LogBox} from "react-native";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

import {Rule_menu} from './rule5';
import {Count_menu} from './count6';
import {Judge_menu} from './judge7';

const Competition_menu = () =>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="規則" component={Rule_menu} options={{ headerShown: false, tabBarIcon: ({focused}) =>{return <Icon name="newspaper-variant-multiple" size={30} color={focused? '#1E90FF':'#A9A9A9'}/>;}}} />
            <Tab.Screen name="計分" component={Count_menu} options={{ headerShown: false ,tabBarIcon: ({focused}) =>{return <Icon name="numeric-9-plus-box-outline" size={30} color={focused? '#1E90FF':'#A9A9A9'}/>;}}}/>
            <Tab.Screen name="裁判手勢" component={Judge_menu} options={{ headerShown: false ,tabBarIcon: ({focused}) =>{return <Icon name="thumb-up-outline" size={30} color={focused? '#1E90FF':'#A9A9A9'}/>;}}}/>
        </Tab.Navigator>
    );
}

export {Competition_menu};