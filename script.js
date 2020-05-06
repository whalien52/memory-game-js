const gameContainer = document.getElementById("game");
let flippedCards = [];
let matched = 0;
let SCORE = 0;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
      cardDiv.classList.add(color+"card")
      
    const innerDiv = document.createElement("div");
    innerDiv.classList.add("card-inner"); 
      
    const frontDiv = document.createElement("div");
    frontDiv.classList.add("front");
      
    const backDiv = document.createElement("div");
    backDiv.classList.add("back");
    backDiv.classList.add(color);
      innerDiv.append(frontDiv);
      innerDiv.append(backDiv);
      cardDiv.append(innerDiv);
    innerDiv.addEventListener("click", handleCardClick);
      gameContainer.append(cardDiv);
  }
}

function loadScoreBoard(SCORE) {
    if (localStorage.getItem("high-score")) {
        var highScore = localStorage.getItem("high-score");
        } else {
        var highScore = 0;
        }
    var scoreboard = document.getElementById('score');
    scoreboard.innerHTML = "<h2>Score: " + SCORE + "</h2><p>High Score: " + highScore + "</p>";
}

// TODO: Implement this function!
function handleCardClick(event) {
    this.classList.toggle('flip');
    var card = this.parentNode;
    flippedCards.push(card);
    if (flippedCards.length == 2) {
        if (flippedCards[0].classList.toString() == flippedCards[1].classList.toString()) {
            matched++;
            flippedCards = [];
            console.log("yay!");
            } else {
             setTimeout(function(){ 
             for(inner in flippedCards) {                flippedCards[inner].childNodes[0].classList.remove('flip');
            }
             flippedCards = [];
            console.log('boo!');
             }, 1000);  
        }
        SCORE++;
        loadScoreBoard(SCORE);
        if (matched == COLORS.length / 2 ) {
            console.log('winner');
            winner(SCORE);
        }
    }
}

function winner(SCORE) {
    console.log('winnerfunc');
    if (parseInt(localStorage.getItem('high-score')) > SCORE) {
        localStorage.setItem("high-score", SCORE);
        }
    loadScoreBoard(SCORE);
}

// when the DOM loads
function startGame() {
    document.getElementById('startGame').remove();
    createDivsForColors(shuffledColors);
    loadScoreBoard(SCORE); 
}

