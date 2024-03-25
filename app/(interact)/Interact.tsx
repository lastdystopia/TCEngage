import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Question from './Question';

interface InteractProps {
  questions: { Type: number; Title: string; options?: string[]; onChange: (value: any) => void }[];
}

const Interact: React.FC<InteractProps> = ({ questions }) => {
  const [showThanks, setShowThanks] = useState(false);

  const handleSubmit = () => {
    console.log("Question responses:");

    questions.forEach((question) => {
      const getQResponse = (response: any) => {
        switch (question.Type) {
          case 0:
            return response;
          case 1:
            return Array.isArray(response) ? response.join(', ') : response;
          case 2:
            return response ? 'true' : 'false';
          case 3:
            return response.toString();
          case 4:
            return response;
          default:
            throw new Error('Invalid question type');
        }
      };

      console.log(`Question: ${question.Title}`);
      console.log(`Response: ${getQResponse(question.onChange)}`);
    });

    setShowThanks(true);
  };

  // If no questions, show a message
  if (!questions || questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noQuestionsText}>Nothing for now, attend the next show!</Text>
      </View>
    );
  }

  // If showing thanks, show thanks message
  if (showThanks) {
    return (
      <View style={styles.container}>
        <Text style={styles.thanksText}>Thank you for your participation!</Text>
      </View>
    );
  }

  // Show all questions and a submit button
  return (
    <View style={styles.container}>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Question Type={question.Type} question={question.Title} options={question.options} onChange={question.onChange} />
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
