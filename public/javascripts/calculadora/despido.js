define(function (require) {
	var moment = require('moment');
	var calculadorAguinaldo = require('calculadora/aguinaldo');

	function calcularDespido(datos) {

		datos["fecha_de_renuncia"] = {};
		datos["fecha_de_renuncia"]["fecha-renuncia"] = datos["fecha_de_despido"]["fecha-despido"];
		
		var calculadorRenuncia = require('calculadora/renuncia');
		var pagoSinIndemnizacion = calculadorRenuncia(datos);

		var fechaIngreso = datos["fecha_de_ingreso"]["fecha-ingreso"];
		var fechaDespido = datos["fecha_de_despido"]["fecha-despido"];
		
		var momentDespido = moment(fechaDespido);
		
		//cálculo indemnización
		var añosSinCEil = momentDespido.diff(moment(fechaIngreso), 'years', true);
		var años = Math.ceil(añosSinCEil);
		console.log("AÑOS " + años + " SIN " + añosSinCEil);	
		if(años>6) {
			años = 6;
		}	
		var sueldo = parseFloat(datos["sueldo"]["sueldo"]);
		var indemnizacion = sueldo * años;
		console.log("INDEMNIZACION " + indemnizacion);

		pagoSinIndemnizacion["Indemnización por despido"] = [indemnizacion, "suma"];
		pagoSinIndemnizacion["Total líquido"] = [pagoSinIndemnizacion["Total líquido"][0] + indemnizacion, "total"];
		return  pagoSinIndemnizacion;
	}

    return calcularDespido;
});