'use strict';


// Declare app level module which depends on filters, and services
angular.module('bazinga', [
  'ngRoute',
  'bazinga.filters',
  'bazinga.services',
  'bazinga.directives',
  'bazinga.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/magazine', {templateUrl: 'partials/magazine.html', controller: 'MagazineCtrl'});
  $routeProvider.when('/article', {templateUrl: 'partials/article.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/magazine'});
}]);
