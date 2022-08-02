import React from 'react';
import {useContext, useState} from "react";
import {Text, View, TextInput, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
    const [email, setEmail]=useState(null);
    const [password, setPassword]=useState(null);
    const{login}=useContext(AuthContext);
    
    return(
        <View style={styles.all}>
            <Text style={styles.welcome1}>Learning Volleyball App</Text>
            <Text style={styles.welcome2}> from Zero to Hero</Text>
            <View style={styles.size}>
                <TextInput style={styles.type} value={email} onChangeText={text=>setEmail(text)} placeholder="Enter Email" />
                <TextInput style={styles.type} value={password} onChangeText={text=>setPassword(text)} placeholder="Enter Password" secureTextEntry/>
                <Button onPress={()=>login(email, password)} title="Login" />
            </View>
            <View style={styles.to_register}>
                <Text>Don't have account?  </Text>
                <TouchableOpacity>
                    <Text style={{color:'blue'}} onPress={()=>navigation.navigate('Register')}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    welcome1:{
        fontSize:30,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
    welcome2:{
        fontSize:25,
        marginBottom:50,
        fontFamily: 'serif',
    },
    all:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    size:{
        width:'80%',
    },
    to_register:{
        flexDirection:'row', 
        marginTop: 20,
    },
    type:{
        marginBottom:20,
        borderColor:'#000',
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:15,
    }
});

export {LoginScreen};

