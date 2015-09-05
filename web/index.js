angular.module('tire.compare', ['ngResource', 'tire.tires'])
  .controller('TireController', function($scope, tires) {
    $scope.tires = tires
    $scope.range = new Array(4)
    $scope.searchParams = {
      ratings: [
        {'class': 'street', 'minStars': 0},
        {'class': 'heavy rock', 'minStars': 0},
        {'class': 'sand', 'minStars': 0},
        {'class': 'snow', 'minStars': 0},
        {'class': 'mud', 'minStars': 0},
        {'class': 'ice', 'minStars': 0}
      ]
    }


    $scope.tireFilter = function(tire) {
      if (tire === undefined) return;

      return tire.ratings[0].stars >= $scope.searchParams.ratings[0].minStars &&
        tire.ratings[1].stars >= $scope.searchParams.ratings[1].minStars &&
        tire.ratings[2].stars >= $scope.searchParams.ratings[2].minStars &&
        tire.ratings[3].stars >= $scope.searchParams.ratings[3].minStars &&
        tire.ratings[4].stars >= $scope.searchParams.ratings[4].minStars &&
        tire.ratings[5].stars >= $scope.searchParams.ratings[5].minStars;
    }
  })
