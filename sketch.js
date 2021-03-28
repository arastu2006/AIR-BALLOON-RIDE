var balloon, balloonAnimation;
var backgroundImg;
var position,database;

function preload(){

   backgroundImg = loadImage("backImg.png")
   balloonAnimation = loadAnimation("balloon1.png","balloon2.png","balloon3.png")

}

function setup() {

  //database = firebase.database();
  

  createCanvas(500,500);
  
  balloon = createSprite(100,300,50,50);
  balloon.shapeColor = "red";
  balloon.addAnimation("balloonAnimation",balloonAnimation);

 database = firebase.database();

var balloonPosition = database.ref('balloon/position');
balloonPosition.on("value", readPosition, showError);
  
}

function draw() {

  background(backgroundImg);

  if(position != undefined){
  

    if(keyDown(LEFT_ARROW)){
        //balloon.x = balloon.x - 10;
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        //balloon.x = balloon.x +10;
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        //balloon.y = balloon.y -10;
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        //balloon.y = balloon.y +10;
        changePosition(0,1);
    }
  }
drawSprites();
}


 function changePosition(x,y){
   
 database.ref('balloon/position').set({

   'x': position.x + x,
   'y': position.y + y

  })
 }

function readPosition(data){
position = data.val();

balloon.x = position.x;
balloon.y = position.y;

}

function showError(){

console.log("please check your internet conection or code"); // errore in connection to detabase

}