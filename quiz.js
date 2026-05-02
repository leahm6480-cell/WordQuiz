const express = require('express');
const router = express.Router();
const { readFile } = require('fs').promises;

// GET
router.get("/", async (req, res) => {

    let data = await getWords();

    res.render("quiz", {
        chosenWords: data.choices,
        correctAnswer: data.correctAnswer,
        userAnswer: null,
        isCorrect: null
    });
});


// POST
router.post("/", async (req, res) => {

    let userAnswer = req.body.answer;
    let correctAnswer = req.body.correctAnswer;

    let isCorrect = userAnswer === correctAnswer;

    let data = await getWords();

    res.render("quiz", {
        chosenWords: data.choices,
        correctAnswer,
        userAnswer,
        isCorrect
    });
});


// GET WORDS
let getWords = async () => {

    console.log("Getting random part!");
    let randomPart = getRandomPart();

    let allWords = await readFile('allwords.txt', 'utf-8');
    let wordArray = allWords.split("\n");

    shuffle(wordArray);

    let choices = [];

    while (choices.length < 5 && wordArray.length > 0) {

        let line = wordArray.pop();
        if (!line) continue;

        let [word, part, def] = line.split("\t");

        if (part === randomPart) {
            choices.push({ word, part, def });
        }
    }

    let correctIndex = Math.floor(Math.random() * choices.length);
    let correctAnswer = choices[correctIndex].def;

    return {
        choices,
        correctAnswer
    };
};


let getRandomPart = () => {
    let parts = ['noun', 'verb', 'adjective'];
    return parts[Math.floor(Math.random() * parts.length)];
};

let shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

module.exports = router;
