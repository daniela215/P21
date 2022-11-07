var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girl_running, girl_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
   girl_running = loadAnimation('Girl_png');
    
    groundImage = loadImage("ground2.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
    
    
    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("GameOver.png")
    
    jumpSound = loadSound("jump.mp3")
    dieSound = loadSound("die.mp3")
    checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
    createCanvas(600, 200);

    var message = "This is a message";
   console.log(message)
    
    girl = createSprite(50,160,20,50);
    girl.addAnimation("running", girl_running);
    girl.addAnimation("collided", girl_collided);
    
  
    trex.scale = 0.5;
    
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    
    gameOver = createSprite(300,100);
    gameOver.addImage(GameOverImg);
    
    restart = createSprite(300,140);
    restart.addImage(restartImg);
    
   
    gameOver.scale = 0.5;
    restart.scale = 0.5;

    obstaclesGroup = createGroup();
    
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
    
    
    
    girl.setCollider("rectangle",0,0,trex.width,trex.height);
    girl.debug = true
    
    score = 0;
}

function draw() {
    background(180);
    text("Score: "+ score, 500,50);
    
    
    if(gameState === PLAY){
  
      gameOver.visible = false;
      restart.visible = false;
      
      ground.velocityX = -(4 + 3* score/100)
      //scoring
      score = score + Math.round(getFrameRate()/60);
      
      if(score>0 && score%100 === 0){
         checkPointSound.play() 
      }
      
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
      
      if(keyDown("space")&& trex.y >= 100) {
          girl.velocityY = -12;
          jumpSound.play();
      }
      
      
     girl.velocityY = girl.velocityY + 0.8
    
      
      
      
      if(obstaclesGroup.isTouching(girl)){
          girl.velocityY = -12;
          jumpSound.play();
          gameState = END;
          dieSound.play()
        
      }
    }
     else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        if(mousePressedOver(restart)) {
          reset();
        }
       
       girl.changeAnimation("collided", girl_collided);
      
       
       
        ground.velocityX = 0;
        girl.velocityY = 0
        
       
        
      obstaclesGroup.setLifetimeEach(-1);
     
       
       obstaclesGroup.setVelocityXEach(0);
       
     }
    
   
    
    girl.collide(invisibleGround);
    
    drawSprites();
}

function reset(){
    gameState=PLAY
  score=0;
  obstaclesGroup.destroyEach();
  girl.changeAnimation("running", girl_running);
  }
  
  
  function spawnObstacles(){
   if (frameCount % 60 === 0){
     var obstacle = createSprite(600,165,10,40);
     obstacle.velocityX = -(6 + score/100);
     
      
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
        case 5: obstacle.addImage(obstacle5);
                break;
        case 6: obstacle.addImage(obstacle6);
                break;
        default: break;
      }
     
              
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
     
      obstaclesGroup.add(obstacle);
   }
  }


  
  




















