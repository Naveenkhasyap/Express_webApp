var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

var jscs = require('gulp-jscs');
var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
    "use strict";
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function() {
    "use strict";
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], { read: false });

    var injectoptions = {
        ignorePath: '/public'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public/'
    }

    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectoptions))
        .pipe(gulp.dest('./src/views'));

})

gulp.task('serve', ['style', 'inject'], function() {
    "use strict";
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    }
    return nodemon(options)
        .on('restart', function(ev) {
            console.log('restarting');
        });
});