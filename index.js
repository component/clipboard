
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
  var pending = items.length;

  // file and filename
  if (has(items, 'file')) {
    // XXX: assuming ordering
    e.file = file(items[1].getAsFile());
    items[0].getAsString(function(str){
      e.plain = str;
      e.file.name = str;
      self.emit('paste', e);
    });
    return;
  }

  // get string
  function string(item) {
    var subtype = item.type.split('/').pop();
    item.getAsString(function(str){
      e[subtype] = str;
      --pending || self.emit('paste', e);
    });
  }

  // populate by subtype
  var len = pending;
  for (var i = 0; i < len; ++i) {
    if ('string' != items[i].kind) continue;
    string(items[i]);
  }
};

/**
 * Check if `items` has an item with `type`
 * and return that item.
 *
 * @param {Arrayish} items
 * @param {String} type
 * @return {Object}
 * @api public
 */

function has(items, type) {
  for (var i = 0; i < items.length; ++i) {
    if (type == items[i].kind) {
      return items[i];
    }
  }
}
