// import React,{useState}from "react";
// import { QuizData } from "../Data/QuizData";
// import QuizResult from "./QuizResult";
// const Quiz = () => {
//     const [question,setQuestion]=useState(0);
//     const [score, setScore] = useState(0);
//     const [clickedoption, setclickedoption] = useState(0);
//     const[showResult,setShowResult]=useState(false);
//     const changeQuestion=()=>{
//         updateScore();
//         if(question<QuizData.length-1){
//             setQuestion(question + 1);
//             setclickedoption(0);

//         }
//         else{
//             setShowResult(true)

//         }

//     }
//     const updateScore=()=>{
//         if(clickedoption===QuizData[question].answer){
//             setScore(score+1);
//         }
//     }
//     const reset=()=>{
//         setShowResult(false);
//         setQuestion(0);
//         setclickedoption(0);
//         setScore(0);

//     }
//     // const [question, setQuestion] = useState(0);
//     // const [question, setQuestion] = useState(0);

//   return (
//     <div>
//       <p className="heading-txt">QUIZ APP</p>
//       <div className="container">
//         {showResult?(
//             <QuizResult score={score} totalScore={QuizData.length} tryAgain={reset}/>
//         ):(
//             <>
//         <div className="question">
//           <span id="question-number">{question + 1}.</span>
//           <span id="question-txt">{QuizData[question].question}</span>
//         </div>
//         <div className="option-container">
//           {/* {QuizData[0].options} */}
//           {QuizData[question].options.map((option, i) => {
//             return (
//               <button
//                 className={`option-btn ${
//                     clickedoption === i+1 ?"checked":null
//                 }` }

//                 key={i}
//                 onClick={() => setclickedoption(i + 1)}
//               >
//                 {option}
//               </button>
//             );
//           })}
//         </div>
//         <button
//           type="button"
//           value="Next"
//           id="next-button"
//           onClick={changeQuestion}
//         >
//           Next
//         </button>

//         </>)}
//       </div>

//     </div>
//   );
// };

// export default Quiz;

import React, { useState, useEffect } from "react";
import QuizResult from "./QuizResult";

const Quiz = () => {
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const quizData = data.results.map((result) => {
          return {
            question: result.question,
            options: [...result.incorrect_answers, result.correct_answer].sort(
              () => Math.random() - 0.5
            ),
            answer: result.correct_answer,
          };
        });
        setQuizData(quizData);
        console.log(quizData);
      })
      .catch((error) => console.error(error));
  }, []);

  const changeQuestion = () => {
    updateScore();
    if (question < quizData.length - 1) {
      setQuestion(question + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };

  const updateScore = () => {
    // console.log("hello")
    // console.log(quizData[question].options[clickedOption] +""+ quizData[question].answer)
    if (
      quizData[question].options[clickedOption-1] === quizData[question].answer
    ) {
      // console.log("hi");
      setScore(score + 1);
    }
  };

  const reset = () => {
    setShowResult(false);
    setQuestion(0);
    setClickedOption(0);
    setScore(0);
  };

  return (
    <div>
      <p className="heading-txt">QUIZ APP</p>
      <div className="container">
        {showResult ? (
          <QuizResult
            score={score}
            totalScore={quizData.length}
            tryAgain={reset}
          />
        ) : (
          <>
            <div className="question">
              <span id="question-number">{question + 1}.</span>
              <span id="question-txt">{quizData[question]?.question}</span>
            </div>
            <div className="option-container">
              {quizData[question]?.options.map((option, i) => {
                return (
                  <button
                    className={`option-btn ${
                      clickedOption === i + 1 ? "checked" : ""
                    }`}
                    key={i}
                    onClick={() => setClickedOption(i + 1)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              value="Next"
              id="next-button"
              onClick={changeQuestion}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
