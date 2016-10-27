/*Construye los rubros en la barra izquierda de la pantlla*/
define(function (require) {
    
    var dibujador 			= require('./dibujador');
    var obtenerdorDeDatos   = require('./obtenedorDeDatos');
    var graficador          = require('graficador/main');
    var $                   = require('jquery');

    require('typeahead');
    dibujador.alSolicitarUnSubRubro(function(subRubro){
        graficador.graficarInfoSalarios(subRubro);
    });


    return true;
});