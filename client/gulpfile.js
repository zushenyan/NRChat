var gulp = require("gulp");
var gutil = require("gulp-util");
var watch = require("gulp-watch");
var del = require("del");
var minifyHtml = require("gulp-minify-html");
var runSequence = require("run-sequence");
var browserSync = require("browser-sync").create();
var webpack = require("webpack");

var env = require("./env");

var jsConfig = require("./webpack.script.config");
var cssConfig = require("./webpack.style.config");
var jsCompiler = webpack(jsConfig.dev);
var cssCompiler = webpack(cssConfig.dev);

function webpackLogger(callback, taskName, err, stats){
	if(err) { throw new gutil.PluginError(taskName, err); }
	gutil.log(taskName, stats.toString({colors: true}));
	if(callback){ callback(); };
}

function browserSyncInit(){
	browserSync.init({
		server: { baseDir: "./" }
	});
}

gulp.task("devCss", function(callback){ cssCompiler.run(webpackLogger.bind(this, callback, "devCss")); });
gulp.task("buildCssHelper", function(callback){ webpack(cssConfig.build, webpackLogger.bind(this, callback, "buildCssHelper")); });
gulp.task("buildMinCssHelper", function(callback){ webpack(cssConfig.buildMin, webpackLogger.bind(this, callback, "buildMinCssHelper")); });
gulp.task("buildCss", ["buildCssHelper", "buildMinCssHelper"]);

gulp.task("devJs", function(callback){ jsCompiler.run(webpackLogger.bind(this, callback, "devJs")); });
// since transpiled js files are unreadable I don't see any point why building non-minifized js files.
// gulp.task("buildJsHelper", function(callback){ webpack(jsConfig.build, webpackLogger.bind(this, callback, "buildJsHelper")); });
gulp.task("buildMinJsHelper", function(callback){ webpack(jsConfig.buildMin, webpackLogger.bind(this, callback, "buildMinJsHelper")); });
gulp.task("buildJs", ["buildMinJsHelper"]);

gulp.task("devHtml", function(){
	return gulp.src(env.path.src.html.files)
		.pipe(gulp.dest(env.path.dist.html.self));
});

gulp.task("buildHtml", function(){
	var opts = {
		empty: true,
		cdata: true,
		comments: false,
		conditionals: true,
		spare: false,
		quotes: false,
		loose: false
	};
	return gulp.src(env.path.src.html.files)
		.pipe(minifyHtml(opts))
		.pipe(gulp.dest(env.path.dist.html.self));
});

gulp.task("copyLib", function(){
	return gulp.src(env.path.src.lib.files)
		.pipe(gulp.dest(env.path.dist.lib.self));
});

gulp.task("copyMedia", function(){
	return gulp.src(env.path.src.media.files)
		.pipe(gulp.dest(env.path.dist.media.self));
});

gulp.task("watch", function(){
	function watchAll(){
		browserSyncInit();
		watch(env.path.src.js.files, function(){ gulp.start("devJs"); browserSync.reload(); });
		watch(env.path.src.css.files, function(){ gulp.start("devCss"); browserSync.reload(); });
		watch(env.path.src.html.files, function(){ gulp.start("devHtml"); browserSync.reload(); });
		watch(env.path.src.lib.files, function(){ gulp.start("copyLib"); browserSync.reload(); });
		watch(env.path.src.media.files, function(){ gulp.start("copyMedia"); browserSync.reload(); });
	}
	runSequence(["dev"], watchAll);
});

gulp.task("dev", ["clean"], function(callback){
	runSequence(["devJs", "devCss", "devHtml", "copyLib", "copyMedia"], callback);
});

gulp.task("build", ["clean"], function(callback){
	runSequence(["buildJs", "buildCss", "buildHtml", "copyLib", "copyMedia"], callback);
});

gulp.task("clean", function(){
	return del([env.path.dist.self]);
});
