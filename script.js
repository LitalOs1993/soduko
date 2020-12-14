//our 4 boards
const board1 = [
  ["6", "8", "5", "3", "2", "9", "1", "7", "4"],
  ["9", "7", "1", "4", "8", "5", "3", "2", "6"],
  ["2", "3", "4", "7", "6", "1", "8", "5", "9"],
  ["3", "6", "2", "5", "7", "4", "9", "8", "1"],
  ["5", "4", "9", "6", "1", "8", "7", "3", "2"],
  ["7", "1", "8", "2", "9", "3", "4", "6", "5"],
  ["8", "2", "3", "9", "4", "6", "5", "1", "7"],
  ["1", "9", "7", "8", "5", "2", "6", "4", "3"],
  ["4", "5", "6", "1", "3", "7", "2", "9", "8"],
];

const board2 = [
  ["3", "1", "6", "5", "7", "8", "4", "9", "2"],
  ["5", "2", "9", "1", "3", "4", "7", "6", "8"],
  ["4", "8", "7", "6", "2", "9", "5", "3", "1"],
  ["2", "6", "3", "4", "1", "5", "9", "8", "7"],
  ["9", "7", "4", "8", "6", "3", "1", "2", "5"],
  ["8", "5", "1", "7", "9", "2", "6", "4", "3"],
  ["1", "3", "8", "9", "4", "7", "2", "5", "6"],
  ["6", "9", "2", "3", "5", "1", "8", "7", "4"],
  ["7", "4", "5", "2", "8", "6", "3", "1", "9"],
];

const board3 = [
  ["7", "1", "2", "5", "8", "3", "6", "9", "4"],
  ["6", "3", "9", "7", "1", "4", "2", "5", "8"],
  ["8", "4", "5", "2", "6", "9", "1", "7", "3"],
  ["5", "2", "1", "4", "3", "6", "9", "8", "7"],
  ["3", "6", "7", "9", "2", "8", "4", "1", "5"],
  ["4", "9", "8", "1", "7", "5", "3", "2", "6"],
  ["1", "8", "4", "6", "9", "7", "5", "3", "2"],
  ["2", "5", "3", "8", "4", "1", "7", "6", "9"],
  ["9", "7", "6", "3", "5", "2", "8", "4", "1"],
];

const board4 = [
  ["3", "1", "6", "5", "7", "8", "4", "9", "2"],
  ["5", "2", "9", "1", "3", "4", "7", "6", "8"],
  ["4", "8", "7", "6", "2", "9", "5", "3", "1"],
  ["2", "6", "3", "4", "1", "5", "9", "8", "7"],
  ["9", "7", "4", "8", "6", "3", "1", "2", "5"],
  ["8", "5", "1", "7", "9", "2", "6", "4", "3"],
  ["1", "3", "8", "9", "4", "7", "2", "5", "6"],
  ["6", "9", "2", "3", "5", "1", "8", "7", "4"],
  ["7", "4", "5", "2", "8", "6", "3", "1", "9"],
];

// Create global variables
var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;
var boardRand;

//the onload function
window.onload = function () {
  id("header").classList.add("hidden");
  id("login-error-msg").classList.add("hidden");
  id("start-btn").classList.add("hidden");
  id("solve-btn").classList.add("hidden");
  const loginForm = document.getElementById("login-form");
  const loginButton = document.getElementById("login-form-sumbit");
  const loginErrorMsg = document.getElementById("login-error-msg");
  // Defind the logiin button from HTML and do only validiation
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    //Set the username and password values and the rules for them
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    if (username === "abcd" && password === "1234") {
      id("loginWindow").classList.add("hidden");
      id("login-error-msg").classList.add("hidden");
      id("start-btn").classList.remove("hidden");
      id("welcome").classList.remove("hidden");
      id("start-btn").classList.add("hidden");
    } else {
      loginErrorMsg.style.opacity = 1;
      id("login-error-msg").classList.remove("hidden");
    }
  });
  //add event listner to each number in number container
  for (let i = 0; i < id("number-container").children.length; i++) {
    id("number-container").children[i].addEventListener("click", function () {
      //if selecting is not disable
      if (!disableSelect) {
        //if number is already selected
        if (this.classList.contains("selected")) {
          //then remove selection
          this.classList.remove("selected");
          selectedNum = null;
        } else {
          //deselect all other numbers
          for (let i = 0; i < 9; i++) {
            id("number-container").children[i].classList.remove("selected");
          }
          //select it and update selectedNum variable
          this.classList.add("selected");
          selectedNum = this;
          updateMove();
        }
      }
    });
  }
};

