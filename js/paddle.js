/**
 * Init
 */
$.Paddle = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 4;
  this.height = 44;
  this.score = 0;
};

/**
 * Update
 */
$.Paddle.prototype.draw = function(p) {
  p.fillRect(this.x, this.y, this.width, this.height);
};