// Test link
console.log('link script ok');

const ctx = document.querySelector("canvas").getContext("2d");
const W = ctx.canvas.width;
const H = ctx.canvas.height;
var G = 50; // GRID FINE TUNING - ONE SIDE OF A GRID SQUARE
// Gameplay variables
var gameover = false;
var giftList;
var belt;
// Characters variables
var elfOne;
var elfTwo;


// ########   #######     ###    ########  ########  
// ##     ## ##     ##   ## ##   ##     ## ##     ## 
// ##     ## ##     ##  ##   ##  ##     ## ##     ## 
// ########  ##     ## ##     ## ########  ##     ## 
// ##     ## ##     ## ######### ##   ##   ##     ## 
// ##     ## ##     ## ##     ## ##    ##  ##     ## 
// ########   #######  ##     ## ##     ## ########  

function drawBoard() {
    const woodFloor = new Image();
    woodFloor.onload = () => {
        for (var i = 0; i < (H / G); i++) {
            for (var j = 0; j < (W / G); j++) {
                ctx.drawImage(woodFloor, j * G, i * G, 5 * G, 5 * G); //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas - PERF OPTIMISATION SCALE OUT OF DRAW IMAGE 
            }
        }

        // designGrid();
    }
    woodFloor.src = "./assets/background/woodfloor 1000x1000.jpg";
}

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
    elfOne.changeSrc(0); //display Elf 1
    elfTwo.changeSrc(0); //display Elf 2
    giftList.draw(); // print wishlist randomly picked on the board
    belt.draw();

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
    designGrid();
}


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

    raf = requestAnimationFrame(animLoop);
    drawBoard();
    draw();
    animLoop();
}

startGame();


// ON CLICK DOWN ==> method pour guider en maintenant cliqué les elfs.