//used once after welcome page
function goToGame() {
  id("header").classList.remove("hidden");
  id("youLose").classList.add("hidden");
  id("youWin").classList.add("hidden");
  id("welcome").classList.add("hidden");
  id("board").classList.add("hidden");
  id("start-btn").classList.remove("hidden");
  id("solve-btn").classList.remove("hidden");
}

//for all the 'start-btn' buttons
function startGame() {
  id("youLose").classList.add("hidden");
  id("youWin").classList.add("hidden");
  id("stats").classList.remove("hidden");
  id("solve-btn").style.display = 'inline';
  let board;
  //get random board
  rand = Math.floor(Math.random() * 4) + 1;
  if (rand == 1) {
    boardRand = board1;
  } else if (rand == 2) {
    boardRand = board2;
  } else if (rand == 3) {
    boardRand = board3;
  } else {
    boardRand = board4;
  }
  //go to createBoardDiff function
  if (id("diff-1").checked) {
    board = createBoardDiff("diff-1", boardRand);
  } else if (id("diff-2").checked) {
    board = createBoardDiff("diff-2", boardRand);
  } else {
    board = createBoardDiff("diff-3", boardRand);
  }
  //   Set lives to 3 and enable selecting numbers and tiles
  lives = 3;
  disableSelect = false;
  id("lives").textContent = "Lives Remaining: 3";
  //   Creates board based on difficulty
  generateBoard(board);
  //   Starts the timer
  startTimer();
  // Show number container
  id("number-container").classList.remove("hidden");
}

//Choose board dificulty & create board
function createBoardDiff(diff, boardRand) {
  let str = "";
  for (let row = 0; row < boardRand.length; row++) {
    for (let col = 0; col < boardRand[row].length; col++) {
      str += boardRand[row][col];
    }
  }
  if (diff == "diff-1") {
    for (let i = 0; i < 21; i++) {
      let num = Math.floor(Math.random() * 81);
      if (str.charAt(num) !== "-") str = replaceAt(str, num, "-");
      else i = i - 1;
    }
  } else if (diff == "diff-2") {
    for (let i = 0; i < 41; i++) {
      let num = Math.floor(Math.random() * 81);
      if (str.charAt(num) !== "-") str = replaceAt(str, num, "-");
      else i = i - 1;
    }
  } else {
    for (let i = 0; i < 60; i++) {
      let num = Math.floor(Math.random() * 81);
      if (str.charAt(num) !== "-") str = replaceAt(str, num, "-");
      else i = i - 1;
    }
  }
  return str;
}

//replace a character in the board to '-'
function replaceAt(string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}

//timer function
function startTimer() {
  // Sets time remining based on input
  if (id("time-1").checked) timeRemaining = 180;
  else if (id("time-2").checked) timeRemaining = 300;
  else timeRemaining = 600;
  // Sets timer for first second
  id("timer").textContent = 'Time Left: '+ timeConversion(timeRemaining);
  // Sets timer to update every sec
  timer = setInterval(function () {
    timeRemaining--;
    // If no time remaining end the game
    if (timeRemaining === 0) endGame();
    // if (id('timer').textCovntent=='00:00') endGame();
    id("timer").textContent = 'Time Left: '+ timeConversion(timeRemaining);
  }, 1000);
}
// Converts secs into string of MM:SS format
function timeConversion(time) {
  let minutes = Math.floor(time / 60);
  if (minutes < 10) minutes = "0" + minutes;
  let seconds = time % 60;
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
}

function createSolvedBoard() {
  let solution = "";
  for (let row = 0; row < boardRand.length; row++) {
    for (let col = 0; col < boardRand[row].length; col++) {
      solution += boardRand[row][col];
    }
  }
  let tiles = qsa(".tile");
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].textContent = solution[i];
  }
  clearTimeout(timer);
  disableSelect = true;
}

