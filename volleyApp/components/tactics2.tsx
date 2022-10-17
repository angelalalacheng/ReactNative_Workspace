import React from "react";
import {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet,SafeAreaView, FlatList, Image, ActivityIndicator} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import {useRoute} from '@react-navigation/native';
import {TextInput, Button, Card, Title, Paragraph } from "react-native-paper";
import 'react-native-gesture-handler';

const stack = createStackNavigator();

const Tactics_menu = () =>{
  return (
    <stack.Navigator>
      <stack.Screen name="戰術介紹ㄉㄟˇ斯" component={Tactics_home} />
    </stack.Navigator>
  );
}

const Tactics_home = ({navigation}) =>{
  const [data, setData] = useState(null);
  const [des, setDes] = useState(null);
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }

  const renderItem = ({ item }) => (
    <Card mode="outlined" style={styles.container}>
      <View style={{backgroundColor:"#D9FFFF"}}>
      <Card.Title title={item.pos} titleStyle={styles.title}/>
      </View>
      {loading?(<ActivityIndicator visible={loading} size="large" color="#0000ff" />):(<><Card.Cover source={{ uri: item['gif'] }} /></>)}
      <Card.Content>
        <Paragraph></Paragraph>
        <Paragraph style={styles.content}>{item['des']}</Paragraph>
      </Card.Content>
  </Card>
  );

  const getData = async () => {
    const resp = await fetch("https://volleycoach.cilab.csie.ncu.edu.tw/findId/62c2f57051307e8dbbd1e96d");
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


const styles = StyleSheet.create({
    body:{
      flex:1,
      flexDirection:'column',
      alignItems:'center', 
      justifyContent:'center',
    }, 

    title:{
      color:'#000000',
      fontSize:25,
      fontFamily:'NotoSansTC-Bold',
    },

    content:{
      color:'#000000',
      fontSize:18,
      fontFamily:'NotoSansTC-Regular',
    },

    container: {
      marginVertical: 10,
      marginHorizontal: 5,
      borderRadius: 5,
    },
});

export {Tactics_menu};