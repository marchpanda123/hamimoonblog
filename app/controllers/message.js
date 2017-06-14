var mongoose = require('mongoose');
var Messageb = mongoose.model('Messageb');

module.exports.messagebGet = function(req, res) {
	Messageb.find()
	.sort('-created')
	.populate('postedBy')
	.exec(function(err, messagesb){
		if(err) res.send(err);
		res.json(messagesb);
	});
}

module.exports.messagebPost = function(req, res) {
	
	var messagesb = new Messageb();
	req.body.postedBy = req.decoded._doc._id;

	messagesb.messageb = req.body.messageb;
	messagesb.postedBy = req.body.postedBy;

	messagesb.save(function(err) {
			if(err) res.send(err);
			res.json(messagesb);
	console.log(messagesb);
		});
}

module.exports.messagebGetId = function(req, res) {
	Messageb.findById(req.params.messagebId, function(err,messageb) {
		if(err) res.send(err);
		res.json(messageb);
	})
}

module.exports.messagebPutId = function(req, res) {
	Messageb.findById(req.params.messagebId, function(err, messageb) {
		if(err) res.send(err);
		messageb.messageb = req.body.messageb;
		messageb.save(function(err) {
			if(err) res.send(err);
			res.json(messageb);
		})
	})
}


module.exports.messagebDeleteId = function(req, res) {
	Messageb.remove({
		_id: req.params.messagebId
	}, function(err, messageb) {
		if(err) res.send(err);
		res.json({ message:'Successfully delete'});
	});
}