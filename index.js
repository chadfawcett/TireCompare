angular.module('tire.compare', ['ngResource'])
  .factory('TireResource', function($resource) {
    var TireResource = $resource('http://localhost:3000/tires')

    return TireResource
  })
  .controller('TireController', function($scope, TireResource) {
    $scope.tires = TireResource.query()
  })
