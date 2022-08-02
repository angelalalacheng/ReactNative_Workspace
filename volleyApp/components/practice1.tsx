import React, {useEffect, useState, useContext} from "react";
import {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
import {TextInput, Button} from "react-native-paper";
import {createStackNavigator} from '@react-navigation/stack';
import ImagePicker from 'react-native-image-crop-picker';
import 'react-native-gesture-handler';

const stack = createStackNavigator();

const POS= [
  {
    id: '1',
    title: '上手發球',
  },
  {
    id: '2',
    title: '下手接球',
  },
];

const Item = ({ title }) => (
  <View style={styles.choice}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Practice_menu = () =>{
    return(
    <stack.Navigator>
        <stack.Screen name="想學什麼?" component={Practice_home} options={{ headerShown: false }}/>   
        <stack.Screen name="pos1" component={Practice_1} options={{ headerShown: false }}/>
        <stack.Screen name="pos2" component={Practice_2} options={{ headerShown: false }}/>          
    </stack.Navigator>
    );
}

const Practice_home = ({navigation}) =>{
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>navigation.navigate(`pos${item.id}`)}>
      <Item title={item.title}/>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        data={POS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
  
const Practice_1 = () =>{

  const download = async() =>{
    try{
      const response=await fetch('http://140.115.51.163:35080/findId/62c2446b42dc3e01c67f6d70', {method:'GET'});
      const data= await response.json();
      const tmp1=JSON.stringify(data['contents']);
      const tmp2=JSON.stringify(data['title']);
      setContent(JSON.parse(tmp1));
      setMain(JSON.parse(tmp2));
    }catch(error){
      console.error(error);
    }
  }

  const onSelectVideo = () =>{
    ImagePicker.openCamera({
      mediaType: "video",
    }).then((video) => {
      console.log("record video",video)
      console.log(video.path)
      createFormData(video.path)
    });
  }

  const createFormData = (videoPath) =>{
    const VideoData= new FormData()
    VideoData.append('file',{
      uri: videoPath,
      name: 'VolleyBallVideo.mp4',
      type: 'video/mp4',
    })
    console.log("videoPath",videoPath)
    console.log("from createFormData", VideoData)

    let res = fetch('http://140.115.51.163:35080/add', {  // http://10.0.2.2:5000
      method:'POST',
      body: VideoData,
      header:{
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log("fetch", VideoData)
  }

  const [content, setContent] = useState("");
  const [main, setMain] = useState("");

  useEffect(() => {download();}, []);

  return (
    <View style={styles.inner_body}> 
    <ScrollView>
      <Text style={styles.title}>{main}</Text>
      <Text> </Text>
      <View style={{alignItems:'center'}}>
        <Image source = {{uri: 'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/highserve2.gif'}} style={{width: 480, height: 230}} />
      </View>
      <Text> </Text>
      <Text style={styles.text}>{content}</Text>
      <Button mode="contained" onPress={()=>onSelectVideo()} style={styles.btn}>Upload</Button>
      </ScrollView>
    </View>
    );
}

const Practice_2 = () =>{
  const onSelectVideo = () =>{
    ImagePicker.openPicker({
      mediaType: "video",
    }).then((video) => {
      console.log("selected video",video)
      console.log(video.path)
      createFormData(video.path)
    });
  }

  const createFormData = (videoPath) =>{
    const VideoData= new FormData()
    VideoData.append('file',{
      uri: videoPath,
      name: 'VolleyBallVideo.mp4',
      type: 'video/mp4',
    })
    console.log("videoPath",videoPath)
    console.log("from createFormData", VideoData)

    let res = fetch('http://140.115.51.163:35080/add', {  // http://10.0.2.2:5000
      method:'POST',
      body: VideoData,
      header:{
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log("fetch", VideoData)
  }

  return (
    <View style={styles.inner_body}> 

      <Text style={styles.text}>Hello!</Text>

      <Button mode="contained" onPress={()=>onSelectVideo()} style={styles.btn}>Upload</Button>

    </View>
    );
}

const styles = StyleSheet.create({
    body:{
      flex:1,
      flexWrap:'wrap',
      flexDirection:'row',
      backgroundColor:'#000000', 
      alignItems:'center', 
      alignContent:'center',
      justifyContent:'space-around',
    }, 

    inner_body:{
      flex:1,
      backgroundColor:'#000000', 
      alignContent:'center',
      justifyContent:'center',
      padding:5,
    }, 

    title:{
      color:'#ffffff',
      fontSize:30,
      //fontStyle:'italic',
      margin:5,
    },

    text:{
      color:'#ffffff',
      fontSize:18,
    },

    choice:{
      height:150,
      margin:15,
      backgroundColor:'#000fff', 
      alignItems:'center', 
      justifyContent:'center',
      borderRadius:5,
    }, 

    btn:{
      margin: 20,
    },

    gif:{
      width:300,
      height:168,
      margin:20,
    }
});
  
export {Practice_menu};