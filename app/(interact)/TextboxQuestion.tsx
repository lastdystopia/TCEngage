import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface TextboxQuestionProps {
  Title: string;
  Question: string;

}
const getResponse = () => {
  return "meow";
};
const TextboxQuestion: React.FC<TextboxQuestionProps> = ({ Title, Question }) => {
  const [textValue, setTextValue] = useState<string>('');

  const handleTextChange = (text: string) => {
    setTextValue(text);
    console.log('Textbox Question - Title:', Title, 'Question:', Question, 'Response:', text);
    // Perform any other necessary actions with the text input
  };

  return (
    <View>
      <Text>{Question}</Text>
      <TextInput
        style={styles.input}
        value={textValue}
        onChangeText={handleTextChange}
        maxLength={500}
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
