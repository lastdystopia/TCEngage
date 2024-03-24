import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from '@rneui/themed';

interface CheckboxQuestionProps {
  Question: string;
  QuestionOptions: string[];
}

const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({ Question, QuestionOptions }) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(QuestionOptions.length).fill(false));

  const handleCheckboxPress = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
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
      {QuestionOptions.map((option, index) => renderCheckbox(option, index))}
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
