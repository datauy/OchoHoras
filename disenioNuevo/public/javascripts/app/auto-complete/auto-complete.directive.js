angular.module('app')
    .directive(
    	'autoComplete', 
    	[
    	'$timeout',
    	'$http',
    	'$state',
    	'$stateParams',
    	function($timeout, $http, $state, $stateParams) {
	        return {
	            restrict: 'E',
	            scope:{
	            	text : '='
	            },
	            templateUrl: '/javascripts/app/auto-complete/auto-complete.html',
	            link : function($scope, element, attr){
	            	var promise;
	            	$scope.selected;
	            	$scope.searchText = "";
	            	$scope.occupation = null;
	            	console.log("asdas")

	            	if($state.current.name !== 'main'){
	            		$scope.defined = true;
	            		$scope.finished = true;
	            		$scope.selected = true;
	            		console.log($scope.text)
	            		$scope.searchText = $scope.text;
	            	}
	            	$scope.$watch('searchText', function(text){
	            		$timeout.cancel(promise);

	            		if(!text || text.length < 5 || $scope.selected){
	            			$scope.selected = false;
	            			$scope.options = [];
	            			return;
	            		};

	            	
	            		promise = $timeout(function() {
	            			getData(text).then(function(response){
	            				$scope.options = response.data;
	            			})
	            		}, 300);
	            	});

	            	$scope.selectOcupation = function(occupation){
	            		$scope.occupation = occupation;
	            		$scope.searchText = occupation.DESCRIPCION;
	            		$scope.selected = true;
	            	};

	            	$scope.goToOptions = function(){
	            		$scope.defined = true;

	            		$state.go('calculations', {id : $scope.occupation.ID});

	            		$timeout(function(){
	            			$scope.finished = true;
	            		},1000);
	            	};

	            	$scope.$on('ocupationDefined', function(ocupation){
						console.log(ocupation)
					});

	            	function getData(text){
	            		return $http.get('/ocupaciones?descripcion='+text);
	            	}
	            }
	        };
    	}
	]
);