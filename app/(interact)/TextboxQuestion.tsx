import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface TextboxQuestionProps {
  Question: string;
  onChange: (text: string) => void;
}

const TextboxQuestion: React.FC<TextboxQuestionProps> = ({ Question, onChange }) => {
  const [textValue, setTextValue] = useState<string>('');
  /*
  Function: handleTextChange
    - Handles the text change in the TextInput
  */
  const handleTextChange = (text: string) => {
    setTextValue(text);
    onChange(text); // Pass the text to the parent component onChange function
    getResponse(); // Call the getResponse function to get the response from the question
  };
/*
Function: getResponse
-returns the response inside the textbox.
*/
  const getResponse = () => {
    console.log('Textbox Question - Question:', Question, 'Response:', textValue, "!!!");
    return textValue;
  };

  return (
    <View>
      <Text>{Question}</Text>
      <TextInput
        style={styles.input}
        value={textValue}
        onChangeText={handleTextChange}
        maxLength={3000}
        multiline
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default TextboxQuestion;
