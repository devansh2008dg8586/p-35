

var dog,dogImg,dogHappy;
var database,foodStock,foodS;
var fedTime,lastFed;

function preload()
{
  dogImg=loadImage("images/dogimg.png")
  dogHappy=loadImage("images/dogimg1.png")
}

function setup() {
  database=firebase.database();
  createCanvas(800, 700);
  dog=createSprite(350,400,10,10)
  dog.scale=0.25
  dog.addImage(dogImg)
  foodStock=database.ref('food');
  foodStock.on("value",readStock)

  fedTime=database.ref('fedTime')
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  bottle=new Bottle(80,100,50,50)
}


function draw() { 

  background(46,139,87)
  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12+"pm",350,30)
  }else if(lastFed==0){
    text("Last Feed:12 AM",350,30)
  }else{
    text("Last Feed:"+lastFed,350,30)
  }

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogHappy)

  }
  drawSprites();
  fill(255);
  stroke(0)
  textSize(27)
  text("foodRemaining:"+foodS,220,220);
  bottle.display();
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })

}
