'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  BlogComment = mongoose.model('BlogComment'),
  Blog = mongoose.model('Blog'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Blog
 */
exports.add = function(req, res) {
  var comment = new BlogComment({
    name: req.body.uname,
    content: req.body.ucomment,
    status: req.body.status,
    blog_ref: req.body.blogid
  });

  comment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      Blog.findOne({ _id: req.body.blogid }).exec(function(err, blog) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          blog.comments.push(comment._id);
          blog.save(function (err) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              res.jsonp({ message: 'Successfully added the comment!' }); 
            }
          });
        }               
      });
    }
  });
};

exports.acomment = function(req, res) {
  BlogComment.findOne({ _id: req.body.commentid })
  .exec(function(err, comment){
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      comment.status = 'approved';
      comment.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.jsonp({ message: 'Successfully approved the comment!' }); 
        }
      });
    }
  });
};

exports.rcomment = function(req, res) {
  BlogComment.findOne({ _id: req.body.commentid })
  .exec(function(err, comment){
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      comment.status = 'rejected';
      comment.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.jsonp({ message: 'Successfully rejected the comment!' }); 
        }
      });
    }
  });
};