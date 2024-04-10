import React, {useState, useEffect} from 'react';
import { Text } from '../../components/Themed';

import { View, ScrollView, Button, StyleSheet, TouchableOpacity, Image  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckboxQuestion from './CheckboxQuestion';
import MultChoiceQuestion from './MultChoiceQuestion';
import RatingQuestion from './RatingQuestion';
import TextboxQuestion from './TextboxQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import { PROTOCOL, BASE_URL, PORT } from '../../constants/Config';
import LoginPage from './Login';
interface PerformanceInfo {
  Title: string;
  Summary: string;
  StartDate: string;
  EndDate: string;
  RelationalMap: string;
}
const Form: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showEngageBox, setShowEngageBox] = useState<boolean>(true); 
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);  

  const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfo[]>([]);
  const [performanceTitle, setPerformanceTitle] = useState<string>('');
  // depracated but everything breaks if i remove these
  const [checkboxQ, setCheckQ] = useState<string>();
  const [textboxQ, setTextQ] = useState<string>();
  const [multQ, setmultQ] = useState<string>();
  const [tfQ, settfQ] = useState<string>();
  const [ratingQ, setRatingQ] = useState<string>();  
// These are the questions that will be displayed
  const [checkboxQuestions, setCheckboxQuestions] = useState<any[]>([]);
  const [multchoiceQuestions, setMultChoiceQuestions] = useState<any[]>([]);
  const [textboxQuestions, setTextboxQuestions]=useState<any[]>([]);
  const [ratingQuestions, setRatingQuestions]=useState<any[]>([]);
  const [tfQuestions, setTFQuestions]=useState<any[]>([]);
// These are the values stored in each question - depracated
    
