import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MultChoiceQuestionProps {
  Question: string;
  options: string[];
  onChange: (selectedOption: string | null) => void;
}

const MultChoiceQuestion: React.FC<MultChoiceQuestionProps> = ({ Question, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    onChange(option);
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

  return (
    <View>
      <Text>{Question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => renderOptionButton(option))}
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
