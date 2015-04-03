exports.listen = listen;
exports.tracker = tracker;

function tracker() {
  this.image = 'tracker.jpg';
  this.url = '/' + this.image;
  this.html = "<img src='" + this.image + "' style='display:none !important;' />";
  return this;
}

function listen(callback) {
  var tracker = tracker();

  return function(req, res, next) {
    if (req.url.indexOf(tracker.url) === -1) {
      if (!res.locals.tracker)
        res.locals.tracker = tracker.html;

      return next();
    }

    var hasTag = req.headers['if-none-match'];
    var tag = hasTag || require('node-uuid').v1();

    callback(tag, req, !!!hasTag);
    res.set('ETag', tag);
    res.send('');
  }
}
