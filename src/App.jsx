import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FlashCards from "./components/flashCards";
import cards from "./data/cards";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [masteredCards, setMasteredCards] = useState([]);
  const [flip, setFlip] = useState(false);
  const [whichCard, setWhichCard] = useState(0);
  const [guess, setGuess] = useState("");
  const [inputStyle, setInputStyle] = useState("");
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const pickQuestion = () => {
    setInputStyle("");
    setGuess("");
    if (whichCard < cards.length - 1) {
      setWhichCard(whichCard + 1);
    } else {
      setWhichCard(0);
    }
    setFlip(false);
  };
  const shuffle = () => {
    setGuess("");
    setInputStyle("");
    for (var i = cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));

      var temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
  };

  const beforeQuestion = () => {
    if (whichCard > 0) {
      setWhichCard(whichCard - 1);
    } else {
      setWhichCard(cards.length - 1);
    }
    setFlip(false);
  };

  const handleChange = (e) => {
    setGuess(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedGuess = guess.toLowerCase().replaceAll(" ", "");
    const boomCards = cards[whichCard].answer.split(" ");
    const updatedCardsFirstName = boomCards[0].toLowerCase();
    const updatedCardsLastName = boomCards[1].toLowerCase();
    if (updatedCardsFirstName == updatedGuess) {
      setInputStyle("rightStyle");
      setStreak(streak + 1);
    } else if (updatedCardsLastName == updatedGuess) {
      setInputStyle("rightStyle");
      setStreak(streak + 1);
    } else {
      setInputStyle("wrongStyle");
      if (streak >= longestStreak) {
        setLongestStreak(streak);
      }
      setStreak(0);
    }
  };

  const checkFlip = () => {
    setFlip(!flip);
    setInputStyle("");
  };
  const mastered = () => {
    console.log(cards);
    setMasteredCards([...masteredCards, cards[whichCard]]);

    cards.splice(whichCard, 1);

    if (whichCard >= cards.length) {
      setWhichCard(0);
    } else {
      setWhichCard(whichCard);
    }

    setFlip(false);
  };
  console.log(masteredCards);
  return (
    <div className="container">
      <div className="header">
        <h1 className="topic">Guess the celebrity</h1>
        <h2 className="info">
          How good of a fan are you? Test all of your celebrity knowledge here!
        </h2>
        <div className="numberOfCards">Number of cards: {cards.length}</div>
        <div className="streak">
          <div className="numberOfCards">Current Streak: {streak}</div>
          <div className="numberOfCards">Longest Streak: {longestStreak}</div>
        </div>
      </div>
      <div className="content">
        <div className="cards" onClick={checkFlip}>
          {cards.length > 0 ? (
            <FlashCards
              isFlipped={flip}
              question={cards[whichCard].question}
              answer={cards[whichCard].answer}
              image={cards[whichCard].image}
              difficulty={cards[whichCard].difficulty}
            />
          ) : (
            <h1>no more cards</h1>
          )}
        </div>
        <button className="shuffleButton" onClick={mastered}>
          Mastered
        </button>
        <form className="guess" onSubmit={handleSubmit}>
          <div className="containerInput">
            <h1 className="inputText">Guess the name:</h1>
            <input
              className={inputStyle}
              type="text"
              value={guess}
              onChange={handleChange}
            />
          </div>
          <button className="submitButton" type="Submit">
            Submit
          </button>
        </form>
        <div className="buttons">
          <button className="nextButton" onClick={beforeQuestion}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className="nextButton" onClick={pickQuestion}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button className="shuffleButton" onClick={shuffle}>
            Shuffle Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
