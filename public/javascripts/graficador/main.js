/*Construye los rubros en la barra izquierda de la pantlla*/
define(function (require) {
    
    var chart           = require('chart');
    var datos 			= require('./obtenedorDeDatos');
    var $               = require('jquery');

    var api = {
        graficarInfoSalarios : function(ocupacion){
            console.log(ocupacion)
            console.log()
            $('#container').highcharts({
                   chart: {
                       type: 'scatter',
                       zoomType: 'xy',
                       height: 900
                   },
                   title: {
                       text: 'En comparacion con otros años'
                   },
                   xAxis: {
                       title: {
                           enabled: true,
                           text: 'Año'
                       },
                       startOnTick: true,
                       endOnTick: true,
                       showLastLabel: true
                   },
                   yAxis: {
                       title: {
                           text: 'Pesos uruguayos (UYU)'
                       }
                   },
                   legend: {
                       layout: 'vertical',
                       align: 'left',
                       verticalAlign: 'top',
                       x: 100,
                       y: 70,
                       floating: true,
                       backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                       borderWidth: 1
                   },
                   plotOptions: {
                       scatter: {
                           marker: {
                               radius: 15,
                               states: {
                                   hover: {
                                       enabled: true,
                                       lineColor: 'rgb(100,100,100)'
                                   }
                               }
                           },
                           states: {
                               hover: {
                                   marker: {
                                       enabled: false
                                   }
                               }
                           },
                           tooltip: {
                               headerFormat: '<b>{series.name}</b><br>',
                               pointFormat: '{point.y} UYU'
                           }
                       }
                   },
                   series: [{
                       name: 'Salario liquido',
                       color: 'rgba(223, 83, 83, .5)',
                       data: (function(){
                            var salarios = [];
                            ocupacion.salarios.forEach(function(salarioYear){
                                salarioYear.forEach(function(salario){
                                    salarios.push([salario.YEAR, salario.SALARIO]);
                                });
                            });
                            return salarios;
                       })()
                   }]
               });
            setTimeout(function(){
                $('#container').highcharts().reflow();
            },0)
            $('#rubro-data').show();
            $('#main').hide();
        }
    };

    return api;
});