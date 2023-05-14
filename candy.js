var candies = ["Blue", "Orange", "Green", "Red", "Yellow", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var current;
var target;

window.onload = function () {
  startGame();

  window.setInterval(function () {
    crushing();
    slideCandy();
    generateCandy();
  }, 100);
};

function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      //<img id="0-0">
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "./images/" + randomCandy() + ".png";

      //DRAG AND DROP
      tile.addEventListener("dragstart", dragStart); //initialize drag
      tile.addEventListener("dragover", dragOver); //pointer to drag candy
      tile.addEventListener("dragenter", dragEnter); //dragging on to other
      tile.addEventListener("dragleave", dragLeave); //leave candy one over another
      tile.addEventListener("drop", dragDrop); //dropping a candy over another
      tile.addEventListener("dragend", dragEnd); //swap candies

      document.getElementById("board").append(tile);

      row.push(tile);
    }
    board.push(row);
  }
  console.log(board);
}

function dragStart() {
  //clicked on candy
  current = this;
}

function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  //target candy
  target = this;
}

function dragEnd() {
  //swap candies

  if (current.src.includes("blank") || target.src.includes("blank")) {
    return;
  }

  let currCord = current.id.split("-");
  let r = parseInt(currCord[0]);
  let c = parseInt(currCord[1]);

  let targetCord = target.id.split("-");
  let r2 = parseInt(targetCord[0]);
  let c2 = parseInt(targetCord[1]);

  let moveLeft = c2 == c - 1 && r == r2;
  let moveRight = c2 == c + 1 && r == r2;

  let moveup = r2 == r - 1 && c == c2;
  let movedown = r2 == r + 1 && c == c2;

  let isAdjacent = moveRight || moveLeft || moveup || movedown;

  if (isAdjacent) {
    let currentCandy = current.src;
    let targetCandy = target.src;

    current.src = targetCandy;
    target.src = currentCandy;

    let validMove = vaildOrNot();

    if (!validMove) {
      let currentCandy = current.src;
      let targetCandy = target.src;

      current.src = targetCandy;
      target.src = currentCandy;
    }
  }
}

function crushing() {
  crushThree();
  document.getElementById("score").innerText = score;
}

function crushThree() {
  //ROW-WISE

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 10;
      }
    }
  }

  //COLUMN-WISE
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 10;
      }
    }
  }
}

function vaildOrNot() {
  //ROW-WISE

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }

  //COLUMN-WISE
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }
  return false;
}
function slideCandy() {
  for (let c = 0; c < columns; c++) {
    let ind = rows - 1;
    for (let r = columns - 1; r >= 0; r--) {
      if (!board[r][c].src.includes("blank")) {
        board[ind][c].src = board[r][c].src;
        ind -= 1;
      }
    }

    for (let r = ind; r >= 0; r--) {
      board[r][c].src = "./images/blank.png";
    }
  }
}

function generateCandy() {
  for (let c = 0; c < columns; c++) {
    if (board[0][c].src.includes("blank")) {
      board[0][c].src = "./images/" + randomCandy() + ".png";
    }
  }
}
