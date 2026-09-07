const time = document.getElementById("time");
const date = document.getElementById("date");

function updateClock() {

  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  time.textContent = `${hours}:${minutes}:${seconds}`;

  date.textContent = now.toDateString();
}

updateClock();

setInterval(updateClock, 1000);



const temperature = document.getElementById("temperature");

navigator.geolocation.getCurrentPosition(async (position) => {

  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`
  );

  const data = await response.json();

  temperature.textContent = 
  `${data.current.temperature_2m}°F`;
});




const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");

let player = "X";
let gameOver = false;

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach((cell, index) => {

  cell.addEventListener("click", () => {

    if (cell.textContent !== "" || gameOver) {
      return;
    }

    cell.textContent = "X";

    if (checkWinner("X")) {
      alert("You win!");
      gameOver = true;
      return;
    }

    if (checkDraw()) {
      alert("Draw!");
      gameOver = true;
      return;
    }

    computerMove();

  });

});

function computerMove() {
  const emptyCells = [];

  cells.forEach((cell, index) => {
    if (cell.textContent === "") {
      emptyCells.push(index);
    }
  });

  if (emptyCells.length === 0) {
    return;
  }

  const randomIndex =
  emptyCells[Math.floor(Math.random() * emptyCells.length)];

  cells[randomIndex].textContent = "O";

  if (checkWinner("O")) {
    alert("Computer wins!");
    gameOver = true;
  }
}

function checkWinner(player) {
  for (let win of wins) {
    const [a, b, c] = win;

    if (
      cells[a].textContent === player &&
      cells[b].textContent === player &&
      cells[c].textContent === player
    ) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return [...cells].every(cell => cell.textContent !== "")
}

resetBtn.addEventListener("click", () => {

  cells.forEach(cell => {

    cell.textContent = "";
  });

  gameOver = false;
});