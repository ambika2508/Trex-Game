var trex,trexImg,trexCollided,o1,o2,o3,o4,o5,o6,cloudImg,groundImg,resetImg,gameOverImg,ground,iGround,gameState,flag,score,oGroup,cGroup,restart,gameOver,start,stop,hs,hs2,hs3

function preload(){
  trexImg = loadAnimation("trex1.png","trex3.png","trex4.png");
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
  o5 = loadImage("obstacle5.png")
  o6 = loadImage("obstacle6.png")
  cloudImg = loadImage("cloud.png")
  groundImg = loadImage("ground2.png")
  resetImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  trexCollided = loadImage("trex_collided.png")
}


function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,10,10);
  trex.addAnimation("run",trexImg);
  trex.addAnimation("collide",trexCollided);
  trex.scale = 0.5;
  
  trex.setCollider("circle",0,0,45);

  ground = createSprite(300,180,600,10);
  ground.addImage("ground2",groundImg);
  ground.x = ground.width/2;

 iGround = createSprite(300,190,600,10);
 iGround.visible = false;
 
  gameState = 1; 
  flag=0;
  score = 0;

  oGroup = new Group();
  cGroup = new Group();

  gameOver = createSprite(300,100);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.visible = false;
  
  restart = createSprite(300,150);
  restart.addImage("restart",resetImg);
  restart.visible = false;

  hs = 0;

  hs2 = 0;

  hs3 = 0;

  start = createSprite(580,50,20,20);
  stop = createSprite(530,50,20,20);
  start.shapeColor = "green";
  stop.shapeColor = "red";
}

function draw() {
  background("white");
  drawSprites();
  textSize(20);
  text("score:"+ score,10,50);
  text("High Score:" + hs,10,70);
  text("Second Highest Score:" + hs2, 10,90);
  text("Third Highest Score:" + hs3, 10, 110);
  console.log(trex.y);
 
 if (gameState === 1){
   score = score + Math.round(getFrameRate()/60);
   
   if (score % 100 === 0 && score > 0){
      //playSound("checkPoint.mp3");
    }
   
   ground.velocityX = -(6+3*score/100);
   
     if(ground.x<0){
         ground.x = ground.width/2;
         }
         
   spawnClouds();
   spawnObstacles();
   
   if (keyDown("Space")&& trex.y>=162.5){
   trex.velocityY = -14;
   //playSound("jump.mp3");
   } 
    if (mousePressedOver(start)){
      trex.setCollider("circle",50,0,45);
      flag=1
    }
    if (mousePressedOver(stop)){
      trex.setCollider("circle",0,0,45);
      flag=0
    }
   if (trex.isTouching(oGroup)){
     if(flag===0){
     gameState = 0;
     //playSound("die.mp3");
     }
     if(flag===1){
       trex.velocityY=-14
     }
   }
 }
 else if (gameState === 0){
   ground.velocityX = 0;
   trex.changeAnimation("collide",trexCollided);
   oGroup.setVelocityXEach(0);
  cGroup.setVelocityXEach(0);
  oGroup.setLifetimeEach(-1);
  cGroup.setLifetimeEach(-1);
  gameOver.visible = true;
  restart.visible = true;
  trex.velocityY = 0;
 }
 
 
if (mousePressedOver(restart)){
  reset();
}
 
 //console.log(trex.y);
 
 trex.velocityY = trex.velocityY + 0.8;
 trex.collide(iGround);

}
function spawnClouds(){
 if (frameCount%65 === 0){
     cloud = createSprite(600,100,10,10);
     cloud.velocityX = -3;
      cloud.y = random(10,100);
      cloud.addAnimation("cloudImg",cloudImg);   
      cloud.depth = trex.depth;
      trex.depth++;
      cGroup.add(cloud);
      cloud.lifetime = 400/3;
    //console.log(cloud.depth);
 }
}
function spawnObstacles(){
  if (frameCount%65 === 0){
     obstacle = createSprite(600,160,10,10);
    obstacle.velocityX = -(6+3*score/100);
    var r = Math.round(random(1,6));
    
    switch(r){
      case  1:  obstacle.addImage("o1",o1);
        break;
      case  2:  obstacle.addImage("o2",o2);
        break;
      case  3:  obstacle.addImage("o3",o3);
        break;
      case  4:  obstacle.addImage("o4",o4);
        break;
      case  5:  obstacle.addImage("o5",o5);
        break;
      case  6:  obstacle.addImage("o6",o6);
        break;
     default: obstacle.addImage("o6",o6);
        
    }
    obstacle.scale = 0.5;
    oGroup.add(obstacle);
    obstacle.lifetime = 400/6;
  }
}
function reset(){
  gameState = 1;
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("run",trexImg);
  oGroup.destroyEach();
  cGroup.destroyEach();
  if (score > hs){
     hs3 = hs2;
     hs2 = hs;
     hs = score;
  }
  
  score = 0;
}




