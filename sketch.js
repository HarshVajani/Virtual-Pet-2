//Create variables here
var dog;
var happyDog;
var foodS;
var foodStock, database;

function preload()
{
  //load images here
  dog=loadImage("sprites/dogImg.png");
  happyDog=loadImage("sprites/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  
  feed=createButton("Fedd the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton('Add Food');
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);

  }

  drawSprites();
  //add styles here

}

fill(255,255,254);
textSize(15);
if(lastFed>-12){
  text("Last Feed : 1" + lastFed%12 + "PM",350,30);
}  else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed :"+ lastFed +"AM",350,30);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  }
  )
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}