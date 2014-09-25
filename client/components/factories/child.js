(function(){
  'use strict';

  angular.module('mommy-business')
  .factory('Child', ['$http', function($http){

    function findById(childId){
      return $http.get('/child/' + childId);
    }

    function create(child){
      return $http.post('/children', child);
    }
    function update(child){
      console.log('CHILD', child);
      return $http.post('/child/update', child);
    }

    return {update:update, findById:findById, create:create};
  }]);
})();

