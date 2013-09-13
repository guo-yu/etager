var uuid = require('node-uuid');

exports.tracker = function() {
    this.image = 'tracker.jpg';
    this.url = '/' + this.image;
    this.html = "<img src='" + this.image + "' style='display:none !important;' />";
    return this;
}

exports.listen = function(cb) {
    var tracker = exports.tracker();
    return function(req, res, next) {
        var keepTag = function(tag) {
                res.set('ETag', tag);
                res.send('');
            };
        // 如果访问tracker
        if (req.url.indexOf(tracker.url) > -1) {
            var tag = req.headers['if-none-match'];
            if (tag) {
                cb(tag, req, false);
                keepTag(tag);
            } else {
                var uid = uuid.v1();
                cb(uid, req, true);
                keepTag(uid);
            }
        } else {
            // 如果访问其他url
            if (!res.locals.tracker) {
                res.locals.tracker = tracker.html;
            }
            next()
        }
    };
}