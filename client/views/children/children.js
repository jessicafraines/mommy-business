(function(){
  'use strict';

  angular.module('mommy-business')
  .controller('ChildrenCtrl', ['$scope', 'Children', function($scope, Children){
    $scope.child = {};
    $scope.children = [];

    Children.findChildren().then(function(response){
      $scope.children = response.data.children;
    });

    $scope.toggleAdd = function(){
      $scope.showChild = !!!$scope.showChild;
    };

    $scope.add = function(){
      Children.create($scope.child).then(function(response){
        $scope.children.push(response.data.child);
        $scope.child = {};
        $scope.toggleAdd();
      });
    };

  }]);
})();
