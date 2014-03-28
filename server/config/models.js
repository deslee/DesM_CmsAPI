var config = require('./')
var mongoose = require('mongoose');
var markdown = require('markdown').markdown
mongoose.connect(config.mongo_url);

var Model = function(name, fields, processors) {
	this.fields = fields;
	this.odm = mongoose.model(name, fields);
	this.processors = processors ? processors : {};
}

////
//  Trims a object's fields, so that its only fields 
//  are the ones specified in the model.
////
Model.prototype.trim = function(data) {
    var m = {}, fields = this.fields
    Object.keys(fields).forEach(function(key) {
    	if (data[key] !== undefined) {
			m[key] = data[key];
		}
    });
    return m;
}
Model.prototype.out = function(data, req) {
	var model = this.trim(data);
	var process = this.processors.out;
	return process ? process(req, model) : model;
}
Model.prototype.in = function(data, req) {
	var model = this.trim(data);
	var process = this.processors.in;
	return process ? process(req, model) : model;
}

module.exports.Entry = new Model('Entry', {
	slug: String,
	text: String,
	title: String,
	date: Date,
	isPost: Boolean,
}, 
{
	////
	// outgoing model
	// if html is requested, convert to html first.
	////
	out: function(req, entry) {
		if (req.query.html && entry.text) {
			entry.text = markdown.toHTML(entry.text);
		}
		if (entry.date) {
			entry.sort_order = entry.date.getTime();
		}
		return entry;
	},
});