/**
 * Miscellaneous
 */
window['requestAnimFrame']=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

/**
 * Score board
 */
$.ScoreBoard = function(x, y) {
  this.x = x;
  this.y = y;
  this.value = 0;
};

$.ScoreBoard.prototype.draw = function(sb) {
  sb.font = '19pt Arial';
  sb.fillText(this.value, this.x, this.y);
};

$.KeyListener = function() {
  this.pressedKeys = [];

  this.keydown = function(e) {
    this.pressedKeys[e.keyCode] = true;
  };

  this.keyup = function(e) {
    this.pressedKeys[e.keyCode] = false;
  };

  document.addEventListener("keydown", this.keydown.bind(this));
  document.addEventListener("keyup", this.keyup.bind(this));
};

$.KeyListener.prototype.isPressed = function(key) {
  return this.pressedKeys[key] ? true : false;
};

$.KeyListener.prototype.addKeyPressListener = function(keyCode, callback) {
  document.addEventListener("keypress", function(e) {
    if (e.keyCode == keyCode)
      callback(e);
  });
};