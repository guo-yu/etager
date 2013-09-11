var uuid = require('node-uuid');

exports.image = 'tracker.jpg';
exports.url = '/' + exports.image;

exports.tracker = function(url) {
    return "<img src='" + exports.image + "?from=" + url + "' style='display:none !important;' />";
}

exports.listen = function(req, res, next) {
    if (req.url == exports.url) {
        var last = req.headers['if-none-match'],
            from = req.query.from;
        if (last) {
            res.set('ETag', last);
            res.send('');
        } else {
            var uid = uuid.v1();
            res.set('ETag', uid);
            res.send('');
        }
    } else {
        if (!res.locals.tracker) {
            res.locals.tracker = exports.tracker(req.url);
        }
    }
}