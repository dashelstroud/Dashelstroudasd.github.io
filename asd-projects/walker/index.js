/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  const KEY = {
    LEFT:37,
    RIGHT:39,
    UP:38,
    DOWN:40,
    W:87,
    A:65,
    S:83,
    D:68,
  }

  var walker = {
    posX: 0,
    posY:0,
    speedX: 0,
    speedY:0,
    width: $("#walker").width(),
    height: $("#walker").height(),
  }
  var walker2 = {
    posX: 200,
    posY:200,
    speedX: 0,
    speedY:0,
  }

  const BOARD_WIDTH = $("#board").width()
  const BOARD_HEIGHT = $("#board").height()
  
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);  

                     // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    wallCollision();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
      if(event.which === KEY.LEFT){
        walker.speedX = -5;
      }
      if(event.which === KEY.RIGHT){
        walker.speedX = 5
      }
      if(event.which === KEY.UP){
        walker.speedY = -5
      }
      if(event.which === KEY.DOWN){
        walker.speedY = 5
      }


      if(event.which === KEY.A){
        walker2.speedX = -5;
      }
      if(event.which === KEY.D){
        walker2.speedX = 5
      }
      if(event.which === KEY.W){
        walker2.speedY = -5
      }
      if(event.which === KEY.S){
        walker2.speedY = 5
      }
  }

  function handleKeyUp(event) {
    if(event.which === KEY.LEFT || event.which === KEY.RIGHT){
      walker.speedX = 0;
    }
    
    if(event.which === KEY.UP || event.which === KEY.DOWN){
      walker.speedY = 0;
    }

    if(event.which === KEY.A || event.which === KEY.D){
      walker2.speedX = 0;
    }
    
    if(event.which === KEY.W || event.which === KEY.S){
      walker2.speedY = 0;
    }
}

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    walker.posX += walker.speedX
    walker.posY += walker.speedY

    walker2.posX += walker2.speedX
    walker2.posY += walker2.speedY
  }
  function redrawGameItem(){
    $('#walker').css('left', walker.posX);
    $('#walker').css('top', walker.posY);

    $('#walker2').css('left', walker2.posX);
    $('#walker2').css('top', walker2.posY);
  }

  function wallCollision(){
    if(walker.posX > BOARD_WIDTH - walker.width ){
      walker.posX -= walker.speedX  
    }
    if(walker.posX < 0 ){
      walker.posX -= walker.speedX  
    }
    if(walker.posY > BOARD_HEIGHT - walker.height ){
      walker.posY -= walker.speedY  
    }
    if(walker.posY < 0 ){
      walker.posY -= walker.speedY  
    }

    if(walker2.posX > BOARD_WIDTH - walker.width ){
      walker2.posX -= walker2.speedX  
    }
    if(walker2.posX < 0 ){
      walker2.posX -= walker2.speedX  
    }
    if(walker2.posY > BOARD_HEIGHT - walker.height ){
      walker2.posY -= walker2.speedY  
    }
    if(walker2.posY < 0 ){
      walker2.posY -= walker2.speedY  
    }
  }

//other thing

function doCollide(object1, object2) {
  // sides of the square1
  object1.leftX = object1.posX;
  object1.topY = object1.posY;
  object1.rightX = object1.posX + object1.width;
  object1.bottomY = object1.posY + object1.height;
  
  // TODO: Do the same for square2

  object2.leftX = object2.posX;
  object2.topY = object2.posY;
  object2.rightX = object2.posX + object2.width;
  object2.bottomY = object2.posY + object2.height;

  // TODO: Return true if they are overlapping, false otherwise

if(
  object2.rightX > object1.leftX &&
  object2.leftX < object1.rightX &&
  object2.topY < object1.bottomY &&
  object2.bottomY > object1.topY
){
    console.log("bazinga");
  }
else{
  console.log('el stinko')
}
  
}

doCollide(walker, walker2);  




  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
