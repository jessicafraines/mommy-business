(function(){
  'use strict';

  angular.module('mommy-business')
  .controller('ChildCtrl', ['$scope', '$routeParams', 'Child', 'Children', function($scope, $routeParams, Child, Children){
    $scope.toggleChild = function(){
      $scope.showChild = !!!$scope.showChild;
    };

    $scope.updateChild = function(){
      Child.update($scope.child).then(function(response){
        $scope.toggleChild();
      });
    };

    Child.findById($routeParams.childId).then(function(response){
      $scope.child = response.data.child;
    });

  }]);
})();
