(function () {
  'use strict';

  angular
    .module('blogs')
    .directive('postedBy', postedBy);

  postedBy.$inject = [/*Example: '$state', '$window' */];

  function postedBy(/*Example: $state, $window */) {
    return {
      templateUrl: 'modules/blogs/client/directives/posted-by.html',
      restrict: 'E',

    };
  }
})();
