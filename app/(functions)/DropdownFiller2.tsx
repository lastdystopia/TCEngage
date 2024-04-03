import React, { useEffect, useState} from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Dropdown from './Dropdown';
import RelationalMap from './RelationalMap';
interface PerformanceInfo {
  Title: string;
  Kudos: string;
  Summary: string;
  StartDate: string;
  EndDate: string;
  RelationalMap: string;
}

interface ShowCharacter {
  Title: string;
  Name: string;
  Description: string;
  Actor: string;
}

const DropdownFiller2: React.FC<{ type: number }> = ({ type }) => {
  const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfo[]>([]);
  const [showCharacters, setShowCharacters] = useState<ShowCharacter[]>([]);

  useEffect(() => {
    const fetchPerformanceInfo = async () => {
      try {
        const response = await fetch('http://192.168.11.115:3001/performanceInfo');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: PerformanceInfo[] = await response.json();
        setPerformanceInfo(data);
      } catch (error) {
        console.error('Error fetching performance info:', error);
      }
    };

    const fetchShowCharacters = async () => {
      try {
        const response1 = await fetch('http://192.168.11.115:3001/ShowCharacter');
        if (!response1.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ShowCharacter[] = await response1.json();
        setShowCharacters(data);
      } catch (error) {
        console.error('Error fetching show characters:', error);
      }
    };

    fetchPerformanceInfo();
    fetchShowCharacters();
  }, []);

  const filteredInfo = performanceInfo.filter(info => {
    const currentDate = new Date();
    const startDate = new Date(info.StartDate);
    const endDate = new Date(info.EndDate);

    switch (type) {
      case 0:
        return startDate <= currentDate && endDate >= currentDate;
      case 1:
        return endDate < currentDate;
      case 2:
        return startDate > currentDate;
      default:
        return true;
    }
  });
  // Sort by dates
  filteredInfo.sort((a, b) => new Date(b.StartDate).getTime() - new Date(a.StartDate).getTime());


  
  return (
    <View style={styles.container}>
      {filteredInfo.length === 0 ? (
        <View style={styles.messageContainer}>
        <Text style={styles.messageText}>No performances to display, stay tuned!</Text>
        <Image source={{ uri: 'https://media.giphy.com/media/STkhzhWCHMHX093jzM/giphy.gif' }} style={styles.gif} />
        </View>
      ) : (
        filteredInfo.map((info, index) => {
          const associatedCharacters = showCharacters
            .filter(character => character.Title === info.Title)
            .map(character => ({
              name: character.Name,
              description: character.Description,
              actor: character.Actor,
            }));

          return (
            <Dropdown
              key={index}
              title={info.Title}
              kudos={info.Kudos}
              summary={info.Summary}
              characters={associatedCharacters}
              relationalMap={info.RelationalMap}
              startDate={info.StartDate.substring(0, 10)}
              endDate={info.EndDate.substring(0, 10)}
            />
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  messageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gif: {
    width: 200, 
    height: 200,
    marginTop: 10, 
  },
});
export default DropdownFiller2;
