(function () {
  'use strict';

  angular
    .module('blogs')
    .controller('BlogsListController', BlogsListController);

  BlogsListController.$inject = ['BlogsService', 'Socket', 'growl', 'Authentication'];

  function BlogsListController(BlogsService, Socket, growl, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.blogs = BlogsService.query();
   

    if(!Socket.socket) {
    	Socket.connect();
    	console.log('Connect');
    }

    Socket.on('notifyadmin', function(message) {
    	console.log("BlogsListController");
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

   }
})();
