// Test link
console.log('link script ok');

const ctx = document.querySelector("canvas").getContext("2d");
const W = ctx.canvas.width;
const H = ctx.canvas.height;
var G = 50; // GRID FINE TUNING - ONE SIDE OF A GRID SQUARE
// Gameplay variables
var gameover = false;
var giftList; // The current wish list for the game.
var giftArr = []; //Contain all the gift objects invoked.
var belt;
var aisles = [];
var stuck = false;
// Characters variables
var elfOne;
var elfTwo;
//Time variable
let startedAt;
let endAt = 1200000; // 2min per game === 120000


// ########   #######     ###    ########  ########  
// ##     ## ##     ##   ## ##   ##     ## ##     ## 
// ##     ## ##     ##  ##   ##  ##     ## ##     ## 
// ########  ##     ## ##     ## ########  ##     ## 
// ##     ## ##     ## ######### ##   ##   ##     ## 
// ##     ## ##     ## ##     ## ##    ##  ##     ## 
// ########   #######  ##     ## ##     ## ########  

const woodFloor = new Image();
woodFloor.src = "./assets/background/Woodfloor_oneimage.jpg"



// ##      ## ####  ######  ##     ## ##       ####  ######  ######## 
// ##  ##  ##  ##  ##    ## ##     ## ##        ##  ##    ##    ##    
// ##  ##  ##  ##  ##       ##     ## ##        ##  ##          ##    
// ##  ##  ##  ##   ######  ######### ##        ##   ######     ##    
// ##  ##  ##  ##        ## ##     ## ##        ##        ##    ##    
// ##  ##  ##  ##  ##    ## ##     ## ##        ##  ##    ##    ##    
//  ###  ###  ####  ######  ##     ## ######## ####  ######     ##    



// ########  ########     ###    ##      ## 
// ##     ## ##     ##   ## ##   ##  ##  ## 
// ##     ## ##     ##  ##   ##  ##  ##  ## 
// ##     ## ########  ##     ## ##  ##  ## 
// ##     ## ##   ##   ######### ##  ##  ## 
// ##     ## ##    ##  ##     ## ##  ##  ## 
// ########  ##     ## ##     ##  ###  ###  

function draw() {

    ctx.clearRect(0, 0, W, H); // --???-- A BIT HARDCORE NO ??
    ctx.drawImage(woodFloor, 0, 0, W, H);
    giftList.draw(); // print wishlist randomly picked on the board
    belt.draw();

    //  ######  ##     ## ########   #######  ##    ##  #######  
    // ##    ## ##     ## ##     ## ##     ## ###   ## ##     ## 
    // ##       ##     ## ##     ## ##     ## ####  ## ##     ## 
    // ##       ######### ########  ##     ## ## ## ## ##     ## 
    // ##       ##     ## ##   ##   ##     ## ##  #### ##     ## 
    // ##    ## ##     ## ##    ##  ##     ## ##   ### ##     ## 
    //  ######  ##     ## ##     ##  #######  ##    ##  #######  


    const elapsed = new Date().getTime() - startedAt; // 78987 - 50000 = 28987
    if (elapsed < endAt) {
        const seconds = Math.floor((endAt - elapsed) / 1000) % 60; // 78 % 60 -> 18
        const minutes = Math.floor((endAt - elapsed) / 60000); // 1
        ctx.fillStyle = "white";
        ctx.font = "30px sans-serif";
        ctx.fillText(`${minutes} : ${seconds}`, 760, 50);
        ctx.fillStyle = "black";
        ctx.font = "16px sans-serif";
    } else {
        // ctx.fillText(`gameover`, 760, 50);
        gameover = true;
    }



    //---???---MAYBE AISLE DRAW FUNCTION
    //--???---SHOULD I NOT DRAW THEM ONCE AND TEST COLLISION HERE ONLY?

    // LEFT AISLE DRAW
    aisleL1.draw();
    aisleL2.draw();
    aisleL3.draw();
    aisleL4.draw();
    aisleL5.draw();
    //RIGHT AISLE DRAW
    aisleR1.draw();
    aisleR2.draw();
    aisleR3.draw();
    aisleR4.draw();
    aisleR5.draw();

    //DRAW GIFTS
    // bike.giftImg(0);
    //car.giftImg(1);


    //DRAW ELVES
    // elfOne.changeSrc(0); //display Elf 1
    // elfTwo.changeSrc(0); //display Elf 2

    //CHECK IF ELF IS STUCK
    stuck = aisles.some((obstacle) => {
        return elfOne.collision(obstacle);
    });


    giftArr.forEach((el) => {
        if (el.pickUp(elfOne)) {

            elfOne.changeSrc(1); // ADD PREVENT DEFAULT
            // el.giftImg(1);
        } else {
            el.giftImg(0);
            elfOne.changeSrc(0);
        }
    });






    designGrid();

} //END DRAW FUNCTION


