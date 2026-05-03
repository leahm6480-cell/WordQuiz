const express = require('express');
const router = express.Router();
const { readFile } = require('fs').promises;

router.get("/", async (req, res) => {

    let chosenWords = await getWords();

    let randomIndex = Math.floor(Math.random() * chosenWords.length);
    let chosenWord = chosenWords[randomIndex];
    let [correctWord, correctPart, correctDef] = chosenWord.split('\t');

    res.render("quiz", {
        chosenWords,
        correctWord,
        correctPart,
        correctDef,
        userChoice: null,
        isCorrect: null
    });
});


//post

router.post("/", (req, res) => {
    
    console.log(req.body);
    let { userChoice, correctDef } = req.body;

    let isCorrect = false;

    if { userChoice === correctDef } = req.body;
     console.log("User guessed correctly!");
     isCorrect = true;
}

    let chosenWords = req.body.chosenWords 
        ? req.body.chosenWords.split("\n") 
        : [];

    res.render("quiz", {
        chosenWords,
        correctWord: req.body.correctWord,
        correctPart: req.body.correctPart,
        correctDef,
        userChoice,
        isCorrect
    });
});

//helper

let getWords = async () => {
    let randomPart = getRandomPart();

    let allWords = await readFile('allwords.txt', 'utf-8');
    let wordArray = allWords.split("\n");

    shuffle(wordArray);

    let choices = [];

    while (choices.length < 5) {
        let line = wordArray.pop();
        if (!line || !line.includes("\t")) continue;

        let tokens = line.split("\t");
        let word = tokens[0];
        let part = tokens[1];
        let def = tokens[2];

        if (part === randomPart) {
            choices.push(line);
        }
    }

    return choices;
};

let getRandomPart = () => {
    let parts = ['noun', 'verb', 'adjective'];
    return parts[Math.floor(Math.random() * parts.length)];
};

let shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let randomNumber = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
};

module.exports = router;
