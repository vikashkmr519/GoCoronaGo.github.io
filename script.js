//alert("jS loaded");

let startBtn = document.querySelector(".start");
let box = document.querySelector(".box");
let canvas = document.querySelector(".board");
// this tool helps in drawing on the canvas
let tool = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//load corona image
let coronaImg = new Image();
coronaImg.src ="Corona.png";

// load image through js
let spaceImg = new Image();
spaceImg.src="darkbackground.png";

let earthImg = new Image();
earthImg.src="Earth.png";

let eHeight = 40;
    let eWidth = 40;

    let ePosX = canvas.width/2-20;
    let ePosY = canvas.height/2-20;

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
    update(){
        this.Draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }

}

class Corona{
    constructor(x,y,width,height,velocity){
        this.x = x;
        this.y =y;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
    }
    Draw(){
        //tool.fillStyle="white";
        tool.drawImage(coronaImg,this.x,this.y,this.width,this.height);

    }
    update(){
        this.Draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }

}

let bullets = [];
let corona = [];
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

function animate(){
    tool.clearRect(0,0,canvas.width,canvas.height);

    tool.fillRect(0,0,canvas.clientWidth,canvas.height);
    tool.drawImage(spaceImg,0,0,canvas.width,canvas.height);

    //earthimage
    
    let earth = new Planet(ePosX,ePosY,eWidth,eHeight);
    earth.draw();

    let bLength = bullets.length;

    for(let i =0;i<bullets.length;i++){
        bullets[i].update();
        //below if is to remove unwanted bullets after firing 
        // when they will go out of window
        if(bullets[i].x<0 || bullets[i].y<0 || bullets[i].x>canvas.width || bullets[i].y>canvas.height){
            setTimeout(function(){
                //canvas ke error se bachne ke liye hum bullet splice
                // ek cycle ke baad hi bulayenge
                bullets.splice(i,1);
            })
           
        }
    }

    //below is updation for corona
    

    for(let i =0;i<corona.length;i++){
        corona[i].update();
        
           
        
    }
    requestAnimationFrame(animate);

}

function createCorona(){
    //this set interval sets a delay of some milli sec
    // here it is 1000 millisec
    //and this function() is basically like after 1000 milli sec
    // this fucntion will be called itself
    setInterval(function(){
        //console.log("corona generated",Date.now);
        let x = Math.random()*canvas.width;
        let y = Math.random()*canvas.height;
        let delta = Math.random();

        if(delta<0.5){
            x = Math.random()<0.5 ? 0 : canvas.width;
            y = Math.random()*canvas.height;
        }else{
            y = Math.random()<0.5 ? 0 : canvas.height;
            x = Math.random()*canvas.width;

        }
        let angle = Math.atan2(canvas.height/2 - y,canvas.width/2 - x);
        let velocity = {
            x : Math.cos(angle)*4,
            y:Math.sin(angle)*4
        }
       let coronaCreated = new Corona(x,y,40,40,velocity);
       corona.push(coronaCreated);


    },1000);
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
    
    let earth = new Planet(ePosX,ePosY,eWidth,eHeight);
    earth.draw();

    animate();

    //for corona 
    createCorona();

    // below event listner is for bullet
    window.addEventListener("click",function(e){
        // e is the eventlistner which tells where we have clicked
        // we can check about it in console
        console.log("mouse clicked")

        let angle = Math.atan2(e.clientY - canvas.height/2,e.clientX-canvas.width/2);
        let velocity = {
            x : Math.cos(angle)*4,
            y:Math.sin(angle)*4
        }
        let bullet = new Bullet(canvas.width/2,canvas.height/2,7,7,velocity);
        bullet.Draw();
        bullets.push(bullet);
    })
})