// ########  ########  ######  ####  ######   ##    ##     ######   ########  #### ########  
// ##     ## ##       ##    ##  ##  ##    ##  ###   ##    ##    ##  ##     ##  ##  ##     ## 
// ##     ## ##       ##        ##  ##        ####  ##    ##        ##     ##  ##  ##     ## 
// ##     ## ######    ######   ##  ##   #### ## ## ##    ##   #### ########   ##  ##     ## 
// ##     ## ##             ##  ##  ##    ##  ##  ####    ##    ##  ##   ##    ##  ##     ## 
// ##     ## ##       ##    ##  ##  ##    ##  ##   ###    ##    ##  ##    ##   ##  ##     ## 
// ########  ########  ######  ####  ######   ##    ##     ######   ##     ## #### ########  


//UTILITY FUNCTION FOR BOARD DESIGN PURPOSE
function designGrid() {
    var dash = 3; // Dash size
    var gap = 15; // Gap btw dash size
    var nextRow = 0;
    var nextCol = 0;
    // DRAW VERTICAL DASHED LINES
    for (let i = 0; i < W / G; i++) {
        nextRow = nextRow + G;
        ctx.beginPath();
        ctx.setLineDash([dash, gap]);
        ctx.moveTo(nextRow, 0);
        ctx.fillText(`${nextRow}`, nextRow + 3, 15);
        ctx.lineTo(nextRow, H);
        ctx.stroke();
        ctx.closePath();
    }
    // DRAW HORIZONTAL DASHED LINES
    for (let i = 0; i < H / G; i++) {
        nextCol = nextCol + G;
        ctx.beginPath();
        ctx.setLineDash([dash, gap]);
        ctx.moveTo(0, nextCol);
        ctx.fillText(`${nextCol}`, 3, nextCol - 3);
        ctx.lineTo(W, nextCol);
        ctx.stroke();
        ctx.closePath();
    }
}




// ##     ##  #######  ##     ## ######## ##     ## ######## ##    ## ########  ######  
// ###   ### ##     ## ##     ## ##       ###   ### ##       ###   ##    ##    ##    ## 
// #### #### ##     ## ##     ## ##       #### #### ##       ####  ##    ##    ##       
// ## ### ## ##     ## ##     ## ######   ## ### ## ######   ## ## ##    ##     ######  
// ##     ## ##     ##  ##   ##  ##       ##     ## ##       ##  ####    ##          ## 
// ##     ## ##     ##   ## ##   ##       ##     ## ##       ##   ###    ##    ##    ## 
// ##     ##  #######     ###    ######## ##     ## ######## ##    ##    ##     ######  

// function drag() {

//     let costume = false;

//     document.addEventListener('mousedown', e => {
//         this.elfOne.x = e.offsetX;
//         this.elfOne.y = e.offsetY;
//         // costume = true;
//     });

//     document.addEventListener('mousemove', e => {

//     })
//     document.addEventListener('mouseup', e => {
//         if (costume === true) {
//             this.elfOne.changeSrc(0);
//             costume = false;
//         }
//     })
// };
// function walking() {
document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 38:
            elfOne.moveUp();
            break;
        case 40:
            elfOne.moveDown();
            break;
        case 37:
            elfOne.moveLeft();
            break;
        case 39:
            elfOne.moveRight();
            break;
    }
})
// };

function blocked() {
    stuck = aisles.some((obstacle) => {
        return elfOne.collision(obstacle);
    });
    if (stuck) {

    }
}





