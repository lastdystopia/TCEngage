import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import DropdownFiller from '../(functions)/DropdownFiller';
import Form from '../(interact)/Form';
import Login from '../(interact)/Login';
const CurrentEventScreen: React.FC = () => {
  

  return (
    <ImageBackground
        source={require('../../assets/images/Ferguson_Center_Outside.jpg')} 
        style={styles.backgroundImage}
      >
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <DropdownFiller type={0} />
      {/* <Form/> */}
    <Login/> 
      </View>
      
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
});

export default CurrentEventScreen;


