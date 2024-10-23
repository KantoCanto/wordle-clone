"use client";

import { useState, useEffect } from "react";
import generateWord from "@/controllers/generateWord";
import Grid from "@/app/components/UI/grid";
import Modal from "../components/UI/modal";
import Keyboard from "../components/UI/keyboard";

const Play: React.FC = () => {
  //state wall
  const [gameStarted, setGameStarted] = useState(false);
  const [userWin, setUserWin] = useState(false);
  const [currentLife, setCurrentLife] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [gameWord, setGameWord] = useState("");

  const [userGuessWord, setUserGuessWord] = useState("");
  const [submittedGuess, setSubmittedGuess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [gridKey, setGridKey] = useState(0);
  const [disabledKeys, setDisabledKeys] = useState<string[]>([]);

  const [showModal, setShowModal] = useState(false);

  //log changes when game state updates
  useEffect(() => {
    console.log("isGameStarted: ", gameStarted);
    console.log("gameWord: ", gameWord);
    console.log("Lifes: ", currentLife);
    console.log("userGuessWord: ", userGuessWord);
    console.log("userWin: ", userWin);
    console.log("Disabled Keys: ", disabledKeys);
  }, [
    gameStarted,
    currentLife,
    gameWord,
    userGuessWord,
    submittedGuess,
    userWin,
    disabledKeys,
  ]);

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
    setDisabledKeys([]);
    setGridKey((prevKey) => prevKey + 1);
  }

  const handleSubmit = () => {
    if (submitting || gameOver) return;

    if (userGuessWord.length === gameWord.length) {
      setSubmitting(true);
      setSubmittedGuess(userGuessWord); // Only update the grid on submit
      const checkUserGuessWord = userGuessWord.toUpperCase();
      const checkGameWord = gameWord.toUpperCase();

      if (checkUserGuessWord === checkGameWord) {
        console.log(
          "win condition check| CheckUserGuessWord: ",
          checkUserGuessWord,
          " ! checkGameWord: ",
          checkGameWord
        );
        setUserWin(true);
        setGameOver(true);
        setShowModal(true);
      } else {
        setCurrentLife((prevLife) => {
          const newLife = prevLife - 1;
          if (newLife <= 0) {
            setGameOver(true);
            setShowModal(true);
          }
          return newLife;
        });
      }
      setUserGuessWord("");
      setSubmitting(false);
    } else {
      console.log("Guess must be the same length as the game word.");
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "DELETE") {
      setUserGuessWord((prev) => prev.slice(0, -1));
    } else if (key.length === 1 && /[a-zA-Z]/.test(key)) {
      if (userGuessWord.length < gameWord.length) {
        setUserGuessWord((prev) => prev + key.toUpperCase());
      }
    }
  };

  const updateDisabledKeys = (newDisabledKeys: string[]) => {
    setDisabledKeys((prevKeys) => [
      ...new Set([...prevKeys, ...newDisabledKeys]),
    ]);
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
          <div className="max-h-[calc(100vh-30vh)] flex flex-col items-center justify-center">
            <Grid
              gridKey={gridKey}
              rows={6}
              collumns={gameWord.length}
              gameWord={gameWord}
              userGuessWord={userGuessWord} //show userGuessWord in the grid as they type
              submittedGuess={submittedGuess}
              updateDisabledKeys={updateDisabledKeys}
            />
          </div>
          <Keyboard onKeyPress={handleKeyPress} disabledKeys={disabledKeys} />

          <div className="flex flex-row my-4 space-x-2">
            <button
              onClick={handleSubmit}
              className="mx-auto w-32 bg-green-700 p-2 rounded-lg hover:bg-green-500"
              disabled={
                gameOver ||
                submitting ||
                userGuessWord.length !== gameWord.length
              }
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
