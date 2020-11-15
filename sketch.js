var PLAY = 1
var END = 0
var gameState = PLAY

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground;
var bananaGroup, obstacleGroup;
var score, survialTime;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}



function setup() {
 createCanvas(600, 345);  
  
  //Creating the Monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
 bananaGroup = new Group();
 obstaclesGroup = new Group();
  
survialTime = 0;
score = 0;
 
 monkey.setCollider("circle",0,0,320);
 //monkey.debug = true
  

}


function draw(){
background("palegreen");
text("Score: "+ score, 500,50); 
  
  if(gameState === PLAY){
    console.log("this is " ,gameState)
    
    
//Survial Time
  survialTime = Math.ceil(frameCount/frameRate())
    console.log("Survial Time is: ",survialTime)
  //text("Survial Time: ", survialTime,50, 150);


  //Creating and Moving the Ground
    ground = createSprite(400,350,900,30);
    ground.velocityX = -4;
    ground.x = ground.width/2;
   // console.log(ground.x);
  
  monkey.collide(ground);
  
  
  if(keyDown('space')&& monkey.y >= 200){
    monkey.velocityY = -12;
} 
  monkey.velocityY = monkey.velocityY + 0.9;
  
  
  if(bananaGroup.isTouching(monkey)){
    score = score+1;
    banana.destroy();
} 
  
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END
    }
  
  
  //Spawn the banana's
  food();
  
  //Spawn the obstacles
  obstacles();
     
}
  
  else if(gameState === END){
    console.log("this is " ,gameState)
    
    
     ground.velocityX = 0;
     monkey.velocity = 0;
     
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    
    
  }
  
  drawSprites();
}

//Creating the banana's
function food(){
  if(frameCount%80===0){
  banana = createSprite(random(300,400),random(120,220));
  banana.addImage(bananaImage);
  banana.velocityX = -5
  banana.scale = 0.1;
  banana.lifetime = 400;
  bananaGroup.add(banana);
}

}

function obstacles(){
  if(frameCount%300===0){
  obstacle = createSprite(800,300);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -4
  obstacle.scale = 0.2
  obstacle.lifetime = 410;
  monkey.depth = obstacle.depth;
  monkey.depth = obstacle.depth + 1;
  obstaclesGroup.add(obstacle);
 }
}




