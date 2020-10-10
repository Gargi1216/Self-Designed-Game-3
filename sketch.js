//const Engine = Matter.Engine;
//const World= Matter.World;
//const Bodies = Matter.Bodies;
//var engine, world;
var ground,bg;
var candyGirl;
var invisibleGround;
var blockGroup, starsGroup;
var edges;
var score;

function preload(){
   bg = loadImage("backdrop.jpg");
   candygirl_running = loadAnimation("images/copy1.png","images/copy2.png","images/copy3.png","images/copy4.png","images/copy5.png","images/copy6.png");
   chocblock = loadImage("images/block1.png");
   strawblock = loadImage("images/block2.png");
   groundy = loadImage("Ground2.png");
   star1 = loadImage("images/star.png");
   donut = loadImage("images/Donut.png");
   donut2 = loadImage("images/Donut2.png");
   pudding = loadImage("images/pudding.png");
   jelly = loadImage("images/Jelly bean.png");
   jelly2 = loadImage("images/jelly monster.png")
}

function setup(){
  var canvas = createCanvas(1500,800);
  //engine = Engine.create();
  //world = engine.world;
  ground = createSprite(750,650,3000,20);
  ground.addImage(groundy);
  ground.scale = 1.7;
  invisibleGround = createSprite(750,670,3000,20);
  invisibleGround.visible = false;
  candyGirl = createSprite(100,600);
  candyGirl.addAnimation("running",candygirl_running);
  blockGroup = new Group();
  starsGroup = new Group();
  edges = createEdgeSprites();
  score = 0;
  textSize(18);
  
}
function draw(){
    background(bg);
    text("SCORE:"+score,1300,50);
   // Engine.update(engine);
    ground.velocityX = -3;
    if(ground.x<0){
      ground.x = ground.width/2;
    }
    
    if(keyDown(UP_ARROW)){
      candyGirl.velocityY = -10;

    }
    candyGirl.velocityY = candyGirl.velocityY +0.5;

    if(keyDown("SPACE")){
      candyGirl.velocityY = -15;

    }

    if(keyDown(DOWN_ARROW)){
      candyGirl.velocityY = 8;

    }

    if(keyDown(RIGHT_ARROW)){
      candyGirl.velocityX = 6;

    }

    if(keyDown(LEFT_ARROW)){
      candyGirl.velocityX = -6;

    }

    if(starsGroup.isTouching(candyGirl)){
      starsGroup.destroyEach();
      score++;
    }
  
    spawnBlocks();
    candyGirl.bounceOff(edges[0]);
    candyGirl.bounceOff(edges[1]);
    spawnEnemies();
    spawnStars();
    candyGirl.collide(blockGroup);
    candyGirl.collide(invisibleGround);
    drawSprites();
}

function spawnBlocks(){
  if(frameCount%150===0){
    var r = Math.round(random(400,300));
    var block = createSprite(1500,r,200,160);
    block.scale = 0.4;
    block.velocityX = -3;
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: block.addImage(chocblock);
              break;
      case 2: block.addImage(strawblock);
              break;
      default:break;
    }
   blockGroup.add(block);
  }
}

function spawnEnemies(){
  if(frameCount%200===0){
    var enemy = createSprite(1500,600,80,80);
    enemy.scale = 0.1;
    enemy.velocityX =  -3;
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: enemy.addImage(donut);
              break;
      case 2: enemy.addImage(jelly2);
              break;
      case 3: enemy.addImage(jelly);
              break;
      default:break;
    }
  }
}

function spawnStars(){
  if(frameCount%150===0){
      var star = createSprite(1500,500,40,40);
      star.addImage(star1);
      star.velocityX = -3;
      star.scale = 0.05;

      starsGroup.add(star);

  }
}

/*function keyPressed(){
  if(keyCode===RIGHT_ARROW){
    Matter.Body.setVelocity(candyGirl.body,{x:5,y:0});
  }

  if(keyCode===LEFT_ARROW){
    Matter.Body.setVelocity(candyGirl.body,{x:-5,y:0});
  }

  if(keyCode===UP_ARROW){
    Matter.Body.setVelocity(candyGirl.body,{x:0,y:-5});
  }

  if(keyCode===DOWN_ARROW){
    Matter.Body.setVelocity(candyGirl.body,{x:0,y:5});
  }
}*/