const [textboxValue, setTextboxValue] = useState<string>('');
const [ratingValue, setSelectedRating] = useState<number>(1);
const [tfValue, setTFValue] = useState<boolean>(false);
const [checkboxValue, setCheckboxValue] = useState<string>('');
const [multChoiceValue, setMultChoiceValue] = useState<string>('');
     // responses
     const [checkboxResponses, setCheckboxResponses] = useState<{ [key: string]: string }>({});
     const [textboxResponses, setTextboxResponses] = useState<{ [key: string]: string }>({});
     const [multChoiceResponses, setMultChoiceResponses] = useState<{ [key: string]: string }>({});
     const [ratingResponses, setRatingResponses] = useState<{ [key: string]: string }>({});
     const [tfResponses, setTFResponses] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchPerformanceInfo();
  }, []);
  
  useEffect(() => {
    if (performanceInfo.length > 0) {
      fetchCheckboxQuestions();
    fetchMultChoiceQuestions();
    fetchRatingQuestions();
    fetchTextboxQuestions();
    fetchTFQuestions();
    }
  }, [performanceInfo]);
  const fetchPerformanceInfo = async () => {
    try {
      const response = await fetch(PROTOCOL + "://" + BASE_URL+':'+PORT+'/performanceinfo');
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
      console.log('Error fetching performance info in Form:', error);
      alert("Due to internal server issues, we are unable to display performance information at this time. We sincerely apologize for the inconvenience.");
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
        const response = await fetch(PROTOCOL + "://" + BASE_URL+':'+PORT+'/CheckboxQuestion?Title=${info.Title}');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      }));
      const questions = checkboxQuestions.flat().map(question => question.Question);
      setCheckQ(questions[0]);
      setCheckboxQuestions(checkboxQuestions);
    } catch (error) {
    alert("Due to an internal server error, we are unable to display certain checkbox questions at this time. We apologize for the inconvenience.");
      console.log('Error fetching checkbox questions:', error);
    }
  };
  
  
  const fetchMultChoiceQuestions = async() =>{
    try{
      const multchoiceQuestions = await Promise.all(performanceInfo.map(async info => {
        const response = await fetch(PROTOCOL + "://" + BASE_URL+':'+PORT+'/MultChoiceQuestion?Title${info.Title}');
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
        alert("Due to an internal server error, we are unable to display certain multiple choice questions at this time. We apologize for the inconvenience.");

      console.log("error fetching multiple choice questions form-side:", error);
    }
  };
  const fetchTextboxQuestions = async() =>{
    try{
      const textboxQuestions = await Promise.all(performanceInfo.map(async info => {
        const response = await fetch(PROTOCOL + "://" + BASE_URL+':'+PORT+'/TextboxQuestion?Title${info.Title}');
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
        alert("Due to an internal server error, we are unable to display textbox questions at this time. We apologize for the inconvenience.");

      console.log("error fetching textbox questions:", error);
    }
  };
  const fetchRatingQuestions = async()=>{
    try{
      const ratingQuestions = await Promise.all(performanceInfo.map(async info => {
        const response = await fetch(PROTOCOL + "://" + BASE_URL+':'+PORT+'/RatingQuestion?Title${info.Title}');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      }));
      const questions = ratingQuestions.flat().map(question => question.Question);
      setRatingQ(questions[0]);
      setRatingQuestions(ratingQuestions);
    }
    
    catch(error){
        alert("Due to an internal server error, we are unable to display rating questions at this time. We apologize for the inconvenience.");

    console.log("error fetching rating questions: ", error);}
  };
  const fetchTFQuestions = async()=>{
    try{
      const tfQuestions = await Promise.all(performanceInfo.map(async info => {
        const response = await fetch(PROTOCOL + "://" + BASE_URL+':'+PORT+'/TrueFalseQuestion?Title${info.Title}');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      }));
      const questions = tfQuestions.flat().map(question => question.Question);
      settfQ(questions[0]); 
      setTFQuestions(tfQuestions);
    }

    catch(error){
        alert("Due to an internal server error, we are unable to display true/false at this time. We apologize for the inconvenience.");

    console.log("error fetching true false questions: ", error);}
  };

const generateCheckboxes = () => {
  return checkboxQuestions.flat().map((question, index) => (
    <CheckboxQuestion
      key={index}
      Title={question.Title}
      Question={question.Question}
      Options={[question.Option1, question.Option2, question.Option3, question.Option4, question.Option5, question.Option6, question.Option7, question.Option8]}
      onPressChange={(response) => handleCheckboxChange(question.Question, response)} // Pass the question and response to handleCheckboxChange
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
//onResponse={handleMultChoiceChange}
onResponse={(response) => handleMultChoiceChange(question.Question, response)}  

/>
    ));
  };
  
  
  const generateTextbox = () =>{
    return textboxQuestions.flat().map((question, index)=>(
      <TextboxQuestion
      key = {index} Title={question.Title} Question={question.Question} 
      //onTextChange={handleTextboxChange}
      onTextChange={(response) => handleTextboxChange(question.Question, response)}
      />
    ));
   } ;
   const generateRating = () =>{
    return ratingQuestions.flat().map((question, index)=>(
      <RatingQuestion
      key={index} Title={question.Title} Question={question.Question} 
      //onRatingPress={handleRatingChange}
      onRatingPress={(response) => handleRatingChange(question.Question, response)}
      />
    ));
   

   };
   const generateTF = () =>{
    return tfQuestions.flat().map((question, index)=>(
      <TrueFalseQuestion
      key={index} Title={question.Title} Question={question.Question} 
      //onCheckboxChange={handleTFChange}
onCheckboxChange={(response) => handleTFChange(question.Question, response)}
      />
    ));
   
   }; 
const handleSubmit = () => {
  // Iterate through questions and their responses
  Object.entries(checkboxResponses).forEach(([question, response]) => {
    // Log question and its associated response
    console.log("-------1---------");
    console.log(`${question}: ${response}`);
  });
  Object.entries(textboxResponses).forEach(([question, response]) => {
    // Log question and its associated response
    console.log("-------1---------");
    console.log(`${question}: ${response}`);
  });
  Object.entries(ratingResponses).forEach(([question, response]) => {
    // Log question and its associated response
    console.log("-------1---------");
    console.log(`${question}: ${response}`);
  });
  Object.entries(multChoiceResponses).forEach(([question, response]) => {
    // Log question and its associated response
    console.log("-------1---------");
    console.log(`${question}: ${response}`);
  });
  Object.entries(tfResponses).forEach(([question, response]) => {
    // Log question and its associated response
    console.log("-------1---------");
    console.log(`${question}: ${response}`);
  });
  // Validate checkbox responses
    const missingCheckboxResponses = checkboxQuestions.flat().filter(question => !checkboxResponses[question.Question]);

    // Validate textbox responses
    const missingTextboxResponses = textboxQuestions.flat().filter(question => !textboxResponses[question.Question]);

    // Validate multichoice responses
    const missingMultChoiceResponses = multchoiceQuestions.flat().filter(question => !multChoiceResponses[question.Question]);

    // Validate rating responses
    const missingRatingResponses = ratingQuestions.flat().filter(question => !ratingResponses[question.Question]);

    // Validate true/false responses
    const missingTFResponses = tfQuestions.flat().filter(question => !tfResponses[question.Question]);

    // Check if any responses are missing
    if (
      missingCheckboxResponses.length > 0 ||
      missingTextboxResponses.length > 0 ||
      missingMultChoiceResponses.length > 0 ||
      missingRatingResponses.length > 0 ||
      missingTFResponses.length > 0
    ) {
      // Display popup
      alert("Please fill out all fields.");
    } else {
      // All values are defined, submit engagement info
      submitEngagementInfo();
      setSubmitted(true);
    }
  };
  
const submitEngagementInfo = async () => {
    try {
      const requests: Promise<Response>[] = []; // Define requests as an array of Promises  
      
      // Array of objects containing question types and their corresponding values
      const checkboxQuestionResponses = Object.entries(checkboxResponses).map(([question, response]) => ({
        questionType: question,
        response: response,
      }));
      const textboxQuestionResponses = Object.entries(textboxResponses).map(([question, response]) => ({
        questionType: question,
        response: response,
      }));
      const multChoiceQuestionResponses = Object.entries(multChoiceResponses).map(([question, response]) => ({
        questionType: question,
        response: response,
      }));
      const tfQuestionResponses = Object.entries(tfResponses).map(([question, response]) => ({
        questionType: question,
        response: response,
      }));
      const ratingQuestionResponses = Object.entries(ratingResponses).map(([question, response]) => ({
        questionType: question,
        response: response,
      }));
      const questionResponses = checkboxQuestionResponses
      .concat(textboxQuestionResponses)
      .concat(multChoiceQuestionResponses)
      .concat(tfQuestionResponses)
      .concat(ratingQuestionResponses);
      console.log("kdskfkdf", textboxQuestionResponses);
            // Iterate over each question type and response
      questionResponses.forEach(({ questionType, response }) => {
        requests.push(
          fetch(PROTOCOL + "://" + BASE_URL+':'+PORT+'/engagementinfo', {
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
    alert("Due to an error, we are unable to receive your submission at this time. Please try again later.");
      console.log('Error submitting engagement info Form-side:', error);
    }
  };
  
  const handleCheckboxChange = (question: string, response: string) => {
    // Update the response for the corresponding question
    setCheckboxResponses(prevState => ({
      ...prevState,
      [question]: response
    }));
  };
  
  const handleMultChoiceChange = (question: string, response: string) => {
    // Update the response for the corresponding question
    setMultChoiceResponses(prevState => ({
      ...prevState,
      [question]: response
    }));
  };

  const handleTextboxChange = (question: string, text: string) => {
    // Update the response for the corresponding question
    setTextboxResponses(prevState => ({
      ...prevState,
      [question]: text
    }));
  };
  
  const handleRatingChange = (question: string, rating: number) => {
    // Update the response for the corresponding question
    setRatingResponses(prevState => ({
      ...prevState,
      [question]: rating.toString()
    }));
  };
  
  const handleTFChange = (question: string, TF: boolean) => {
    // Update the response for the corresponding question
    setTFResponses(prevState => ({
      ...prevState,
      [question]: TF.toString()
    }));
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      
      
        <View style={styles.container}>
          {submitted ? (
            // Submitted message
            <View style={styles.gifContainer}>
              <Text style={styles.thankYouText}>Thank you for your submission!</Text>
              <Image source={require('../../assets/images/thank-you-icegif-7.gif')} style={styles.gif} />
            </View>
          ) : (
            // Form content
            <>
              <Text style={styles.formTitle} >Interaction and Feedback</Text>
              <View style={styles.questionContainer}>
                {generateCheckboxes()}
                {generateMultChoice()}
                {generateTextbox()}
                {generateRating()}
                {generateTF()}
              </View>
            
              <TouchableOpacity onPress={handleSubmit} style={{ alignItems: 'center' }}>
                <Icon name="check" size={35} color="#3b5098"   />
              </TouchableOpacity>
            </>
          )}
        </View>
      
    </ScrollView>
  );
};
export default Form;
const styles = StyleSheet.create({
  engageBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
  },
  engageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b5098',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    borderRadius: 10,
    margin: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
  },
  gif: {
    width: 200,
    height: 200,
  },
  questionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    margin: 10,
  },
  gifContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifInnerContainer: {
    alignItems: 'center',
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  submitButton: {
    alignItems: 'center',
  },
});