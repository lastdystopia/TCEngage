import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface TextboxQuestionProps {
  Title: string;
  Question: string;
  onTextChange: (text: string) => void;  
}

const TextboxQuestion: React.FC<TextboxQuestionProps> = ({ Title, Question, onTextChange }) => {
  const [textValue, setTextValue] = useState<string>('');

  const handleTextChange = (text: string) => {
    const truncatedText = text.slice(0, 3000); // truncate text so if somebody pastes text it wont exceed limit!
    setTextValue(truncatedText);
    onTextChange(truncatedText);  
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
