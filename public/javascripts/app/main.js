angular.module('app', ['ui.router','ngSanitize', '720kb.tooltips'])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.when('', '/');
	  //
	  // Now set up the states
	  	$stateProvider
	  	.state('main', {
	      	url: "/:id",
	      	templateUrl: "/javascripts/app/main.html",
	      	controller: "MainCtrl",
	      	resolve:{
	      		ocupation : function($http, $stateParams){
	      			if($stateParams.id){
	      				return $http.get('/ocupaciones/'+$stateParams.id);
	      			}
	      		}
	      	}
	    })
	    .state('calculations', {
	    	parent:'main',
	      	url: "/calculos",
	      	templateUrl: "/javascripts/app/calculations-menu/calculations-menu.html",
	      	controller: "CalculationsCtrl",
	    })
	    .state('calculate', {
	    	parent:'main',
	      	url: "/:calculationKey",
	      	templateUrl: "/javascripts/app/calculate-form/calculate-form.html",
	      	controller: "CalculateFormCtrl"
	    });
	}
);