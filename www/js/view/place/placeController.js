define(
	[
	'config/app',
	'mock/mockProvider'
	],
	function placeController(app, mockProvider){
		app.controller('PlaceController',  function($scope, $log, $stateParams, $ionicSlideBoxDelegate){
			$scope.title = 'Miejsce';
			$log.debug("Place Controller with id: " + $stateParams.id);

			//MOCK
			var loadData = function(){
				$log.debug("Loading data place");
				$scope.places = mockProvider.places;
				$scope.place =_.find($scope.places,
					function(plc){
						return plc.id == $stateParams.id;
					});
				$log.debug($scope.place.name);
			};

			$scope.showDetails = function(id){
				$log.debug(id);
			};

			 $scope.nextSlide = function() {
			    $ionicSlideBoxDelegate.next();
			  };

			
			loadData();
		});
	});