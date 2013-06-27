
/**
 * Module dependencies.
 */

var normalize = require('normalized-upload');
var Emitter = require('emitter');
var file = require('file');

/**
 * Expose `Clipboard`.
 */

module.exports = Clipboard;

/**
 * Initialize a `Clipboard`.
 *
 * @api private
 */

function Clipboard(el) {
  Emitter.call(this);
  this.el = el;
  this.onpaste = this.onpaste.bind(this);
  this.oncopy = this.oncopy.bind(this);
  this.oncut = this.oncut.bind(this);
  this.bind();
}

/**
 * Mixin emitter.
 */

Emitter(Clipboard.prototype);

/**
 * Bind event handlers.
 *
 * @api public
 */

Clipboard.prototype.bind = function(){
  this.el.addEventListener('paste', this.onpaste, false);
  this.el.addEventListener('copy', this.oncopy, false);
  this.el.addEventListener('cut', this.oncut, false);
};

/**
 * Unbind event handlers.
 *
 * @api public
 */

Clipboard.prototype.unbind = function(arg){
  this.el.removeEventListener('paste', this.onpaste);
  this.el.removeEventListener('copy', this.oncopy);
  this.el.removeEventListener('cut', this.oncut);
};

/**
 * Handle copy.
 */

Clipboard.prototype.oncopy = function(e){
  this.emit('copy', e);
};

/**
 * Handle cut.
 */

Clipboard.prototype.oncut = function(e){
  this.emit('cut', e);
};

/**
 * Handle paste.
 */

Clipboard.prototype.onpaste = function(e){
  var self = this;
  normalize(e, function(){
    self.emit('paste', e);
  });
};
