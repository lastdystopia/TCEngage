import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from '@rneui/themed';
import Question from './Question';

interface TrueFalseQuestionProps {
  Title: string;
  Question: string;
  onCheckboxChange: (isChecked: boolean) => void; 
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ Title, Question, onCheckboxChange }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = (isChecked: boolean) => {
    setChecked(isChecked);
    onCheckboxChange(isChecked);
    console.log('True/False Question - Title:', Title, 'Question:', Question, 'Response:', isChecked);
    // Perform any other necessary actions with the checkbox
  };
  
  const getResponse = () => {
    return "meow";
  };
  return (
    <View>
      <Text>{Question}</Text>
      <CheckBox
        center
        title="True"
        checked={checked}
        onPress={() => handleCheckboxChange(!checked)}
      />
    </View>
  );
};

export default TrueFalseQuestion;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { CheckBox, Icon } from '@rneui/themed';

// interface TrueFalseQuestionProps {
//   Question: string;
//   onChange: (checked: boolean) => void;
// }

// const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ Question, onChange }) => {
//   const [checked, setChecked] = useState<boolean>(false);

//   const handleCheckboxChange = (isChecked: boolean) => {
//     setChecked(isChecked);
//     onChange(isChecked);
//     getResponse(); // Call the getResponse function to get the response from the question
//   };

//   const getResponse = () => {
//     const response = checked ? 'true' : 'false';
//     console.log('True/False Question - Question:', Question, 'Response:', response);
//     return response;
//   };

//   return (
//     <View>
//       <Text>{Question}</Text>
//       <CheckBox
//         center
//         title="True"
//         checkedIcon={<Icon name="checkmark-circle" type="ionicon" color="green" />}
//         uncheckedIcon={<Icon name="close-circle" type="ionicon" color="red" />}
//         checked={checked}
//         onPress={() => handleCheckboxChange(!checked)}
//       />
//       <Text>False</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   trueFalseContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

// export default TrueFalseQuestion;