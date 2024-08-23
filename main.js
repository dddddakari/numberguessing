// document.querySelector("body").style.backgroundColor="blue";

// Getting elements from html
const inputBox = document.querySelector("#guessInput");
const submitBtn = document.querySelector("#submitGuess");

const resetBtn = document.querySelector("#restartGame");
const prevGuess = document.querySelector("#prevGuess");
const statusMsg = document.querySelector("#statusMsg");
const hintTxt = document.querySelector("#hint");

let targetValue = getTargetValue(); // target value for user to guess
let guessCount = 0; // to keep track of number of guesses
let guessList = []; // array to keep track of previous guesses
const MAX_GUESSES = 10;

// console.log(targetValue);

function getTargetValue() {
    // Math.random() return a random value between 0 and 1 
    return Math.floor(Math.random() * 100)+1;
}

// function to start/restart the game
function resetGame() {
    guessCount = 0;
    guessList = [];
    resetBtn.style.visibility = 'hidden';
    prevGuess.style.visibility = 'hidden';
    statusMsg.style.visibility = 'hidden';
    hintTxt.style.visibility = 'hidden';

    
// Re-Enabling the Input Box and the Submit Button
    inputBox.disabled = false;
    submitBtn.disabled = false;
}


    /**
     * return 0 if guess == target value;
     * return (-) value if guess is small than target value
     * return (+) value of guess is greater than target value
     */
function checkGuess(guess) {
    return guess - targetValue;
}


function submitEventHandler() {
    const inputValue = inputBox.value;

    inputBox.value = '';    // reset the text in the input box
    inputBox.focus();       // bring the cursor to input box

    if(inputValue === '' || inputValue < 0 || inputValue > 100) {
        // user has not entered any input.
        // show alert dialog with error message
        alert("Please enter a number between 1 and 100");
        return;
    }

    console.log(inputValue);

    guessCount++;               // increment the guess count by 1
    guessList.push(inputValue); // add the guess to Previous guess list

    prevGuess.innerHTML = `Previous Guesses: ${guessList.toString()}`;

    // if this is user's first guess toggle to visibilty of 'p' elements
    if(guessCount === 1) {
        prevGuess.style.visibility = "visible";
        statusMsg.style.visibility = "visible";
        hintTxt.style.visibility = "visible";
    }

    // check the inputValue with targetValue
    const result = checkGuess(inputValue);

    // if Guess count < MAX_GUESS
    if(guessCount < MAX_GUESSES) {  
        if(result === 0) {
            // guess == targetValue
            // TODO: terminate the game with success
            endGame(true);
        } else if(result < 0) {
            // user has entered a value less than targetValue
            // continue game with proper hint text
            statusMsg.innerHTML = "WRONG!!!";
            statusMsg.style.backgroundColor = "red";
            hintTxt.innerHTML = "Last guess was Low!!! GO UP....";
        } else  {
            // user has entered a value higher than targetValue
            // continue game with proper hint text
            statusMsg.innerHTML = "WRONG!!!";
            statusMsg.style.backgroundColor = "red";
            hintTxt.innerHTML = "Last guess was High!!! GO DOWN...";
        }
    }

    if(guessCount === MAX_GUESSES) {
        if(result === 0) {
            // TODO: end game with sucess
            endGame(true);
        } else {
            // TODO: end game with failure
            endGame(false);
        }
    }
}


/**
 * Function to end the game with proper status message (depeneding on status parameter)
 * status = true : user has guessed the targetValue
 * status = false : user was not able to guess the targetValue
 */
function endGame(status) {
    inputBox.disabled = true;
    submitBtn.disabled = true;
    hintTxt.style.visibility = "hidden";
    resetBtn.style.visibility = "visible";

    if(status) {
        // terminate the game with success message
        statusMsg.innerHTML = "Congratulations!!"
        statusMsg.style.backgroundColor = "green";
    } else {
        statusMsg.innerHTML = "!!! Game Over !!!";
        statusMsg.style.backgroundColor = "red";
    }
}



submitBtn.addEventListener("click", submitEventHandler);

resetBtn.addEventListener("click", resetGame);

resetGame()
