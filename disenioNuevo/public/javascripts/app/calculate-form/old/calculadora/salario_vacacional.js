define(function (require) {
	var moment = require('moment');
	
	var calculadorAportes = require('calculadorAportes');

	var BCP = calculadorAportes.obtenerValorBCP();

	var topeAporteJubilatorio = calculadorAportes.obtenerTopeAFAP();

	function calcularSalarioVacacional(datos) {

		var sueldo = parseFloat(datos["sueldo"]["sueldo"]);
		var tieneHijos = parseFloat(datos["tiene_hijos"]["tiene-hijos"]);
		var tieneConyuge = parseFloat(datos["conyuge_cargo"]["conyuge"]);

		var calculoNormal = sueldo;
		var calculoMayor = 0;

		var totalLiquido = 0;

		var descuentoAJTotal = 0;
		var descuentoFRLTotal = 0;
		var descuentoSNISTotal  = 0;

		if(sueldo > topeAporteJubilatorio) {
			calculoNormal = topeAporteJubilatorio;
			calculoMayor = sueldo - topeAporteJubilatorio;

			var descuentoFRL1 = calculadorAportes.calcularDescuentoFRL(calculoMayor);
			var descuentoSNIS1 = calculadorAportes.calcularDescuentoSNIS(calculoMayor, tieneConyuge, tieneHijos);
			console.log(calculoMayor + " APORTE ULTIMA FILA " + descuentoFRL1 + " " + descuentoSNIS1);
			totalLiquido = calculoMayor - descuentoFRL1 - descuentoSNIS1;
			console.log("TOTAL LIQUIDO > tope aporte jubilatorio "  + totalLiquido);
		
			var descuentoAJ = calculadorAportes.calcularDescuentoAporteJubilatorio(calculoNormal);
			var descuentoFRL2 = calculadorAportes.calcularDescuentoFRL(calculoNormal);
			var descuentoSNIS2 = calculadorAportes.calcularDescuentoSNIS(calculoNormal, tieneConyuge, tieneHijos);
			var totalLiquido2 = calculoNormal - descuentoAJ - descuentoFRL2 - descuentoSNIS2;
			console.log("TOTAL LIQ2 " + totalLiquido2);
			totalLiquido += totalLiquido2;
			descuentoAJTotal = descuentoAJ;
			descuentoFRLTotal = descuentoFRL1 + descuentoFRL2;
			descuentoSNISTotal = descuentoSNIS1 + descuentoSNIS2;
		} else {
			var descuentoAJ = calculadorAportes.calcularDescuentoAporteJubilatorio(sueldo);
			var descuentoFRL2 = calculadorAportes.calcularDescuentoFRL(sueldo);
			var descuentoSNIS2 = calculadorAportes.calcularDescuentoSNIS(sueldo, tieneConyuge, tieneHijos);
			totalLiquido = sueldo - descuentoAJ - descuentoFRL2 - descuentoSNIS2;
			console.log(descuentoAJ + " " + descuentoFRL2 + " " + descuentoSNIS2);
			descuentoAJTotal = descuentoAJ;
			descuentoFRLTotal = descuentoFRL2;
			descuentoSNISTotal = descuentoSNIS2;
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
		var licenciaNominal = sueldo/30 * diasLicencia;

		//return { "Salario vacacional": [Math.round(salarioVac*100)/100, "total"], "Días de licencia": [Math.round(diasLicencia*10)/10]};
		return { "Licencia nominal": [Math.round(licenciaNominal*100)/100, "suma"], "Aporte jubilatorio": [Math.round(descuentoAJTotal*100)/100, "resta"],
		 "Descuento FRL": [Math.round(descuentoFRLTotal*100)/100, "resta"], "Descuento SNIS ": [Math.round(descuentoSNISTotal*100)/100, "resta"], "Salario vacacional": 
		 [Math.round(salarioVac*100)/100, "total"], "Días de licencia": [Math.round(diasLicencia*10)/10] };
		
	}

    return calcularSalarioVacacional;
});