'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Blog = mongoose.model('Blog'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, blog;

/**
 * Blog routes tests
 */
describe('Blog CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Blog
    user.save(function () {
      blog = {
        name: 'Blog name'
      };

      done();
    });
  });

  it('should be able to save a Blog if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Blog
        agent.post('/api/blogs')
          .send(blog)
          .expect(200)
          .end(function (blogSaveErr, blogSaveRes) {
            // Handle Blog save error
            if (blogSaveErr) {
              return done(blogSaveErr);
            }

            // Get a list of Blogs
            agent.get('/api/blogs')
              .end(function (blogsGetErr, blogsGetRes) {
                // Handle Blog save error
                if (blogsGetErr) {
                  return done(blogsGetErr);
                }

                // Get Blogs list
                var blogs = blogsGetRes.body;

                // Set assertions
                (blogs[0].user._id).should.equal(userId);
                (blogs[0].name).should.match('Blog name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Blog if not logged in', function (done) {
    agent.post('/api/blogs')
      .send(blog)
      .expect(403)
      .end(function (blogSaveErr, blogSaveRes) {
        // Call the assertion callback
        done(blogSaveErr);
      });
  });

  it('should not be able to save an Blog if no name is provided', function (done) {
    // Invalidate name field
    blog.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Blog
        agent.post('/api/blogs')
          .send(blog)
          .expect(400)
          .end(function (blogSaveErr, blogSaveRes) {
            // Set message assertion
            (blogSaveRes.body.message).should.match('Please fill Blog name');

            // Handle Blog save error
            done(blogSaveErr);
          });
      });
  });

  it('should be able to update an Blog if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Blog
        agent.post('/api/blogs')
          .send(blog)
          .expect(200)
          .end(function (blogSaveErr, blogSaveRes) {
            // Handle Blog save error
            if (blogSaveErr) {
              return done(blogSaveErr);
            }

            // Update Blog name
            blog.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Blog
            agent.put('/api/blogs/' + blogSaveRes.body._id)
              .send(blog)
              .expect(200)
              .end(function (blogUpdateErr, blogUpdateRes) {
                // Handle Blog update error
                if (blogUpdateErr) {
                  return done(blogUpdateErr);
                }

                // Set assertions
                (blogUpdateRes.body._id).should.equal(blogSaveRes.body._id);
                (blogUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Blogs if not signed in', function (done) {
    // Create new Blog model instance
    var blogObj = new Blog(blog);

    // Save the blog
    blogObj.save(function () {
      // Request Blogs
      request(app).get('/api/blogs')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Blog if not signed in', function (done) {
    // Create new Blog model instance
    var blogObj = new Blog(blog);

    // Save the Blog
    blogObj.save(function () {
      request(app).get('/api/blogs/' + blogObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', blog.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Blog with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/blogs/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Blog is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Blog which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Blog
    request(app).get('/api/blogs/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Blog with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Blog if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Blog
        agent.post('/api/blogs')
          .send(blog)
          .expect(200)
          .end(function (blogSaveErr, blogSaveRes) {
            // Handle Blog save error
            if (blogSaveErr) {
              return done(blogSaveErr);
            }

            // Delete an existing Blog
            agent.delete('/api/blogs/' + blogSaveRes.body._id)
              .send(blog)
              .expect(200)
              .end(function (blogDeleteErr, blogDeleteRes) {
                // Handle blog error error
                if (blogDeleteErr) {
                  return done(blogDeleteErr);
                }

                // Set assertions
                (blogDeleteRes.body._id).should.equal(blogSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Blog if not signed in', function (done) {
    // Set Blog user
    blog.user = user;

    // Create new Blog model instance
    var blogObj = new Blog(blog);

    // Save the Blog
    blogObj.save(function () {
      // Try deleting Blog
      request(app).delete('/api/blogs/' + blogObj._id)
        .expect(403)
        .end(function (blogDeleteErr, blogDeleteRes) {
          // Set message assertion
          (blogDeleteRes.body.message).should.match('User is not authorized');

          // Handle Blog error error
          done(blogDeleteErr);
        });

    });
  });

  it('should be able to get a single Blog that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Blog
          agent.post('/api/blogs')
            .send(blog)
            .expect(200)
            .end(function (blogSaveErr, blogSaveRes) {
              // Handle Blog save error
              if (blogSaveErr) {
                return done(blogSaveErr);
              }

              // Set assertions on new Blog
              (blogSaveRes.body.name).should.equal(blog.name);
              should.exist(blogSaveRes.body.user);
              should.equal(blogSaveRes.body.user._id, orphanId);

              // force the Blog to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Blog
                    agent.get('/api/blogs/' + blogSaveRes.body._id)
                      .expect(200)
                      .end(function (blogInfoErr, blogInfoRes) {
                        // Handle Blog error
                        if (blogInfoErr) {
                          return done(blogInfoErr);
                        }

                        // Set assertions
                        (blogInfoRes.body._id).should.equal(blogSaveRes.body._id);
                        (blogInfoRes.body.name).should.equal(blog.name);
                        should.equal(blogInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Blog.remove().exec(done);
    });
  });
});
