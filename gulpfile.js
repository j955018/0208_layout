const { src, dest, parallel ,watch} = require('gulp');
//      起點 終點   平行處理
const gulpSass = require('gulp-sass');
//載入 變數                套件名稱
const rename = require('gulp-rename');
const csso = require('gulp-csso');
const maps = require('gulp-sourcemaps');
const purgecss = require('gulp-purgecss');

function html(){
    return src('index.html')
    .pipe(dest('dist/'))
}

function css(){
    return src('scss/style.scss')
    //回傳 路徑  檔案名稱
    .pipe(maps.init()) //sourcemaps初始化
    .pipe(gulpSass({
        outputStyle:'expanded'
    }))
    .pipe(purgecss({
        content:['*.html']
    }))
    .pipe(maps.write('./')) //產生map檔
    .pipe(dest('dist/css'));
    //      處理好的位置
}

function cssm(){
    return src('scss/style.scss')
    // .pipe(gulpSass({
    //     outputStyle:'compressed'
    // }))
    .pipe(maps.init())
    .pipe(gulpSass())
    .pipe(purgecss({
        content:['*.html']
    }))
    .pipe(csso())
    .pipe(rename(function(path){
        path.basename += '.min';
        path.extname = '.css'
    }))
    .pipe(maps.write('./'))
    .pipe(dest('dist/css'));
}


exports.css = css;
//輸出
exports.cssm = cssm;
exports.html = html;
exports.default = parallel(html,css,cssm);
