angular.module('app')
    .directive(
    	'sideNav', 
    	[
    	'$timeout',
        '$location',
    	'SideNavService',
        '$stateParams',
    	function($timeout, $location, SideNavService, $stateParams) {
	        return {
	            restrict: 'E',
	            templateUrl: '/javascripts/app/side-nav/side-nav.html',
                priority: 1,
                link: function($scope, element, attr){
                    $scope.open = false;
                    $scope.calculations = {
                        'salario-líquido' : 'Salario líquido',
                        'aguinaldo' :'Aguinaldo',
                        'salario-vacacional' : 'Salario vacacional',
                        'despido' : 'Despido',
                        'renuncia' : 'Renuncia',
                        'devolución-IRPF' : 'Devolución anual IRPF',
                        'seguro-de-paro' : 'Seguro de paro',
                        'licencia-maternal-paternal': {
                            'name': 'Licencia por paternidad y maternidad',
                            'expanded': false,
                            'children' : {
                                'licencia-paternal' : 'Licencia por paternidad',
                                'licencia-maternal' : 'Licencia maternal',
                                'leyes-relacionadas' : 'Leyes relacionadas'
                            }
                        },
                        'licencias-especiales': {
                            'name': 'Licencias especiales',
                            'expanded': false,
                            'children' : {
                                'licencia-estudio' : 'Licencia por estudio',
                                'licencia-adopción' : 'Licencia por adopción',
                                'licencia-matrimonio' : 'Licencia por matrimonio',
                                'licencia-duelo' : 'Licencia por duelo'
                            }
                        }
                    };

                    $scope.ocupationId = $stateParams.id;
                    $scope.calculationKey = $stateParams.calculationKey;

                    SideNavService.onClose(function(){
                        $scope.open = false;
                    });

                    SideNavService.onOpen(function(){
                        $scope.open = true;
                    });

                    SideNavService.onSelect(function(selcect){
                        if(selcect != 'licencia-maternal-paternal') {
                            $scope.calculationKey = selcect;
                        }
                        
                        var navElement = angular.element(document.getElementsByClassName("navbar-collapse"))[0];
                        if ($(navElement).hasClass('in') && selcect != 'licencias-especiales' && selcect != 'licencia-maternal-paternal') {
                            angular.element(document.getElementsByClassName("navbar-toggle"))[0].click();
                        }
                    });


                    $scope.goTo = function(ocupation, calculation){
                        if(calculation && calculation.children) {
                            calculation.expanded = !calculation.expanded;
                            // Si estaba expandido no seguir
                            if(!calculation.expanded) {
                                return;
                            }
                        }
                        if(ocupation != 'licencia-maternal-paternal') {
                            $location.path($scope.ocupationId+'/'+ocupation);
                            $scope.calculationKey = ocupation;
                        }
                    }

                    $scope.goHome = function(){
                        $location.path($scope.ocupationId+'/calculos');
                    }

                }
            }
        }
        ]
    );            
