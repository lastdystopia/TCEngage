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

const DropdownFiller: React.FC<{ type: number }> = ({ type }) => {
  const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
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
      {filteredInfo.map((info, index) => (
        <Dropdown
          key={index}
          title={info.Title}
          summary={info.Summary}
          characters={{}}
          relationalMap={123} // Set a default value for relationalMap
          startDate={info.StartDate}
          endDate={info.EndDate}
        />
      ))}
    </View>
  );
};

export default DropdownFiller;


/*import React, {useEffect, useState} from 'react';
import Dropdown from './Dropdown';

interface DropdownData {
  title: string;
  startDate: string;
  endDate: string;
  summary: string;
  characters: { [key: string]: string };
  relationalMap: number;
}
// Write a fetch function here to use to fill in the DropdownData and log it:
const fetchData = async (): Promise<DropdownData[]> => {
  try {
    const response = await fetch('http://192.168.11.115:3001/performanceInfo');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    //console.log('Performance Info:', data);

    const dropdowns: DropdownData[] = data.map((row: any) => ({
      title: row.Title,
      startDate: row.StartDate.substring(0, 10),
      endDate: row.EndDate.substring(0, 10),
      summary: row.Summary,
      characters: {}, // Blank characters object
      relationalMap: row.RelationalMap, 
    }));
    //console.log('Dropdowns:', dropdowns); // Log the dropdowns here
    return dropdowns;
  } catch (error) {
    console.error('Error fetching performance info:', error);
    return []; // Return an empty array in case of an error
  }
};
const iterateInfo = async (): Promise<string[][]> => {
  try {
    const dropdownsData: DropdownData[] = await fetchData();
    const infoArrayArray: string[][] = [];
    dropdownsData.forEach((row, index) => {
      const infoArray: string[] = [`Title:${row.title}`, `Start Date:${row.startDate}`, `End Date:${row.endDate}`, `Summary:${row.summary}`, `Relational Map:${row.relationalMap}`, `Characters: not implemented yet`];
      infoArrayArray.push(infoArray);
    });
    console.log(infoArrayArray); // Log the infoArrayArray here
    return infoArrayArray;
  } catch (error) {
    console.error('Error iterating through data:', error);
    return [];
  }
};

const filterInfo = async () => {
  try {
    const infoArrayArray = await iterateInfo();
    infoArrayArray.forEach((infoArray, rowIndex) => {
      console.log(`Row ${rowIndex + 1}:`);
      infoArray.forEach((info) => {
        console.log(info);
      });
      console.log('------------------------');
    });
  } catch (error) {
    console.error('Error processing info:', error);
  }
};

const DropdownFiller: React.FC<{ type: number }> = ({ type }) => {
  
  console.log("Now gonna fetch data");
  //fetchData();
  processInfo();
    // Dummy data for dropdowns
  // dates should be YYYY-MM-DD
  
  const dropdowns: DropdownData[] = [];

  let filteredDropdowns: DropdownData[] = [];
  switch (type) {
    case 0:
      filteredDropdowns = dropdowns.filter((dropdown) => {
        const currentDate = new Date();
        const startDate = new Date(dropdown.startDate);
        const endDate = new Date(dropdown.endDate);
        return startDate <= currentDate && endDate >= currentDate;
      });
      break;
    case 1:
      filteredDropdowns = dropdowns.filter((dropdown) => {
        const currentDate = new Date();
        const endDate = new Date(dropdown.endDate);
        return endDate < currentDate;
      });
      break;
    case 2:
      filteredDropdowns = dropdowns.filter((dropdown) => {
        const currentDate = new Date();
        const startDate = new Date(dropdown.startDate);
        return startDate > currentDate;
      });
      break;
    default:
      break;
  }

  return (
    <>
      {filteredDropdowns.map((dropdown, index) => (
        <Dropdown
          key={index}
          title={dropdown.title}
          startDate={dropdown.startDate}
          endDate={dropdown.endDate}
          summary={dropdown.summary}
          characters={dropdown.characters}
          relationalMap={dropdown.relationalMap}
        />
        
      ))}
      
    </>
  );
};

export default DropdownFiller;
/*



const dropdowns: DropdownData[] = [
    {
        title: 'This should be a dropdown that displays for Current events',
        startDate: '2024-03-15', 
        endDate: '2024-03-25', 
        summary: 'Summary for dropdown 1',
        characters: {
          character1: 'Description for character 1',
          character2: 'Description for character 2',
        },
        relationalMap: 123,
      },
      {
        title: 'Past Event 1',
        startDate: '2024-01-01', 
        endDate: '2024-01-10', 
        summary: 'Summary for dropdown 3',
        characters: {
          character1: 'Description for character 1',
          character2: 'Description for character 2',
        },
        relationalMap: 789,
      },
      {
        title: 'Past Event 2',
        startDate: '2023-02-01', 
        endDate: '2023-02-10', 
        summary: 'Summary for dropdown 4',
        characters: {
          character1: 'Description for character 1',
          character2: 'Description for character 2',
        },
        relationalMap: 1011,
      },
      {
        title: 'Future Event 1',
        startDate: '2024-05-01', 
        endDate: '2024-05-10', 
        summary: 'Summary for dropdown 5',
        characters: {
          character1: 'Description for character 1',
          character2: 'Description for character 2',
        },
        relationalMap: 1213,
      },
      {
        title: 'Future Event 2',
        startDate: '2025-06-01',
        endDate: '2025-06-10', 
        summary: 'Summary for dropdown 6',
        characters: {
          character1: 'Description for character 1',
          character2: 'Description for character 2',
        },
        relationalMap: 1415,
      }
  ];
*/