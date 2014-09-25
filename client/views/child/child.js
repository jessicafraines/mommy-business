(function(){
  'use strict';

  angular.module('mommy-business')
  .controller('ChildCtrl', ['$scope', '$routeParams', 'Child', 'Children', function($scope, $routeParams, Child, Children){

    $scope.child = {};
    $scope.children = [];
    $scope.milestone = {};
    $scope.growth = {};
    $scope.appt = {};

    $scope.toggleMilestone = function(){
      $scope.showMilestone = !!!$scope.showMilestone;
    };
    $scope.toggleGrowth = function(){
      $scope.showGrowth = !!!$scope.showGrowth;
    };
    $scope.toggleAppts = function(){
      $scope.showAppts = !!!$scope.showAppts;
    };

    $scope.addMilestone = function(){
      $scope.child.milestones.push($scope.milestone);
      Child.update($scope.child).then(function(response){
        $scope.milestone = {};
        $scope.toggleMilestone();
      });
    };

    $scope.addGrowth = function(){
      $scope.child.growth.push($scope.growth);
      Child.update($scope.child).then(function(response){
        $scope.growth = {};
        $scope.toggleGrowth();
      });
    };

    $scope.addAppt = function(){
      $scope.child.appts.push($scope.appt);
      Child.update($scope.child).then(function(response){
        $scope.appt = {};
        $scope.toggleAppts();
      });
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
