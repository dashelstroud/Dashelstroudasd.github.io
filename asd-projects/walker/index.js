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
    width: $("#walker2").width(),
    height: $("#walker2").height(),
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
    doCollide(walker,walker2)
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

  function doCollide(walker1, walker2) {
    if (
      walker2.posX < walker1.posX + walker1.width &&
      walker2.posX + walker2.width > walker1.posX &&
      walker2.posY < walker1.posY + walker1.height &&
      walker2.posY + walker2.height > walker1.posY
    ) {
      stopTouchingMe()
    } else {
      console.log('el');
    }
  }
}
  function stopTouchingMe(){
    walker.posX = 0
    walker2.posX = 200
    alert('Stop Touching Me')
  }
  



 




  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }


  