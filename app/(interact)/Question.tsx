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
      return <TextboxQuestion question={question} onChange={onChange} />;
    case 1:
      if (!options) throw new Error('Options are required for Checkbox Question');
      return <CheckboxQuestion question={question} options={options} onChange={onChange} />;
    case 2:
      return <TrueFalseQuestion question={question} onChange={onChange} />;
    case 3:
      return <RatingQuestion question={question} onChange={onChange} />;
    case 4:
      if (!options) throw new Error('Options are required for Multiple Choice Question');
      return <MultChoiceQuestion question={question} options={options} onChange={onChange} />;
    default:
      throw new Error('Invalid question type');
  }
};

export default Question;
