import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class FetchButton extends Component {
  fetchData = async () => {
    try {
      const response = await fetch('http://192.168.11.115:3001/performanceInfo');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Performance Info:', data);
    } catch (error) {
      console.error('Error fetching performance info:', error);
    }
  };

  render() {
    return (
      <View>
        <Button title="Fetch Performance Info" onPress={this.fetchData} />
      </View>
    );
  }
}

export default FetchButton;
