import { StyleSheet, ScrollView, ImageBackground , TouchableOpacity} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import Dropdown from '../(functions)/Dropdown';
import FetchButton from '../../FetchPerformanceInfoButton';

import Form from '../(interact)/Form';

export default function IndexScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Ferguson_Center_Outside.jpg')} // Path to your image
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Theater CNU Engage!</Text>
          <Text style={styles.title}>Performance Information</Text>
          <Form/>
          {/* <CheckboxQuestion/> */}
          <FetchButton />
          {/* <DisplayQuestions /> */}
          {/*<Interact/>*/}
          {/* {/* <MultChoiceQuestion
        Title="Romeo and Juliet"
        Question="What is your favorite character in Romeo and Juliet?"
        Option1="Romeo"
        Option2="Juliet"
        Option3="Mercutio"
        Option4="Tybalt"
        Option5="Nurse"
        Option6="Friar Laurence"
        Option7="Benvolio"
        Option8="Paris"
      /> */}
      {/*<RatingQuestion
        Title="Example Performance"
        Question="Rate your overall satisfaction with the performance"
      />*/}
      
      {/* Example of using TextboxQuestion */}
      {/*<TextboxQuestion
        Title="Example Performance"
        Question="Please provide any additional comments or feedback"
      />*/}
      
      {/* Example of using TrueFalseQuestion */}
      {/*<TrueFalseQuestion
        Title="Example Performance"
        Question="Was the performance enjoyable?"
      /> */}
          

          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <EditScreenInfo path="app/(tabs)/index.tsx" />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Adjust the opacity as needed
    padding: 20, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Text color on top of the image
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.5)', // Separator color
  },
});
