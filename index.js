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

// INDEX
app.get("/", (req, res) => {
  res.render("index", { lastStreak });
});

// QUIZ
app.get("/quiz", (req, res, next) => {
  currentQuestion = getQuestion();
  if (!currentQuestion || !currentQuestion.questionText) {
    // Handle the error directly
    res.status(500).send("Error generating question. Please try again.");
    return;
  }
  res.render("quiz", { question: currentQuestion.questionText });
});

// QUIZ SUBMISSION
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

// LEADER BOARDS
app.get("/leaderboards", (req, res) => {
  // Sort streaks in descending order and takes the top 10
  const topStreaks = streaks.sort((a, b) => b.streak - a.streak).slice(0, 10);
  res.render("leaderboards", { topStreaks });
});

//--------|
// ERRORS |
//--------|

// Handle 404 errors (Page Not Found); Just to see how this works
app.use((req, res, next) => {
  const err = new Error("Page not found.");
  err.status = 404;
  err.type = "not_found";
  next(err);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
