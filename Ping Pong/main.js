//********* Variables *********//

//********* -------------- *********//
var canvas;
var ctx;
var ballX = 400;
var ballY = 50;
var PI = Math.PI;

var ballSpeedX = 15;
var ballSpeedY = 8;
var leftPaddleY = 250;
var rightPaddleY = 250;
const paddleHeight = 100; 

var randomnumber=Math.floor(Math.random()+7) + 1;

var playerOneScore = 0;
var playerTwoScore = 0;
const winningScore = 5;

var showingStartScreen = false;
var showingWinScreen = false;

//********* Main Onload, Makes The Game Work *********//

//********* -------------- *********//
window.onload = function () {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d'); 
	
	var framesPerSeconds = 30;
	setInterval(function() {
				movement();
					draw();
	}, 1000/framesPerSeconds);

	canvas.addEventListener('click', function(){
		if (showingWinScreen) {
			playerOneScore = 0;
			playerTwoScore = 0;
			showingWinScreen = false;
		} 
	})

	canvas.addEventListener('mousemove', function(e){
		var mousePos = mousePosition(e);
		leftPaddleY = mousePos.y-(paddleHeight/2);
	})

	
}

//********* Mouse Movements *********//

//********* -------------- *********//
function mousePosition(e) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = e.clientX - rect.left - root.scrollLeft;
	var mouseY = e.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}



//********* Ball & Score Reset *********//

//********* -------------- *********//
function ballReset(){
	if (playerOneScore >= winningScore || playerTwoScore >= winningScore) {
		showingWinScreen = true;
	}

	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;


}

function computerMovement() {
	var rightPaddleYCenter = rightPaddleY + (paddleHeight/2);
	if (rightPaddleYCenter < ballY-10) {
		rightPaddleY += randomnumber;
	} else if (rightPaddleYCenter > ballY+10) {
		rightPaddleY -= randomnumber;
	}
}

//********* My Game Movement *********//

//********* -------------- *********//
function movement(){

	if (showingWinScreen) {
		return;
	} 

	computerMovement();

	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballX < 0){
		if (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (leftPaddleY + paddleHeight/2);
			ballSpeedY = deltaY * 0.35;
		} else {
			playerTwoScore++;
			ballReset();	
		}
	}

	if (ballX > canvas.width) {
		if (ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
			ballSpeedX = -ballSpeedX;
			var dY = ballY - (rightPaddleY + paddleHeight/2);
			ballSpeedY = dY * 0.35;
		} else {
			playerOneScore++;
			ballReset();	
		}

	} 

	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	} 

	if (ballY < 0){
		ballSpeedY = -ballSpeedY;
	}

}
//********* Draws The Game *********//

//********* -------------- *********//

function theNet() {
	for(var i = 0; i < canvas.height; i+= 40) {
		colorRect(canvas.width/2-1, i, 2, 20, 'white');
	}
}

function draw(){
	
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	if (showingWinScreen) {
		ctx.fillStyle = 'white';

		if (playerOneScore >= winningScore) {
			ctx.fillText('Left Player Won The Game!', canvas.width/2.5, 200);
		} else if (playerTwoScore >= winningScore) {
			ctx.fillText('Right Player Won The Game!', canvas.width/2.5, 200);
		}
		
		ctx.fillText('Click to continue', canvas.width/2.2, 500);
		return;

	} 
	// Middle Line
	theNet();

	// left paddle 
	colorRect(0, leftPaddleY, 10, paddleHeight, 'white');
	// the ball
	ctx.fillStyle = 'white';
	ctx.beginPath();
	ctx.arc(ballX, ballY, 8, 0, PI * 2, true);
	ctx.fill();
	// right paddle
	colorRect(canvas.width-10, rightPaddleY, 10, paddleHeight, 'white');
	
	// Player Score
	ctx.font = 'italic 20pt Calibri';
	ctx.fillText(playerOneScore, canvas.width/3, 40);
	ctx.fillText(playerTwoScore, canvas.width/1.5, 40);

}

//********* Helper Function *********//

//********* -------------- *********//
function colorRect(leftX, topY, width, height, drawColor) {
	ctx.fillStyle = drawColor;
	ctx.fillRect(leftX, topY, width, height);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

