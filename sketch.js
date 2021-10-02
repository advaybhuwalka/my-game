var backgroundImg,boy_running,coinImg;
var rock1,rock2,rock3;
var boy_collide;
var bg,boy,coin,coinGrp,rockGrp;
var gamestate="PLAY";

function preload(){
  backgroundImg=loadImage("bg2.jpg");
  coinImg=loadImage("coin.png");
  rock1=loadImage("rock1.png");
  rock2=loadImage("rock2.png");
  rock3=loadImage("rock3.png");
  boy_running=loadAnimation("r1.png","r2.png","r3.png","r4.png");
boy_collide=loadAnimation("r1.png");
restartimg=loadImage("restart.png");
}
function setup() {
  createCanvas(800,400);
  createSprite(400, 200, 50, 50);
bg=createSprite(400,200);
bg.addImage(backgroundImg);
bg.velocityX=-3;
bg.scale=2.7;
ground=createSprite(400,380,800,20);
ground.visible=false;
boy=createSprite(100,300);
boy.addAnimation("running",boy_running);
boy.scale=0.3;
restart=createSprite(400,200);
restart.addImage(restartimg);
restart.scale=0.4;
boy.debug=true;
boy.setCollider("rectangle",0,0,130,boy.height);
coinGrp=createGroup();
rockGrp=createGroup();


}

function draw() {
  background(255,255,255);  
  if(gamestate==="PLAY"){
restart.visible=false;

    if(bg.x<50){
  bg.x=400

}
if(keyDown("space")&&boy.y>=200){
  boy.velocityY=-12
}
boy.velocityY=boy.velocityY+0.8

spawnCoins()
spawnObstacles()
if(coinGrp.isTouching(boy)){
  coinGrp.destroyEach();
}
if(rockGrp.isTouching(boy)){
  gamestate="end"
}
  }
  if(gamestate==="end"){
    restart.visible=true;
    bg.velocityX=0;
    rockGrp.setVelocityXEach(0)
    coinGrp.setVelocityXEach(0)
    boy.velocityY=0;

  }
  if(mousePressedOver(restart)){
    reset()
  }
  boy.collide(ground)
  drawSprites();
}
function reset(){
  gamestate="play";
  restart.visible=false;
  coinGrp.destroyEach();
  rockGrp.destroyEach();3
}

function spawnCoins(){
  if(frameCount%80===0){
    coin=createSprite(800,350,10,10)
    coin.addImage(coinImg)
    coin.scale=0.1;
    coin.velocityX=-6;
coin.y=Math.round(random(200,350))
coinGrp.add(coin)
  }
}
function spawnObstacles(){
  if(frameCount%100===0){
    rocks=createSprite(800,330,50,40)
    rocks.velocityX=-8;
    var rand=Math.round(random(1,3))
    switch(rand){
      case 1:rocks.addImage(rock1);
      break;
case 2:rocks.addImage(rock2);
break;
case 3:rocks.addImage(rock3);
break;
default:break;
    }
rockGrp.add(rocks)
rocks.debug=true;
rocks.setCollider("circle",0,0,100)
    rocks.scale=0.3;
  }
}