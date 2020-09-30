
//variable declaration
var trex, trex_running,trexcollide;

var backgroundimage,invisibleground;

var obstacle1,obstacle2,obstacle3,obstacle4,obstaclegroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;
var restartimage,restart;

 function preload()
 {
   //loading images of sprite objects
   trex_running = loadAnimation("dino.png","dino2.png");
  
   obstacle1 = loadImage("obstacle1.png");
   obstacle2 = loadImage("obstacle2.png");
   obstacle3 = loadImage("obstacle3.png");
   obstacle4 = loadImage("obstacle4.png"); 
   
   backgroundimage = loadImage("background.jpg");

   restartimage = loadImage("restart.jpg");
  
   trexcollide = loadImage("cryingtrex.png");
  
 }

 function setup() 
 {
  
   createCanvas(windowWidth, windowHeight);

   background = createSprite(0,0,10,10);
   background.addImage(backgroundimage);
   background.scale = 1.2;
 
  
   //create a trex sprite
   trex = createSprite(60,height-210,20,50);
   trex.addAnimation("running", trex_running);
   trex.addAnimation("collide",trexcollide);
   trex.scale = 0.4;
  
   
   //trex.debug = true;
   trex.setCollider("circle",0,0,100);
   
   invisibleground = createSprite(50,height - 200,100,10);
   invisibleground.visible = false;
   
   obstaclegroup = createGroup();
  
  
   restart = createSprite(width/2,height/2- 50);
   restart.addImage(restartimage);
   restart.scale = 0.1;
  
   score = 0;
  
 }

 function draw() 
 {
  

 
  if(gameState === PLAY) 
  { 
      
    restart.visible = false;
     
    trex.changeAnimation("running", trex_running);
    
    if((touches.length > 0 || keyDown("SPACE")) && trex.y>height-350) 
    {
      
        trex.velocityY = -15;
        touches = [];
    }
      
      
    if (background.x < 0)
    {
    
        background.x = background.width/2;
    
    }  
    
    score = score + Math.round(getFrameRate()/60);  
      
    background.velocityX =  -(6 + score/100) 
    
    spawnObstacles();   
  
    trex.velocityY = trex.velocityY + 0.8
      
    if(obstaclegroup.isTouching(trex))
    {
 
        gameState = END;
          
    }
  }
  else if (gameState === END) 
  {
      
     restart.visible = true;
     background.velocityX = 0;
     trex.velocityY = 0 
     obstaclegroup.setVelocityXEach(0);
     obstaclegroup.setLifetimeEach(-1); 
      
     if(mousePressedOver(restart))
     {
        reset();
     }
      
     trex.changeAnimation("collide",trexcollide);
    
  }
  
  trex.collide(invisibleground);
  
  drawSprites();
  
  fill("yellow");
  textSize(20);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
}

//creates the function to spawn clouds
function spawnObstacles(){
 if (frameCount % 80 === 0)
 {
   var obstacle = createSprite(600,height - 210,10,10);
    obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclegroup.add(obstacle);
 }
}

function reset(){
  
  gameState = PLAY; 
   
  restart.visible = false;
  
  obstaclegroup.destroyEach();   
  
  score = 0;
  
}
