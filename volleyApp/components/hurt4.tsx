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

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.text_out}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity  onPress={()=>navigation.navigate('Hurt', {bad: JSON.stringify(des[item['num']-1]['des']), help:JSON.stringify(des[item['num']-1]['help'])})}>
      <Item title={item['sym']}/> 
    </TouchableOpacity>
  );

  const getData = async () => {
    const resp = await fetch("http://140.115.51.163:35080/findId/62cd7c4ff95fa4e76ccdd829");
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
      <Text> </Text>
      <Text style={styles.text}>{JSON.parse(bad)}</Text>
      <Text> </Text>
      <Text style={styles.text_out}>處理方式</Text>
      <Text> </Text>
      <Text style={styles.text}>{JSON.parse(help)}</Text>
      </ScrollView>
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
      fontSize:22,
      margin:10,
    },

    text_out:{
      color:'#ffffff',
      fontSize:33,
      margin:10,
    },

    item: {
      backgroundColor: "#000fff",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
});

export {Hurt_menu};