import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

interface RatingQuestionProps {
  Title: string;
  Question: string;
  onRatingPress: (rating: number) => void; 
}


const RatingQuestion: React.FC<RatingQuestionProps> = ({ Title, Question, onRatingPress }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleRatingPress = (rating: number) => {
    setSelectedRating(rating);
    onRatingPress(rating); 
    console.log('Rating Question - Title:', Title, 'Question:', Question, 'Response:', rating);

  };
  const getResponse = () => {
    return "meow";
  };
  const renderRatingIcon = (rating: number) => (
    <TouchableOpacity
      key={rating}
      onPress={() => handleRatingPress(rating)}
      style={styles.iconContainer}
    >
      <Icon
        name={selectedRating && selectedRating >= rating ? 'heart' : 'heart-outline'}
        type="ionicon"
        color={selectedRating && selectedRating >= rating ? 'red' : 'gray'}
      />
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>{Question}</Text>
      <View style={styles.iconsContainer}>
        {[1, 2, 3, 4, 5].map((rating) => renderRatingIcon(rating))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginHorizontal: 5,
  },
});

export default RatingQuestion;
