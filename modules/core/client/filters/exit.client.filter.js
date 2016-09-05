(function () {
  'use strict';

  angular
    .module('core')
    .filter('exit', exit);

  exit.$inject = [/*Example: '$state', '$window' */];

  function exit(/*Example: $state, $window */) {
    return function (input) {
      // Exit directive logic
      // ...

      return 'exit filter: ' + input;
    };
  }
})();
