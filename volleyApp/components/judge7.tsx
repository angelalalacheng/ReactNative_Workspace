import React from "react";
import {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet,SafeAreaView, FlatList, Image, ActivityIndicator} from "react-native";
import {useRoute} from '@react-navigation/native';
import {TextInput, Button, Card, Title, Paragraph } from "react-native-paper";
import 'react-native-gesture-handler';


const Judge_menu = () =>{
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
      {loading?(<ActivityIndicator visible={loading} size="large" color="#0000ff" />):(<><Card.Cover source={{ uri: item['img'] }} /></>)}

  </Card>
  );

  const getData = async () => {
    const resp = await fetch("https://volleycoach.cilab.csie.ncu.edu.tw/findId/631f44c67f9fc69adc4d93af");
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

    image : {
        width : '100%',
        height : '30%'
    },
});

export {Judge_menu};