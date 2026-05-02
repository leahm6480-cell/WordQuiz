const express = require('express');
const app = express();

const quizRouter = require('./quiz');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', quizRouter);

app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});
