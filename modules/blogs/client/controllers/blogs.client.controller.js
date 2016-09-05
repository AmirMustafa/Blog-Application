(function () {
  'use strict';

  // Blogs controller
  angular
    .module('blogs')
    .controller('BlogsController', BlogsController);

  BlogsController.$inject = ['$scope', '$state', 'Authentication', 'blogResolve', 'growl', '$location', '$http', '$filter', 'Socket'];

  function BlogsController ($scope, $state, Authentication, blog, growl, $location, $http, $filter, Socket) {
    var vm = this;
    vm.authentication = Authentication;
    

    vm.authentication = Authentication;
    vm.blog = blog;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.approve = approve;
    vm.reject = reject;
    vm.a_comment = a_comment;
    vm.r_comment = r_comment;
    vm.purl = $location.path;
    vm.addcomment = addcomment;

    if(!Socket.socket) {
      Socket.connect();
      console.log('Connect');
    }

    
    Socket.on('notifyadmin', function(message) {
      console.log();
      if(vm.authentication.user.roles && vm.authentication.user.roles.indexOf('admin') > -1) {
        growl.success(message.username + ' has created a New Blog !');
      }
    });

    Socket.on('updateadmin', function(message) {
      if(vm.authentication.user.roles && vm.authentication.user.roles.indexOf('admin') > -1) {
        growl.success(message.username + ' has updated a New Blog !');
      }
    });

     Socket.on('approveuser', function(message) {
      if(vm.authentication.user.roles && vm.authentication.user.roles.indexOf('user') > -1) {
        growl.success(message.username + ' , your blog is approved!');
      }
    });

      Socket.on('rejectuser', function(message) {
      if(vm.authentication.user.roles && vm.authentication.user.roles.indexOf('user') > -1) {
        growl.success(message.username + ' , your blog is rejected!');
      }
    });
    
    // Remove existing Blog
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.blog.$remove($state.go('blogs.list'));
      }
    }


    function a_comment(cid) {
      $http.post('/api/acomment', {
        commentid: cid
      }).then(successCallback, errorCallback);

      function errorCallback(res) {
        vm.error = res.data.message;
      }

      function successCallback(res) {
        var comment = $filter('filter')(vm.blog.comments, { _id:cid })[0];
        comment.status = 'approved';
      
        growl.info('Successfully approved the comment!');
      }
    }


    function r_comment(cid) {
      $http.post('/api/rcomment', {
        commentid: cid
      }).then(successCallback, errorCallback);

      function errorCallback(res) {
        vm.error = res.data.message;
      }

      function successCallback(res) {
        var comment = $filter('filter')(vm.blog.comments, { _id:cid })[0];
        comment.status = 'rejected';
        
        growl.info('Successfully rejected the comment!');
      }
    }



    // Save Blog
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.blogForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.blog._id) {
        vm.blog.status = 'updated';
        vm.blog.$update(successCallback, errorCallback);
        Socket.emit('updateblog', {});
      } else {
        vm.blog.status = 'new';
        vm.blog.$save(successCallback, errorCallback);
        Socket.emit('newblog', {});
      }

      function successCallback(res) {
        $state.go('blogs.view', {
          blogId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function addcomment(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.commentForm');
        return false;
      }
      $http.post('/api/addcomment', {
        status: 'new',
        uname: vm.comment.name,
        ucomment: vm.comment.ucomment,
        blogid: vm.blog._id
      }).then(successCallback, errorCallback);

      function successCallback(res) {
        vm.comment.name = '';
        vm.comment.ucomment = '';
        growl.success('Your blog has been submitted. Once approved, it will show up!');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

      function approve() {
        vm.blog.status = 'approved';
        vm.blog.$update(successCallback, errorCallback);

        function successCallback(res) {
          //$state.go('adminview');
            Socket.emit('approveblog', {});

          /*growl.success("Approved");*/
        }

        function errorCallback(res) {
          vm.error = res.data.message;
        }
      }

      function reject() {
        vm.blog.status = 'rejected';
        vm.blog.$update(successCallback, errorCallback);

        function successCallback(res) {
          Socket.emit('rejectblog', {});
          $state.go('adminview');
        }

        function errorCallback(res) {
          vm.error = res.data.message;
        }
      }



  }
})();