function generateBoard(board) {
  // Clear previous board
  clearPrevious();
  // idCount used to increment tile ids
  let idCount = 0;
  // Create 81 tiles
  for (let i = 0; i < 81; i++) {
    // Create a new paragraph elemnt
    let tile = document.createElement("p");
    // if the tile is not supposed to be blank
    if (board.charAt(i) != "-") {
      // Set tile text to coreect number
      tile.textContent = board.charAt(i);
    } else {
      // Add click event listener to tile
      tile.addEventListener("click", function () {
        // if selecting is not disabled
        if (!disableSelect) {
          //if the tile is already selected
          if (tile.classList.contains("selected")) {
            //then remove selection
            tile.classList.remove("selected");
            selectedTile = null;
          } else {
            //deselect all other tiles
            for (let i = 0; i < 81; i++) {
              qsa(".tile")[i].classList.remove("selected");
            }
            //add selection and update variable
            tile.classList.add("selected");
            selectedTile = tile;
            updateMove();
          }
        }
      });
    }
    // Assign tile id
    tile.id = idCount;
    // Increment for next tile
    idCount++;
    // Add tile class to all tiles
    tile.classList.add("tile");
    // Create dividing lines on the board
    if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)) {
      tile.classList.add("bottomBoarder");
    }
    if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
      tile.classList.add("rightBoarder");
    }
    for (let i = 0; i < 81; i++) {
      if (
        (tile.id > 2 && tile.id < 6) ||
        (tile.id > 11 && tile.id < 15) ||
        (tile.id > 20 && tile.id < 24) ||
        (tile.id > 26 && tile.id < 30) ||
        (tile.id > 35 && tile.id < 39) ||
        (tile.id > 44 && tile.id < 48) ||
        (tile.id > 32 && tile.id < 36) ||
        (tile.id > 41 && tile.id < 45) ||
        (tile.id > 50 && tile.id < 54) ||
        (tile.id > 56 && tile.id < 60) ||
        (tile.id > 65 && tile.id < 69) ||
        (tile.id > 74 && tile.id < 78)
      )
        tile.classList.add("addB");
    }
    // Add tile to board
    id("board").appendChild(tile);
  }
}

function updateMove() {
  //if a tile and a number is selected
  if (selectedTile && selectedNum) {
    // set the tile to the correct number
    selectedTile.textContent = selectedNum.textContent;
    // if the number matches the corresponding number in the solution key
    if (checkCorrect(selectedTile)) {
      // deselect the tiles
      selectedTile.classList.remove("selected");
      selectedNum.classList.remove("selected");
      // clear the selected variables
      selectedNum = null;
      selectedTile = null;
      // check if board is completed
      if (checkDone()) {
        endGame();
      }
      // if the number does not match the solution key
    } else {
      //disable selecting new numbers for one second
      disableSelect = true;
      //make the tile turn red
      selectedTile.classList.add("incorrect");
      //run in one second
      setTimeout(function () {
        //subtract lives by one
        lives--;
        //if no lives left end game
        if (lives === 0) {
          endGame();
        } else {
          //if lives is not equel to zero
          //update lives text
          id("lives").textContent = "Lives remaining: " + lives;
          // renable selecting numbers and tiles
          disableSelect = false;
        }
        // restore tile color and remove selected from both
        selectedTile.classList.remove("incorrect");
        selectedTile.classList.remove("selected");
        selectedNum.classList.remove("selected");
        //clear the tiles text and clear selected variables
        selectedTile.textContent = "";
        selectedTile = null;
        selectedNum = null;
      }, 1000);
    }
  }
}

//checks if board is full or not
function checkDone() {
  let tiles = qsa(".tile");
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].textContent === "") return false;
  }
  return true;
}

function endGame() {
  //DISABLE MOVE AND STOP THE TIMER
  disableSelect = true;
  clearTimeout(timer);
  // display win or loss message
  if (lives === 0 || timeRemaining === 0) {
    id("youLose").classList.remove("hidden");
    id("lWindow").textContent = "Lives remaining: " + lives;
    id("tR").textContent = "  Time left: " + timeConversion(timeRemaining);
  } else {
    id("youWin").classList.remove("hidden");
    id("wWindow").textContent = "Lives remaining: " + lives;
    id("wR").textContent = "  Time left: " + timeConversion(timeRemaining);
  }
}

//checks if the number of the user is in the right place
function checkCorrect(tile) {
  let solution = "";
  for (let row = 0; row < boardRand.length; row++) {
    for (let col = 0; col < boardRand[row].length; col++) {
      solution += boardRand[row][col];
    }
  }
  //if tiles number is equel to solution number
  if (solution.charAt(tile.id) === tile.textContent) return true;
  else return false;
}

//clears the pre user's selection
function clearPrevious() {
  // Accsess all of the tiles
  let tiles = qsa(".tile");
  //   Remove each tile
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].remove();
  }
  // If there is a timer clear it
  if (timer) clearTimeout(timer);
  // Deselect any numbers
  for (let i = 0; i < id("number-container").children.lengthx; i++) {
    id("number-container").children[i].classList.remove("selected");
  }
  // Clear selected var
  return (selectedTile = null);
  return (selectedNum = null);
}

// Helper functions
// in order to take id's from html
function id(id) {
  return document.getElementById(id);
}
// in order to take selectors from page
function qs(selector) {
  return document.querySelector(selector);
}
// in order to create an array of tiels
function qsa(selector) {
  return document.querySelectorAll(selector);
}
