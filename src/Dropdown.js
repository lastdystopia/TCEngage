import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const Dropdown = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from backend when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/performanceinfo');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Performance Information</Text>
      {data.map((show) => (
        <View key={show.ShowTitle}>
          <Text>Show Title: {show.ShowTitle}</Text>
          <Text>Start Week 1: {show.DateRunStartWeek1}</Text>
          <Text>End Week 1: {show.DateRunEndWeek1}</Text>
          <Text>Start Week 2: {show.DateRunStartWeek2}</Text>
          <Text>End Week 2: {show.DateRunEndWeek2}</Text>
          <Text>Summary: {show.Summary}</Text>
          {/* Render other information as needed */}
          <Text>--------------------------</Text>
        </View>
      ))}
    </View>
  );
};

export default Dropdown;