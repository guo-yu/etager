var uuid = require('node-uuid');

exports.tracker = function() {
  this.image = 'tracker.jpg';
  this.url = '/' + this.image;
  this.html = "<img src='" + this.image + "' style='display:none !important;' />";
  return this;
}

exports.listen = function(callback) {
  var tracker = exports.tracker();
  return function(req, res, next) {
    // 如果访问tracker
    if (req.url.indexOf(tracker.url) > -1) {
      var tag = req.headers['if-none-match'];
      if (tag) {
        callback(tag, req, false);
        keepTag(tag);
      } else {
        var uid = uuid.v1();
        callback(uid, req, true);
        keepTag(uid);
      }
    } else {
      // 如果访问其他 uri
      if (!res.locals.tracker) {
        res.locals.tracker = tracker.html;
      }
      return next();
    }

    function keepTag(tag) {
      res.set('ETag', tag);
      res.send('');
    }
  }
}