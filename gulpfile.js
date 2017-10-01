var gulp = require("gulp");
var gutil = require("gulp-util");
var sass = require("gulp-sass");
var del = require("del");
var notify = require("gulp-notify");
var moment = require("moment");
var uglifycss = require("gulp-uglifycss");
var concat = require('gulp-concat');
var staticMapper = require("./staticMapper.json");
var uglify = require('gulp-uglify');
var gulpDebug = require('gulp-debug');

// method to convert json array of object to javascript array of object
function getAssetsArray(location){
	var assets = [];
	location.forEach(function(anAsset){
		assets.push(anAsset);
	});
	return assets;
}

// task to clean the build directory

gulp.task('clean', function(){
	gutil.log('Cleaning build directory');
	return del([
			'static/build/css/**/*.css',
			'static/build/js/**/*.js',
		]);
});

gulp.task('build-css', function(){
	gutil.log('building minified css');
	for(var key in staticMapper){
		gulp.src(
			getAssetsArray(staticMapper[key].styles.debug)
		);
		.pipe(concat(staticMapper[key].styles.prod[0]))
		.on('error', notify.onError("Error: <%= error.message %>"))
		.pipe(uglifycss())
		.on('error', notify.onError("Error: <%= error.message %>"))
		.pipe(gulp.dest('.'))
	    .pipe(notify('Concatenated stylesheets for ' + staticMapper[key]styles.prod[0] + ' (' + moment().format('MMM Do h:mm:ss A') + ')'))
	}

});

gulp.task('build-js', function(){
	gutil.log('building minified js')
	for(var key in staticMapper){
		gulp.src(getAssetsArray(staticMapper[key]["scripts"]["debug"])
	)
		.pipe(gulpDebug())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(concat(staticMapper[key]["scripts"]["prod"][0]))
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(uglify())
        .on('error', function(err) {
        	console.log(err);
gutil.log(gutil.colors.red('[Error]'), err.toString());
this.emit('end');
})
        .pipe(gulp.dest('.'))
        .pipe(notify('Uglified JavaScript (' +staticMapper[key]["scripts"]["prod"][0]+ moment().format('MMM Do h:mm:ss A') + ')'))
	}
})


gulp.task('build-sass',function(){
	gulp.src(
		'static/scss/**/*.scss'
	)
		.pipe(sass())
		.on('error', notify.onError("Error: <%= error.message %>"))
		.pipe(gulp.dest('static/css'))
		//.pipe(notify('Compiled sass for (' + moment().format('MMM Do h:mm:ss A') + ')'));
});

gulp.task('run-test', function(){
	 gulp.src('test/**.js', {read: false})
        .pipe(mocha({reporter: 'list'}));
  //mocha({reporter: 'list'});
});

gulp.task('watch-test', function(){
	gulp.watch('test/**.js', ['run-test']);
})

gulp.task('watch', ['clean','build-sass', 'build-css', 'build-js'], function(){
	gulp.watch('static/scss/**/*.scss', ['build-sass']);
});

gulp.task('default', ['watch']);
