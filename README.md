# Math Competition App Documentation

## Steven Norris

## 10-15-2024

Documentation for my **Math Competition App**! This guide is designed to help understand the code and techniques used in this Express.js project.

## Table of Contents

1. [Introduction](#introduction)
2. [Understanding the Code](#understanding-the-code)
   - [EJS Templates](#ejs-templates)
     - [index.ejs](#indexejs)
     - [quiz.ejs](#quizejs)
     - [quizEnding.ejs](#quizendingejs)
     - [leaderboards.ejs](#leaderboardsejs)
     - [partials/header.ejs](#partialsheaderejs)
3. [Key Concepts and Techniques](#key-concepts-and-techniques)
   - [Express.js Basics](#expressjs-basics)
   - [EJS Templating](#ejs-templating)
   - [Routing](#routing)
   - [Handling Form Data](#handling-form-data)
   - [State Management](#state-management)
   - [Error Handling](#error-handling)
4. [Conclusion](#conclusion)
5. [Additional Resources](#additional-resources)

---

## Introduction

The **Math Competition App** is a simple web application built with **Node.js** and **Express.js**. It presents users with random math questions and tracks their streak of correct answers. Users can:

- Start a new quiz.
- Answer math questions (addition, subtraction, multiplication, division).
- View their current streak.
- See the top streaks on the leaderboard.

---

## Understanding the Code

## index.js

### Imports:

- **express**: The Express.js framework.
- **getQuestion, isCorrectAnswer**: Utility functions from `mathUtilities.js`.

### Middleware:

- `app.set("view engine", "ejs")`: Sets EJS as the templating engine.
- `app.use(express.urlencoded({ extended: true }))`: Parses incoming request bodies with URL-encoded payloads (useful for form data).
- `app.use(express.static("public"))`: Serves static files from the `public` directory.

### State Variables:

- **currentQuestion**: Stores the current math question object.
- **streak**: Tracks the user's current streak of correct answers.
- **lastStreak**: Stores the last recorded streak.
- **streaks**: An array to keep track of all streaks for the leaderboard.

### Routes:

- **Home Route (`/`)**:

  - Renders the `index.ejs` template.
  - Passes `lastStreak` to display the user's last streak.

- **Quiz Route (`/quiz`)**:
  - Generates a new math question using `getQuestion()`.
  - Renders the `quiz.ejs` template with the current question.
- **Quiz Submission (`POST /quiz`)**:

  - Receives the user's answer from the form data.
  - Uses `isCorrectAnswer()` to check if the answer is correct.
  - If correct, increments the streak and redirects to `/quiz` for the next question.
  - If incorrect, updates `lastStreak`, adds the streak to `streaks`, resets `streak`, and redirects to `/quizEnding`.

- **Quiz Ending Route (`/quizEnding`)**:

  - Renders the `quizEnding.ejs` template with the last streak.

- **Leaderboards Route (`/leaderboards`)**:

  - Sorts the `streaks` array to get the top 10 streaks.
  - Renders the `leaderboards.ejs` template with the top streaks.

- **404 Error Handling**:
  - Catches all undefined routes and sends a 404 response.

### Starting the Server:

- The app listens on the specified port (3000).
- Logs a message to the console when the server starts.

## mathUtilities.js

- ### getQuestion():
- Generates two random numbers between 1 and 10.
- Randomly selects an operation: addition, subtraction, multiplication, or division.
- Constructs a question and calculates the correct answer.
- Ensures division results in whole numbers; if not possible, defaults to addition.
- Returns an object containing `questionText` and `answer`.

- ### isCorrectAnswer():
- Takes a question object and the user's answer.
- Converts the user's answer to a number using `parseFloat`.
- Compares it to the correct answer.
- Returns `true` if correct, `false` otherwise.

### EJS Templates

- **index.ejs**: Home page template displaying last streak and links to start a quiz or view leaderboards.
- **quiz.ejs**: Displays the current math question and form for user input.
- **quizEnding.ejs**: Shows the user's last streak and options to start a new quiz or return home.
- **leaderboards.ejs**: Displays the top streaks in a table format.
- **partials/header.ejs**: Common header for all pages including HTML `<head>`.

---

## Key Concepts and Techniques

### Express.js Basics

- **Express.js** is a minimal and flexible Node.js web application framework.
- **Setting Up a Server**: Create an instance of Express and define routes using `app.get()` and `app.post()`.
- **Middleware**: Use `app.use()` to add middleware, such as for parsing form data or serving static files.

### EJS Templating

- **EJS (Embedded JavaScript Templates)** allows you to create HTML pages with embedded JavaScript.
- **Rendering Templates**: Use `res.render("templateName", data)` to render an EJS template and pass data to it.

### Routing

- **Routes** define the endpoints of your web application, using GET and POST methods.

### Handling Form Data

- Use `express.urlencoded()` middleware to parse URL-encoded form data.
- Access form inputs via `req.body.inputName`.

### State Management

- Use variables to manage state, such as user streaks.

### Error Handling

- Use `res.status(code).send(message)` for simple error responses.
- Define a catch-all 404 handler for undefined routes.

---

## Conclusion

Having gone through the entire codebase of the **Math Competition App** I now have a solid understanding of how it works using Express. This application demonstrates the basics of building a web app with Express.js, including routing, templating(EJS), handling form data, and managing application state.

---

## Additional Resources

- **[Express.js Documentation](https://expressjs.com/)**
- **[EJS Documentation](https://ejs.co/)**
- **[Node.js Documentation](https://nodejs.org/en/docs/)**
- **[MDN Web Docs - Express Tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)**
- **[Express.js Middleware Tutorial](https://www.tutorialspoint.com/expressjs/expressjs_middleware.htm)**

---
