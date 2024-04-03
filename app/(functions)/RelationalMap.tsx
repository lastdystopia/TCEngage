import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface ImageComponentProps {
  imageUrl: string; 
}

const RelationalMap: React.FC<ImageComponentProps> = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc', // Gray border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Rounded corners
    overflow: 'hidden', // Clip image to container bounds
  },
  image: {
    aspectRatio: 1, // Maintain aspect ratio
    width: '100%', 
  },
});

export default RelationalMap;
