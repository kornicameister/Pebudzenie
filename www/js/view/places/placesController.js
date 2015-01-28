define(
	[
	'config/app',
	'mock/mockProvider'
	],
	function placesController(app, mockProvider){
		app.controller('PlacesController',  function($scope, $log){
			$scope.title = 'Miejsca';
			$log.debug("Places Controller");

			//MOCK
			var loadData = function(){
				$log.debug("Loading data");
				$log.debug(mockProvider);
				$scope.places = mockProvider.places;
			}
			loadData();
		});
	});