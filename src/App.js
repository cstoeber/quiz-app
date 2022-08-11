import "./App.css";
import { Timer } from "./components/Timer";
import { Question } from "./components/Question";
import { Answers } from "./components/Answers";
import { QUESTIONS } from "./data";
import { Statistik } from "./components/Statistik";
import { useState, useEffect } from "react";

const AMOUNT_QUESTIONS = 10;

function App() {
  const [quizData, setQuizData] = useState([
    {
      category: "",
      id: "",
      correctAnswer: "",
      incorrectAnswers: ["", "", ""],
      question: "",
      tags: [""],
      type: "",
      difficulty: "",
      regions: [],
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(function effectFunction() {
    async function fetchQuizData() {
      const response = await fetch(
        "https://the-trivia-api.com/api/questions?limit=10"
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      setQuizData(json);
      console.log(quizData);
    }
    fetchQuizData();
  }, []);

  //----------------------------------------------------------------------------------------------------
  const [elapsedTime, setElapsedTime] = useState(0);

  let interval;

  const timerFunction = (seconds) => {
    interval = setInterval(() => {
      if (elapsedTime < seconds) {
        setElapsedTime((prev) => prev + 1);
      } else {
        if (currentQuestion < AMOUNT_QUESTIONS) {
          nextQuestion();
        } else if (currentQuestion === AMOUNT_QUESTIONS) {
          setGameOver(true);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    timerFunction(AMOUNT_QUESTIONS);
    return () => {
      clearTimeout(interval);
    };
  }, [elapsedTime]);

  const resetTimer = () => {
    setElapsedTime(0);
  };
  //----------------------------------------------------------------------------------------------------

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      resetTimer();
      updateFalseCorrectArray();
    }
    if(currentQuestion === 9 && elapsedTime <= 10) {
      setGameOver(true);
      clearTimeout(interval);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const incrementPoints = () => {
    setPoints((prev) => prev + 1);
  };

  const [falseCorrectArray, setFalseCorrectArray] = useState([0, 1, 0, 0]);

  const updateFalseCorrectArray = () => {
    let array = [0, 0, 0, 0];
    let correct = Math.floor(Math.random() * 4);
    array[correct] = 1;
    setFalseCorrectArray(array);
  };

  const [gameOver, setGameOver] = useState(false);

  return !gameOver ? (
    <div className='App'>
      <h1>Quiz-App</h1>
      <Timer nextQuestion={nextQuestion} elapsedTime={elapsedTime} />
      <Question question={quizData[currentQuestion].question} />
      <Answers
        correctAnswer={quizData[currentQuestion].correctAnswer}
        incorrectAnswers={quizData[currentQuestion].incorrectAnswers}
        nextQuestion={nextQuestion}
        incrementPoints={incrementPoints}
        falseCorrectArray={falseCorrectArray}
      />
      <p>{points}</p>
      <p>{currentQuestion}</p>
    </div>
  ) : (
    <Statistik points={points} />
  );
}

export default App;
