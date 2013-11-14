var fs = require('fs'),
    connect = require('connect'),
    http = require('http'),
    app = connect()
        .use(connect.static(__dirname))
        .use(function (req, res) {
            // everything else
            var accept = req.headers.accept.split(','),
                body, type;
                console.log(accept);

            res.statusCode = 200;

            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Access-Control-Allow-Origin', '*');

            fs.readFile('./index.html', function (err, html) {
                if (err) {
                    throw err;
                }

                res.end(html);
            });
        }),
    server = http.createServer(app);

server.listen(8080, function () {
    console.log('server is listening on port 8080');
});
