var uuid = require('node-uuid');

exports.image = 'tracker.jpg';
exports.url = '/' + exports.image;

exports.tracker = function(url) {
    return "<img src='" + exports.image + "?from=" + url + "' style='display:none !important;' />";
}

exports.listen = function(cb) {
    return function(req, res, next) {
        var keepTag = function(tag) {
                res.set('ETag', tag);
                res.send('');
            };
        // 如果访问tracker
        if (req.url.indexOf(exports.url) > -1) {
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
                res.locals.tracker = exports.tracker(req.url);
            }
            next()
        }
    };
}