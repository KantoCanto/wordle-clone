import { generate } from "random-words";

function generateWord() {
  const word = generate({ minLength: 5, maxLength: 5, exactly: 1 });
  return word;
}

export default generateWord;
