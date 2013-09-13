var http = require('http'),
    express = require('express'),
    path = require('path');

var etager = require('../');

var Server = function() {

    var app = express();

    // all environments
    app.use(express.logger('dev'));
    app.use(express.bodyParser({
        keepExtensions: true,
        uploadDir: path.join(__dirname, '/uploads')
    }));
    app.use(express.methodOverride());
    app.use(express.cookieParser('demo'));
    app.use(etager.listen(function(uuid, request, firstaccess){
        if (firstaccess) {
            console.log('hi newbie [' + uuid + ']');
            console.log('you are come from' + request.query.from);
        } else {
            console.log('welcome back [' + uuid + ']');
            console.log('you are come from' + request.query.from);
        }
    }));
    app.use(app.router);

    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    app.get('/demo/*',function(req,res,next){
        res.send(
            [
            '<h1>',
            'hello' + req.url,
            '</h1>',
            res.locals.tracker
            ].join('\n')
            )
    })

    this.app = app;
}

Server.prototype.run = function(port) {
    var self = this;
    if (port && !isNaN(parseInt(port))) {
        self.app.set('port', parseInt(port));
    } else {
        self.app.set('port', 3333);
    }
    http.createServer(self.app).listen(self.app.get('port'));
}

new Server().run();