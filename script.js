//alert("jS loaded");

let startBtn = document.querySelector(".start");
let box = document.querySelector(".box");
let canvas = document.querySelector(".board");
// this tool helps in drawing on the canvas
let tool = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


// load image through js
let spaceImg = new Image();
spaceImg.src="darkbackground.png";

let earthImg = new Image();
earthImg.src="Earth.png";

let bullets = [];
class Planet{
    constructor(x,y,width,height){
        this.x = x;
        this.y =y;
        this.width = width;
        this.height = height;
    }

    draw(){
        tool.drawImage(earthImg,this.x,this.y,this.width,this.height);
    }
}

class Bullet{
    constructor(x,y,width,height,velocity){
        this.x = x;
        this.y =y;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
    }
    Draw(){
        tool.fillStyle="white";
        tool.fillRect(this.x,this.y,this.width,this.height);

    }

}

startBtn.addEventListener("click",function(e){
    //we are adding this so that the this startbtn click doesn't interfare the 
    // bullet 
    e.stopImmediatePropagation();
    //alert("start the game");
    // 1)--> box hide
    box.style.display="none";
    //2)--> load space image

    tool.fillRect(0,0,canvas.clientWidth,canvas.height);
    tool.drawImage(spaceImg,0,0,canvas.width,canvas.height);

    //earthimage
    let eHeight = 40;
    let eWidth = 40;

    let ePosX = canvas.width/2;
    let ePosY = canvas.height/2;
    let earth = new Planet(ePosX,ePosY,eWidth,eHeight);
    earth.draw();

    // below event listner is for bullet
    window.addEventListener("click",function(e){
        // e is the eventlistner which tells where we have clicked
        // we can check about it in console
        console.log("mouse clicked")
        let bullet = new Bullet(e.clientX,e.clientY,7,7);
        bullet.Draw();
    })
})