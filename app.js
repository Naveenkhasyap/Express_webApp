var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

var port = process.env.PORT || 3000;

var nav = [{
        Link: '/Authors',
        Text: 'Authors'
    },
    {
        Link: '/Books',
        Text: 'Books'
    }
];

var bookRouter = require('./src/routes/bookRouter.js')(nav);
var adminRouter = require('./src/routes/adminRoutes.js')(nav);
var authRouter = require('./src/routes/authRoutes.js')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));


require('./src/config/passport')(app);
var jade = require('jade');
app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
app.get('/', function(req, res) {
    "use strict";
    res.render('index', {
        title: 'hello from render',
        nav: [{
                Link: '/Authors',
                Text: 'Authors'
            },
            {
                Link: '/Books',
                Text: 'Books'
            }
        ]
    });
});


app.get('/books', function(req, res) {
    "use strict";
    res.send('list of books');

});

app.get('/authors', function(req, res) {
    "use strict";
    res.send('list of authors');

});


app.listen(5000, function(err) {
    "use strict";
    console.log('runnig server on  port ' + port);
});