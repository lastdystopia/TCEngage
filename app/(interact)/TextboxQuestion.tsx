import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface TextboxQuestionProps {
  Title: string;
  Question: string;
  onTextChange: (text: string) => void; // Add onTextChange prop
}

const TextboxQuestion: React.FC<TextboxQuestionProps> = ({ Title, Question, onTextChange }) => {
  const [textValue, setTextValue] = useState<string>('');

  const handleTextChange = (text: string) => {
    setTextValue(text);
    onTextChange(text); // Call the onTextChange callback with the updated text value
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
