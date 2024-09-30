import "./flashCards.css";

const FlashCards = (props) => {
  let color;
  if (props.difficulty === "easy") {
    color = "easyQuestionContainer";
  } else if (props.difficulty === "mid") {
    color = "midQuestionContainer";
  } else {
    color = "hardQuestionContainer";
  }

  return (
    <div className={`${color} ${props.isFlipped ? "flipped" : ""}`}>
      <div className="inner">
        <div className="front">
          <h1 className="question">{props.question}</h1>
          <div className="imageContainer">
            <img src={props.image} alt="" className="image" />
          </div>
        </div>
        <div className="back">
          <h1>{props.answer}</h1>
        </div>
      </div>
    </div>
  );
};

export default FlashCards;
