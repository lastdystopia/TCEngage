import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface TextboxQuestionProps {
  question: string;
  onChange: (text: string) => void;
}

const TextboxQuestion: React.FC<TextboxQuestionProps> = ({ question, onChange }) => {
  return (
    <View>
      <Text>{question}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChange(text)}
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
