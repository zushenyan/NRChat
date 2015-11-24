var env = require("./env");
var webpack = require("webpack");
var ExtractPlugin = require("extract-text-webpack-plugin");
var clone = require("clone");

// output names
var bundleName = "[name].css";
var bundleNameMin = "[name].min.css";

// create entry
var entry = {};
env.entry.css.forEach(function(ele, index, array){
	var key = ele.split(".")[0];
	entry[key] = env.path.src.css.self + "/" + ele;
});

// loaders
var scss = {
	test: /\.scss$/,
	loader: ExtractPlugin.extract("style", "css!sass")
};

var image = {
	test: /\.(jpg|png|jpeg)$/,
	loader: "url",
	query: {
		limit: 25000
	}
};

// builds
var build = {
	entry: entry,
	output: {
		path: env.path.dist.css.self,
		filename: "[name].js",
		chunkFilename: "[id].js"
	},
	plugins: [ new ExtractPlugin(bundleName) ],
	module: {
		loaders: [scss, image]
	}
};

var buildMin = clone(build);
buildMin.plugins = [
	new ExtractPlugin(bundleNameMin),
	new webpack.optimize.UglifyJsPlugin({ sourceMap: false, warnings: false })
];

var dev = clone(build);
dev.debug = true;
dev.devtool = "source-map";

module.exports = {
	build: build,
	buildMin: buildMin,
	dev: dev
};
