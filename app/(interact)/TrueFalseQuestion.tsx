import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox, Icon } from '@rneui/themed';

interface TrueFalseQuestionProps {
  Question: string;
  onChange: (checked: boolean) => void;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ Question, onChange }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = (isChecked: boolean) => {
    setChecked(isChecked);
    onChange(isChecked);
    getResponse(); // Call the getResponse function to get the response from the question
  };

  const getResponse = () => {
    const response = checked ? 'true' : 'false';
    console.log('True/False Question - Question:', Question, 'Response:', response);
    return response;
  };

  return (
    <View>
      <Text>{Question}</Text>
      <CheckBox
        center
        title="True"
        checkedIcon={<Icon name="checkmark-circle" type="ionicon" color="green" />}
        uncheckedIcon={<Icon name="close-circle" type="ionicon" color="red" />}
        checked={checked}
        onPress={() => handleCheckboxChange(!checked)}
      />
      <Text>False</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  trueFalseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TrueFalseQuestion;
