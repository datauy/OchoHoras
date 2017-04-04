angular.module('app')
	.controller(
		"MainCtrl",
		[
			"$scope",
			"$state",
			'ocupation',
			'$rootScope',
			function($scope, $state, ocupation, $rootScope){
				$scope.ocupation = ocupation && ocupation.data[0];
				$rootScope.ocupation = $scope.ocupation;
				$scope.showMainDesc = $state.current.name == "main";
			}
		]
);