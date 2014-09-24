(function(){
  'use strict';

  angular.module('mommy-business')
  .factory('Child', ['$http', function($http){

    function findById(childId){
      return $http.get('/child/' + childId);
    }

    function update(child){
      console.log('CHILD', child);
      return $http.post('/child/' + child._id, child);
    }


    return {update:update, findById:findById};
  }]);
})();

