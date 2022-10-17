import React, {useEffect, useState, useContext} from "react";
import {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
import {TextInput, Button, Card, Title, Paragraph } from "react-native-paper";
import {createStackNavigator} from '@react-navigation/stack';
import ImagePicker from 'react-native-image-crop-picker';
import 'react-native-gesture-handler';
import Video from 'react-native-video';

const stack = createStackNavigator();

const API_Prefix='https://volleycoach.cilab.csie.ncu.edu.tw/';


const POS= [
  {
    id: '1',
    title: '上手發球',
    image:'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/overheadserve.PNG'
  },
  {
    id: '2',
    title: '下手接球',
    image:'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/catch.PNG'
  },
  {
    id: '3',
    title: '扣球',
    image:'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/spike.jpg'
  },
];

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
    <Card mode="outlined">
    <Card.Title title={item.title} titleStyle={styles.cardtitle}/>
    <Card.Cover source={{ uri: item.image }} />
    <Card.Actions>
      <Button onPress={()=>navigation.navigate(`pos${item.id}`)}>Get Start</Button>
    </Card.Actions>
  </Card>
  );

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

const Practice_1 = () =>{

  const download = async() =>{
    try{
      const response=await fetch(API_Prefix+'findId/62c2446b42dc3e01c67f6d70', {method:'GET'});
      const data= await response.json();
      const tmp1=JSON.stringify(data['contents']);
      const tmp2=JSON.stringify(data['title']);
      setContent(JSON.parse(tmp1));
      setMain(JSON.parse(tmp2));
    }catch(error){
      console.error(error);
    }
  }

  const getVideoPathfromCamera = () =>{
    return onCamera();
  }
 
  const onCamera = () =>{
    ImagePicker.openCamera({
      mediaType: "video",
    }).then((video) => {
      // console.log(video.path);
      // return video.path;
      createFormData(video.path)
    });
  }

  const onSelect = () =>{
    ImagePicker.openPicker({
      mediaType: "video",
    }).then((video) => {
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
    postVideo(VideoData)
  }
  
  const postVideo = async(VideoData) =>{
    try{
      const res = await fetch(API_Prefix+'add', {  // http://10.0.2.2:5000
      method:'POST',
      body: VideoData,
      header:{
        'Content-Type': 'multipart/form-data',
      }});
      const data= await res.text();
      setVideo("https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/"+data+".mp4");
      console.log("res", data)
      console.log("finally")
      getComment();
    }catch(error){
      console.error("error from postVideo: ",error);
    }
  }

  const getComment = async() =>{
    try{
      const response=await fetch('https://volleycoach.cilab.csie.ncu.edu.tw/result', {method:'GET'});
      const data= await response.text();
      console.log("data ",data)
      setComment(data);
    }catch(error){
      console.error("error from getComment: ",error);
    }
  }

  const [content, setContent] = useState("");
  const [main, setMain] = useState("");
  const [comment, setComment] = useState("");
  const [video, setVideo] = useState("");

  useEffect(() => {download();}, []);

  return (
    <View style={styles.inner_body}> 
    <ScrollView>
      <Text style={styles.title}>{main}</Text>
      <View style={{alignItems:'center'}}>
      <Video
          source={{ uri: "https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/high_serve_coach.mp4" }}
          style={{width: 480, height: 230}}
          onBuffer={this.videoBuffer}
          onEnd={this.onEnd}
          onError={this.videoError}
          controls={true}
          ref={(ref) => {
            this.player = ref
          }}
        />
      </View>
      <Text style={styles.text}>{content}</Text>
      <Text style={styles.text}>稍待約一分鐘才會有結果噢~~</Text>
      {comment==""?null:(
        <View style={{alignItems:'center'}}>
          <Text style={styles.comment}>{comment}</Text>
        </View>
      )}
      {video==""?null:(
          <Video
            source={{ uri: `${video}` }}
            style={{width: 480, height: 230}}
            onBuffer={this.videoBuffer}
            onEnd={this.onEnd}
            onError={this.videoError}
            controls={true}
            ref={(ref) => {
              this.player = ref
            }} 
          />
      )}
      <View style={{flexDirection:'row'}}>
        <Button mode="contained" onPress={()=>onSelect()} style={styles.btn}>from library</Button>
        <Button mode="contained" onPress={()=>onCamera()} style={styles.btn}>from camera</Button>
      </View>
      </ScrollView>
    </View>
    );
}

const Practice_2 = () =>{
  const download = async() =>{
    try{
      const response=await fetch(API_Prefix+'findId/63393f77362c732c323826a9', {method:'GET'});
      const data= await response.json();
      const tmp1=JSON.stringify(data['contents']);
      const tmp2=JSON.stringify(data['title']);
      setContent(JSON.parse(tmp1));
      setMain(JSON.parse(tmp2));
    }catch(error){
      console.error(error);
    }
  }

  const onCamera = () =>{
    ImagePicker.openCamera({
      mediaType: "video",
    }).then((video) => {
      createFormData(video.path)
    });
  }

  const onSelect = () =>{
    ImagePicker.openPicker({
      mediaType: "video",
    }).then((video) => {
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
    postVideo(VideoData)
  }
  
  const postVideo = async(VideoData) =>{
    try{
      const res = await fetch(API_Prefix+'add', {  // http://10.0.2.2:5000
      method:'POST',
      body: VideoData,
      header:{
        'Content-Type': 'multipart/form-data',
      }});
      const data= await res.text();
      setVideo("https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/"+data+".mp4");
      console.log("res", data)
      console.log("finally")
      getComment();
    }catch(error){
      console.error("error from postVideo: ",error);
    }
  }

  const getComment = async() =>{
    try{
      const response=await fetch('https://volleycoach.cilab.csie.ncu.edu.tw/result', {method:'GET'});
      const data= await response.text();
      console.log("data ",data)
      setComment(data);
    }catch(error){
      console.error("error from getComment: ",error);
    }
  }

  const [content, setContent] = useState("");
  const [main, setMain] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {download();}, []);

  return (
    <View style={styles.inner_body}> 
    <ScrollView>
      <Text style={styles.title}>{main}</Text>
      <View style={{alignItems:'center'}}>
        <Image source = {{uri: 'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/lowhand.jpg'}} style={{width: 480, height: 230}} />
      </View>
      <Text style={styles.text}>{content}</Text>
      <Text style={styles.text}>稍待約一分鐘才會有結果噢~~</Text>
      <View style={{alignItems:'center'}}>
        <Text style={styles.comment}>{comment}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Button mode="contained" onPress={()=>onSelect()} style={styles.btn}>from library</Button>
      <Button mode="contained" onPress={()=>onCamera()} style={styles.btn}>from camera</Button>
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
    },

    cardtitle:{
      color:'#000000',
      fontSize:20,
      fontFamily:'NotoSansTC-Bold',
    },

    text:{
      color:'#000000',
      fontSize:18,
      fontFamily:'NotoSansTC-Regular',
    },

    btn:{
      margin: 10,
    },

    comment:{
      color:'#0055FF',
      fontSize:22,
      fontFamily:'NotoSansTC-Medium',
    }
    
});
  
export {Practice_menu};