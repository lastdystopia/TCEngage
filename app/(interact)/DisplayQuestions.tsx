import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import CheckboxQuestion from './CheckboxQuestion';
import RatingQuestion from './RatingQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import TextboxQuestion from './TextboxQuestion';
import MultChoiceQuestion from './MultChoiceQuestion';

// Define interfaces
interface PerformanceInfo {
  Title: string;
  Summary: string;
  StartDate: string;
  EndDate: string;
  RelationalMap: string;
}

interface CheckboxQuestion {
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

interface MultChoiceQuestion {
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
interface TrueFalseQuestion{
    Title: string;
    Question: string;
}
interface TextboxQuestion{Title: string; Question: string;}
interface RatingQuestion{Title: string; Question: string;}
const DisplayQuestions = () => {
  // State variables to store fetched data
  const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfo[]>([]);
  const [checkboxQuestions, setCheckboxQuestions] = useState<CheckboxQuestion[]>([]);
  const [multChoiceQuestions, setMultChoiceQuestions] = useState<MultChoiceQuestion[]>([]);
const [trueFalseQuestions, setTrueFalseQuestions] = useState<TrueFalseQuestion[]>([]);
const [textboxQuestions, setTextboxQuestions] = useState<TextboxQuestion[]>([]);
const [ratingQuestions, setRatingQuestions] = useState<RatingQuestion[]>([]);
  // Function to fetch performance info data
  const fetchPerformanceInfo = async () => {
    try {
      // Fetch performance info data
      const response = await fetch('http://192.168.11.115:3001/performanceInfo');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: PerformanceInfo[] = await response.json();
      //console.log(data);
      // Filter performance info based on current date
      const filteredData = filterPerformanceInfo(data);
      console.log(filteredData);
      // Set filtered performance info to state
      setPerformanceInfo(filteredData);
    } catch (error) {
      console.error('Error fetching performance info:', error);
    }
  };

  // Function to fetch checkbox questions data based on performance info title
  const fetchCheckboxQuestions = async (title: string) => {
    try {
      // Fetch checkbox questions data
      const response = await fetch(`http://192.168.11.115:3001/CheckboxQuestion?Title=${title}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: CheckboxQuestion[] = await response.json();
      console.log(data);
      // Set checkbox questions to state
      setCheckboxQuestions(data);
    } catch (error) {
      console.error('Error fetching checkbox questions:', error);
    }
  };
// Function to fetch multiple choice questions data based on performance info title
const fetchMultChoiceQuestions = async (title: string) => {
    try {
      // Fetch checkbox questions data
      const response = await fetch(`http://192.168.11.115:3001/MultChoiceQuestion?Title=${title}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: MultChoiceQuestion[] = await response.json();
      console.log(data);
      // Set checkbox questions to state
      setMultChoiceQuestions(data);
    } catch (error) {
      console.error('Error fetching checkbox questions:', error);
    }
  };

const fetchTextboxQuestions = async (title: string) => {
    try {
      // Fetch checkbox questions data
      const response = await fetch(`http://192.168.11.115:3001/TextboxQuestion?Title=${title}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: TextboxQuestion[] = await response.json();
      console.log(data);
      // Set checkbox questions to state
      setTextboxQuestions(data);
    } catch (error) {
      console.error('Error fetching textbox questions:', error);
    }
  };
  const fetchTrueFalseQuestions = async (title: string) => {
    try {
      // Fetch checkbox questions data
      const response = await fetch(`http://192.168.11.115:3001/TrueFalseQuestion?Title=${title}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: TrueFalseQuestion[] = await response.json();
      console.log(data);
      // Set checkbox questions to state
      setTrueFalseQuestions(data);
    } catch (error) {
      console.error('Error fetching TrueFalse questions:', error);
    }
  };//Rating

  const fetchRatingQuestions = async (title: string) => {
    try {
      // Fetch checkbox questions data
      const response = await fetch(`http://192.168.11.115:3001/RatingQuestion?Title=${title}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: RatingQuestion[] = await response.json();
      console.log(data);
      // Set rating questions to state
      setRatingQuestions(data);
    } catch (error) {
      console.error('Error fetching rating questions:', error);
    }
  };


  // Function to filter performance info based on current date
  const filterPerformanceInfo = (data: PerformanceInfo[]): PerformanceInfo[] => {
    const currentDate = new Date();
    const filteredData = data.filter(info => {
      const startDate = new Date(info.StartDate);
      const endDate = new Date(info.EndDate);
      return startDate <= currentDate && currentDate <= endDate;
    });
    return filteredData;
  };

  // Effect to fetch performance info data when component mounts
  useEffect(() => {
    fetchPerformanceInfo();
  }, []);

  // Effect to fetch questions data when performance info data changes
  useEffect(() => {
    // Check if there is performance info data available
    if (performanceInfo.length > 0) {
      // Fetch checkbox questions for each performance info
      performanceInfo.forEach(info => {
        fetchCheckboxQuestions(info.Title);
        fetchMultChoiceQuestions(info.Title);
        fetchTextboxQuestions(info.Title);
        fetchRatingQuestions(info.Title);
        fetchTrueFalseQuestions(info.Title);
      });
    }
  }, [performanceInfo]);

  // Handle press event for the DisplayQuestions button
  const handlePress = () => {
    // Implement any logic you want to execute when the button is pressed
    console.log("Button pressed!");
  };
  const handleSubmit = () => {
    // Log CheckboxQuestion responses
    console.log("Checkbox Question Responses:");
    checkboxQuestions.forEach(question => {
      const response = question.Option1;
      console.log(`Title: ${question.Title}, Question: ${question.Question}, Response: ${response}`);
    });
  
    // Log MultChoiceQuestion responses
    console.log("MultChoice Question Responses:");
    multChoiceQuestions.forEach(question => {
      const response = question.Option1;
      console.log(`Title: ${question.Title}, Question: ${question.Question}, Response: ${response}`);
    });
  
    // Log TrueFalseQuestion responses
    console.log("TrueFalse Question Responses:");
    trueFalseQuestions.forEach(question => {
      const response = question.Title;
      console.log(`Title: ${question.Title}, Question: ${question.Question}, Response: ${response}`);
    });
  
    // Log RatingQuestion responses
    console.log("Rating Question Responses:");
    ratingQuestions.forEach(question => {
      const response = question.Question;
      console.log(`Title: ${question.Title}, Question: ${question.Question}, Response: ${response}`);
    });
  
    // Log TextboxQuestion responses
    console.log("Textbox Question Responses:");
    textboxQuestions.forEach(question => {
      const response = question.Title;
      console.log(`Title: ${question.Title}, Question: ${question.Question}, Response: ${response}`);
    });
  };
   
  return (
    <View>
    <TouchableOpacity onPress={handlePress}>
      <Text>Display Questions</Text>
    </TouchableOpacity>
    {/* Render CheckboxQuestion components */}
    {checkboxQuestions.map((question, index) => (
      <CheckboxQuestion key={index} {...question} />
    ))}
    {multChoiceQuestions.map((question, index) => (
      <MultChoiceQuestion key={index} {...question} />
    ))}
    {trueFalseQuestions.map((question, index) => (
      <TrueFalseQuestion key={index} {...question} />
    ))}
    {ratingQuestions.map((question, index) => (
      <RatingQuestion key={index} {...question} />
    ))}
    {textboxQuestions.map((question, index) => (
      <TextboxQuestion key={index} {...question} />
    ))}
    {/* Submit button */}
    <TouchableOpacity onPress={handleSubmit}>
      <Text>Submit</Text>
    </TouchableOpacity>
  </View>
  );
};

export default DisplayQuestions;
