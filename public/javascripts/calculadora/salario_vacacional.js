define(function (require) {
	var moment = require('moment');
	
	var calculadorAportes = require('calculadora/calculadorAportes');

	var BCP = calculadorAportes.obtenerValorBCP();

	function calcularSalarioVacacional(datos) {

		var sueldo = parseFloat(datos["sueldo"]["sueldo"]);
		var tieneHijos = parseFloat(datos["tiene_hijos"]["tiene-hijos"]);
		var tieneConyuge = parseFloat(datos["conyuge_cargo"]["conyuge"]);

		var calculoNormal = sueldo;
		var calculoMayor = 0;

		var totalLiquido = 0;

		if(sueldo > 59414) {
			calculoNormal = 59414;
			calculoMayor = sueldo - 59414;

			var descuentoFRL1 = calculadorAportes.calcularDescuentoFRL(calculoMayor);
			var descuentoSNIS1 = calculadorAportes.calcularDescuentoSNIS(calculoMayor, tieneConyuge, tieneHijos);
			console.log(calculoMayor + " APORTE ULTIMA FILA " + descuentoFRL1 + " " + descuentoSNIS1);
			totalLiquido = calculoMayor - descuentoFRL1 - descuentoSNIS1;
			console.log("TOTAL LIQUIDO > 59414 "  + totalLiquido);
		
		 	//Para 59414
			var descuentoAJ = calculadorAportes.calcularDescuentoAporteJubilatorio(calculoNormal);
			var descuentoFRL2 = calculadorAportes.calcularDescuentoFRL(calculoNormal);
			var descuentoSNIS2 = calculadorAportes.calcularDescuentoSNIS(calculoNormal, tieneConyuge, tieneHijos);
			var totalLiquido2 = calculoNormal - descuentoAJ - descuentoFRL2 - descuentoSNIS2;
			console.log("TOTAL LIQ2 " + totalLiquido2);
			totalLiquido += totalLiquido2;
		} else {
			var descuentoAJ = calculadorAportes.calcularDescuentoAporteJubilatorio(sueldo);
			var descuentoFRL2 = calculadorAportes.calcularDescuentoFRL(sueldo);
			var descuentoSNIS2 = calculadorAportes.calcularDescuentoSNIS(sueldo, tieneConyuge, tieneHijos);
			totalLiquido = sueldo - descuentoAJ - descuentoFRL2 - descuentoSNIS2;
			console.log(descuentoAJ + " " + descuentoFRL2 + " " + descuentoSNIS2);
		}

		var nowDate = moment();
		var startDate = moment(datos["fecha_de_ingreso"]["fecha-ingreso"]);

		var diasQueTrabaja 	= nowDate.diff(startDate, 'days', true);
		var añosQueTrabaja 	= nowDate.diff(startDate, 'years', true);
		var mesesQueTrabaja = nowDate.diff(startDate, 'months', true);

		var diasLicencia = 0;
		
		if(añosQueTrabaja < 1) {
			diasLicencia = 20/12 * mesesQueTrabaja;
		} else {

			diasLicencia = 20;
			añosQueTrabaja = añosQueTrabaja - 1;
			var diasExtra  = añosQueTrabaja / 4;
			if(diasExtra > 10) {
				diasExtra = 10;
			}
			diasLicencia = diasLicencia + diasExtra;
		}

		var salarioVac = totalLiquido/30 * diasLicencia;

		return { "Salario vacacional": [Math.round(salarioVac*100)/100, "total"], "Días de licencia": [Math.round(diasLicencia*10)/10]};
		/*return { "Licencia nominal": [Math.round(salarioVac*100)/100, "suma"], "Aporte jubilatorio": [Math.round(descuentoAJ*100)/100, "resta"],
		 "Descuento FRL": [Math.round(descuentoFRL*100)/100, "resta"], "Descuento SNIS ": [Math.round(descuentoSNIS*100)/100, "resta"], "Salario vacacional": 
		 [Math.round((salarioVac - descuentoAJ - descuentoSNIS - descuentoFRL)*100)/100, "total"], "Días de licencia": [Math.round(diasLicencia*10)/10] };
		*/
	}

    return calcularSalarioVacacional;
});