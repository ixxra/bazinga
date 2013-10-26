'use strict';

/* Controllers */

angular.module('bazinga.controllers', []).
  controller('MagazineCtrl', function($scope, MagazineService) {
    MagazineService.get(function(data){
      $scope.magazineInfo = data;
    });
  })
  .controller('MyCtrl2', [function() {
  }]);