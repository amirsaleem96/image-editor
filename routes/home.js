/***
home.js
This module contains all the view rendering.
What all is visible to the eyes comes right through here.
**/

var request = require("request");
var assetsMapper = require("../filePaths.json");

module.exports = function(settings){

	var app = settings.app;
	var mode = settings.mode;
	var config = settings.config;
	var env = settings.env;
	var baseUrl =  config["baseUrl"];
	if(env=="local"){
		baseUrl = config["baseUrl_local"];
	}

	app.get("/editor/image-editor", function(req, res){
		res.render("editor",{
			styles: assetsMapper["editor"]["styles"][mode],
			scripts: assetsMapper["editor"]["scripts"][mode],
			baseUrl: baseUrl
		});
	});

}
