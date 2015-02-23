// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.init();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt*this.speed;
    if (this.x > 505) {
        this.init();
    }
}

// ititiate Enemy and assign coordinate + speed range
// TODO: add multipliers for enemy speed per win
Enemy.prototype.init = function(){
    this.x = getRandomVal(-350, -50);
    this.y = enemyY[Math.floor(Math.random() * enemyY.length)];
    this.speed = getRandomVal(100, 250)
}

// Assign y cordinanates to hold Enemies in Rows
var enemyY = [55, 140, 225, 310];
//var enemyX = [-350, -325, -300, -275, -250, -225, -200, -175, -150]

// Randomizer function for Enemy
function getRandomVal(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Calls on Enemy collison
Enemy.prototype.onCollision = function(player){
    player.loses += 1;
    player.reset();
    this.reset();
}

// Reset point for enemies on collison 
Enemy.prototype.reset = function() {
    this.init();
}


// TODO: figure out enemy sprite rotate upsidedown on win 


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    //add and place player
    this.sprite = 'images/char-horn-girl.png';
    this.init();
    //this.x = 200;
    //this.y = 300;
    this.wins = 0;
    this.loses = 0;
    
}
//
Player.prototype.init = function(){
    this.x = 200;
    this.y = 400;
//    this.wins = 1;
//    this.loses = 1;
}

Player.prototype.renderScore = function(){
   ctx.font = '200 18pt Arial' ;
   ctx.clearRect(0,0, 500, 40);
   ctx.fillText("Ladies Be Buggin'", 10, 40);
   ctx.fillText("Wins: " + this.wins, 300, 40 );
   ctx.fillText("loses: " + this.loses, 400, 40);
}

Player.prototype.handleInput = function(direction){
    
    //if(direction == "space") {
    //       this.reset();
    //    }
    
    if (direction == 'left' && this.x > 0)
        this.x = this.x - 101;
    if (direction == 'right' && this.x < 404)
        this.x = this.x + 101;
    if (direction == 'up' && this.y >0 )
        this.y = this.y - 83;
    if (direction == 'down' && this.y < 407)
        this.y = this.y + 83;
}

// render Player
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.renderScore();
}

Player.prototype.update = function(dt){
    this.checkCollisions(dt);
}

// Create PLayer Reset point after collision
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;   
}


//Check Collisons, Enemy Collisions
Player.prototype.checkCollisions = function(dt){
    for(var i in allEnemies) {
        if( Math.abs(this.x - allEnemies[i].x) <= 40
         && Math.abs(this.y - allEnemies[i].y) <= 40){
            allEnemies[i].onCollision(this);
            alert ("Quit Buggin' and be gone!");
            //this.reset(alert);
            
            
        }
        // Use Collision with Water to asses "wins"
        else if (this.y <= 60)
          {
            /*var alert = window.alert ("now we are swimming, you win!")*/;
            this.reset();
            this.wins += 1;
            alert ("now we are swimming, you win!")
            //break;
        }
    }
}
    //if( Math.abs(this.x - gem.x) <= 40 && Math.abs(this.y - gem.y) <= 40) {
    //    this.score = this.score + 20;
    //    //this.renderScoreLine();
    //    gem.init();
    //}
    //
    //if (this.y <= 10) {
    //    this.next();
    //}
    //if( Math.abs(this.x - heart.x) <= 40 && Math.abs(this.y - heart.y) <= 40) {
    //
    //    heart.init();
    //    heart.x = -100;
    //    heart.y = -100;
    //
    //
    //    if (this.life < 5){
    //        this.life +=1;
    //    }
    //}
    


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Line = [65, 148, 231]; 
var allEnemies = [];
for(var i= 0; i < 9; i++){
    allEnemies.push( new Enemy());  
}
var player = new Player();

//var Water = function(){
//    this.sprite = 'images/water-block.png';
//    this.init();
//    
//}
//
//Water.prototype.init = function(){
//    this.y = this.y;
//    this.x = this.x;
//}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
