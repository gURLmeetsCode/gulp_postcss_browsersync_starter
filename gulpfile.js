// ES5 syntax

var gulp = require('gulp'),
autoprefixer = require('autoprefixer'),
browserSync = require('browser-sync').create(),
postcss = require('gulp-postcss'),
watch = require('gulp-watch'),
nested = require('postcss-nested'),
cssvars = require('postcss-simple-vars');


// Feel free to break out tasks into partials within a gulp folder


// This task will run your current style sheet into the pre-processor filter. This will allow your browser to read and output.
gulp.task('styles', function(){
  return gulp.src('./src/assets/styles/style.css')
    .pipe(postcss([cssvars, nested, autoprefixer]))
    .on('error', function(errorInfo){
       console.log(errorInfo.toString());
       this.emit('end');
   })
    .pipe(gulp.dest('./src/dist/styles'))
    .pipe(browserSync.stream());
});




gulp.task('watch', ['styles'], function(){
  browserSync.init({
    notify: false,
    server: {
      baseDir: './src'
    }
  });
  gulp.watch(['src/assets/**/*.css'], ['styles']);
  gulp.watch(['src/*.html']).on('change', browserSync.reload);
});



// Default

gulp.task('default',['watch']);
