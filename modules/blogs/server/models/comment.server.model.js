'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var BlogCommentSchema = new Schema({
  // Comment model fields
  // ...
  name: {
    type: String,
    default: '',
    required: 'Please enter your Name',
    trim: true
  },
  content: {
    type: String,
    default: '',
    required: 'Please update your comment',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String
  },
  blog_ref: {
    type: Schema.ObjectId,
    ref: 'Blog'
  }
});

mongoose.model('BlogComment', BlogCommentSchema);
