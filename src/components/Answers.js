import "./Answers.css";

export const Answers = ({
  correctAnswer,
  incorrectAnswers,
  nextQuestion,
  incrementPoints,
  falseCorrectArray
}) => {
  const clickCorrectAnswer = () => {
    nextQuestion();
    incrementPoints();
  };

  const clickFalseAnswer = () => {
    nextQuestion();
  };



  const buttons = (fCArray) => {

    let buttonsArray = [];
    let j = 0;
    for (let i = 0; i < 4; i++) {
      if (fCArray[i] === 0) {
        buttonsArray.push(
          <button className='answer-button' onClick={clickFalseAnswer}>
            {incorrectAnswers[j]}
          </button>
        );
        j++;
      } else if (fCArray[i] === 1) {
        buttonsArray.push(
          <button className='answer-button' onClick={clickCorrectAnswer}>
            {correctAnswer}
          </button>
        );
      }
    }
    return buttonsArray;
  };

  return (
    <div className='answers-wrapper'>
      {buttons(falseCorrectArray)}
    </div>
  );
};
