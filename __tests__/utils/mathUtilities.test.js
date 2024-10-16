const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

// Tests for getQuestion
describe("Tests for getQuestion", () => {
  test("should return an object with questionText and answer properties", () => {
    const result = getQuestion();
    expect(result).toHaveProperty("questionText");
    expect(result).toHaveProperty("answer");
  });

  test("questionText should be a string", () => {
    const { questionText } = getQuestion();
    expect(typeof questionText).toBe("string");
  });

  test("answer should be a number", () => {
    const { answer } = getQuestion();
    expect(typeof answer).toBe("number");
  });

  test("should generate different questions", () => {
    const question1 = getQuestion();
    const question2 = getQuestion();
    expect(question1.questionText).not.toBe(question2.questionText);
  });
});

// Tests for isCorrectAnswer
describe("Tests for isCorrectAnswer", () => {
  test("should return true for a correct answer", () => {
    const question = { questionText: "2 + 2", answer: 4 };
    const userAnswer = "4";
    expect(isCorrectAnswer(question, userAnswer)).toBe(true);
  });

  test("should return false for an incorrect answer", () => {
    const question = { questionText: "2 + 2", answer: 4 };
    const userAnswer = "5";
    expect(isCorrectAnswer(question, userAnswer)).toBe(false);
  });

  test("should handle addition correctly", () => {
    const question = { questionText: "4 + 4", answer: 8 };
    const userAnswer = "8";
    expect(isCorrectAnswer(question, userAnswer)).toBe(true);
  });

  test("should handle subtraction correctly", () => {
    const question = { questionText: "30 - 3", answer: 27 };
    const userAnswer = "27";
    expect(isCorrectAnswer(question, userAnswer)).toBe(true);
  });

  test("should handle multiplication correctly", () => {
    const question = { questionText: "4 * 6", answer: 24 };
    const userAnswer = "24";
    expect(isCorrectAnswer(question, userAnswer)).toBe(true);
  });

  test("should handle division correctly", () => {
    const question = { questionText: "15 / 3", answer: 5 };
    const userAnswer = "5";
    expect(isCorrectAnswer(question, userAnswer)).toBe(true);
  });

  test("should return false for non-numeric inputs", () => {
    const question = { questionText: "2 + 2", answer: 4 };
    expect(isCorrectAnswer(question, "four")).toBe(false);
    expect(isCorrectAnswer(question, null)).toBe(false);
    expect(isCorrectAnswer(question, undefined)).toBe(false);
  });
});
