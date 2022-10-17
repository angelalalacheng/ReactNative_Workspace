import React, {useEffect, useState} from "react";
import {useRoute} from '@react-navigation/native';
import {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
import {TextInput, Button, Card, Title, Paragraph, Modal, Portal, Provider} from "react-native-paper";
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

const stack = createStackNavigator();

const POS= [
  {
    id: 1,
    title: '計分',
    image:'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/rule1.jpg'
  },
  {
    id: 2,
    title: '換人',
    image:'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/rule3.jpg'
  },
  {
    id: 3,
    title: '暫停',
    image:'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/rule4.jpg'
  },
  {
    id: 4,
    title: '發球',
    image:'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/rule5.jpg'
  },
  {
    id: 5,
    title: '接發球',
    image:'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/rule6.jpg'
  },
  {
    id: 6,
    title: '攻擊',
    image:'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/rule7.jpg'
  },
  {
    id: 7,
    title: '攔網',
    image:'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/rule8.jpg'
  },
  {
    id: 8,
    title: '自由球員',
    image:'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/rule9.png'
  },
];

const Rule_menu = () =>{
    return(
    <stack.Navigator>
        <stack.Screen name="rule" component={Rule_home} options={{ headerShown: false }}/>   
        <stack.Screen name="rule_content" component={Rule_content} options={{ headerShown: false }}/>       
    </stack.Navigator>
    );
}

const Rule_home = ({navigation}) =>{
  const [data, setData] = useState(null);
  const [des, setDes] = useState(null);

  const renderItem = ({ item }) => (
    <Card mode="outlined">
    <Card.Title title={item.title} titleStyle={styles.cardtitle}/>
    <Card.Cover source={{ uri: item.image }} />
    <Card.Actions>
      <Button onPress={()=>navigation.navigate('rule_content', {name: JSON.stringify(item.title), rul:JSON.stringify(des[item.id-1]['des']), img: JSON.stringify(item.image)})}>See more</Button>
    </Card.Actions>
  </Card>
  );

  const getData = async () => {
    const resp = await fetch("https://volleycoach.cilab.csie.ncu.edu.tw/findId/633aff68ce38001d968d7977");
    const data = await resp.json();
    setData(data['contents']);
    setDes(data['contents']);
  }; 

  useEffect(() => {getData();}, []);

  return(
    <SafeAreaView>
    <FlatList
      data={POS}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  </SafeAreaView>
  );
}


const Rule_content =() =>{
  const route = useRoute();
  const name=route.params.name;
  const rul=route.params.rul;
  const img=route.params.img;
  return(
    <View style={styles.body}>
      <ScrollView>
      <Text style={styles.title}>{JSON.parse(name)}</Text>
      <Image style={styles.img} source={{uri: `${JSON.parse(img)}`}} />
      <View>
        <Text style={styles.text}>{JSON.parse(rul)}</Text>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    }, 

    inner_body:{
      flex:1,
      alignContent:'center',
      justifyContent:'center',
      padding:5,
    }, 

    title:{
      color:'#000000',
      fontSize:30,
      fontFamily:'NotoSansTC-Bold',
      marginLeft:10,
    },

    cardtitle:{
      color:'#000000',
      fontSize:20,
      fontFamily:'NotoSansTC-Bold',
    },

    text:{
      color:'#000000',
      fontSize:20,
      fontFamily:'NotoSansTC-Regular',
      margin:10,
    },

    img:{
      width:480,
      height:230,
    },
});
  
export {Rule_menu};