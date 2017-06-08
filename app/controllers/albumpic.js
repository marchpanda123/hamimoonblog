var mongoose = require('mongoose');
var AlbumBox = mongoose.model('Album');

module.exports.albumpicsGet = function(req, res) {
	AlbumBox.findById(req.params.albumboxId)
	        .exec(function (err, albumbox) {
	        if (err) return next(err);
            
	        res.json(albumbox.albumpics);
            console.log(albumbox);
	    });
		
}

module.exports.albumpicsPost = function(req, res) {
	AlbumBox.findById(req.params.albumboxId, function (err, albumbox) {
        if (err) return next(err);
        albumbox.albumpics.push(req.body);
        albumbox.save(function (err, albumbox) {
            if (err) return next(err);
            console.log('Updated albumpics!');
            res.json(albumbox);
        });
    });
}

module.exports.albumpicsDelete = function(req, res) {
	AlbumBox.findById(req.params.albumboxId, function (err, albumbox) {
        if (err) return next(err);
        for (var i = (albumbox.albumpics.length - 1); i >= 0; i--) {
            albumbox.albumpics.id(albumbox.albumpics[i]._id).remove();
        }
        albumbox.save(function (err, result) {
            if (err) return next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all albumpics!');
        });
    });
}

module.exports.albumpicsGetId = function(req, res) {
	AlbumBox.findById(req.params.albumboxId)
        .exec(function (err, albumbox) {
        if (err) return next(err);
        res.json(albumbox.albumpics.id(req.params.albumpicId));
    });
}

module.exports.albumpicsPutId = function(req, res) {
	AlbumBox.findById(req.params.albumboxId, function (err, albumbox) {
        if (err) return next(err);
        albumbox.albumpics.id(req.params.albumpicId).remove();
                req.body.postedBy = req.decoded._id;
        albumbox.albumpics.push(req.body);
        albumbox.save(function (err, albumbox) {
            if (err) return next(err);
            console.log('Updated albumpics!');
            res.json(albumbox);
        });
    });
}

module.exports.albumpicsDeleteId = function(req, res) {
	AlbumBox.findById(req.params.albumboxId, function (err, albumbox) {
        if (albumbox.albumpics.id(req.params.albumpicId).postedBy
           != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        albumbox.albumpics.id(req.params.albumpicId).remove();
        albumbox.save(function (err, resp) {
            if (err) return next(err);
            res.json(resp);
        });
    });
}