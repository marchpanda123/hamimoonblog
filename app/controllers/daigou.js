var mongoose = require('mongoose');
var Daigou = mongoose.model('Daigou');

module.exports.daigouGet = function(req, res) {
	Daigou.find().exec(function(err, daigou){
		if(err) res.send(err);
		res.json(daigou);
	})
}

module.exports.daigouPost = function(req, res) {
	var daigou = new Daigou();

	daigou.daigouClass = req.body.daigouClass;
	daigou.subTitle = req.body.subTitle;
	daigou.classPage = req.body.classPage;
	daigou.daigouIntro = req.body.daigouIntro;

	daigou.save(function(err) {
		if(err) res.send(err);
		res.json(daigou);
	})
}

module.exports.daigouGetId = function(req, res) {
	Daigou.findById(req.params.daigouId,function(err,daigou) {
			if(err) res.send(err);
			res.json(daigou);
		});
}
/*
module.exports.daigouPutId = function(req, res) {
	Daigou.findById(req.params.daigouId,function(err,daigou) {
			if(err) res.send(err);
			daigou.title = req.body.title;
			daigou.content = req.body.content;
			daigou.daigouPage = req.body.daigouPage;
			daigou.save(function(err){
				if(err) res.send(err);
				res.json(daigou);
			});
		});
}*/

module.exports.daigouDeleteId = function(req, res) {
	Daigou.remove({
			_id: req.params.daigouId
		}, function(err, daigou) {
			if(err) res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
}

