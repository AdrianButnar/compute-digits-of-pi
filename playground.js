let decimals = 0; // how many decimals of pi you want to compute (>=0)
let collisions_count = 0;
let block1;
let block2;
let clackSound;
let beginningFlag = true;
let canvas;

function preload(){
    sound = new Audio("collision.wav");
}

function setup() {
    countDiv = createDiv("Edit the numbers of decimals below and then click on the white canvas:");
    countDiv.style('font-size', '40pt');
    countDiv.style('text-align', 'center');
    countDiv.style("width","100%");
    countDiv.style("padding-bottom","3%");

    digitsDiv = createDiv("0");
    digitsDiv.attribute("contenteditable", "true");
    digitsDiv.attribute("id","digitsDiv");
    digitsDiv.style('font-size', '28pt');
    digitsDiv.style('text-align', 'center');
    digitsDiv.style("padding-bottom", "5%");
    digitsDiv.style("width","100%");
    digitsDiv.style("padding-bottom","3%");

    canvas = createCanvas(windowWidth,200);
    canvas.mouseClicked(start_moving);
    block2 = new Box(300,100,0,100); //set speed to 0 initially(apparently 100^x != 100 ** x, the last one being power)
    block1 = new Box(100,35,0,1);
    block1.show();
    block2.show(); 
    
}

function start_moving(){

  //prevent accidental click when the blocks are already moving
  if (block2.speed === 0){
    decimals = document.getElementById("digitsDiv").innerHTML;
    if (isNaN(parseInt(decimals)) || !(0 <= parseInt(decimals) && parseInt(decimals) <= 6)){
      alert("The number of decimals should be between 0 and 6 \n I suggest at most 4 in order to enjoy the animation, otherwise you will see what happens because of the crazy speeds resulted from the ellastic collisions:) )");
      digitsDiv.html("0");
    }
    else{
      decimals = parseInt(decimals); 
      if (block2.speed === 0) {
        block2.mass = 100 ** decimals;
        timeSteps = 13 ** (decimals - 1);
        block2.speed = -1/timeSteps;
        beginningFlag = false;
      }
      ///create info tab
      infoDiv = createDiv("The left block has unit mass and the mass of the right block is ".concat(100**decimals.toString()).concat(" units."));
      infoDiv.style("padding-top","3%")
      infoDiv.style('font-size', '15pt');
    }
  }
}

function draw(){ //called immediately after setup
    timeSteps = 13 ** (decimals - 1);
    background(500); //color code
    clackSound = false;
    for (let i = 0; i < timeSteps; i++) {
        if (block1.collide(block2)) {
            console.log("collision")
          const v1 = block1.get_speed_after_impact_with(block2);
          const v2 = block2.get_speed_after_impact_with(block1);
          block1.speed = v1;
          block2.speed = v2;
          collisions_count++;
          clackSound = true;
        }
    
        if (block1.hits_wall()) {
          block1.speed *= -1;
          collisions_count++;
          clackSound = true;

        }
        
        if (clackSound){
          sound.play();
        }
        block1.update();
        block2.update();
      }

    block1.show();
    block2.show(); 
    if (!beginningFlag){
      countDiv.html("Number of collisions: ".concat(collisions_count.toString()));
      digitsDiv.attribute("contenteditable", "false");
      digitsDiv.html("");
    }
    
}
