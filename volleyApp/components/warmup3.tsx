import React from "react";
import {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Linking, ActivityIndicator} from "react-native";
import { ProgressBar, Button} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

const stack = createStackNavigator();

const Warmup_menu = () =>{
  return (
    <stack.Navigator>
      <stack.Screen name="熱身gogo" component={Warmup_home} />
      <stack.Screen name="warmup" component={Warmup_start} options={{ headerShown: false }}/>          
    </stack.Navigator>
  );
}

const Warmup_home = ({navigation}) =>{
  return (
    <View style={styles.body}>  
      <Text style={styles.intro}>熱身能增加肌肉溫度，從而提升肌肉柔軟度</Text>
      <Text style={styles.intro}>使它們能更有力地收緊，並更迅速地放鬆</Text>
      <Button mode="contained" style={styles.button} onPress={()=>navigation.navigate('warmup')}>Start</Button>
      <Text></Text>
      <Button onPress={()=>Linking.openURL('https://www.youtube.com/watch?v=_sNRH65Wmuw')}>參考影片</Button> 
    </View>
  );
}
const Warmup_start = () =>{
  const [countdown, setCountdown] = useState(30);
  const [gif, setGif]=useState(null);
  const [data, setData]=useState(null);
  const [cur, setCur]=useState(1);
  const [loading, setLoading]=useState(true);

  const getData = async () => {
    const resp = await fetch("https://volleycoach.cilab.csie.ncu.edu.tw/findId/63023418576b63914778f404");
    const input = await resp.json();
    setData(input['contents']);
    setGif(input['contents'][0]['gif']);
  }; 

  useEffect(() => {getData();}, []);
  useEffect(() => {
    let clock = setInterval(function count() {
      if(countdown>0){
        setCountdown(countdown-1);
      }
      if(countdown==0 && cur<=9){
        setCur(cur+1);
        setCountdown(30);
        setGif(data[cur]['gif']);
        console.log(cur);
      }
    } , 1000)
  return () => {
      clearInterval(clock);
    }
  }, [countdown]);

//loading put on View
  return (
    <View style={styles.body}>
      {loading? (<ActivityIndicator size="large" color="#0000ff" />):(<Text style={styles.text}>{countdown}</Text>)}
      <Image onLoadStart={()=>setLoading(true)} onLoadEnd={()=>{setLoading(false);setCountdown(30);}} style={styles.image} source={{ uri: `${gif}` }}/>
      {loading? null:(<ProgressBar progress={countdown/30} style={styles.progress}/>)}
    </View>
  );
}

const styles = StyleSheet.create({
    body:{
      flex:1,
      flexDirection:'column',
      //backgroundColor:'#000000', 
      alignItems:'center', 
      justifyContent:'center',
    }, 
  
    text:{
      color:'#000000',
      fontSize:80,
      fontStyle:'italic',
    },

    progress:{
      height: 10,
      width:400,
    },

    image: {
      width: 450,
      height: 252,
      marginBottom: 30,
      borderRadius: 10,
    }, 

    button: {
      marginTop: 20,
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: 'red',
    },

    intro:{
      color:'#000000',
      fontSize:18,
      fontStyle:'italic',  
      marginBottom: 10,    
    }
});

export {Warmup_menu};
  