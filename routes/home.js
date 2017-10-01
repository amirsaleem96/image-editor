
var request = require("request");
var assetsMapper = require("../filePaths.json");

module.exports = function(settings) {
	var app = settings.app;
	var mode = settings.mode;
	var config = settings.config;
	var env = settings.env;
	var baseUrl =  config.baseUrl;
	var buyerBaseUrl = config.buyerBaseUrl;

	if(env=="local"){
		baseUrl = config.baseUrl_local;
	}

};
