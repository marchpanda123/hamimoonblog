var mongoose = require('mongoose');
var Daigou = mongoose.model('Daigou');

module.exports.daigoutagGet = function(req, res) {
	Daigou.findById(req.params.daigouId)
	        .exec(function (err, daigou) {
	        if (err) return next(err);
            
	        res.json(daigou.classTag);
            console.log(daigou);
	    });
		
}

module.exports.daigoutagPost = function(req, res) {
	Daigou.findById(req.params.daigouId, function (err, daigou) {
        if (err) return next(err);
        daigou.classTag.push(req.body);
        daigou.save(function (err, daigou) {
            if (err) return next(err);
            console.log('Updated daigoutag!');
            res.json(daigou);
        });
    });
}

/*module.exports.daigoutagDelete = function(req, res) {
	Daigou.findById(req.params.daigouId, function (err, daigou) {
        if (err) return next(err);
        for (var i = (daigou.daigoutag.length - 1); i >= 0; i--) {
            daigou.daigoutag.id(daigou.daigoutag[i]._id).remove();
        }
        daigou.save(function (err, result) {
            if (err) return next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all daigoutag!');
        });
    });
}

module.exports.daigoutagGetId = function(req, res) {
	Daigou.findById(req.params.daigouId)
        .exec(function (err, daigou) {
        if (err) return next(err);
        res.json(daigou.daigoutag.id(req.params.daigoutagId));
    });
}

module.exports.daigoutagPutId = function(req, res) {
	Daigou.findById(req.params.daigouId, function (err, daigou) {
        if (err) return next(err);
        daigou.daigoutag.id(req.params.daigoutagId).remove();
                req.body.postedBy = req.decoded._id;
        daigou.daigoutag.push(req.body);
        daigou.save(function (err, daigou) {
            if (err) return next(err);
            console.log('Updated daigoutag!');
            res.json(daigou);
        });
    });
}*/

module.exports.daigoutagDeleteId = function(req, res) {
	Daigou.findById(req.params.daigouId, function (err, daigou) {
        console.log(daigou);
        daigou.classTag.id(req.params.daigoutagId).remove();
        daigou.save(function (err, daigou) {
            if (err) return next(err);
            res.json(daigou);
        });
    });
}