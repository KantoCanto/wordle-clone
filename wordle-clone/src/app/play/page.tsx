"use client";

import { useState, useEffect } from "react";
import generateWord from "@/controllers/generateWord";

export default function Play() {
  //state wall
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLife, setCurrentLife] = useState(0);
  const [gameWord, setGameWord] = useState("");
  const [userGuessWord, setUserGuessWord] = useState("");
  const [userWin, setUserWin] = useState(false);

  //log changes when game state updates
  useEffect(() => {
    console.log("isGameStarted: ", gameStarted);
    console.log("gameWord: ", gameWord);
    console.log("Lifes: ", currentLife);
    console.log("userGuessWord: ", userGuessWord);
    console.log("userWin: ", userWin);
  }, [gameStarted, currentLife, gameWord, userGuessWord, userWin]);

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
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= 5) {
      setUserGuessWord(value);
    }
  };

  function checkLetters(gameWord: string, userGuessWord: string) {
    const guessArray = userGuessWord.split("");
    console.log("guessArray: ", guessArray);
    const wordArray = gameWord.split("");
    console.log("wordArray: ", wordArray);

    return guessArray.map((letter, index) => {
      if (letter === wordArray[index]) {
        return "correct";
      } else if (wordArray.includes(letter)) {
        return "misplaced";
      } else {
        return "wrong";
      }
    });
  }

  const feedback = checkLetters(gameWord, userGuessWord);

  const handleSubmit = () => {
    const checkUserGuessWord = userGuessWord.toString().toUpperCase();
    const checkGameWord = gameWord.toString().toUpperCase();

    if (checkUserGuessWord === checkGameWord) {
      setUserWin(true);
    } else {
      setCurrentLife((prevLife) => prevLife - 1);
    }
  };

  return (
    <div className="m-4 flex flex-col min-h-[87vh] ">
      <div className="grid grif-cols-5 gap-4 mt-4">
        {userGuessWord.split("").map((letter, index) => (
          <div
            key={index}
            className={`border p-4 text-center text-lg font-bold ${
              feedback[index] === "correct"
                ? "bg-green-500 text-white"
                : feedback[index] === "misplaced"
                ? "bg-yellow-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {!gameStarted && (
          <button
            onClick={gameStart}
            className="mx-auto w-32 bg-blue-700 p-2 rounded-lg hover:bg-blue-500"
          >
            Start Wordling!
          </button>
        )}

        {gameStarted && (
          <div className="flex flex-col space-y-4">
            <input
              className="bg-gray-300 placeholder-slate-500 text-black p-2 text-center rounded-lg focus:outline-none"
              placeholder="Type your word here!"
              maxLength={5}
              value={userGuessWord}
              onChange={handleChange}
            ></input>

            <button
              onClick={handleSubmit}
              className="mx-auto w-32 bg-green-700 p-2 rounded-lg hover:bg-green-500"
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
        )}
      </div>
    </div>
  );
}
