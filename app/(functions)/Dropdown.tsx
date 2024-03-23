import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface DropdownProps {
  title: string;
  summary: string;
  characters: { [key: string]: string };
  relationalMap: number; // Placeholder for image or other content
  startDate: string;
  endDate: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
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
    <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.dateRange}>{`${startDate} - ${endDate}`}</Text>
      {isOpen && (
        <View style={styles.dropdownContent}>
          <Text style={styles.summary}>{summary}</Text>
          {Object.entries(characters).map(([name, description]) => (
            <Text key={name} style={styles.character}>
              <Text style={styles.characterName}>{name}: </Text>
              {description}
            </Text>
          ))}
          <Text style={styles.relationalMap}>Relational Map: {relationalMap}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateRange: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666', // color for date range
  },
  dropdownContent: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 5,
  },
  summary: {
    fontSize: 16,
    marginBottom: 10,
  },
  character: {
    marginBottom: 5,
  },
  characterName: {
    fontWeight: 'bold',
  },
  relationalMap: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default Dropdown;

