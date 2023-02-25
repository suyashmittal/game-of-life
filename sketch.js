
let on = 0;
let grid;
let width = 400;
let height = 400;
let res = 16;
let cols =  width/res;
let rows = height/res;

function setup() {
  var myCanvas = createCanvas(width, height);
  myCanvas.parent(sim);
  frameRate(24);
  grid = make2Darray(cols,rows);
  for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
      grid[i][j] = 0;
    }
  }
}

function draw() {
  background(255);
  
  for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
      let x = i*res;
      let y = j*res;
      if(grid[i][j] == 0){
        fill(255);
        stroke(0);
        rect(x,y,res-1,res-1);
      }
      if(grid[i][j] == 1){
        fill(0);
        stroke(0);
        rect(x,y,res-1,res-1);
      }
    }
  }

  if(on==1){
    update(grid);
  }
}

function update(){
  let next = make2Darray(cols,rows);

  for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
      let state = grid[i][j];
      let neigh = calcNeighbours(grid,i,j);

      if (state == 0 && neigh == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neigh < 2 || neigh > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  grid = next;
}

function make2Darray(i,j){
  let arr = new Array(i);
  for(let x=0;x<arr.length;x++){
    arr[x] = new Array(j);
  }
  return arr;
}

function calcNeighbours(grid,x,y){
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = x+i;
      let row = y+j;
      if(col == -1){
        col = cols-1;
      }
      else if(col == cols){
        col = 0;
      }
      if(row == -1){
        row = rows-1;
      }
      else if(row == rows){
        row = 0;
      }
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function keyPressed(){
  if (keyCode === ENTER && on == 0 ){
    on = 1;
  }
  else if (keyCode === ENTER && on == 1){
    on = 0;
  }
}

function keyTyped() {
  if(key === 'c'){
    for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++){
        grid[i][j] = 0;
      }
    }
  }

  if(key === 'r'){
    for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++){
        grid[i][j] = floor(random(2));
      }
    }
  }
}


function mouseDragged() {
  const col = Math.floor(mouseY / res);
  const row = Math.floor(mouseX / res);
  if (grid[row][col] === 0) {
    grid[row][col] = 1;
  }
  else if (grid[row][col] === 1) {
    grid[row][col] = 0;
  }
}

function mousePressed() {
  const col = Math.floor(mouseY / res);
  const row = Math.floor(mouseX / res);
  if (grid[row][col] === 0) {
    grid[row][col] = 1;
  }
  else if (grid[row][col] === 1) {
    grid[row][col] = 0;
  }
}