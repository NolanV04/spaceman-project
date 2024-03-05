const codeWords = [
    { word: "function", hint: "Code task" },
    { word: "variable", hint: "Data storage" },
    { word: "loop", hint: "Repeated code" },
    { word: "array", hint: "Multiple values" },
    { word: "object", hint: "Key-value pairs" },
    { word: "method", hint: "Object function" },
    { word: "parameter", hint: "Function inputs" },
    { word: "argument", hint: "Function calls" },
    { word: "return", hint: "Function output" },
    { word: "string", hint: "Text data" },
    { word: "number", hint: "Numeric data" },
    { word: "boolean", hint: "True or false" },
    { word: "null", hint: "Absence of value" },
    { word: "undefined", hint: "Not defined" },
    { word: "if", hint: "Conditional statement" },
    { word: "else", hint: "Alternative condition" },
    { word: "for", hint: "Loop control" },
    { word: "while", hint: "Condition loop" },
    { word: "switch", hint: "Multiple choices" },
    { word: "case", hint: "Switch case" },
    { word: "break", hint: "Loop exit" },
    { word: "continue", hint: "Loop skip" },
    { word: "const", hint: "Immutable variable" },
    { word: "let", hint: "Block-scoped variable" },
    { word: "var", hint: "Global variable" }
];

let rightAnswer;
let hint;
let guesses = [];
let wrongGuessCount = 0;
let currentWordDisplay = [];
// This function starts the game, selects programming-related word&hint
// Then creates placeholders, each letter being represented by an underscore
// Displays initial state of the word and hint on screen
function initializeGame() {
    const rightAnswerIdx = Math.floor(Math.random() * codeWords.length);
    rightAnswer = codeWords[rightAnswerIdx].word;
    hint = codeWords[rightAnswerIdx].hint;
    currentWordDisplay = Array(rightAnswer.length).fill("_");
    displayWord();
    displayHint();
}

// Updates display to show the current state of the word being guessed
// It takes the array of placeholders representing the word and joins them into one string
// Then it is displayed on the screen
function displayWord() {
    const wordDiv = document.getElementById('word');
    wordDiv.textContent = currentWordDisplay.join(" ");
}
// Sets hint as placeholder text for input box
// Retrieves hint for the current word and sets it as placeholder text
function displayHint() {
    const guessInput = document.getElementById("guessInput");
    guessInput.placeholder = "Hint: " + hint;
}
// Called when player submits a guess
// Validates input to make sure single letter
// Then checks if guessed letter is in the word, if correct updates display with correct letter(s)
// If guess is incorrect, keeps track of number of wrong guesses, also checks if player has guessed the whole word
function checkGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.trim().toLowerCase();

    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        displayResult("Invalid input! Please enter a single letter.", "red");
        return;
    }

    if (rightAnswer.includes(guess)) {
        updatePlaceholders(guess);
        if (currentWordDisplay.join("") === rightAnswer) {
            displayResult("Correct! You've guessed the word!", "green");
            return;
        }
        displayResult("Correct!", "green");
    } else {
        wrongGuessCount++;
        if (wrongGuessCount >= 5) {
            displayResult("Wrong! The correct answer is: " + rightAnswer, "red");
        } else {
            displayResult("Wrong!", "red");
        }
    }

    guesses.push(guess);
    displayPreviousGuesses();
    guessInput.value = "";
}
// updates array of placehokders representing the current state of the word
// takes correctly guessed letter and updates placeholders array to reveal letters at the right place
function updatePlaceholders(letter) {
    for (let i = 0; i < rightAnswer.length; i++) {
        if (rightAnswer[i] === letter) {
            currentWordDisplay[i] = letter;
        }
    }
    displayWord();
}
// This function displays a message indicating whether the guess was right or wrong, 
// Takes message&color as input and displays message in specified color
function displayResult(message, color) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
    resultDiv.style.color = color;
}
// Updates display to show previously guessed letters
// Creates paragraph element for each guessed letter and appends them to a container on screen
function displayPreviousGuesses() {
    const previousGuessesDiv = document.getElementById('previousGuesses');
    previousGuessesDiv.innerHTML = "<h3>Previous Guesses:</h3>";
    guesses.forEach(guess => {
        const guessPara = document.createElement('p');
        guessPara.textContent = guess;
        previousGuessesDiv.appendChild(guessPara);
    });
}

initializeGame();

