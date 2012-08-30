
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
  console.log('paste');
});

clip.on('cut', function(){
  console.log('cut');
});

clip.on('copy', function(e){
  console.log('copy');
});
```

### Clipboard#bind()

  Bind event handlers. This is done for you in the constructor.

### Clipboard#unbind()

  Unbind event handlers.

## Links

  - w3c [clipboard apis](http://www.w3.org/TR/clipboard-apis/)

## License

 MIT