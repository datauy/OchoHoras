var calculoKey;

angular.module('app')
	.controller(
		"CalculateFormCtrl",
		[
			"$scope",
			"$stateParams",
			"$timeout",
			"SideNavService",
			'$http',
			function($scope, $stateParams, $timeout, SideNavService, $http){
				calculoKey = $stateParams.calculationKey;
				var calculosMap = {
					'salario-líquido' : 'Salario líquido',
			    	'devolución-IRPF' : 'Devolución anual IRPF',
					'aguinaldo' :'Aguinaldo',
					'salario-vacacional' : 'Salario vacacional',
					'renuncia' : 'Renuncia',
					'despido' : 'Despido',
					'horas-extra' : 'Horas extra',
					'seguro-de-paro' : 'Seguro de paro',
			    	'descanso-semanal' : 'Descanso semanal',
					'licencia-paternal' : 'Licencia por paternidad',
					'licencia-estudio' : 'Licencia por estudio',
					'licencia-adopción' : 'Licencia por adopción',
					'licencia-matrimonio' : 'Licencia por matrimonio',
					'licencia-duelo' : 'Licencia por duelo',
					'licencia-maternal' : 'Licencia maternal',
			    	'leyes-relacionadas' : 'Leyes relacionadas',
			    	'licencias-especiales': 'Licencias especiales'
				};

				$scope.calcName = calculosMap[calculoKey];
				$timeout(function(){
					SideNavService.select(calculoKey);
					SideNavService.openNav();
				},10);

				$http.get('/javascripts/app/calculate-form/old/descripciones/'+calculoKey+'.html')
					.then(function(response){
						$scope.descriptionHtml = response.data;
					});

				/*
				* WARNING: MAGIA NEGRA
				**/
				
				/*
				var solicitador 				= require('/javascrips/app/calculate-form/solicitarCalculo');
				var calculadora 				= require('./calculadora');
				var dibujador 					= require('./dibujador');
				var datosRequeridos 			= require('./datosRequeridos');
				var rubros 						= require('rubros/dibujador');*/
				requirejs.config({
				    //By default load any module IDs from js/lib
				    baseUrl: '/javascripts/app/calculate-form/old/calculadora',
				    //except, if the module ID starts with "app",
				    //load it from the js/app directory. paths
				    //config is relative to the baseUrl, and
				    //never includes a ".js" extension since
				    //the paths config could be for a directory.
				    paths: {
				        app: '../app'
				    }
				});

				require(
					[
						'/javascripts/app/calculate-form/old/calculadora/solicitarCalculo.js',
						'/javascripts/app/calculate-form/old/calculadora/calculadora.js',
						'/javascripts/app/calculate-form/old/calculadora/dibujador.js',
						'/javascripts/app/calculate-form/old/calculadora/datosRequeridos.js',
						'/javascripts/app/calculate-form/old/calculadora/dibujador.js'

					], function (solicitador, calculadora, dibujador, datosRequeridos, dibujador) {
				   	

				    if(typeof calculoKey !== 'undefined'){
				    	dibujador.dibujarDatosRequeridos(datosRequeridos[calculoKey], calculoKey);
				    }

				    solicitador.alSolicitarUnCalculo(function(concepto){
				        dibujador.dibujarDatosRequeridos(datosRequeridos[concepto], concepto);
				    });

				    solicitador.alCalcular(function(datos, concepto){
				        var resultado = calculadora.calcular(datos, concepto);
				        dibujador.dibujarResultado(resultado, concepto);
				    });
				});

			}
		]
);

angular.module('app')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);