(function () {
  'use strict';

  angular
    .module('blogs')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('adminview', {
        url: '/adminview',
        templateUrl: 'modules/blogs/client/views/adminview.client.view.html',
        controller: 'AdminctrlController',
        controllerAs: 'vm'
      })
      .state('blogs', {
        abstract: true,
        url: '/blogs',
        template: '<ui-view/>'
      })
      .state('blogs.list', {
        url: '',
        templateUrl: 'modules/blogs/client/views/list-blogs.client.view.html',
        controller: 'BlogsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Blogs List'
        }
      })
      .state('blogs.create', {
        url: '/create',
        templateUrl: 'modules/blogs/client/views/form-blog.client.view.html',
        controller: 'BlogsController',
        controllerAs: 'vm',
        resolve: {
          blogResolve: newBlog
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Blogs Create'
        }
      })
      .state('blogs.edit', {
        url: '/:blogId/edit',
        templateUrl: 'modules/blogs/client/views/form-blog.client.view.html',
        controller: 'BlogsController',
        controllerAs: 'vm',
        resolve: {
          blogResolve: getBlog
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Blog {{ blogResolve.name }}'
        }
      })
      .state('blogs.view', {
        url: '/:blogId',
        templateUrl: 'modules/blogs/client/views/view-blog.client.view.html',
        controller: 'BlogsController',
        controllerAs: 'vm',
        resolve: {
          blogResolve: getBlog
        },
        data:{
          pageTitle: 'Blog {{ articleResolve.name }}'
        }
      });
  }

  getBlog.$inject = ['$stateParams', 'BlogsService'];

  function getBlog($stateParams, BlogsService) {
    return BlogsService.get({
      blogId: $stateParams.blogId
    }).$promise;
  }

  newBlog.$inject = ['BlogsService'];

  function newBlog(BlogsService) {
    return new BlogsService();
  }
})();
