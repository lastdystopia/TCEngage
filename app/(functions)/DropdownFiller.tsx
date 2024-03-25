import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Dropdown from './Dropdown';

interface PerformanceInfo {
  Title: string;
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

const DropdownFiller: React.FC<{ type: number }> = ({ type }) => {
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

  return (
    <View>
      {filteredInfo.map((info, index) => {
        const associatedCharacters = showCharacters
          .filter(character => character.Title === info.Title)
          .reduce<{ [key: string]: string }>((acc, character) => {
            acc[character.Name] = character.Description;
            return acc;
          }, {});
        return (
          <Dropdown
            key={index}
            title={info.Title}
            summary={info.Summary}
            characters={associatedCharacters}
            relationalMap={info.RelationalMap}
            startDate={info.StartDate.substring(0, 10)}
            endDate={info.EndDate.substring(0, 10)}
          />
        );
      })}
    </View>
  );
};

export default DropdownFiller;
