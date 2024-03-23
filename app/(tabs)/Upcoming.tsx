import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropdownFiller from '../(functions)/DropdownFiller';

const Upcoming: React.FC = () => {
  return (
    <View style={styles.container}>
      <DropdownFiller type={2} />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Upcoming;
