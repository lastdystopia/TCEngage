import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox, Icon } from '@rneui/themed';

interface TrueFalseQuestionProps {
  Question: string;
  onChange: (checked: boolean) => void;

}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ Question, onChange }) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <View>
      <Text>{Question}</Text>
      <CheckBox
        center
        title="True"
        checkedIcon={<Icon name="checkmark-circle" type="ionicon" color="green" />}
        uncheckedIcon={<Icon name="close-circle" type="ionicon" color="red" />}
        checked={checked}
        onPress={() => {
          setChecked(!checked);
          onChange(!checked);
        }}
      />
      <Text>False</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  trueFalseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TrueFalseQuestion;

/* import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox, Icon } from '@rneui/themed';

interface TrueFalseQuestionProps {
  question: string;
  onChange: (checked: boolean) => void;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ question, onChange }) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <View>
      <Text>{question}</Text>
      <CheckBox
        center
        title="True"
        checkedIcon={<Icon name="checkmark-circle" type="ionicon" color="green" />}
        uncheckedIcon={<Icon name="close-circle" type="ionicon" color="red" />}
        checked={checked}
        onPress={() => {
          setChecked(!checked);
          onChange(!checked);
        }}
      />
      <Text>False</Text>
    </View>
  );
};

export default TrueFalseQuestion;*/