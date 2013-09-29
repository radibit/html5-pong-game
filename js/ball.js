/**
 * Init
 */
$.Ball = function() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.width = 6;
  this.height = 6;
};

/**
 * Update
 */
$.Ball.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
};

/**
 * Draw
 */
$.Ball.prototype.draw = function(b) {
  b.fillRect(this.x, this.y, this.width, this.height);
};