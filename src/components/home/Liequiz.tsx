import React, { useState, useEffect } from "react";
import { Checkbox } from "@chakra-ui/react";

type QuizProps = {
  content: string;
  onResult: (isCorrect: boolean) => void;
  onCheckAnswers: (answers: boolean[]) => void;
};

export const Quiz = (props: QuizProps) => {
  const postText = props.content;
  const sentences = postText.split(/[。.]/).filter((sentence) => sentence);
  const isLieData = sentences.map((sentence) => sentence.startsWith("<?>"));
  const [answers, setAnswers] = useState(Array(sentences.length).fill(false));

  const handleCheckChange = (index) => {
    const newAnswers = [...answers];
    newAnswers[index] = !newAnswers[index];
    setAnswers(newAnswers);
  };

  useEffect(() => {
    props.onCheckAnswers(answers);
  }, [answers]);

  return (
    <div>
      {sentences.map((sentence, index) => (
        <div key={index}>
          <Checkbox
            checked={answers[index]}
            onChange={() => handleCheckChange(index)}
          >
            {sentence.replace("<?>", "")}
          </Checkbox>
        </div>
      ))}
    </div>
  );
};
