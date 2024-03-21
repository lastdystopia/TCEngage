import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dropdown from './Dropdown';


const Tab = createBottomTabNavigator();


const ArchiveScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Archive Screen Content</Text>
      {/* Archival content here */}
      <View style = {styles.DropDown}>
    {/* Example DropDown components */}
    <Dropdown />    
  </View>
    </View>
  );
};


export default ArchiveScreen;
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
  DropDown: {flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'light-blue',
  borderTopWidth: 1,
  borderTopColor: 'grey',
  paddingVertical: 10,
  paddingHorizontal: 20,
  top: 50,
  left: 0,
  right: 0,},
});