import 'react-native-gesture-handler';
import React from 'react';


import { View, Text, StyleSheet, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DropDown, { displayDropdown } from './Dropdown';
const Tab = createBottomTabNavigator();
const currentDate = new Date();
const UpcomingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Upcoming Screen Content</Text>
      {/* UpcomingScreen content here */}
    </View>
  );
};


export default UpcomingScreen;
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