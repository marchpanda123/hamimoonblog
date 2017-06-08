var mongoose = require('mongoose');
var Article = mongoose.model('Article');

module.exports.articlesGet = function(req, res) {

	var reqId = req.decoded._doc._id;
	console.log(req.decoded);
	//recive the data from user
	Article.find({postedBy:reqId})
	.populate('postedBy')
	.populate('belongTag')
	.sort('-created')
	.exec(function(err, articles) {
			if(err) res.send(err);
			res.json(articles);
		});
}


module.exports.articlesPost = function(req, res) {

	var article = new Article();

		req.body.postedBy = req.decoded._doc._id; // post with user

		article.title = req.body.title;
		article.pageImage = req.body.pageImage;
		article.content = req.body.content;
		article.introduction = req.body.introduction;
		article.postedBy = req.body.postedBy;
		article.belongTag = req.body.belongTag;
		article.save(function(err) {
			if(err) res.send(err);
			res.json(article);
		});
}

module.exports.articlesGetId = function(req, res) {
	Article.findById(req.params.articleId,function(err,article) {
			if(err) res.send(err);
			res.json(article);
		}).populate('postedBy').populate('belongTag').populate('comments.postedBy');
}

module.exports.articlesPutId = function(req, res) {
	Article.findById(req.params.articleId,function(err,article) {
			if(err) res.send(err);
			if(req.body.title) article.title = req.body.title;
			if(req.body.pageImage) article.pageImage = req.body.pageImage;
			if(req.body.content) article.content = req.body.content;
			if(req.body.introduction) article.introduction = req.body.introduction;
			if(req.body.belongTag) article.belongTag = req.body.belongTag;
			if(req.body.popular) article.popular = req.body.popular;
			article.save(function(err){
				if(err) res.send(err);
				res.json(article);
			});
		});
}

module.exports.articlesDeleteId = function(req, res) {
	Article.remove({
			_id: req.params.articleId
		}, function(err, article) {
			if(err) res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
}

//access all the articleUser
module.exports.articlesUserGet = function(req, res) {
	Article.find().populate('postedBy').populate('belongTag').populate('comments.postedBy').sort('-created')
	.exec(function(err, articles) {
			if(err) res.send(err);
			res.json(articles);
		});
}

module.exports.articlesUserIdGet = function(req, res) {
	Article.findById(req.params.articleUserId,function(err,article) {
			if(err) res.send(err);
			res.json(article);
		}).populate('postedBy').populate('belongTag').populate('comments.postedBy');
}