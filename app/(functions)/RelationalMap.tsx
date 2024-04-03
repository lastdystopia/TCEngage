import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

interface ImageComponentProps {
  imageUrl: string;
}

const RelationalMap: React.FC<ImageComponentProps> = ({ imageUrl }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleImageSize = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={toggleImageSize} activeOpacity={1} style={styles.container}>
      <Image source={{ uri: imageUrl }} style={[styles.image, expanded && styles.expandedImage]} />
    </TouchableOpacity>
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
  expandedImage: {
    width: screenWidth, // Expand to full width
    height: screenHeight, // Expand to full height
    resizeMode: 'contain', // Adjust image content to fit container
  },
});

export default RelationalMap;
