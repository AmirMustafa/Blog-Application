//Blogs service used to communicate Blogs REST endpoints
(function () {
  'use strict';

  angular
    .module('blogs')
    .factory('BlogsService', BlogsService);

  BlogsService.$inject = ['$resource'];

  function BlogsService($resource) {
    return $resource('api/blogs/:blogId', {
      blogId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
