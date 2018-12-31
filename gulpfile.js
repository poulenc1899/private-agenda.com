var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpegtran = require('imagemin-jpegtran');
var gifsicle = require('imagemin-gifsicle');
var imageResize = require('gulp-image-resize');
var changed = require("gulp-changed");

// Task for building site when something changed:
gulp.task('build', shell.task(['bundle exec jekyll serve --port 3000 --incremental']));

// Task for serving site with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

// doing image optimisation
gulp.task('optimize-images', ['build-production'], function () {
    return gulp.src(['_site/**/*.jpg', '_site/**/*.JPG', '_site/**/*.gif', '_site/**/*.png'])
        .pipe(changed('_site/'))
        .pipe(imagemin({
            progressive: false,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant(), jpegtran(), gifsicle()]
        }))
        .pipe(gulp.dest('_site/'));
});

gulp.task('resize-images', function () {
    return gulp.src(['_site/assets/img/studio/*.JPG','_site/assets/img/studio/*.PNG'])
        .pipe(imageResize({
            width : 1000,
            noProfile: true,
            filter: 'Catrom',
            sharpen: true,
            quality: 0.9
        }))
        .pipe(gulp.dest('assets/img/studio/thumbs'));
});

gulp.task('resize-images-temp', function () {
    return gulp.src(['_site/assets/img/mariusknieling_FILM/privateagenda_film31.jpg'])
        .pipe(imageResize({
            width : 1600,
            noProfile: true,
            filter: 'Catrom',
            sharpen: true,
            quality: 0.9
        }))
        .pipe(gulp.dest('assets/img/mariusknieling_FILM'));
});


// Building for production & pushing site to server
gulp.task('build-production', shell.task('JEKYLL_ENV=production bundle exec jekyll build'));
gulp.task('upload', ['optimize-images'], shell.task('s3_website push'));
gulp.task('default', ['build', 'serve']);