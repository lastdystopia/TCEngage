import React, {useState} from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import CheckboxQuestion from './CheckboxQuestion';
import MultChoiceQuestion from './MultChoiceQuestion';
import RatingQuestion from './RatingQuestion';
import TextboxQuestion from './TextboxQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';

const Form: React.FC = () => {
    const [textboxValue, setTextboxValue] = useState<string>('');
    const [ratingValue, setSelectedRating] = useState<number>();
    const [tfValue, setTFValue] = useState<boolean>();
    const [checkboxValue, setCheckboxValue] = useState<string>('');
    const [multChoiceValue, setMultChoiceValue] = useState<string>('');
  const handleSubmit = () => {
    // Handle form submission here
    console.log("textbox submit",textboxValue);
    console.log("rating submit",ratingValue);
    console.log("tf submit",tfValue);
    console.log("checkbox submit",checkboxValue);
    console.log("mult choice submit",multChoiceValue);
    console.log('Form submitted');
  };

  const handleTextboxChange = (text: string) => {
    setTextboxValue(text);
    console.log('Textbox value:', text);
  };
  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    console.log('Selected Rating:', rating);
  };
  const handleTFChange = (TF: boolean) => {
    setTFValue(TF);
    console.log('TF value:', TF);
  }
  
  const handleCheckboxChange = (response: string) => {
    setCheckboxValue(response);
    console.log('Checkbox response:', response);
  };
  const handleMultChoiceChange = (response: string) => {
    setMultChoiceValue(response);
    console.log('MultChoice response:', response);
  
  }
  // Create instances of each question type
  const checkboxQuestionInstance = (
    <CheckboxQuestion
    Title="Checkbox Question Title"
    Question="Checkbox Question Text"
    Options={["Option1","Option2", "Option3"]}
    onPressChange={handleCheckboxChange}
  />
  );

  const multChoiceQuestionInstance = (
    <MultChoiceQuestion
      Title="Multiple Choice Question Title"
      Question="Multiple Choice Question Text"
      Options={["Option1", "Option2", "Option3"]}
      onResponse={handleMultChoiceChange}
    />
  );

  const ratingQuestionInstance = (
    <RatingQuestion
    Title="Rating Question Title"
    Question="Rating Question Text"
    onRatingPress={handleRatingChange} 
  />
  );

  const textboxQuestionInstance = (
    <TextboxQuestion
  Title="Textbox Question Title"
  Question="Textbox Question Text"
  onTextChange={handleTextboxChange}
/>

  );

  const trueFalseQuestionInstance = (
    <TrueFalseQuestion
      Title="True/False Question Title"
      Question="True/False Question Text"
      onCheckboxChange={handleTFChange}
    />
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text>Form Title</Text>
        {/* Render your form questions here */}
        {checkboxQuestionInstance}
        {ratingQuestionInstance}

        {multChoiceQuestionInstance}
        {textboxQuestionInstance}
        {trueFalseQuestionInstance}
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default Form;
