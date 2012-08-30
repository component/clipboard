
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

clip.on('paste text', function(text){
  console.log('paste "%s"', text);
});

clip.on('paste file', function(file){
  console.log(file.name)
  file.toDataURL(function(err, url){
    var img = new Image;
    img.src = url;
    document.body.appendChild(img);
  });
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