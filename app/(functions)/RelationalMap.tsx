import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';

interface ContainerProps {
  imageUrl: string;
}

const RelationalMap: React.FC<ContainerProps> = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        maximumZoomScale={3}  
        minimumZoomScale={1}  
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc', // Gray border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Rounded corners
    overflow: 'hidden',  
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    aspectRatio: 1, // Maintain aspect ratio
    width: '100%',
  },
});

export default RelationalMap;
