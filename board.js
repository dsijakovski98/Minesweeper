class Board {

  constructor(board) {
    this.rows = rows;
    this.cols = cols;
    this.cells = board;
  }


  show() {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        this.cells[i][j].show();
        this.checkBoardHover(i, j);
      }
    }
  }

  checkBoardHover(i, j) {
    if (this.cells[i][j].hovered(mouseX, mouseY)) {
      this.cells[i][j].onHover();
    } else {
      this.cells[i][j].onHoverExit();
    }
  }

  checkBoardClick(flag) {
   
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        
        
        if (this.cells[i][j].hovered(mouseX, mouseY)) {
          
          if (!this.cells[i][j].clicked || this.cells[i][j].flag) {
            this.cells[i][j].onClick(flag);
            this.cells[i][j].clicked = true;
          }
          
        }
        
        
      }
    }
    
    
    
  }


}