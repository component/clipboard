
# Clipboard

  Clipboard library.

## Installation

```
$ component install component/clipboard
```

## Example

```js
var Clipboard = require('clipboard');

var clip = new Clipboard(window);

clip.on('paste', function(e){
  // file
  if (e.file) {
    console.log('paste file "%s"', e.file.name);
    e.file.toDataURL(function(err, url){
      var img = new Image;
      img.src = url;
      document.body.appendChild(img);
    });
    return;
  }

  if (e.html) {
    console.log('html "%s"', e.html);
  }

  if (e.plain) {
    console.log('plain "%s"', e.plain);
  }
});

clip.on('cut', function(){
  console.log('cut');
});

clip.on('copy', function(e){
  console.log('copy');
});
```

## API

### Files

  Currently only a single file is exposed as `e.file`.

## Strings

  String pastes are assigned to `e` using their associated MIME subtype. For example
  a "text/plain" representation as `e.plain`, "text/html" as `e.html` etc.

### Clipboard#bind()

  Bind event handlers. This is done for you in the constructor.

### Clipboard#unbind()

  Unbind event handlers.

## Links

  - w3c [clipboard apis](http://www.w3.org/TR/clipboard-apis/)

## License

 MIT