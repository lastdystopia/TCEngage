import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import DropdownFiller from '../(functions)/DropdownFiller';

const Archive: React.FC = () => {
  return (
    <ImageBackground
        source={require('../../assets/images/Ferguson_Center_Outside.jpg')} 
        style={styles.backgroundImage}
      >
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <DropdownFiller type={1} />
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
  
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
});

export default Archive;
