import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropdownFiller from '../(functions)/DropdownFiller';
import Interact from '../(interact)/Interact';

const CurrentEventScreen: React.FC = () => {
  const navigation = useNavigation();

  const goToForm = () => {
    console.log("Going to interactive screen");
    // navigation.navigate('InteractiveScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text>Current Screen Content</Text>
        <DropdownFiller type={0} />


        <Interact
        questions={[
          { Type: 0, Title: 'Type your answer', onChange: (text: string) => console.log(text) },
          { Type: 2, Title: 'Is it true or false?', onChange: (value: boolean) => console.log(value) },
          { Type: 3, Title: 'Rate this question', onChange: (rating: number) => console.log(rating) },
          { Type: 1, Title: 'Select options', options: ['Option 1', 'Option 2', 'Option 3'], onChange: (checkedItems: boolean[]) => console.log(checkedItems) },
          { Type: 4, Title: 'Choose one', options: ['Option A', 'Option B', 'Option C'], onChange: (selectedOption: string) => console.log(selectedOption) },
        ]}
      />
      </View>
    </ScrollView>
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
});

export default CurrentEventScreen;


