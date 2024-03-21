import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const InteractiveScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    
  // Fetch data from the server when the component mounts
  useEffect(() => {
    fetchData();
  }, []);
  
  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost/phpmyadmin/index.php?route=/sql&db=cnuengage&table=performanceengagement&pos=0');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
    }
  };
  
    // State variables to store user responses for each question
  const [responseQ1, setResponseQ1] = useState('');
  const [responseQ2, setResponseQ2] = useState('');
  const [responseQ3, setResponseQ3] = useState('');
  const [responseQ4, setResponseQ4] = useState('');
  const [responseQ5, setResponseQ5] = useState('');

  // Function to handle the submission of responses
  const handleSubmit = () => {
    // Perform actions with the collected responses 
    try{

        console.log('Submitting responses:', {
        responseQ1,
        responseQ2,
        responseQ3,
        responseQ4,
        responseQ5,
        });
        alert("Your responses have been successfully submitted.");

        navigation.navigate('MainTabs');


    }
    catch{
        {/* Add more catch responses here*/}
        alert("There has been an error with your response, please try again.");
    }
  };

    return (
        <View style={styles.container}>
           
            <Text>Interactive Content Here</Text>
            {/* Put these in a loop for questions when you connect the database */}
            <Text>Data from Server:</Text>
      <Text>{JSON.stringify(data)}</Text>
            <Text>Temp Q1</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your answer here"
        onChangeText={text => setResponseQ1(text)}
      />

      <Text>Temp Q2</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your answer here"
        onChangeText={text => setResponseQ2(text)}
      />

      <Text>Temp Q3</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your answer here"
        onChangeText={text => setResponseQ3(text)}
      />

      <Text>Temp Q4</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your answer here"
        onChangeText={text => setResponseQ4(text)}
      />

      <Text>Temp Q5</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your answer here"
        onChangeText={text => setResponseQ5(text)}
      />

      {/* For now just a back button, but submit to db here */}
      <Button
        onPress={handleSubmit}
        title="Submit"
        color="#941512"
      />

        </View>
       
    );


};


export default InteractiveScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E6E6FA',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      padding: 16,
    },
  });