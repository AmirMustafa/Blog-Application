(function () {
  'use strict';

  angular
    .module('blogs')
    .run(menuConfig);

    angular.module('blogs').config(['growlProvider',function(growlProvider) {
      growlProvider.globalPosition('bottom-right');
    }]);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Blogs',
      state: 'blogs',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'blogs', {
      title: 'Published Blogs',
      state: 'blogs.list',
      roles: ['*']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'blogs', {
      title: 'Create Blog',
      state: 'blogs.create',
      roles: ['user']
    });

     Menus.addSubMenuItem('topbar', 'blogs', {
      title: 'Blog Admin',
      state: 'adminview',
      roles: ['admin']
    });
  }
})();
