angular.module('app')
	.controller(
		"CalculationsCtrl",
		[
			"$scope",
			"$timeout",
			"$http",
			'$stateParams',
			'ocupation',
			'SideNavService',
			'$rootScope',
			function($scope, $timeout, $http, $stateParams, ocupation, SideNavService, $rootScope){
				$scope.ocupationId = $stateParams.id;
				$scope.seeMore = false;
				$scope.calculations = {
					'salario-líquido' : 'Salario líquido',
					'aguinaldo' :'Aguinaldo',
					'salario-vacacional' : 'Salario vacacional',
					'despido' : 'Despido',
					'renuncia' : 'Renuncia',
			    	'devolución-IRPF' : 'Devolución anual IRPF',
					'seguro-de-paro' : 'Seguro de paro',
			    	'licencia-maternal-paternal': 'Licencia por maternidad y paternidad',
			    	'licencias-especiales': 'Licencias especiales'
				};

				$timeout(function(){
					SideNavService.closeNav();
				},0);

				$http.get('/ocupaciones/'+$rootScope.ocupation.CIUO+'/estadisticas?years[]=2015')
					.then(function(response){
						$scope.stats = response.data[0];
					});

				$http.get('/ocupaciones/'+$rootScope.ocupation.CIUO+'/consejo-salarios')
					.then(function(response){
						$scope.consejoSalario = response.data;
					});

				var change = true;
				$scope.color = [];
				var idx = 0;
				_.forEach($scope.calculations, function(val, key){
					if(idx % 4 === 0){
						change = !change;
					}
					if(idx % 2 === 0){
						if(change){
							$scope.color[key] = true;
							
						}else{
							$scope.color[key] = false;
						}
					}else{
						if(change){
							$scope.color[key] = false;
							
						}else{
							$scope.color[key] = true;
						}
					}
					idx ++;
					
				});
			}
		]
);