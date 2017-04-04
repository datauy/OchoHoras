define(function (require) {
	var moment = require('moment');
	var calculadorAguinaldo = require('aguinaldo');

	function calcularDespido(datos) {

		datos["fecha_de_renuncia"] = {};
		datos["fecha_de_renuncia"]["fecha-renuncia"] = datos["fecha_de_despido"]["fecha-despido"];
		
		var calculadorAportes = require('calculadorAportes');

		var calculadorRenuncia = require('renuncia');
		var pagoSinIndemnizacion = calculadorRenuncia(datos);

		var fechaIngreso = datos["fecha_de_ingreso"]["fecha-ingreso"];
		var fechaDespido = datos["fecha_de_despido"]["fecha-despido"];
		
		var momentDespido = moment(fechaDespido);
		var momentIngreso = moment(fechaIngreso);
		
		//cálculo indemnización
		/*var añosSinCEil = momentDespido.diff(moment(fechaIngreso), 'years', true);
		var años = Math.ceil(añosSinCEil);	*/

		momentDespido.dayOfYear(366);
		momentIngreso.dayOfYear(1);

		var añosSinCEil = momentDespido.diff(moment(fechaIngreso), 'years', true);
		var años = Math.ceil(añosSinCEil);

		if(años>6) {
			años = 6;
		}	
		
		var sueldo = parseFloat(datos["sueldo_nominal"]["sueldo-nominal"]);
		var aguinaldoMensual = sueldo/12;
		var licenciaMensual = sueldo/30*1.666;
		var salarioVacMensual = parseFloat(datos["sueldo_liquido"]["sueldo-liquido"])/30*1.666;
		var otrosIngresos = parseFloat(datos["otros_ingresos_despido"]["otros-ingresos-despido"]);

		var ingresosMensualesTotales = sueldo + aguinaldoMensual + licenciaMensual + salarioVacMensual + otrosIngresos;
		var indemnizacion = ingresosMensualesTotales * años;
		
		pagoSinIndemnizacion["Indemnización por despido"] = [indemnizacion, "suma"];
		pagoSinIndemnizacion["Total líquido"] = [pagoSinIndemnizacion["Total líquido"][0] + indemnizacion, "total"];
		return  pagoSinIndemnizacion;
	}

    return calcularDespido;
});