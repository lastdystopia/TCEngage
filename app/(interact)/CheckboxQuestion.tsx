import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from '@rneui/themed';
import Question from './Question';

interface CheckboxQuestionProps {
  Title: string;
  Question: string;
  Options: string[]; // Change to an array of strings
  onPressChange: (response: string) => void; // Added onPressChange prop
}

const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({
  Title,
  Question,
  Options,
  onPressChange
}) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(Options.length).fill(false));
  const handleCheckboxPress = (index: number) => {
    setCheckedItems(prevCheckedItems => {
      const updatedCheckedItems = [...prevCheckedItems];
      updatedCheckedItems[index] = !updatedCheckedItems[index];
      const selectedOptions = Options.filter((_, index) => updatedCheckedItems[index]);
      console.log(selectedOptions); // Log the selected options for debugging purposes
      onPressChange(selectedOptions.join(', ')); // Call onPressChange with response
      return updatedCheckedItems;
    });
  };
  

  const getResponse = () => {
    const selectedOptions = Options.filter((_, index) => checkedItems[index]);
    console.log(selectedOptions); // Log the selected options for debugging purposes
    return selectedOptions.join(', ');
  };

  const renderCheckbox = (option: string, index: number) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleCheckboxPress(index)}
      style={styles.checkboxContainer}
    >
      <CheckBox
        checked={checkedItems[index]}
        onPress={() => handleCheckboxPress(index)}
        iconType="material-community"
        checkedIcon="checkbox-marked"
        uncheckedIcon="checkbox-blank-outline"
        checkedColor="blue"
      />
      <Text>{option}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>{Question}</Text>
      {Options.map((option, index) => renderCheckbox(option, index))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CheckboxQuestion;
