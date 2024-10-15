/**
 * Gets a random multiplication, division, subtraction or addition question
 *
 * @returns {} The randomly generated math question
 */
function getQuestion() {
  // Generate two random numbers between 1 and 10
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;

  // Define possible operations
  const operations = ["+", "-", "*", "/"];

  // Randomly select an operation
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let questionText; // Will hold the question as a string
  let answer; // Will hold the correct answer as a number

  // Determine the question and answer based on the operation
  switch (operation) {
    case "+":
      questionText = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;
    case "-":
      questionText = `${num1} - ${num2}`;
      answer = num1 - num2;
      break;
    case "*":
      questionText = `${num1} * ${num2}`;
      answer = num1 * num2;
      break;
    case "/":
      // For division, ensure result is a whole number
      const product = num1 * num2; // Multiply to get a clean dividend
      questionText = `${product} / ${num1}`; // So answer will be num2
      answer = product / num1;
      break;
  }

  // Return the question and answer as an object
  return {
    questionText,
    answer,
  };
}

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 *
 * @param {*} question The question being answered
 * @param {*} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */
function isCorrectAnswer(question, answer) {
  return false;
}

module.exports = {
  getQuestion,
  isCorrectAnswer,
};
