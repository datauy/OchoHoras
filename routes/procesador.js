var express = require('express');
var router = express.Router();
var rp 		= require('request-promise');


//var  url = 'http://ancient-mesa-15026.herokuapp.com';
var  url = 'http://localhost:3001';
/* GET home page. */
router.get('/*', function(req, res, next) {
	console.log(url+req.originalUrl)
	rp({
		json:true,
		url : url+req.originalUrl})
		.then(function(data){
			res.json(data);
		});
});

module.exports = router;
