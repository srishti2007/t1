var drawing = [];
var db_drawing = [];
var canvas;
var database;

function setup(){

    canvas = createCanvas(1336, 608);

    database = firebase.database();

    background(51);

    var button = createButton('clear');
    button.position(200, 380);
    button.mousePressed(clearDrawing);
}

function mouseDragged(){
  noStroke();

  var point={
    x : mouseX,
    y : mouseY
  }
  drawing.push(point);
  var drawingRef = database.ref('drawing');
  drawingRef.set({
    "d":drawing
  })
}

function draw(){
  background(0);
  readData();
  beginShape();
  stroke(252, 102, 255);
  strokeWeight(4);
  for(var i; i< db_drawing.length; i++){
    vertex(db_drawing[i].x, db_drawing[i].y);
    endshape();
  }
}

function readData(){
  database.ref('drawing/').on('value', (data) =>{
    db_drawing = data.val().d
  })
}

function clearDrawing(){
  db_drawing = [];
  var adaRef = database.ref('drawing');
  adaRef.remove();
}