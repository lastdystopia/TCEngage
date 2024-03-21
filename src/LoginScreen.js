import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, Button, useEffect } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
  const goToMain = () => {
    logInInfo = true;
    if (logInInfo){
    console.log("Going to Main Tabs");
    navigation.navigate('MainTabs');}
    else{
        alert("Incorrect Login Info");
    }
 
  };

  
    return (
        <View style={styles.container}>
           
            <Text>Login Here</Text>            
            <Button
                onPress={goToMain}

        title="Log in"
        color="#941512"
        />
        </View>
       
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E6E6FA',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      padding: 16,
    },
  });