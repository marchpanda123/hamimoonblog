var mongoose = require('mongoose');
var Message = mongoose.model('Message');

module.exports.messageGet = function(req, res) {
	Message.find()
	.sort('-created')
	.populate('postedBy')
	.exec(function(err, messages){
		if(err) res.send(err);
		res.json(messages);
	});
}

module.exports.messagePost = function(req, res) {
	
	var messages = new Message();
	req.body.postedBy = req.decoded._doc._id;

	messages.message = req.body.message;
	messages.postedBy = req.body.postedBy;

	messages.save(function(err) {
			if(err) res.send(err);
			res.json(messages);
	console.log(messages);
		});
}

module.exports.messageGetId = function(req, res) {
	Message.findById(req.params.messageId, function(err,message) {
		if(err) res.send(err);
		res.json(message);
	})
}

module.exports.messagePutId = function(req, res) {
	Message.findById(req.params.messageId, function(err, message) {
		if(err) res.send(err);
		message.message = req.body.message;
		message.save(function(err) {
			if(err) res.send(err);
			res.json(message);
		})
	})
}


module.exports.messageDeleteId = function(req, res) {
	Message.remove({
		_id: req.params.messageId
	}, function(err, message) {
		if(err) res.send(err);
		res.json({ message:'Successfully delete'});
	});
}