import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Question from './Question';

interface MultChoiceQuestionProps {
  Title: string;
  Question: string;
  Options: string[];
  onResponse: (response: string) => void;
}

const MultChoiceQuestion: React.FC<MultChoiceQuestionProps> = ({ Title, Question, Options, onResponse }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    onResponse(option);
    console.log('MultChoice Question - Question:', Question, 'Response:', option);
    // Perform any other necessary actions with the selected option
  };

  const renderOptionButton = (option: string) => (
    <TouchableOpacity
      key={option}
      onPress={() => handleOptionPress(option)}
      style={[
        styles.optionButton,
        selectedOption === option ? styles.selectedOption : null,
      ]}
    >
      <Text>{option}</Text>
    </TouchableOpacity>
  );

  const getResponse = () => {
    return selectedOption || "";
  };

  return (
    <View>
      <Text>{Question}</Text>
      <View style={styles.optionsContainer}>
        {Options.map((option) => renderOptionButton(option))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
});

export default MultChoiceQuestion;
