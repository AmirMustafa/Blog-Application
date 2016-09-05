(function () {
  'use strict';

  angular
    .module('blogs')
    .filter('shorten', shorten);

  shorten.$inject = [/*Example: '$state', '$window' */];

  function shorten(/*Example: $state, $window */) {
    return function (input) {
      // Shorten directive logic
      // ...

      //return 'shorten filter: ' + input;

      return input.substring(0, 200) + '...';

    };
  }
})();
