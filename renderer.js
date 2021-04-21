var canvas, ctx, x, y, dx, dy, ballradius, paddleX, rightPressed, leftPressed, brickRowCount, arr, brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop, s, lives;
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
ballradius = 5;
x = canvas.width/2;
y = canvas.height-30;
dx = 2;
dy = -2;
paddleX = (canvas.width-75)/2;
rightPressed = false;
leftPressed = false;
brickRowCount = 5;
brickColumnCount = 5;
brickWidth = 75;
brickHeight = 10;
brickPadding = 10;
brickOffsetTop = 30;
brickOffsetLeft = 30;
isLonger = false;
s = 0;
lives = 3;
arr = [3, 3, 3, 3, 3];
arrs = [2, 2, 2, 2, 2];

var bricks = [];
for(var i = 0; i < 5; i++) 
{
  bricks[i] = [];
  for(var b = 0; b < 5; b++)
  {
    bricks[i][b] = {i: 0, b: 0, status: 1};
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") 
    {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") 
    {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") 
    {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") 
    {
        leftPressed = false;
    }
}

/*Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.x - 5 < 0) { // hitting the left wall
    this.x = 5;
    this.x_speed = -this.x_speed;
  } else if(this.x + 5 > 400) { // hitting the right wall
    this.x = 395;
    this.x_speed = -this.x_speed;
  }

  if(this.y < 0 || this.y > 600) { // a point was scored
    this.x_speed = 0;
    this.y_speed = 3;
    this.x = 200;
    this.y = 300;
  }

  if(top_y > 300) {
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      this.y_speed = -3;
      this.x_speed += (paddle1.x_speed / 2);
      this.y += this.y_speed;
    }
  } else {
    if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
      // hit the computer's paddle
      this.y_speed = 3;
      this.x_speed += (paddle2.x_speed / 2);
      this.y += this.y_speed;
    }
  }
};*/


function collisionDetection() 
{
  for(var i = 0; i < 5; i++) 
  {
    for(var p = 0; p < 5; p++) 
    {
      var b = bricks[i][p];
      if(b.status == 1) 
      {
        if(x > b.x && x < b.x + 75 && y > b.y && y < b.y + 10) 
        {
          if(i == 3)
          {
            isLonger = true;
            b.status = 0;
            dy = -dy;
            s++;
          }
          else if(i == 0)
          {
            isLonger = false;
            if(arr[p] > 0)
            {
              arr[p] = arr[p] - 1;
            }
            if(arr[p] == 0)
            {
              b.status = 0;
              s++;
            }
            dy = -dy;
            
          }
          else if(i == 1)
          {
            isLonger = false;
            if(p == 0)
            {
              var deletebrick = bricks[i][p+1];
              if(deletebrick.status == 0)
              {
                s = s-1;
              }
              deletebrick.status = 0;
              dy = -dy
              s = s+2;
            }
            else if(p == 4)
            {
              var deletebrick = bricks[i][p-1];
              if(deletebrick.status == 0)
              {
                s = s-1;
              }
              deletebrick.status = 0;
              dy = -dy
              s = s+2;
            }
            else
            {
              var deletebrick = bricks[i][p+1];
              if(deletebrick.status == 0)
              {
                s = s-1;
              }
              deletebrick.status = 0;
              var deletebrickT = bricks[i][p-1];
              if(deletebrickT.status == 0)
              {
                s = s-1;
              }
              deletebrickT.status = 0;
              dy = -dy
              s = s + 3;
            }
            b.status = 0;
          }
          else if(i == 2)
          {
            isLonger = false;
            if(arrs[p] > 0)
            {
              arrs[p] = arrs[p] - 1;
            }
            if(arrs[p] == 0)
            {
              b.status = 0;
              s++;
            }
            dy = -dy;
          }
          else
          {
            isLonger = false;
            dy = -dy;
            b.status = 0;

            s++;
          }
          

          if(s == 25) 
          {
            alert("You Won, Score: " + s);
            document.location.reload();
          }
        }
      }
    }
  }
}

/*var update = function() {
  player.update();
  ball.update(player.paddle);
  //one
  brickOne.update();
  brickThree.update();
  bricktwo.update();
  //two
  brickOne.update();
  brickThree.update();
  bricktwo.update();
  //three
  brickOne.update();
  brickThree.update();
  bricktwo.update();
  //four
  brickOne.update();
  brickThree.update();
  bricktwo.update();
  //five
  brickOne.update();
  brickThree.update();
  bricktwo.update();
};*/



/*var render = function() {
  context.fillStyle = "#FF00FF";
  context.fillRect(0, 0, width, height);
  player.render();
  brickOne.render();
  bricktwo.render();
  brickThree.render();
  brickOne.render();
  bricktwo.render();
  brickThree.render();
  brickOne.render();
  bricktwo.render();
  brickThree.render();
  brickOne.render();
  bricktwo.render();
  brickThree.render();
  brickOne.render();
  bricktwo.render();
  brickThree.render();
  ball.render();
};*/

function drawBricks() {
  for(var c = 0; c < 5; c++) 
  {
    for(var r = 0; r < 5; r++) 
    {
      if(bricks[c][r].status == 1) 
      {
        if(c == 0)
        {
          var brickH = (r * (75 + brickPadding)) + 30;
          var brickV = (c * (10 + brickPadding)) + 30;
          bricks[c][r].x = brickH;
          bricks[c][r].y = brickV;
          ctx.beginPath();
          ctx.rect(brickH, brickV, 75, 10);
          ctx.fillStyle = "#A9A9A9";
          ctx.fill();
          ctx.closePath();
        }
        else if(c == 1)
        {
          var brickH = (r * (75 + brickPadding)) + 30;
          var brickV = (c * (10 + brickPadding)) + 30;
          bricks[c][r].x = brickH;
          bricks[c][r].y = brickV;
          ctx.beginPath();
          ctx.rect(brickH, brickV, 75, 10);
          ctx.fillStyle = "#FF0000";
          ctx.fill();
          ctx.closePath();
        }
        else if(c == 2)
        {
          var brickH = (r * (75 + brickPadding)) + 30;
          var brickV = (c * (10 + brickPadding)) + 30;
          bricks[c][r].x = brickH;
          bricks[c][r].y = brickV;
          ctx.beginPath();
          ctx.rect(brickH, brickV, 75, 10);
          ctx.fillStyle = "#FFF000";
          ctx.fill();
          ctx.closePath();
        }
        else if(c == 3)
        {
          var brickH = (r * (75 + brickPadding)) + 30;
          var brickV = (c * (10 + brickPadding)) + 30;
          bricks[c][r].x = brickH;
          bricks[c][r].y = brickV;
          ctx.beginPath();
          ctx.rect(brickH, brickV, 75, 10);
          ctx.fillStyle = "#9FFFFF";
          ctx.fill();
          ctx.closePath();
        }
        else
        {
          var brickH = (r * (75 + brickPadding)) + 30;
          var brickV = (c * (10 + brickPadding)) + 30;
          bricks[c][r].x = brickH;
          bricks[c][r].y = brickV;
          ctx.beginPath();
          ctx.rect(brickH, brickV, 75, 10);
          ctx.fillStyle = "#000000";
          ctx.fill();
          ctx.closePath();
        }
        
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();

  ctx.arc(x, y, 5, 0, Math.PI*2);
  ctx.fillStyle = "#000000";
  ctx.fill();
  //this.paddle = new Paddle(175, 580, 50, 10);
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  if(isLonger)
  {
    ctx.rect(paddleX, canvas.height-10, 85, 5);
  }
  else
  {
    ctx.rect(paddleX, canvas.height-10, 75, 5);
  }
  ctx.fillStyle = "#000000";
  //this.paddle = new Paddle(175, 580, 50, 10);
  ctx.fill();
  ctx.closePath();
}

/*Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 37) { // left arrow
      this.paddle.move(-4, 0);
    } else if (value == 39) { // right arrow
      this.paddle.move(4, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }*/

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if(x + dx > canvas.width-5 || x + dx < 5) {
    dx = -dx;
  }
  if(y + dy < 5) {
    dy = -dy;
  }
  else if(y + dy > canvas.height - 11) {
    if(x > paddleX && x < paddleX + 75) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("You lost with a score of " + s);
        document.location.reload();
      }
      else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - 75)/2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width - 75) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
