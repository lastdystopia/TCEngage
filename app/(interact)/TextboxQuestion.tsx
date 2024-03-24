import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface TextboxQuestionProps {
  Question: string;
  onChange: (text: string) => void;
}

const TextboxQuestion: React.FC<TextboxQuestionProps> = ({ Question, onChange }) => {
  return (
    <View>
      <Text>{Question}</Text>
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
