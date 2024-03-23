import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Question from './Question';

interface InteractProps {
  questions: { Type: number; question: string; options?: string[]; onChange: (value: any) => void }[];
}

const Interact: React.FC<InteractProps> = ({ questions }) => {
  const [showThanks, setShowThanks] = useState(false);

  const handleSubmit = () => {
    setShowThanks(true);
  };

  if (!questions || questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noQuestionsText}>Nothing for now, attend the next show!</Text>
      </View>
    );
  }

  if (showThanks) {
    return (
      <View style={styles.container}>
        <Text style={styles.thanksText}>Thank you for your participation!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Question {...question} />
        </View>
      ))}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 10,
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  noQuestionsText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  thanksText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Interact;

