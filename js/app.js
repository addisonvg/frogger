// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.init();
};

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
};

// ititiate Enemy and assign coordinate + speed range
Enemy.prototype.init = function(){
    this.x = getRandomVal(-350, -50);
    this.y = enemyY[Math.floor(Math.random() * enemyY.length)];
    this.speed = getRandomVal(100, 250);
    if (this.wins == 5) {
                this.speed = getRandomVal(250, 450);
                alert ("Y ou are good at this, lets make things harder!");
            }
};

// Assign y cordinanates to hold Enemies in Rows
var enemyY = [55, 140, 225, 310];

// Randomizer function for Enemy
function getRandomVal(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
};

// Calls on Enemy collison
Enemy.prototype.onCollision = function(player){
    player.health -= 1;
    player.reset();
    this.reset();
    alert ("Ouch that Hurt :( try again");
};

// Reset point for enemies on collison 
Enemy.prototype.reset = function() {
    this.x = getRandomVal(-350, -50);
    this.y = enemyY[Math.floor(Math.random() * enemyY.length)];
    this.speed = getRandomVal(100, 250);  
};


// TODO: figure out enemy sprite rotate upsidedown on win 


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    //add and place player
    this.sprite = 'images/char-horn-girl.png';
    this.init();
    this.wins = 0;
    this.health = 3;
    
};
//
Player.prototype.init = function(){
    this.x = 200;
    this.y = 400;
};

//create score board
Player.prototype.renderScore = function(){
   ctx.font = '200 18pt Arial';
   ctx.clearRect(0,0, 500, 40);
   ctx.fillText("Enemies: " + E, 10, 40);
   ctx.fillText("Wins: " + this.wins, 300, 40 );
   ctx.fillText("health: " + this.health, 400, 40);
};

//player movement
Player.prototype.handleInput = function(direction){
    
    //spacebar resets player
    if (direction == "space" && this.x < 315) 
           this.x = 200, this.y = 400;
    
    //directional arrows for player        
    if (direction == 'left' && this.x > 0)
        this.x = this.x - 101;
    if (direction == 'right' && this.x < 404)
        this.x = this.x + 101;
    if (direction == 'up' && this.y >0 )
        this.y = this.y - 82;
    if (direction == 'down' && this.y < 407)
        this.y = this.y + 82;
};

// render Player
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.renderScore();
};

Player.prototype.update = function(dt){
    this.checkCollisions(dt);
};

// Create Player Reset point after collision
Player.prototype.reset = function(){ 
    this.x = 200;
    this.y = 400;
    //alert notice on loses
    if (this.health === 0 ) {
        this.wins = 0;
        this.health = 3;
        alert ("Quit Buggin' you Lose!");
    }
};

var E = 9;
//Check Collisons, Enemy Collisions
Player.prototype.checkCollisions = function(dt){
    for(var i in allEnemies) {
        if( Math.abs(this.x - allEnemies[i].x) <= 30 && Math.abs(this.y - allEnemies[i].y) <= 30){
            allEnemies[i].onCollision(this);          
        }
        
        // Use Collision with Water to asses "wins"
        else if (this.y <= 20)
          {
            this.reset();
            this.wins += 1;
            
            alert ("now we are swimming, you win!");
            if (this.wins >= 3) {
                E += 2;
                enemyIncrease();
                }
            if (this.wins == 3) {
                alert ("You are good at this, lets make things harder!");

            }          
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
 
var allEnemies = [];


var enemyLoop = function (){
    for(var i = 0; i < E; i++){
    allEnemies.push( new Enemy());
     if (this.y <= 20) break;
    
    }
};
enemyLoop();

var enemyIncrease = function (){
    for(var i= 0; i < 2; i++){
        allEnemies.push(new Enemy());
    }
};

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
