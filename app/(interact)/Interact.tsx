import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckboxQuestion from './CheckboxQuestion';

class Interact extends Component {
  checkboxQuestionRefs: React.RefObject<CheckboxQuestion>[] = [];

  constructor(props: {}) {
    super(props);
    // Initialize ref objects for checkbox questions
    for (let i = 0; i < 10; i++) {
      this.checkboxQuestionRefs.push(React.createRef<CheckboxQuestion>());
    }
  }

  handleSubmit = () => {
    // Log responses for each checkbox question
    this.checkboxQuestionRefs.forEach((ref, index) => {
      if (ref.current) {
        console.log(`Checkbox Question ${index + 1} Response:`, ref.current.getResponse());
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Render multiple CheckboxQuestion components */}
        {[...Array(10)].map((_, index) => (
          <CheckboxQuestion
            key={index}
            Title={`Checkbox Question ${index + 1} Title`}
            Question={`Checkbox Question ${index + 1} Question?`}
            Option1={`Option 1`}
            Option2={`Option 2`}
            Option3={`Option 3`}
            Option4={`Option 4`}
            Option5={`Option 5`}
            Option6={`Option 6`}
            Option7={`Option 7`}
            Option8={`Option 8`}
            ref={this.checkboxQuestionRefs[index]}
          />
        ))}
        {/* Submit button */}
        <TouchableOpacity onPress={this.handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  submitButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Interact;
