import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Add Stack Navigator


const CurrentEventScreen = () => {


  const navigation = useNavigation();
  const goToForm = () => {
    console.log("Going to interactive screen");
    navigation.navigate('InteractiveScreen');
 
  };
  return (
    <View style={styles.container}>
       
      <Text>Current Screen Content</Text>
      {/* Current Event content here */}
      <Button
    onPress={goToForm}
    title="Join Now"
    color="#841584"
/>
    </View>
  );
};


export default CurrentEventScreen;
{/* Style Sheet */}


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