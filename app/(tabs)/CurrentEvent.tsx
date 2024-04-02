import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropdownFiller from '../(functions)/DropdownFiller';

const CurrentEventScreen: React.FC = () => {
  const navigation = useNavigation();

  

  return (
    <ImageBackground
        source={require('../../assets/images/Ferguson_Center_Outside.jpg')} 
        style={styles.backgroundImage}
      >
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text>Current Screen Content</Text>
        <DropdownFiller type={0} />

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


