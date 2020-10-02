let rows;
let cols;
let w;
let h;
let board;
let cell;
let bombsPercentage = 0.15
let dimensions;
let firstClick = true;
let cells = 10;
let difficultyCells = 10;
let start = true;
// var resetButton = document.getElementById("resetButton");
// console.log(resetButton);
  

  function setup() {
    if(start){
      start = false;
      var resetButton = document.getElementById("resetButton");
      resetButton.addEventListener("click", restartGameButton);
      var difficulty = document.getElementById("difficulty");
      difficulty.addEventListener("change", setGameDifficulty);
    }
    
    
    dimensions = 500;
    createCanvas(dimensions, dimensions);
    
    w = width / cells;
    h = height / cells;
    
    board = new Array(cells);
    
    // FILLING UP BOARD
    {
      for (let i = 0; i < cells; i++) {
        board[i] = new Array(cells);
      }
      
      for (let i = 0; i < cells; i++) {
        for (let j = 0; j < cells; j++) {
          board[i][j] = new Cell(i * h, j * w, w, h, 5);
        }
      }
    }
    
    board = new Board(board);
    // console.table(board.cells);
    // calculateValues(board);
  }

function draw() {
  background(0);
  board.show();
}

function mousePressed() {
  board.checkBoardClick(false);
  // checkEnd(board);
}

function setGameDifficulty(e){
  let option = e.target.options[e.target.selectedIndex].value;
  // console.log(e.target.options[e.target.selectedIndex].value);
  if(option == "Easy"){
    difficultyCells = 10;
    restartGame(10);
  }
  else if(option == "Medium"){
    difficultyCells = 20;
    restartGame(20);
  }
  else if(option == "Hard"){
    difficultyCells = 30;
    restartGame(30);
  }
}


// PRESS 'R' TO RESTART GAME
// PRESS 'SPACE' TO PLANT FLAG
function keyPressed() {
  if (keyCode === 82) {
    // PRESS 'R' TO RESET GAME
    restartGame(difficultyCells);
  }
  if (keyCode === 32) {
    //flag click
    board.checkBoardClick(true);
  }
}

function restartGame(c){
  cells = c;
  firstClick = true;
  setup();
  loop();
}

function restartGameButton(){
  restartGame(difficultyCells);
}


// CELL REVEAL FUNCTION
function revealCell(cell) {
  if(firstClick){
    if(cell.bomb){
      cell.setBomb(false);
      for(let i = 0; i < cell.neighbours.length; i++){
        cell.neighbours[i].bomb = false;
      }
      // board = new Board(board);
      calculateValues(board);
      cell.setBomb(false);
    }else {
      calculateValues(board);
    }
    firstClick = false;
    // revealCell(cell);
    // return;
  }
  cell.revealed = true;

  if (cell.bomb) {
    revealAllBombs();
    return;
  }

  //IF IT HAS NO BOMB NEIGHBOURS AND ITS NOT A BOMB
  if (cell.value == 0) {
    for (let i = 0; i < cell.neighbours.length; i++) {
      let neighbourCell = cell.neighbours[i];
      if (!neighbourCell.revealed) {

        neighbourCell.revealed = true;
        neighbourCell.onClick(false);

        if (neighbourCell.value == 0) {
          revealCell(neighbourCell)
        }
      }


    }
  } else if (cell.value > 0) {
    cell.revealed = true;
  }

}


function revealAllBombs() {
  for (let i = 0; i < board.cells.length; i++) {
    for (let j = 0; j < board.cells.length; j++) {
      if (board.cells[i][j].bomb) {
        board.cells[i][j].color = color(255, 0, 0);
        board.cells[i][j].value = 0;
        board.cells[i][j].revealed = true;
        // board.cells[i][j].onClick(false);
      }
    }
  }

  noLoop();
}

function calculateValues(board) {
  for (let i = 0; i < board.cells.length; i++) {
    for (let j = 0; j < board.cells.length; j++) {
      current = board.cells[i][j];
      if (current.bomb) {
        current.value = -1;
        continue;
      }
      let x = current.x / current.h;
      let y = current.y / current.w;

      if (x > 0) {
        // there is a cell-neighbour LEFT
        current.neighbours.push(board.cells[i - 1][j]);
        if (board.cells[i - 1][j].bomb) {
          current.value++;
        }
      }
      if (y > 0) {
        // there is a cell-neighbour UP
        current.neighbours.push(board.cells[i][j - 1]);
        if (board.cells[i][j - 1].bomb) {
          current.value++;
        }
      }
      if (x < board.cells.length - 1) {
        // there is a cell-neighbour RIGHT
        current.neighbours.push(board.cells[i + 1][j]);
        if (board.cells[i + 1][j].bomb) {
          current.value++;
        }
      }
      if (y < board.cells.length - 1) {
        // there is a cell-neighbour DOWN
        current.neighbours.push(board.cells[i][j + 1]);
        if (board.cells[i][j + 1].bomb) {
          current.value++;
        }
      }

      if (y > 0 && x > 0) {
        // there is a cell-neighbour UP-LEFT
        current.neighbours.push(board.cells[i - 1][j - 1]);
        if (board.cells[i - 1][j - 1].bomb) {
          current.value++;
        }
      }
      if (y > 0 && x < board.cells.length - 1) {
        // there is a cell-neighbour UP-RIGHT
        current.neighbours.push(board.cells[i + 1][j - 1]);
        if (board.cells[i + 1][j - 1].bomb) {
          current.value++;
        }
      }
      if (y < board.cells.length - 1 && x > 0) {
        // there is a cell-neighbour DOWN-LEFT
        current.neighbours.push(board.cells[i - 1][j + 1]);
        if (board.cells[i - 1][j + 1].bomb) {
          current.value++;
        }
      }
      if (y < board.cells.length - 1 && x < board.cells.length - 1) {
        // there is a cell-neighoubr DOWN-RIGHT
        current.neighbours.push(board.cells[i + 1][j + 1]);
        if (board.cells[i + 1][j + 1].bomb) {
          current.value++;
        }
      }


    }
  }


}

// function checkEnd(board){
//   let end = true;
//   for(let i = 0; i < board.cells.length; i++){
//     for(let j = 0; j < board.cells.length; j++){
//       let cell = board.cells[i][j];
//       if (cell.revealed || cell.flag || cell.clicked){
//         end = true;
//       }
//       else {
//         end = false;
//       }
//   }
// }
//   if(end == true){
//     fill(255);
//     textSize(90);
//     textAlign(CENTER, CENTER);
//     text('Congrats!!!', width/2, height/2, 9);
//   }
  
  
// }