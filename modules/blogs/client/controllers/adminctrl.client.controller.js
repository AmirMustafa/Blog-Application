(function() {
  'use strict';

  angular
    .module('blogs')
    .controller('AdminctrlController', AdminctrlController);

  AdminctrlController.$inject = ['$scope', 'BlogsService', 'Menus', 'Authentication', 'Socket', 'growl'];

  function AdminctrlController($scope, BlogsService, Menus, Authentication, Socket, growl) {
    var vm = this;

    // Adminctrl controller logic
    // ...

    vm.authentication = Authentication;
    vm.blogs = BlogsService.query();
    
    if(!Socket.socket) {
      Socket.connect();
      console.log('Connect');
    }

    Socket.on('notifyadmin', function(message) {
      if(vm.authentication.user.roles && vm.authentication.user.roles.indexOf('admin') > -1) {
        growl.success(message.username + ' has created a New Blog !');
      }
    });

    Socket.on('updateadmin', function(message) {
      if(vm.authentication.user.roles && vm.authentication.user.roles.indexOf('admin') > -1) {
        growl.success(message.username + ' has updated a New Blog !');
      }
    });

  }
})();
