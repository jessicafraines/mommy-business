(function(){
  'use strict';

  angular.module('mommy-business')
  .factory('Children', ['$http', function($http){

    function create(child){
      console.log('CHILD', child);
      return $http.post('/children', child);
    }

    function findChildren(){
      return $http.get('/children');
    }
    return {create:create, findChildren:findChildren};
  }]);
})();

