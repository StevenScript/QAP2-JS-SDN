const express = require("express");
const { getQuestion, isCorrectAnswer } = require("./utils/mathUtilities");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public")); // To serve static files (e.g., CSS)

let currentQuestion = null;
let streak = 0;
let lastStreak = 0;

// For leaderboards
let streaks = [];

//--------|
// ROUTES |
//--------|

// index
app.get("/", (req, res) => {
  res.render("index", { lastStreak });
});

// Quiz route
app.get("/quiz", (req, res) => {
  currentQuestion = getQuestion();
  res.render("quiz", { question: currentQuestion.questionText });
});

// Quiz submission
app.post("/quiz", (req, res) => {
  const { answer } = req.body;
  console.log(`Answer submitted: ${answer}`); // Log the answer for debugging
  const correct = isCorrectAnswer(currentQuestion, answer);
  if (correct) {
    streak++;
    res.redirect("/quiz");
  } else {
    // If incorrect, save the streak and reset it
    lastStreak = streak;
    // Add the streak to the streaks array with the current date
    streaks.push({ streak: streak, date: new Date() });
    streak = 0;
    res.redirect("/quizEnding");
  }
});

app.get("/quizEnding", (req, res) => {
  res.render("quizEnding", { lastStreak });
});

app.get("/leaderboards", (req, res) => {
  // Sort streaks in descending order and takes the top 10
  const topStreaks = streaks.sort((a, b) => b.streak - a.streak).slice(0, 10);
  res.render("leaderboards", { topStreaks });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
