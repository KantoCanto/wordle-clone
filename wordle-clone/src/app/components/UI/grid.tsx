"use client";
import { useEffect, useState } from "react";

interface GridProps {
  rows: number;
  collumns: number;
  gridKey: number;
  gameWord: string;
  userGuessWord: string;
  submittedGuess: string;
  updateDisabledKeys: (newDisabledKeys: string[]) => void;
}

const Grid: React.FC<GridProps> = ({
  rows,
  collumns,
  gameWord,
  submittedGuess,
  gridKey,
  userGuessWord,
  updateDisabledKeys,
}) => {
  const [userGuesses, setUserGuesses] = useState<string[]>([]); // array to store guesses

  useEffect(() => {
    if (submittedGuess) {
      setUserGuesses((prevGuesses) => [...prevGuesses, submittedGuess]);

      // Step 1: Convert the game word to an array of letters
      const gameWordArray = gameWord.toUpperCase().split("");
      const submittedArray = submittedGuess.toUpperCase().split("");

      // Step 2: Filter out letters that are not included in the game word
      const wrongLetters = submittedArray.filter(
        (letter) => !gameWordArray.includes(letter) // Disable only letters not in the game word
      );

      console.log("wrongLetters: ", wrongLetters); // Debugging output

      // Step 3: Update the disabled keys
      updateDisabledKeys(wrongLetters); // Update disabled keys with wrong letters
    }
  }, [submittedGuess, gameWord]);

  // Reset user guesses when gridKey changes
  useEffect(() => {
    setUserGuesses([]);
  }, [gridKey]);

  const grid = Array.from({ length: rows }).map((_, rowIndex) => {
    const guess =
      userGuesses[rowIndex] ||
      (rowIndex === userGuesses.length ? userGuessWord : "");

    // Step 1: Split the gameWord and guess into arrays and check for feedback
    const gameWordArray = gameWord.toUpperCase().split("");
    const submittedArray = guess.toUpperCase().split("");

    const isSubmitted = userGuesses[rowIndex] !== undefined;

    // Step 2: Create letterStatuses for each guess
    const letterStatuses = isSubmitted
      ? submittedArray.map((letter, colIndex) => {
          if (letter === gameWordArray[colIndex]) {
            return "correct"; // Exact match
          } else if (gameWordArray.includes(letter)) {
            return "misplaced"; // Letter exists but is misplaced
          } else {
            return "wrong"; // Letter does not exist in the word
          }
        })
      : [];

    return (
      <div key={rowIndex} className="grid grid-cols-5 gap-2 my-1">
        {Array.from({ length: collumns }).map((_, colIndex) => (
          <div
            key={colIndex}
            className={`w-16 h-16 border-2 border-gray-500 flex items-center justify-center text-lg font-bold ${
              isSubmitted && letterStatuses[colIndex] === "correct"
                ? "bg-green-500"
                : isSubmitted && letterStatuses[colIndex] === "misplaced"
                ? "bg-yellow-500"
                : isSubmitted && letterStatuses[colIndex] === "wrong"
                ? "bg-red-500"
                : ""
            }`}
          >
            {guess[colIndex] || ""}
          </div>
        ))}
      </div>
    );
  });

  return <div className="my-4">{grid}</div>;
};

export default Grid;
