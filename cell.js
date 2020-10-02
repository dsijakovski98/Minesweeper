class Cell {

  constructor(x, y, w, h, r) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;

    this.neighbours = [];

    this.value = 0;

    this.clicked = false;
    this.flag = false;
    this.revealed = false;

    let bombChance = random(1) < bombsPercentage
    this.bomb = bombChance;


    //COLOR BLOCK
    {
      this.color = color(255);

      if (!this.bomb) {
        // SAFE CELL COLORS
        this.revealedColor = color(201);
      } else {
        // BOMB CELL COLORS
        this.revealedColor = color(255, 0, 0);
      }


      this.startColor = this.color;
      this.flagColor = color(0, 0, 255);
      this.hoverColor = color(101);
    }

  }


  setBomb(state){
    this.bomb = state;
    if(this.bomb){
      this.revealedColor = color(255, 0, 0);
    }
    else{
      this.revealedColor = color(201);
    }
  }


  show() {
    
    // DETERMINE COLOR
    {
    if (this.flag && this.revealed) {
      fill(this.flagColor);
    } else if (!this.flag && (this.revealed || this.clicked)) {
      fill(this.revealedColor);
    } else {
      fill(this.color);
    }
    }
    
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h, this.r);

    // DETERMINE TEXT
    if ( (this.revealed || this.clicked) && !this.flag)  {
      textSize(15);
      fill(0);
      strokeWeight(2);
      textAlign(CENTER, CENTER);
      let message;
      if (this.value > 0)
        message = this.value;
      else
        message = '';
      text(message, this.x + this.w / 2, this.y + this.h / 2);
    }
    
  }

  // // HOVER EVENT LISTENER
  hovered(mX, mY) {
    if (mX < this.x + this.w && mX > this.x) {
      if (mY < this.y + this.h && mY > this.y) {
        return true;
      }
    }
    return false;
  }
  onHover() {
    if (!this.clicked)
      this.color = this.hoverColor;
  }
  onHoverExit() {
    if (!this.clicked)
      this.color = this.startColor;
  }


  // CLICK EVENT LISTENER
  onClick(flag) {
    this.flag = flag;
    
    if(this.flag){
      this.color = this.flagColor;
    }
    
    
    if (!this.flag && !this.revealed) {
      revealCell(this);
    }
  }
  onClicked() {
    this.color = this.startColor;
  }



}