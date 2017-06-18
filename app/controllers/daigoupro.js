var mongoose = require('mongoose');
var Daigou = mongoose.model('Daigou');

module.exports.daigouproGet = function(req,res) {
	console.log(1);
	Daigou.findById(req.params.daigouId).exec(function(err,daigou){
		for(var i=0;i< daigou.classTag.length;i++)
		if(req.params.daigoutagId == daigou.classTag[i]._id){
			res.json(daigou.classTag[i].tagProduct);
			console.log(daigou.classTag[i].tagProduct);
			console.log(req.params);
		}
	});
}

module.exports.daigouproPost = function(req,res) {
	Daigou.findById(req.params.daigouId).exec(function(err,daigou){
		for(var i=0;i< daigou.classTag.length;i++)
		if(req.params.daigoutagId == daigou.classTag[i]._id){
			daigou.classTag[i].tagProduct.push(req.body);
			daigou.save(function(err, daigoupro) {
				if(err) return next(err);
				res.json(daigoupro);
			});
		}
	});
}

module.exports.daigouproDeleteId = function(req,res) {
	Daigou.findById(req.params.daigouId).exec(function(err,daigou) {
		for(var i=0; i< daigou.classTag.length; i++)
			if(req.params.daigoutagId == daigou.classTag[i]._id){
				daigou.classTag[i].tagProduct.id(req.params.daigouproId).remove();
				daigou.save(function(err,daigoupro) {
					if(err) return next(err);
					res.json(daigou);
				});
			}
	});
}