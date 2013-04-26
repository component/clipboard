
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
  e.items.forEach(function(item){
    console.log(item);
  });
});

clip.on('cut', function(){
  console.log('cut');
});

clip.on('copy', function(e){
  console.log('copy');
});
```

## API

### Clipboard#bind()

  Bind event handlers. This is done for you in the constructor.

### Clipboard#unbind()

  Unbind event handlers.

## Links

  - w3c [clipboard apis](http://www.w3.org/TR/clipboard-apis/)

## License

 MIT
