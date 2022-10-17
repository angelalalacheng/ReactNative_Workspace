import React ,{useContext, Component}from "react";
import type {Node} from 'react';
import {View, StyleSheet} from "react-native";
import {Avatar, Title, Caption, Drawer, Paragraph,TouchableRipple, Switch,Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from './AuthContext';

export function DrawerContent(props) {
    const{user, logout}=useContext(AuthContext);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.userSection}>
                    <Title stle={styles.name}>Admin</Title>
                </View>

                <Drawer.Section>
                    <DrawerItem label="Learn" icon={({color, size}) => (
                        <Icon name="bookmark" color={color} size={size} />)}
                        onPress={()=>props.navigation.navigate('學習')} />
                    <DrawerItem label="Competition" icon={({color, size}) => (
                        <Icon name="sitemap" color={color} size={size} />)}
                        onPress={()=>props.navigation.navigate('比賽')} />
                    <DrawerItem label="Logout" icon={({color, size}) => (
                        <Icon name="logout" color={color} size={size} />)}
                        onPress={()=>logout()} />
                </Drawer.Section>

            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    name:{
        fontSize:18,
        fontWeight:'bold',
    },
    userSection:{
        margin:15,
    },
});