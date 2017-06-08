var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumPicSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	content: {
		type: String
	},
	albumImage: {
		type: String
	}
});

var AlbumBoxSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true
	},
	introduction: {
		type: String,
		default: '',
		trim: true
	},
	albumPage: {
		type: String,
		default: ''
	},
	albumpics: [AlbumPicSchema]
});

module.exports = mongoose.model('Album', AlbumBoxSchema);