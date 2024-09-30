import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FlashCards from "./components/flashCards";
import cards from "./data/cards";

const App = () => {
  const [flip, setFlip] = useState(false);
  const [whichCard, setWhichCard] = useState(0);
  const pickQuestion = () => {
    const newRandomNumber = Math.floor(Math.random() * cards.length);
    setWhichCard(newRandomNumber);
    setFlip(false);
  };
  const checkFlip = () => {
    setFlip(!flip);
  };
  return (
    <div className="container">
      <div className="header">
        <h1 className="topic">Guess the celebrity</h1>
        <h2 className="info">
          How good of a fan are you? Test all of your celebrity knowledge here!
        </h2>
        <div className="numberOfCards">Number of cards: {cards.length}</div>
      </div>
      <div className="content">
        <div className="cards" onClick={checkFlip}>
          <FlashCards
            isFlipped={flip}
            question={cards[whichCard].question}
            answer={cards[whichCard].answer}
            image={cards[whichCard].image}
            difficulty={cards[whichCard].difficulty}
          />
        </div>
        <button className="nextButton" onClick={pickQuestion}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default App;
