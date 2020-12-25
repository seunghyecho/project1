/*
npm init
npm install gulp-cli -g
npm install gulp -D
npm install --save-dev gulp-sass browser-sync gulp-uglifycss gulp-sourcemaps gulp-html-tag-include
npm install --save-dev gulp-concat gulp-uglify gulp-rename
*/

const gulp = require('gulp');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const include = require('gulp-html-tag-include');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const token_replace = require('gulp-token-replace');


function html_include_main(){
    return gulp.src('./src/main/index.html')
    .pipe(include())
    .pipe(gulp.dest('./'));
}


function html_include_sub(){
    delete require.cache[require.resolve('./config.json')]
    let config = require('./config.json');
    return gulp.src('./src/sub/**/*.html')
    .pipe(include())
    .pipe(token_replace({
        global: config
    }))
    .pipe(gulp.dest('./subPage'));
}


function style(){
    return gulp.src('./src/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write()) 
    /*   
    .pipe(uglifycss({    
        "uglyComments": true
     }))
     */
    .pipe(gulp.dest('./css'))   
    .pipe(browserSync.stream());
}

function js_combine(){
    return gulp.src('./src/**/*.js')
      .pipe(gulp.dest('./js'))
      .pipe(concat('combined.js'))
      .pipe(gulp.dest('./js'))
      .pipe(uglify())
      .pipe(rename('custom.min.js'))
      .pipe(gulp.dest('./js'))
}

function imgmin(){
    return gulp.src('./src/**/img/*')  
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 10}),
        ]))        
        .pipe(gulp.dest('./img/'));
}

function send_json(){
    return gulp.src('./src/main/**/*.json')
    .pipe(gulp.dest('./data'));
}

function watch(){
    browserSync.init({
        server : {
            baseDir : './'
        },
        browser: "chrome",
        notify : false
    });    
  
    gulp.watch('./src/main/**/*.html',  html_include_main);  
    gulp.watch('./src/sub/**/*.html',  html_include_sub); 
    gulp.watch('./src/**/*.scss',  style);
    gulp.watch('./src/**/*.js',  js_combine); 
    gulp.watch('./src/**/img/*',imgmin);
    gulp.watch('./src/main/**/*.json, send_json');
    gulp.watch('./**/*.html').on('change',browserSync.reload); 
    gulp.watch('./**/*.scss').on('change',browserSync.reload); 
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.html_include_main = html_include_main;
exports.html_include_sub = html_include_sub;
exports.style = style;
exports.js_combine = js_combine;
exports.imgmin = imgmin;
exports.send_json = send_json;
exports.watch = watch;
const build = gulp.series(html_include_main, html_include_sub, style, js_combine, send_json,watch);
exports.default = build;