//    ###    ##    ## #### ##     ##    ##        #######   #######  ########  
//   ## ##   ###   ##  ##  ###   ###    ##       ##     ## ##     ## ##     ## 
//  ##   ##  ####  ##  ##  #### ####    ##       ##     ## ##     ## ##     ## 
// ##     ## ## ## ##  ##  ## ### ##    ##       ##     ## ##     ## ########  
// ######### ##  ####  ##  ##     ##    ##       ##     ## ##     ## ##        
// ##     ## ##   ###  ##  ##     ##    ##       ##     ## ##     ## ##        
// ##     ## ##    ## #### ##     ##    ########  #######   #######  ##        

//ANIMATION LOOP
let frames = 0;
let raf;

function animLoop() {
    frames++;
    // console.log(frames);
    draw()
    if (!gameover) {
        raf = requestAnimationFrame(animLoop);
    }
}

//  ######  ########    ###    ########  ########     ######      ###    ##     ## ######## 
// ##    ##    ##      ## ##   ##     ##    ##       ##    ##    ## ##   ###   ### ##       
// ##          ##     ##   ##  ##     ##    ##       ##         ##   ##  #### #### ##       
//  ######     ##    ##     ## ########     ##       ##   #### ##     ## ## ### ## ######   
//       ##    ##    ######### ##   ##      ##       ##    ##  ######### ##     ## ##       
// ##    ##    ##    ##     ## ##    ##     ##       ##    ##  ##     ## ##     ## ##       
//  ######     ##    ##     ## ##     ##    ##        ######   ##     ## ##     ## ######## 




function startGame() {
    if (raf) {
        cancelAnimationFrame(raf);
    }
    gameover = false;
    //INVOKE ALL OBJECTS
    //INVOKE ELVES
    elfOne = new Elf(350, 200);
    elfTwo = new Elf(500, 375);
    giftList = new Wishlist; //invoke new wishlist object.
    giftList.newWishList() //create a new random wishList.
    //CENTER BELT INVOKE
    belt = new Obstacles(425, 175, 50, 300, "orange");
    //LEFT AISLES INVOKE
    aisleL1 = new Obstacles(75, 150, 250, 25, "blue");
    aisleL2 = new Obstacles(75, 250, 250, 25, "blue");
    aisleL3 = new Obstacles(75, 350, 250, 25, "blue");
    aisleL4 = new Obstacles(75, 450, 250, 25, "blue");
    aisleL5 = new Obstacles(75, 550, 250, 25, "blue");
    //RIGHT AISLES INVOKE
    aisleR1 = new Obstacles(575, 150, 250, 25, "blue");
    aisleR2 = new Obstacles(575, 250, 250, 25, "blue");
    aisleR3 = new Obstacles(575, 350, 250, 25, "blue");
    aisleR4 = new Obstacles(575, 450, 250, 25, "blue");
    aisleR5 = new Obstacles(575, 550, 250, 25, "blue");
    //PUSH AISLES IN ARRAY TO ITERATE ON EACH
    aisles.push(aisleL1, aisleL2, aisleL3, aisleL4, aisleL5, aisleR1, aisleR2, aisleR3, aisleR4, aisleR5);

    //GIFT INVOKE
    bike = new Gift("Bike", 0, 100, 200);
    car = new Gift("Car", 0, 100, 300);
    //PUSH GIFTS IN ARRAY TO ITERATE ON EACH
    giftArr.push(bike, car);

    //GAME START TIME
    startedAt = new Date().getTime()


    raf = requestAnimationFrame(animLoop);
    // drawBoard();
    draw();
    animLoop();
}

startGame();


// ON CLICK DOWN ==> method pour guider en maintenant cliqué les elfs.


/*

Elf should go into an aisle to pick up a gift written on the list.
And then drop them on the belt.

1 - Make gift appear on the right place
2 - Test for each gift if Elf is on it or not
    In order to create this, we need to iterate on each gift to know if the Elf is not on it.
3 - change Elf image.


Gift location can be shuffled every 15 seconds.

Or

Elf should run on gifts which appeared randomly on the board and bring them to the belt.


*/