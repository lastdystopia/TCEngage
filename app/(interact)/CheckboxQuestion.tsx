import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from '@rneui/themed';


interface CheckboxQuestionProps {
  Title: string;
  Question: string;
  Option1: string;
  Option2: string;
  Option3: string;
  Option4: string;
  Option5: string;
  Option6: string;
  Option7: string;
  Option8: string;

}


const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({
  Title,
  Question,
  Option1,
  Option2,
  Option3,
  Option4,
  Option5,
  Option6,
  Option7,
  Option8,
}) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(8).fill(false));
  
  const handleCheckboxPress = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
    getResponse(); // Log the response in the same way as Question.tsx
  };
  
  const getResponse = () => {
    return checkedItems.toString();
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
      {[Option1, Option2, Option3, Option4, Option5, Option6, Option7, Option8]
        .map((option, index) => renderCheckbox(option, index))}
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

