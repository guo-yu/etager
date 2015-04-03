## ![etager](https://cdn0.iconfinder.com/data/icons/windows8_icons/26/price_tag.png) etager ![npm](https://badge.fury.io/js/etager.png)

A tiny etag tracker middleware by [turing](https://npmjs.org/~turing) 

![screenshot](http://ww3.sinaimg.cn/large/61ff0de3gw1e8kzcfnsxsj20kj0demz5.jpg)

### Installation
```bash
$ npm install etager
```

### Example
````javascript
var etager = require('etager');

// Use as Express middleware
app.use(etager.listen(function(uuid, request, firstaccess){
  console.log(
    firstaccess ? 
    'hi newbie [' + uuid + ']' : 
    welcome back [' + uuid + ']'
  );
}));

// Add tracker <img /> in router
app.get('/url',function(req, res, next){
  res.render('demo',{
    tracker: res.locals.tracker // or use in jade directly
  });
});
````

### Examples
````
$ git clone https://github.com/turingou/etager.git
$ git cd etager/examples
$ node server.js
````

### API

- etager.tracker()
- etager.listen()

### Contributing
- Fork this repo
- Clone your repo
- Install dependencies
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Open a pull request, and enjoy <3

### MIT license
Copyright (c) 2013 turing &lt;o.u.turing@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
![docor](https://cdn1.iconfinder.com/data/icons/windows8_icons_iconpharm/26/doctor.png)
generated using [docor](https://github.com/turingou/docor.git) @ 0.1.0. brought to you by [turingou](https://github.com/turingou)