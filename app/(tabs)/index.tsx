import { StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import Dropdown from '../(functions)/Dropdown';
export default function IndexScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Theater CNU Engage!</Text>
      <Dropdown
  title="Romeo and Juliet"
  startDate="02/14/1597"
  endDate="04/23/1616"
  summary="This is a summary of my dropdown."
  characters={{
    character1: 'Description for character 1',
    character2: 'Description for character 2',
    character3: 'Description for character 3',
  }}
  relationalMap={123} // Placeholder value
/>

      
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
    </ScrollView>
  );
}

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
