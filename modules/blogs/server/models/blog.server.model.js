'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Blog Schema
 */
var BlogSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Blog title',
    trim: true
  },
  content: {
    type: String,
    default: '',
    required: 'Please fill Blog content',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  comments: [{ type: Schema.ObjectId, ref:'BlogComment' }]
});

mongoose.model('Blog', BlogSchema);
