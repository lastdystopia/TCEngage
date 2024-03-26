import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MultChoiceQuestionProps {
  Title: string;
  Question: string;
  Option1: string;
  Option2: string;
  Option3: string;
  Option4: string;
  Option5: string;
  Option6: string;
  Option7: string;
  Option8: string;
}

const MultChoiceQuestion: React.FC<MultChoiceQuestionProps> = ({
  Title,
  Question,
  Option1,
  Option2,
  Option3,
  Option4,
  Option5,
  Option6,
  Option7,
  Option8,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
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
    return "meow";
  };
  return (
    <View>
      <Text>{Question}</Text>
      <View style={styles.optionsContainer}>
        {[
          Option1,
          Option2,
          Option3,
          Option4,
          Option5,
          Option6,
          Option7,
          Option8,
        ].map((option) => renderOptionButton(option))}
      </View>
    </View>
  );
};

  // Method to get the selected option
  const getSelectedOption = () => {
    return getSelectedOption;
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
