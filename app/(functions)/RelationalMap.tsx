import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface ImageComponentProps {
  imageUrl: string; 
}

const RelationalMap: React.FC<ImageComponentProps> = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl.toString() }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default RelationalMap;
