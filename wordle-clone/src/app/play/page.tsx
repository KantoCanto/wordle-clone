"use client";

import { useState, useEffect } from "react";
import generateWord from "@/controllers/generateWord";
import Grid from "@/app/components/UI/grid";
import Modal from "../components/UI/modal";

const Play: React.FC = () => {
  //state wall
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLife, setCurrentLife] = useState(0);
  const [gameWord, setGameWord] = useState("");
  const [userGuessWord, setUserGuessWord] = useState("");
  const [userWin, setUserWin] = useState(false);
  const [submittedGuess, setSubmittedGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gridKey, setGridKey] = useState(0);

  //log changes when game state updates
  useEffect(() => {
    console.log("isGameStarted: ", gameStarted);
    console.log("gameWord: ", gameWord);
    console.log("Lifes: ", currentLife);
    console.log("userGuessWord: ", userGuessWord);
    console.log("userWin: ", userWin);
  }, [
    gameStarted,
    currentLife,
    gameWord,
    userGuessWord,
    submittedGuess,
    userWin,
  ]);

  //game start
  function gameStart() {
    if (!gameStarted) {
      setCurrentLife(6);
      const tempWord = generateWord().toString();
      setGameWord(tempWord);
      setGameStarted(true);
    } else {
      console.log("something went wrong");
      return;
    }
  }

  function restartGame() {
    setGameStarted(false);
    setCurrentLife(6);
    const tempWord = generateWord().toString();
    setGameWord(tempWord);
    setGameStarted(true);
    setShowModal(false);
    setGameOver(false);
    setSubmittedGuess("");
    setUserGuessWord("");
    setGridKey((prevKey) => prevKey + 1);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= gameWord.length) {
      setUserGuessWord(value);
    }
  };

  const handleSubmit = () => {
    if (userGuessWord.length === gameWord.length) {
      setSubmittedGuess(userGuessWord); // Only update the grid on submit
      const checkUserGuessWord = userGuessWord.toUpperCase();
      const checkGameWord = gameWord.toUpperCase();

      if (checkUserGuessWord === checkGameWord) {
        setUserWin(true);
        setGameOver(true);
        setShowModal(true);
      } else {
        setCurrentLife((prevLife) => {
          const newLife = prevLife - 1;
          if (newLife === 0) {
            setGameOver(true);
            setShowModal(true);
          }
          return newLife;
        });
      }
      setUserGuessWord("");
    } else {
      console.log("Guess must be the same length as the game word.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-[calc(100vh-15vh)] flex justify-center">
      {!gameStarted && (
        <button
          onClick={gameStart}
          className="mx-auto my-auto bg-blue-700 p-2 rounded-lg hover:bg-blue-500"
        >
          Start Wordling!
        </button>
      )}

      {gameStarted && (
        <div className="flex flex-col items-center">
          <div className="min-w-[calc(100vw-15vw)] flex flex-col items-center justify-center">
            <Grid
              gridKey={gridKey}
              rows={6}
              collumns={gameWord.length}
              gameWord={gameWord}
              userGuessWord={submittedGuess}
            />
          </div>
          <input
            className="bg-gray- w-72  placeholder-slate-500 text-black p-2 text-center rounded-lg focus:outline-none"
            placeholder="Type your word here!"
            maxLength={gameWord.length}
            value={userGuessWord}
            onChange={handleChange}
            disabled={gameOver}
          ></input>

          <div className="flex flex-col my-4 space-y-2">
            <button
              onClick={handleSubmit}
              className="mx-auto w-32 bg-green-700 p-2 rounded-lg hover:bg-green-500"
              disabled={gameOver || userGuessWord.length !== gameWord.length}
            >
              Submit
            </button>

            <button
              onClick={restartGame}
              className="mx-auto w-32 bg-blue-700 p-2 rounded-lg hover:bg-blue-500"
            >
              Wordle Again!
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <Modal
          message={
            userWin ? "Congratulations, you win!" : "Game Over! You lost."
          }
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Play;
