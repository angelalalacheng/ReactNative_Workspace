import React from "react";
import {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,SafeAreaView,FlatList,Button,Image, ScrollView} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import {useRoute} from '@react-navigation/native';
import 'react-native-gesture-handler';

const stack = createStackNavigator();

const Tactics_menu = () =>{
  return (
    <stack.Navigator>
      <stack.Screen name="戰術介紹ㄉㄟˇ斯" component={Tactics_home} />
      <stack.Screen name="Tactics" component={Tactics_content} options={{ headerShown: false }}/>          
    </stack.Navigator>
  );
}

const Tactics_home = ({navigation}) =>{
  const [data, setData] = useState(null);
  const [des, setDes] = useState(null);

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.text_out}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity  onPress={()=>navigation.navigate('Tactics', {desc: JSON.stringify(des[item['num']-1]['des']), gif:JSON.stringify(des[item['num']-1]['gif'])})}>
      <Item title={item['pos']}/> 
    </TouchableOpacity>
  );

  const getData = async () => {
    const resp = await fetch("http://140.115.51.163:35080/findId/62c2f57051307e8dbbd1e96d");
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

const Tactics_content = () =>{
  const route = useRoute();
  const desc=route.params.desc;
  const gif=route.params.gif;

  return(
    <View style={styles.body}>
      <Image source = {{uri: JSON.parse(gif)}} style={{width: 480, height: 230}} />
      <Text> </Text>
      <Text style={styles.text}>{JSON.parse(desc)}</Text>
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
      fontSize:25,
      margin:10,
    },
    text_out:{
      color:'#ffffff',
      fontSize:30,
      margin:10,
    },
    item: {
      backgroundColor: "#7D7DFF",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius:5,
    },
});

export {Tactics_menu};