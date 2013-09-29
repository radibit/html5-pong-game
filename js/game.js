/**
 * Game init
 */
$.init = function() {
  $.canvas = document.getElementById("canvas");
  $.ctx = $.canvas.getContext("2d");
  $.startBtn = document.getElementById("startbtn"); // TODO draw the UI
  $.cw = $.canvas.width;
  $.ch = $.canvas.height;
  $.keys = new $.KeyListener();
  $.p1 = new $.Paddle(5, 0);
  $.p1.y = $.ch/2 - this.p1.height/2;
  $.p2 = new $.Paddle($.cw - 5 - 2, 0);
  $.p2.y = $.ch/2 - this.p2.height/2;
  $.sb1 = new $.ScoreBoard($.cw/4, 25);
  $.sb2 = new $.ScoreBoard($.cw*3/4, 25);

  $.ball = new $.Ball();
  $.ball.x = $.cw/2;
  $.ball.y = $.ch/2;
  $.ball.vy = Math.floor(Math.random()*12 - 6);
  $.ball.vx = 7 - Math.abs(this.ball.vy);

  $.ctx.fillStyle = "white";
};

/**
 * Game draw
 */
$.draw = function() {
  $.ctx.clearRect(0, 0, $.cw, $.ch);
  $.ctx.fillRect($.cw/2, 0, 4, $.ch);

  $.ball.draw($.ctx);

  $.p1.draw($.ctx);
  $.p2.draw($.ctx);

  $.sb1.draw($.ctx);
  $.sb2.draw($.ctx);
};

/**
 * Score
 */
$.score = function(p) {
  // player scores
  p.score++;
  var player = p == this.p1 ? 0 : 1;

  // set ball position
  $.ball.x = $.cw/2;
  $.ball.y = p.y + p.height/2;

  // set ball velocity
  $.ball.vy = Math.floor(Math.random()*12 - 6);
  $.ball.vx = 7 - Math.abs($.ball.vy);
  if (player == 1) {
    $.ball.vx *= -1;
  }
};

$.update = function() {
  var collisionDiff,
    k,
    y;

//  if ($.paused) {
//    return;
//  }

  if ($.keys.isPressed(83)) { // DOWN
    $.p1.y = Math.min($.ch - $.p1.height, $.p1.y + 4);
  } else if ($.keys.isPressed(87)) { // UP
    $.p1.y = Math.max(0, $.p1.y - 4);
  }

  if ($.keys.isPressed(40)) { // DOWN
    $.p2.y = Math.min($.ch - $.p2.height, $.p2.y + 4);
  } else if ($.keys.isPressed(38)) { // UP
    $.p2.y = Math.max(0, $.p2.y - 4);
  }

  $.ball.update();
  $.sb1.value = $.p1.score;
  $.sb2.value = $.p2.score;

  if ($.ball.x > $.cw || $.ball.x + $.ball.width < 0) {
    $.ball.vx = -$.ball.vx;
  } else if ($.ball.y > $.ch || $.ball.y + $.ball.height < 0) {
    $.ball.vy = -$.ball.vy;
  }

  if ($.ball.vx > 0) {
    if ($.p2.x <= $.ball.x + $.ball.width &&
      $.p2.x > $.ball.x - $.ball.vx + $.ball.width) {
      collisionDiff = $.ball.x + $.ball.width - $.p2.x;
      k = collisionDiff/$.ball.vx;
      y = $.ball.vy*k + ($.ball.y - $.ball.vy);
      if (y >= $.p2.y && y + $.ball.height <= $.p2.y + $.p2.height) {
        // collides with right paddle
        $.ball.x = $.p2.x - $.ball.width;
        $.ball.y = Math.floor($.ball.y - $.ball.vy + $.ball.vy*k);
        $.ball.vx = -$.ball.vx;
      }
    }
  } else {
    if ($.p1.x + $.p1.width >= $.ball.x) {
      collisionDiff = $.p1.x + $.p1.width - $.ball.x;
      k = collisionDiff/-$.ball.vx;
      y = $.ball.vy*k + ($.ball.y - $.ball.vy);
      if (y >= $.p1.y && y + $.ball.height <= $.p1.y + $.p1.height) {
        // collides with the left paddle
        $.ball.x = $.p1.x + $.p1.width;
        $.ball.y = Math.floor($.ball.y - $.ball.vy + $.ball.vy*k);
        $.ball.vx = -$.ball.vx;
      }
    }
  }

  // Top and bottom collision
  if (($.ball.vy < 0 && $.ball.y < 0) ||
    ($.ball.vy > 0 && $.ball.y + $.ball.height > $.height)) {
    $.ball.vy = -$.ball.vy;
  }

  if ($.ball.x >= $.cw)
    $.score($.p1);
  else if ($.ball.x + $.ball.width <= 0)
    $.score($.p2);
};

$.startGame = function() {
  $.update();
  $.draw();
  requestAnimationFrame($.startGame);
};

/**
 * Start Game on Load
 */
window.addEventListener( 'load', function() {
  document.documentElement.className += ' loaded';
  $.init();
  $.startBtn.onclick = function() {
    $.startGame();
    this.style.display = 'none';
  };
});
