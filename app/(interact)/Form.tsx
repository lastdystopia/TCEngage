import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import CheckboxQuestion from './CheckboxQuestion';
import MultChoiceQuestion from './MultChoiceQuestion';
import RatingQuestion from './RatingQuestion';
import TextboxQuestion from './TextboxQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
interface PerformanceInfo {
  Title: string;
  Summary: string;
  StartDate: string;
  EndDate: string;
  RelationalMap: string;
}
const Form: React.FC = () => {
  const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfo[]>([]);
  const [performanceTitle, setPerformanceTitle] = useState<string>('');
  const [checkboxQ, setCheckQ] = useState<string>();
  const [textboxQ, setTextQ] = useState<string>();
  const [multQ, setmultQ] = useState<string>();
  const [tfQ, settfQ] = useState<string>('false');
  const [ratingQ, setRatingQ] = useState<string>();


  const [checkboxQuestions, setCheckboxQuestions] = useState<any[]>([]);
  const [multchoiceQuestions, setMultChoiceQuestions] = useState<any[]>([]);
  const [textboxQuestions, setTextboxQuestions]=useState<any[]>([]);
  const [ratingQuestions, setRatingQuestions]=useState<any[]>([]);
  const [tfQuestions, setTFQuestions]=useState<any[]>([]);

    const [textboxValue, setTextboxValue] = useState<string>('');
    const [ratingValue, setSelectedRating] = useState<number>(1);
    const [tfValue, setTFValue] = useState<boolean>(false);
    const [checkboxValue, setCheckboxValue] = useState<string>('');
    const [multChoiceValue, setMultChoiceValue] = useState<string>('');
    
  useEffect(() => {
    fetchPerformanceInfo();
  }, []);
  
  useEffect(() => {
    if (performanceInfo.length > 0) {
      fetchCheckboxQuestions();
      fetchMultChoiceQuestions();
      fetchTextboxQuestions();
      fetchRatingQuestions();
      fetchTFQuestions();
    }
  }, [performanceInfo]);
  const fetchPerformanceInfo = async () => {
    try {
      const response = await fetch('http://192.168.11.115:3002/performanceInfo');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: PerformanceInfo[] = await response.json();
      const filteredData = filterPerformanceInfo(data);

      // Extract titles
    const titles = filteredData.map(info => info.Title);
    // Set performanceTitle to the first title i dont know why i made this handle multiples
    setPerformanceTitle(titles[0]); 

      setPerformanceInfo(filteredData);
    } catch (error) {
      console.error('Error fetching performance info:', error);
    }
  };

  const filterPerformanceInfo = (data: PerformanceInfo[]): PerformanceInfo[] => {
    const currentDate = new Date();
    const filteredData = data.filter(info => {
      const startDate = new Date(info.StartDate);
      const endDate = new Date(info.EndDate);
      return startDate <= currentDate && currentDate <= endDate;
    });
    return filteredData;
  };

  const fetchCheckboxQuestions = async () => {
    try {
      const checkboxQuestions = await Promise.all(performanceInfo.map(async info => {
        const response = await fetch(`http://192.168.11.115:3002/CheckboxQuestion?Title=${info.Title}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      }));
      const questions = checkboxQuestions.flat().map(question => question.Question);
      setCheckQ(questions[0]);
      setCheckboxQuestions(checkboxQuestions);
    } catch (error) {
      console.error('Error fetching checkbox questions:', error);
    }
  };
  const fetchMultChoiceQuestions = async() =>{
    try{
      const multchoiceQuestions = await Promise.all(performanceInfo.map(async info => {
        const response = await fetch(`http://192.168.11.115:3002/MultChoiceQuestion?Title${info.Title}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      }));
      const questions = multchoiceQuestions.flat().map(question => question.Question);
      setmultQ(questions[0]);
      setMultChoiceQuestions(multchoiceQuestions);
    }
    
    catch(error){
      console.error("error fetching multiple choice questiosn:", error);
    }
  };
  const fetchTextboxQuestions = async() =>{
    try{
      const textboxQuestions = await Promise.all(performanceInfo.map(async info => {
        const response = await fetch(`http://192.168.11.115:3002/TextboxQuestion?Title${info.Title}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      }));
      const questions = textboxQuestions.flat().map(question => question.Question);
      setTextQ(questions[0]);
      setTextboxQuestions(textboxQuestions);
    }
    catch(error){
      console.error("error fetching textbox questions:", error);
    }
  };
  const fetchRatingQuestions = async()=>{
    try{
      const ratingQuestions = await Promise.all(performanceInfo.map(async info => {
        const response = await fetch(`http://192.168.11.115:3002/RatingQuestion?Title${info.Title}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      }));
      const questions = ratingQuestions.flat().map(question => question.Question);
      setRatingQ(questions[0]);
      setRatingQuestions(ratingQuestions);
    }
    
    catch(error){console.error("error fetching rating questions: ", error);}
  };
  const fetchTFQuestions = async()=>{
    try{
      const tfQuestions = await Promise.all(performanceInfo.map(async info => {
        const response = await fetch(`http://192.168.11.115:3002/TrueFalseQuestion?Title${info.Title}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      }));
      const questions = tfQuestions.flat().map(question => question.Question);
      settfQ(questions[0]); 
      setTFQuestions(tfQuestions);
    }

    catch(error){console.error("error fetching true false questions: ", error);}
  };
  
  const generateCheckboxes = () => {
    return checkboxQuestions.flat().map((question, index) => (
      <CheckboxQuestion
        key={index}
        Title={question.Title}
        Question={question.Question}
        Options={[question.Option1, question.Option2, question.Option3, question.Option4, question.Option5, question.Option6, question.Option7, question.Option8]}
        onPressChange={handleCheckboxChange}
      />
    ));
  };
  const generateMultChoice = () =>{
    return multchoiceQuestions.flat().map((question, index)=>(
<MultChoiceQuestion
key={index}
Title={question.Title}
Question={question.Question}
Options={[question.Option1, question.Option2, question.Option3, question.Option4, question.Option5, question.Option6, question.Option7, question.Option8]}
onResponse={handleMultChoiceChange}
/>
    ));
  };
   const generateTextbox = () =>{
    return textboxQuestions.flat().map((question, index)=>(
      <TextboxQuestion
      key = {index} Title={question.Title} Question={question.Question} onTextChange={handleTextboxChange}
      />
    ));
   } ;
   const generateRating = () =>{
    return ratingQuestions.flat().map((question, index)=>(
      <RatingQuestion
      key={index} Title={question.Title} Question={question.Question} onRatingPress={handleRatingChange}
      />
    ));
   

   };
   const generateTF = () =>{
    return tfQuestions.flat().map((question, index)=>(
      <TrueFalseQuestion
      key={index} Title={question.Title} Question={question.Question} onCheckboxChange={handleTFChange}
      />
    ));
   
   };
    /*
     */
    const handleSubmit = () => {
      console.log("----------------------");
      console.log(performanceTitle);
      console.log(checkboxQ, ": ", checkboxValue);
      console.log(multQ, ": ", multChoiceValue);
      console.log(textboxQ, ": ", textboxValue);
      console.log(ratingQ, ": ", ratingValue);
      console.log(tfQ, ": ", tfValue);
  
      // Check if any value is undefined
      if (
          performanceTitle === undefined ||
          checkboxQ === undefined ||
          multQ === undefined ||
          textboxQ === undefined ||
          ratingQ === undefined ||
          tfQ === undefined
      ) {
          // Display popup
          alert("Please fill out all data.");
      } else {
          // All values are defined, submit engagement info
          submitEngagementInfo();
      }
  };
  
  const submitEngagementInfo = async () => {
    try {
      const requests: Promise<Response>[] = []; // Define requests as an array of Promises  
      // Array of objects containing question types and their corresponding values
      const questionResponses = [
        { questionType: checkboxQ, response: checkboxValue },
        { questionType: multQ, response: multChoiceValue },
        { questionType: textboxQ, response: textboxValue },
        { questionType: ratingQ, response: ratingValue },
        { questionType: tfQ, response: tfValue }
      ];
  console.log(questionResponses);
      // Iterate over each question type and response
      questionResponses.forEach(({ questionType, response }) => {
        requests.push(
          fetch('http://192.168.11.115:3002/engagementInfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: performanceTitle,
              question: questionType,
              response: response,
            }),
          })
        );
      });
  
      // Execute all fetch requests concurrently
      await Promise.all(requests);
  
      console.log('All engagement info submitted successfully');
    } catch (error) {
      console.error('Error submitting engagement info:', error);
    }
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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text>Form Title</Text>
        {generateCheckboxes()}
        {generateMultChoice()}
        {generateTextbox()}
        {generateRating()}
        {generateTF()}
        
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default Form;
