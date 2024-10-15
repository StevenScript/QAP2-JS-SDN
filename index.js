const express = require("express");
const { getQuestion, isCorrectAnswer } = require("./mathUtilities");
const app = express();
const port = 3000;

let currentQuestion = null;
let streak = 0;
let lastStreak = 0;

// For leaderboards
let streaks = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public")); // To serve static files (e.g., CSS)

//Some routes required for full functionality are missing here. Only get routes should be required
app.get("/", (req, res) => {
  res.render("index", { lastStreak });
});

app.get("/quiz", (req, res) => {
  res.render("quiz", { question: currentQuestion.questionText });
});

//Handles quiz submissions.
app.post("/quiz", (req, res) => {
  const { answer } = req.body;
  console.log(`Answer: ${answer}`);

  // Check if the answer is correct
  const correct = isCorrectAnswer(currentQuestion, answer);

  if (correct) {
    streak++;
    res.redirect("/quiz"); // Continue the quiz with a new question
  } else {
    lastStreak = streak;
    streaks.push({ streak: streak, date: new Date() });
    streak = 0;
    res.redirect("/quiz-over"); // Redirect to quiz completion page
  }
});

app.get("/quiz-over", (req, res) => {
  res.render("quiz-over", { lastStreak });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
