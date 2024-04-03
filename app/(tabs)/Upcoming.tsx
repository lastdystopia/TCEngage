import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import DropdownFiller from '../(functions)/DropdownFiller';

const Upcoming: React.FC = () => {
  return (
      <ImageBackground
        source={require('../../assets/images/Ferguson_Center_Outside.jpg')} 
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>

      <DropdownFiller type={2} />
      </View>
      </ScrollView>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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

export default Upcoming;
