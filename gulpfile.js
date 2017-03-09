var gulp = require('gulp'),
	//uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	//imagemin = require('gulp-imagemin'),
	htmlmin = require('gulp-htmlmin'),
	tinify = require('gulp-tinify'),
	//svgmin = require('gulp-svgmin'),
	critical = require('critical'),
	rename = require('gulp-rename')

var paths = {
	scripts: ['src/js/*.js'],
	styles: ['src/css/*.css'],
	//images: ['src/images/*'],
	tinify: ['src/images/*'],
	svgImages: ['src/images/*.svg'],
	content: ['src/*.html']
}

// copy styles for critical
gulp.task('copystyles', function(){
	return gulp.src(['src/css/bootstrap.min.css'])
		.pipe(rename ({
			basename: "site"
		}))
		.pipe(gulp.dest('src/css'));
});

//inline critical css
gulp.task('critical', ['copystyles'], function(){
	critical.generateInline({
		base: 'src/',
		src: 'index.html',
		styleTarget: 'bootstrap.min.css',
		htmlTarget: 'src/index.html',
		width: 320,
		height: 480,
		minify: false
	});
});

// Uglifies js files and outputs them to dist/js
// gulp.task('scripts', function(){
// 	return gulp.src(paths.scripts)
// 		.pipe(uglify())
// 		.pipe(gulp.dest('dist/js/'));
// });

// Minifies css files and outputs them to dist/css
gulp.task('styles', function(){
	return gulp.src(paths.styles)
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/css/'));
});

// Minifies images and outputs them to dist/images
// gulp.task('images', function(){
// 	return gulp.src(paths.images)
// 	.pipe(imagemin({
// 		progressive: true,
// 		svgoPlugins: [{removeViewBox: false}],
// 		use: [pngquant()]
// 	}))
// 	.pipe(gulp.dest('dist/images/'))
// });

// Minifies PNG, JPEG, and GIF images and outputs to dist/images
gulp.task('tinify', function() {
    return gulp.src(paths.tinify)
        .pipe(tinify('idMQZa1hEHf2OYTiDVgpmn3snhlNBzmo'))
        .pipe(gulp.dest('dist/images/'));
});

// gulp.task('svgImages', function(){
// 	return gulp.src(paths.svgImages)
// 		.pipe(svgmin())
// 		.pipe(gulp.dest('dist/images/'));
// });

// Minifies HTML and outputs it to dist
gulp.task('content', function(){
	return gulp.src(paths.content)
		.pipe(htmlmin({collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true,  removeOptionalTags: true}))
		.pipe(gulp.dest('dist'));
});

// Watches for changes and execute appropriate tasks
gulp.task('watch', function(){
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/css/*.css', ['styles']);
	gulp.watch('src/images/*', ['tinify']);
	//gulp.watch('src/images/*.svg', ['svgImages']);
	gulp.watch('src/*.html', ['content']);
});

gulp.task('default', ['styles', 'tinify', 'content', 'watch']);
//gulp.task('default', ['scripts', 'styles', 'images', 'content', 'watch']);
//

