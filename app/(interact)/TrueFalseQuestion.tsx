import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from '@rneui/themed';
import Question from './Question';

interface TrueFalseQuestionProps {
  Title: string;
  Question: string;
  onCheckboxChange: (isChecked: boolean) => void; 
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ Title, Question, onCheckboxChange }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = (isChecked: boolean) => {
    setChecked(isChecked);
    onCheckboxChange(isChecked);
    console.log('True/False Question - Title:', Title, 'Question:', Question, 'Response:', isChecked);
    // Perform any other necessary actions with the checkbox
  };
  
  const getResponse = () => {
    return "meow";
  };
  return (
    <View>
      <Text>{Question}</Text>
      <CheckBox
        center
        title="True"
        checked={checked}
        onPress={() => handleCheckboxChange(!checked)}
      />
    </View>
  );
};

export default TrueFalseQuestion;
