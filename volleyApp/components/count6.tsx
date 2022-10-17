import React from "react";
import {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Linking, ActivityIndicator} from "react-native";
import { ProgressBar, Button} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';


const Count_menu = () =>{
    const [A, setA] = useState(0);
    const [B, setB] = useState(0);

    return (
        <View style={styles.body}>
            <Button mode="contained" labelStyle={{fontSize: 100}} style={styles.button} onPress={()=>setA(A+1)}>{A}</Button>
            {(A>=25 || B>=25)? (<Button mode="contained" labelStyle={{fontSize: 20}} style={styles.button_newgame} onPress={()=>{setA(0);setB(0);}}>下一局</Button>):null}
            <Button mode="contained" labelStyle={{fontSize: 100}} style={styles.button} onPress={()=>setB(B+1)}>{B}</Button>
        </View>
    );
  }

  const styles = StyleSheet.create({
    body:{
      flex:1,
      flexDirection:'column',
      //backgroundColor:'#000000', 
      alignItems:'flex-end', 
      justifyContent:'center',
    }, 
  
    text:{
      color:'#000000',
      fontSize:40,
      fontStyle:'italic',
    },

    button_newgame:{
        transform: [{ rotate: '90deg'}],
        alignSelf: 'flex-start',
    },

    button: {
      width: 220,
      height: 220,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      marginRight: 70,
      borderRadius: 5,
      backgroundColor: 'blue',
      transform: [{ rotate: '90deg'}]
    },
});

  export {Count_menu};