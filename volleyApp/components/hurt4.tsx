import React from "react";
import {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,SafeAreaView,FlatList,Button, ScrollView} from "react-native";
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
  
const stack = createStackNavigator();

const Hurt_menu = () =>{
  return(
    <stack.Navigator>
      <stack.Screen name="運動傷害們" component={Hurt_home} />             
      <stack.Screen name="Hurt" component={Hurt_content} options={{ headerShown: false }}/>
    </stack.Navigator>
  );
}


const Hurt_home = ({navigation}) =>{
  const [data, setData] = useState(null);
  const [des, setDes] = useState(null);
  const [display, setDisplay] = useState(false);
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.text_out}>{title}</Text>
    </View>
  );

  const test =()  =>{
    if(display == false){
      setDisplay(true);
    }
    else{
      setDisplay(false);
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity  onPress={()=>navigation.navigate('Hurt', {bad: JSON.stringify(des[item['num']-1]['des']), help:JSON.stringify(des[item['num']-1]['help'])})}>
      <Item title={item['sym']}/> 
    </TouchableOpacity>
  );

  const getData = async () => {
    const resp = await fetch("https://volleycoach.cilab.csie.ncu.edu.tw/findId/62cd7c4ff95fa4e76ccdd829");
    const data = await resp.json();
    setData(data['contents']);
    setDes(data['contents']);
  }; 

  useEffect(() => {getData();}, []);

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.num}
      />
    </SafeAreaView>
  );
}

const Hurt_content =() =>{
  const route = useRoute();
  const bad=route.params.bad;
  const help=route.params.help;
  return(
    <View style={styles.body}>
      <ScrollView>
      <Text style={styles.text_out}>症狀</Text>
      <View style={styles.frame}>
        <Text style={styles.text}>{JSON.parse(bad)}</Text>
      </View>
      <Text style={styles.text_out}>處理方式</Text>
      <View style={styles.frame}>
        <Text style={styles.text}>{JSON.parse(help)}</Text>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    body:{
      flex:1,
      flexDirection:'column',
      backgroundColor:'#FFFFFF', 
      alignItems:'center', 
      justifyContent:'center',
      padding: 5,
    }, 
  
    text:{
      color:'#000000',
      fontSize:22,
      margin:10,
    },

    text_out:{
      color:'#000000',
      fontSize:33,
      margin:10,
    },

    item: {
      backgroundColor: "#97CB99",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 8,
    },

    frame: {
      borderRadius: 5,
      borderWidth: 3,
      shadowColor: "red",
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowRadius: 5,
    }
});

export {Hurt_menu};