/*Calcula valores se salarios*/
define(function (require) {
    
    var solicitador 				= require('./solicitarCalculo');
    var calculadora 				= require('./calculadora');
    var dibujador 					= require('./dibujador');
    var datosRequeridos 			= require('./datosRequeridos');
    var rubros 						= require('rubros/dibujador');

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
    return true;
});