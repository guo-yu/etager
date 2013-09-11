var uuid = require('node-uuid');

exports.image = 'tracker.jpg';
exports.url = '/' + exports.image;

exports.tracker = function(url) {
    return "<img src='" + exports.image + "?from=" + url + "' style='display:none !important;' />";
}

exports.listen = function(req, res, next) {
    var keepTag = function(tag) {
        res.set('ETag', tag);
        res.send('');
    };
    if (req.url.indexOf(exports.url) > -1) {
        var last = req.headers['if-none-match'],
            from = req.query.from;
        if (last) {
            // console.log(last + ' 正在访问页面：' + from);
            keepTag(last);
        } else {
            keepTag(uuid.v1());
        }
    } else {
        if (!res.locals.tracker) {
            res.locals.tracker = exports.tracker(req.url);
        }
        next()
    }
}