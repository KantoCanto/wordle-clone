"use client";
import { useEffect, useState } from "react";

interface GridProps {
  rows: number;
  collumns: number;
  gameWord: string;
  userGuessWord: string;
  gridKey: number;
}

const Grid: React.FC<GridProps> = ({
  rows,
  collumns,
  gameWord,
  userGuessWord,
  gridKey,
}) => {
  const [userGuesses, setUserGuesses] = useState<string[]>([]); //array to store guesses

  //push the userGuessWord to the userGuesses on every submission
  useEffect(() => {
    if (userGuessWord) {
      setUserGuesses((prevGuesses) => [...prevGuesses, userGuessWord]);
    }
  }, [userGuessWord]);

  useEffect(() => {
    setUserGuesses([]);
  }, [gridKey]);

  const checkLetters = (guess: string, gameWord: string) => {
    const result = Array(collumns).fill(""); // Initialize result array
    const wordArray = gameWord.split("");
    const guessArray = guess.split("");

    guessArray.forEach((letter, index) => {
      if (letter === wordArray[index]) {
        result[index] = "correct"; // Letter is in the correct place
      } else if (wordArray.includes(letter)) {
        result[index] = "misplaced"; // Letter is in the word but not in the right place
      } else {
        result[index] = "wrong"; // Letter is not in the word
      }
    });

    return result;
  };

  const grid = Array.from({ length: rows }).map((_, rowIndex) => (
    <div key={rowIndex} className="grid grid-cols-5 gap-2 my-1">
      {Array.from({ length: collumns }).map((_, colIndex) => {
        const guess = userGuesses[rowIndex] || ""; // Get the user's guess for this row
        const feedback = guess ? checkLetters(guess, gameWord) : []; // Get feedback if there's a guess

        return (
          <div
            key={colIndex}
            className={`w-16 h-16 border-2 border-gray-500 flex items-center justify-center text-lg font-bold ${
              feedback[colIndex] === "correct"
                ? "bg-green-500"
                : feedback[colIndex] === "misplaced"
                ? "bg-yellow-500"
                : feedback[colIndex] === "wrong"
                ? "bg-red-500"
                : ""
            }`}
          >
            {guess[colIndex] || ""} {/* Show the letter or keep it empty */}
          </div>
        );
      })}
    </div>
  ));

  return <div className="my-4">{grid}</div>;
};

export default Grid;
