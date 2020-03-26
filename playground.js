let decimals; // how many decimals of pi you want to compute (>=0)
let collisionsCount = 0;
let block1;
let block2;
let clackSound;
let beginningFlag = true;
let canvas;
let descText;
let playSound = false;


function preload(){
    sound = new Audio("collision.wav");
}

function changeSound() {
  console.log("click sound");
  playSound = !playSound;
}

function setup() {

    //sound div
    soundDiv = createDiv(' Tick if you want to hear collision sound <input type="checkbox" data-toggle="toggle" data-onstyle="info">');
    soundDiv.mouseClicked(changeSound);
    soundDiv.style('width',"100%");
    soundDiv.style('text-align', 'right');
    soundDiv.style('font-size', '1vw');
    // soundDiv.style('display', 'inline');

    //count div
    countDiv = createDiv("Edit the numbers of decimals below and then click on the white canvas:");
    countDiv.attribute("id","countDiv");
    countDiv.style('font-size', '2vw');
    countDiv.style('text-align', 'center');
    countDiv.style("width","100%");
    //countDiv.style("padding-bottom","1%");

    //input
    digitsInput = createInput("0");
    digitsInput.attribute("id","digitsInput");
    digitsInput.style('font-size', '2vw');
    digitsInput.style('line-height', '100%');
    digitsInput.style('border', 'rgb(70, 71, 71)');
    digitsInput.style('text-color', 'white');
    digitsInput.style('text-align', 'center');
    digitsInput.style('background',"rgb(70, 71, 71)");
    digitsInput.style('width',"100%");
    digitsInput.style('padding-bottom',"1%");
    digitsInput.style('padding-top',"1%");
    digitsInput.style('color',"white");

    //canvas
    canvas = createCanvas(windowWidth,200);
    canvas.mouseClicked(startMoving);

    //reset button
    var resetBtn = createButton("RESET");
    resetBtn.style("margin-top","1%");
    resetBtn.attribute("class","button");
    resetBtn.mousePressed(resetPlayground);

    ///info div
    infoDiv = createDiv();
    infoDiv.style("padding-top","1%");
    infoDiv.style('font-size', '1vw');
    infoDiv.style('display','none');

    resetPlayground();
}

function resetPlayground(){
  block2 = new Box(300,100,0,100); //set speed to 0 initially(apparently 100^x != 100 ** x, the last one being power)
  block1 = new Box(100,35,0,1);
  block1.show();
  block2.show(); 

  //reset data
  beginningFlag = true;
  collisionsCount = 0;
  document.getElementById("countDiv").innerHTML = "Edit the numbers of decimals below and then click on the white canvas:";
  infoDiv.style('display','none');
  infoDiv.style('color', 'white');
  digitsInput.value("0");
  digitsInput.removeAttribute("contenteditable");
  noLoop(); // prevent continuous redrawing when waiting for user input
}

function startMoving(){
  if (block2.speed === 0){  //prevent accidental click when the blocks are already moving
    decimals = document.getElementById("digitsInput").value;
    if (isNaN(parseInt(decimals)) || !(0 <= parseInt(decimals) && parseInt(decimals) <= 7)){
      infoDiv.html("The number of decimals has to be between 0 and 7. <br> An ideal value should be at most 6(if the sound is off) and 4(if the sound is on), otherwise the animation will lag because of sound rendering and the extreme speeds resulted from the collisions(as the mass of the right ball is 100<sup>number_of_decimals</sup> times the mass of the left one)");
      infoDiv.style('display','block');
      infoDiv.style('color', 'red');
      infoDiv.style('font-size','2vh');
      digitsInput.html("0");
      noLoop(); // prevent continuous redrawing when waiting for user input
    }
    else{
      decimals = parseInt(decimals); 
      console.log(decimals);
      if (block2.speed === 0) {
        block2.mass = 100 ** decimals;
        timeSteps = 15 ** (decimals - 1);
        block2.speed = -1/timeSteps;
        beginningFlag = false;
      }
      //adjust the info section
      infoDiv.style('color', 'white');
      
      descText = "The purpose of this experiment is to compute the digits of π using elastic collisions between two blocks.\
      <br> Elastic collisions involve both conservation of momentum and energy, which combined with a phase representation of the dynamic of the system computes the digits of π.\
      <br> The mass of the right block is 100<sup>".concat(decimals.toString()).concat("</sup> times the mass of the left one.\
      <br> More information can be found on my <a style = 'color: rgb(177, 238, 242)'href = 'https://github.com/AdrianButnar/compute-digits-of-pi' > repository page</a>. ");

      infoDiv.html(descText);
      infoDiv.style('display','block');

      //make digits input not editable and display digits of π while the animation is running
      digitsInput.value("π ≈ 3.1415926...");
      digitsInput.attribute("contenteditable","false");

      loop(); //draw only when a valid input is given
    }
  }
}

function draw(){ //called immediately after setup
    timeSteps = 15 ** (decimals - 1);
    background(500); //color code
    clackSound = false;
    for (let i = 0; i < timeSteps; i++) {
        if (block1.collide(block2)) {
          const v1 = block1.getSpeedAfterImpactWith(block2);
          const v2 = block2.getSpeedAfterImpactWith(block1);
          block1.speed = v1;
          block2.speed = v2;
          collisionsCount++;
          clackSound = true;
        }
    
        if (block1.hitsWall()) {
          block1.speed *= -1;
          collisionsCount++;
          clackSound = true;
        }
        
        if (clackSound){
          if (playSound){
            sound.play();
          }
        }
        block1.update();
        block2.update();
      }

    block1.show();
    block2.show(); 
    if (!beginningFlag){
      countDiv.html("Number of collisions: ".concat(collisionsCount.toString()));
      digitsInput.attribute("contenteditable", "false");
      digitsInput.html("");
    }
    
}
