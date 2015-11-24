var env = require("./env");
var webpack = require("webpack");
var clone = require("clone");

// output names
var bundleName = "[name].js";
var bundleNameMin = "[name].min.js";

// create entry
var entry = {};
env.entry.js.forEach(function(ele, index, array){
	var key = ele.split(".")[0];
	entry[key] = env.path.src.js.self + "/" + ele;
});

// loaders
var babel = {
	test: /\.js$/,
	exclude: /node_modules/,
	loader: "babel-loader",
	query: {
		presets: ["es2015", "react"]
	}
};

// builds
var build = {
	entry: entry,
	output: {
		path: env.path.dist.js.self,
		filename: bundleName,
		chunkFilename: "[name].js"
	},
	plugins: [],
	module: {
		loaders: [babel]
	}
};

var buildMin = clone(build);
buildMin.output.filename = bundleNameMin;
buildMin.plugins = [ new webpack.optimize.UglifyJsPlugin({ sourceMap: false, warnings: false }) ];

var dev = clone(build);
dev.debug = true;
dev.devtool = "source-map";

module.exports = {
	build: build,
	buildMin: buildMin,
	dev: dev
};
