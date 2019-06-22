var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    autoprefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-rimraf'),
    gutil = require ('gulp-util')

gulp.task('clean', [], function () {
    console.log("Clean all files in build folder");
    return gulp.src(["dist/assets/js/**/*.js","dist/assets/css/*.css"], { read: false }).pipe(clean());
});
gulp.task('imagemin', function () {
    var img_src = 'src/images/**/*', img_dist = 'dist/images';
    gulp.src(img_src)
        .pipe(imagemin())
        .pipe(gulp.dest(img_dist))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//for use webpack budle
gulp.task('script', function () {
    gulp.src('src/assets/lib/*.js')
        .pipe(webpackStream(webpackConfig), webpack)
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/lib'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('js', function () {
    gulp.src('src/assets/js/**/*.js')
        .pipe(concat('app210920182028.js'))
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('vendor', function () {
    return gulp.src([
        'vendors/angular-notif/angular-web-notification.js',
        'vendors/jquery/dist/jquery.min.js',
        'vendors/bootstrap/dist/js/bootstrap.min.js',
        'vendors/angular-google-map/angularjs-google-maps.js',
        // 'vendors/bootstrap/dist/js/bootstrap-select.min.js',
        'vendors/custom.js',
        'vendors/angular-ui/ui-bootstrap.js',
        'node_modules/jquery-confirm/js/jquery-confirm.js',
        'node_modules/gasparesganga-jquery-loading-overlay/dist/loadingoverlay.js',
        'vendors/fastclick/lib/fastclick.js',
        'vendors/nprogress/nprogress.js',
        'vendors/Chart.js/dist/Chart.min.js',
        'vendors/gauge.js/dist/gauge.min.js',
        'vendors/bootstrap-progressbar/bootstrap-progressbar.min.js',
        'vendors/iCheck/icheck.min.js',
        'vendors/skycons/skycons.js',
        'vendors/Flot/jquery.flot.js',
        'vendors/Flot/jquery.flot.pie.js',
        'vendors/Flot/jquery.flot.time.js',
        'vendors/Flot/jquery.flot.stack.js',
        'vendors/Flot/jquery.flot.resize.js',
        'vendors/flot.orderbars/js/jquery.flot.orderBars.js',
        'vendors/flot-spline/js/jquery.flot.spline.min.js',
        'vendors/flot.curvedlines/curvedLines.js',
        'vendors/DateJS/build/date.js',
        'vendors/jqvmap/dist/jquery.vmap.js',
        'vendors/jqvmap/dist/maps/jquery.vmap.world.js',
        'vendors/jqvmap/examples/js/jquery.vmap.sampledata.js',
        'vendors/moment/min/moment.min.js',
        'vendors/bootstrap-daterangepicker/daterangepicker.js',
        'vendors/bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
        'vendors/mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js',
        'vendors/datatables.net/js/jquery.dataTables.min.js',
        'vendors/datatables.net-bs/js/dataTables.bootstrap.min.js',
        'vendors/angular-fullscreen/angular-fullscreen.js',
        'vendors/multiple-select/bootstrap-multiselect.js'
    ])
        // .pipe(validator())
        .pipe(gulp.dest('dist/assets/vendor'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('sass', function () {
    return gulp.src([
        // 'node_modules/angular-material/angular-material.min.css',
        'vendors/bootstrap/dist/css/bootstrap.min.css',
        // 'vendors/bootstrap/dist/css/bootstrap-select.min.css',
        'node_modules/jquery-confirm/css/jquery-confirm.css',
        'vendors/font-awesome/css/font-awesome.min.css',
        'vendors/nprogress/nprogress.css',
        'vendors/iCheck/skins/flat/green.css',
        'vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css',
        'vendors/jqvmap/dist/jqvmap.min.css',
        'vendors/bootstrap-daterangepicker/daterangepicker.css',
        'vendors/datatables.net-bs/css/dataTables.bootstrap.min.css',
        'vendors/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
        'vendors/mjolnic-bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css',
        'vendors/multiple-select/bootstrap-multiselect.css'
    ])
        // .pipe(sass())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        // .pipe(uglify())
        .pipe(autoprefix())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('css', function () {
    gulp.src('src/assets/sass/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('style210920182028.css'))
        .pipe(autoprefix())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('pages', function () {
    return gulp.src('src/pages/**/*.html')
        // .pipe(validator())
        .pipe(gulp.dest('dist/pages'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('fonts', function () {
    return gulp.src('src/assets/fonts/*')
        // .pipe(validator())
        .pipe(gulp.dest('dist/assets/fonts/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('html', function () {
    return gulp.src(['src/*.html', 'src/*.js', 'src/manifest.json'])
        // .pipe(validator())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('serve', ['imagemin', 'css','fonts', 'sass', 'script', 'js', 'vendor', 'html', 'pages'], function () {
    browserSync.init({
        server: {
            baseDir: './dist/',
            port:4000
        }
    });
    // watch for CSS changes
    gulp.watch('src/assets/sass/*.scss', function () {
        gulp.run('css');
    });
    // watch for JS changes
    gulp.watch('src/assets/lib/*.js', function () {
        gulp.run('script');
    });
    gulp.watch('src/assets/js/**/*.js', function () {
        gulp.run('js');
    });
    gulp.watch('src/assets/vendor/**/*', function () {
        gulp.run('vendor');
    });
    // watch for image
    gulp.watch('src/images/*', function () {
        gulp.run('imagemin');
    });
    // watch for index
    gulp.watch('src/*.html', function () {
        gulp.run('html');
    });
    // watch for view
    gulp.watch('src/pages/**/*', function () {
        gulp.run('pages');
    });
});
