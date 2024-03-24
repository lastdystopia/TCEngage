import React from 'react';
import TextboxQuestion from './TextboxQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import RatingQuestion from './RatingQuestion';
import MultChoiceQuestion from './MultChoiceQuestion';

interface QuestionProps {
  Type: number;
  question: string;
  options?: string[];
  onChange: (value: any) => void;
}

const Question: React.FC<QuestionProps> = ({ Type, question, options, onChange }) => {
  switch (Type) {
    case 0:
      return <TextboxQuestion Question={question} onChange = {onChange}  />;
    case 1:
      if (!options) throw new Error('Options are required for Checkbox Question');
      return <CheckboxQuestion Question={question} QuestionOptions={options} />;
    case 2:
      return <TrueFalseQuestion Question={question} onChange={onChange} />; //question={question} onChange={onChange}
    case 3:
      return <RatingQuestion Question={question} onChange={onChange} />;
    case 4:
      if (!options) throw new Error('Options are required for Multiple Choice Question');
      return <MultChoiceQuestion Question={question} onChange = {onChange} options={options} />;
    default:
      throw new Error('Invalid question type');
  }
};

export default Question;
