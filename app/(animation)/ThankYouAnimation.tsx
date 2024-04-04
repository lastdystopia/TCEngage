import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';

const GifDisplay: React.FC = () => {
  const gifOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startGifAnimation();
  }, []);

  const startGifAnimation = () => {
    Animated.timing(gifOpacity, {
      toValue: 1,
      duration: 10, // to fade im
      useNativeDriver: false,
      
    }).start();
  };

  const handleGifLoad = () => {
    // Restart the GIF animation when it's finished playing
    startGifAnimation();
  };

  return (
    <Animated.Image
      source={require('../../assets/images/thank-you-icegif-7.gif')}
      style={[styles.gif, { opacity: gifOpacity }]}
      onLoad={handleGifLoad}
      onLoadEnd={handleGifLoad}
    />
  );
};

const styles = StyleSheet.create({
  gif: {
    width: 200,
    height: 200,
  },
});

export default GifDisplay;
