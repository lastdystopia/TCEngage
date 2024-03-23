import React from 'react';
import Dropdown from './Dropdown';

interface DropdownData {
  title: string;
  startDate: string;
  endDate: string;
  summary: string;
  characters: { [key: string]: string };
  relationalMap: number;
}

const DropdownFiller: React.FC<{ type: number }> = ({ type }) => {
  // Dummy data for dropdowns
  // dates should be YYYY-MM-DD
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
