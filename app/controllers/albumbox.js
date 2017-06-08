var mongoose = require('mongoose');
var AlbumBox = mongoose.model('Album');

module.exports.albumboxesGet = function(req, res) {
	AlbumBox.find().exec(function(err, albumboxes){
		if(err) res.send(err);
		res.json(albumboxes);
	})
}

module.exports.albumboxesPost = function(req, res) {
	var albumbox = new AlbumBox();

	albumbox.title = req.body.title;
	albumbox.introduction = req.body.introduction;
	albumbox.albumPage = req.body.albumPage;

	albumbox.save(function(err) {
		if(err) res.send(err);
		res.json(albumbox);
	})
}

module.exports.albumboxesGetId = function(req, res) {
	AlbumBox.findById(req.params.albumboxId,function(err,albumbox) {
			if(err) res.send(err);
			res.json(albumbox);
		});
}

module.exports.albumboxesPutId = function(req, res) {
	AlbumBox.findById(req.params.albumboxId,function(err,albumbox) {
			if(err) res.send(err);
			albumbox.title = req.body.title;
			albumbox.introduction = req.body.introduction;
			albumbox.albumPage = req.body.albumPage;
			albumbox.save(function(err){
				if(err) res.send(err);
				res.json(albumbox);
			});
		});
}

module.exports.albumboxesDeleteId = function(req, res) {
	AlbumBox.remove({
			_id: req.params.albumboxId
		}, function(err, albumbox) {
			if(err) res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
}

