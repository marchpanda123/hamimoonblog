var mongoose = require('mongoose');
var Tag = mongoose.model('Tag');

module.exports.tagGet = function(req, res) {
	Tag.find(function(err, tags){
		if(err) res.send(err);
		res.json(tags);
	});

}

module.exports.tagPost = function(req, res) {
	
	var tags = new Tag();

	tags.tagName = req.body.tagName;

	tags.save(function(err) {
			if(err) res.send(err);
			res.json(tags);
	console.log(tags);
		});
}

module.exports.tagGetId = function(req, res) {
	Tag.findById(req.params.tagId, function(err,tag) {
		if(err) res.send(err);
		res.json(tag);
	})
}

module.exports.tagPutId = function(req, res) {
	Tag.findById(req.params.tagId, function(err, tag) {
		if(err) res.send(err);
		tag.tagName = req.body.tagName;
		tag.save(function(err) {
			if(err) res.send(err);
			res.json(tag);
		})
	})
}


module.exports.tagDeleteId = function(req, res) {
	Tag.remove({
		_id: req.params.tagId
	}, function(err, tag) {
		if(err) res.send(err);
		res.json({ message:'Successfully delete'});
	});
}