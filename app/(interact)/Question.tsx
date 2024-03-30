interface Question {
  Title: string;
  Question: string;
  Options?: string[]; //  Options optional
  getResponse: () => any;
}

export default Question;