import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from '@rneui/themed';

interface TrueFalseQuestionProps {
  Title: string;
  Question: string;
  onCheckboxChange: (isChecked: boolean) => void; 
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ Title, Question, onCheckboxChange }) => {
  const [trueChecked, setTrueChecked] = useState<boolean>(false);
  const [falseChecked, setFalseChecked] = useState<boolean>(false);

  const handleTrueCheckboxChange = () => {
    setTrueChecked(!trueChecked);
    setFalseChecked(false);
    onCheckboxChange(true);
    console.log('True/False Question - Title:', Title, 'Question:', Question, 'Response:', true);
  };

  const handleFalseCheckboxChange = () => {
    setFalseChecked(!falseChecked);
    setTrueChecked(false);
    onCheckboxChange(false);
    console.log('True/False Question - Title:', Title, 'Question:', Question, 'Response:', false);
  };
  
  return (
    <View>
      <Text>{Question}</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          center
          title="True"
          checked={trueChecked}
          onPress={handleTrueCheckboxChange}
        />
        <CheckBox
          center
          title="False"
          checked={falseChecked}
          onPress={handleFalseCheckboxChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TrueFalseQuestion;
