import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from "react";
import {Component} from 'react';
import type {Node} from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import ImagePicker from 'react-native-image-crop-picker';

import {Learn_menu} from './Learn';
import {Competition_menu} from './Competition';
import {DrawerContent} from '../context/customDrawer';

const Drawer = createDrawerNavigator();

const Home_menu = () =>{
    return(
        <Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>}>
            <Drawer.Screen name="學習" component={Learn_menu} /> 
            <Drawer.Screen name="比賽" component={Competition_menu} /> 
        </Drawer.Navigator>
    );
}

export {Home_menu};