
/**
 * Module dependencies.
 */

var file = require('file')
  , Emitter = require('emitter');

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
  this.bind();
}

/**
 * Inherits from `Emitter.prototype`.
 */

Clipboard.prototype.__proto__ = Emitter.prototype;

/**
 * Bind event handlers.
 *
 * @api public
 */

Clipboard.prototype.bind = function(){
  this.el.addEventListener('paste', this._paste = this.onpaste.bind(this), false);
  this.el.addEventListener('copy', this._copy = this.oncopy.bind(this), false);
  this.el.addEventListener('cut', this._cut = this.oncut.bind(this), false);
};

/**
 * Unbind event handlers.
 *
 * @api public
 */

Clipboard.prototype.unbind = function(arg){
  this.el.removeEventListener('paste', this._paste);
  this.el.removeEventListener('copy', this._copy);
  this.el.removeEventListener('cut', this._cut);
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
  var items = e.clipboardData.items;

  // file
  if (items[1] && 'file' == items[1].kind) {
    e.file = file(items[1].getAsFile());
  } 

  // text
  items[0].getAsString(function(str){
    e.text = str;
    self.emit('paste', e);

    // file
    if (e.file) {
      e.file.name = str;
      self.emit('paste file', e.file, e);
    } else {
      self.emit('paste text', str, e);
    }
  });
};
