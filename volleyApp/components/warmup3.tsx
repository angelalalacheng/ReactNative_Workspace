import React from "react";
import {Component} from 'react';
import {View, Text, StyleSheet,} from "react-native";
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';

const stack = createStackNavigator();

const Warmup_menu = () =>{
  return (
    <View style={styles.body}>
      <Text style={styles.text}>How to 熱身</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    body:{
      flex:1,
      flexDirection:'column',
      backgroundColor:'#000000', 
      alignItems:'center', 
      justifyContent:'center',
    }, 
  
    text:{
      color:'#ffffff',
      fontSize:33,
      fontStyle:'italic',
      margin:10,
    },
});

export {Warmup_menu};
  