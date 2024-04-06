import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import RelationalMap from './RelationalMap';
interface DropdownProps {
  title: string;
  kudos: string;

  summary: string;
  characters: { name: string; description: string; actor: string }[];   
  relationalMap: string; // Placeholder for image or other content
  startDate: string;
  endDate: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  kudos,
  summary,
  characters,
  relationalMap,
  startDate,
  endDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Start Date:</Text>
          <Text style={styles.date}>{startDate.substring(0, 10)}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>End Date:</Text>
          <Text style={styles.date}>{endDate.substring(0, 10)}</Text>
        </View>
        {isOpen && (
          <View style={styles.dropdownContent}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionLabel}>Kudos:</Text>
              <Text style={styles.summary}>{kudos}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionLabel}>Summary:</Text>
              <Text style={styles.summary}>{summary}</Text>
            </View>
            <View style={styles.sectionContainer}>
              {/* <Text style={styles.sectionLabel}>Characters:</Text> */}
              {characters.map(({ name, description, actor }) => (
                <Text key={name} style={styles.character}>
                  <Text style={styles.characterName}>{name}: </Text>
                  <Text style={styles.actor}> - {actor}</Text> 
                  {'\n'}
                  {description}
                </Text>
              ))}
            </View>
            <View style={styles.sectionContainer}>
              <RelationalMap imageUrl={relationalMap} />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  dropdownContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
    width: '100%', 
    flexDirection: 'column',
    minWidth: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dateLabel: {
    fontWeight: 'bold',
    color: '#666', // color for date label
  },
  date: {
    color: '#666', // color for date
  },
  dropdownContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    padding: 5,
    marginTop: 5,
  },
  sectionContainer: {
    marginBottom: 10,
  },
  sectionLabel: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  summary: {
    fontSize: 16,
    marginBottom: 5,
  },
  character: {
    marginBottom: 5,
  },
  characterName: {
    fontWeight: 'bold',
  },
  relationalMap: {
    fontWeight: 'bold',
  },
  actor: {
    color: '#999', // Lighter color for actor
  },
});

export default Dropdown;


