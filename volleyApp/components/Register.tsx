import React from 'react';
import {useEffect, useState, useContext} from 'react';
import {Text, View, TextInput, Button, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const RegisterScreen = ({navigation}) => {
    const [email, setEmail]=useState(null);
    const [password, setPassword]=useState(null);
    const [name, setName]=useState(null);

    const{register}=useContext(AuthContext);
    return(
        <ImageBackground style={styles.imageback} source={{ uri: 'https://forvolleyapp.s3.ap-northeast-1.amazonaws.com/loginimage.png' }}> 
            <Text style={styles.welcome1}>Create an Account</Text>
            <View style={styles.size}>
                <TextInput style={styles.type} value={name} onChangeText={text=>setName(text)} placeholder="Enter Name" />
                <TextInput style={styles.type} value={email} onChangeText={text=>setEmail(text)} placeholder="Enter Email" />
                <TextInput style={styles.type} value={password} onChangeText={text=>setPassword(text)} placeholder="Enter Password" secureTextEntry/>
                <Button onPress={()=>register(email, password)} title="Sign Up" />
            </View>
            <View style={styles.to_login}>
                <Text>Have account?  </Text>
                <TouchableOpacity>
                    <Text style={{color:'blue'}} onPress={()=>navigation.navigate('Login')}>Login</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    welcome1:{
        fontSize:30,
        fontWeight: 'bold',
        fontFamily: 'serif',
        marginBottom:50,
        opacity:1,
        color: 'black',
    },
    imageback: {
        flex: 1,
        width: '100%', 
        height: '100%',
        justifyContent:'center',
        alignItems:'center',
    },
    size:{
        width:'80%',
    },
    to_login:{
        flexDirection:'row', 
        marginTop: 20,
    },
    type:{
        marginBottom:20,
        borderColor:'#000',
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:15,
    },
});

export {RegisterScreen};
