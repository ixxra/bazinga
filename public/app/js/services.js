'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('bazinga.services', []).factory('MagazineService', function ($http) {
    return {
        get: function (callback) {
                return $http.get('/api/v1/magazine').success(function (data) {
                    return callback(data);
                });   
            }
        }
    });