import React from "react";
const QuizResult=(props)=>{
    return(
        <>
        <div className="show-score">
            Your Score:{props.score}<br/>
            Total Score:{props.totalScore}

        </div>
        <button id="next-button"  onClick={props.tryAgain}>Try Again</button>
        </>
    )

}
export default QuizResult;