
define(function (require) {
	var moment = require('moment');
	
	function calcularHorasExtra(datos) {

		var calculadorAportes = require('calculadorAportes');

		var BCP = calculadorAportes.obtenerValorBCP();

		var sueldo = parseFloat(datos["sueldo"]["sueldo"]);
		console.log(sueldo);

		var horasTrabajadas = parseFloat(datos["horas_trabajadas"]["horas-trabajadas"]);
		console.log(horasTrabajadas);

		var extraDiasHabiles = parseFloat(datos["horas_extra_dias_habiles"]["horas-extra-dias-habiles"]);
		console.log(extraDiasHabiles);

		var extraFeriadosDescanso = parseFloat(datos["horas_extra_feriados_descanso"]["horas-extra-feriados-descanso"]);
		console.log(extraFeriadosDescanso);

		var extraFeriadosDescansoEspeciales = parseFloat(datos["horas_extra_feriados_descanso_especiales"]["horas-extra-feriados-descanso-especiales"]);

		var valorComun = sueldo / 30 / horasTrabajadas;
		console.log("VALOR COMUN "+ valorComun);

	/*	var montoHorasExtraFeriadosDescanso = 0;
		if(extraFeriadosDescanso > horasTrabajadas) {
			var horasEspeciales = extraFeriadosDescanso - horasTrabajadas;
			var montoHorasEspeciales = horasEspeciales * valorComun * 2.5;
			console.log("MONTO HORAS ESPECIALES: " + montoHorasEspeciales + " HORAS: " + horasEspeciales);
			var montoHorasComunesFeriadosDesc = horasTrabajadas * valorComun * 2;
			console.log("MONTO HORAS COMUNES FERIADOS DESC: " + montoHorasComunesFeriadosDesc + " HORAS: " + horasTrabajadas);
			montoHorasExtraFeriadosDescanso += montoHorasComunesFeriadosDesc + montoHorasEspeciales;
		} else {
			montoHorasExtraFeriadosDescanso = extraFeriadosDescanso * valorComun * 2;
		}*/

		var valorExtraDiasHabiles = valorComun * 2 * extraDiasHabiles;
		console.log("EXTRA DIAS HABILES " + valorExtraDiasHabiles);

		var valorExtraFeriadosDescanso = valorComun * 2 * extraFeriadosDescanso;
		console.log("EXTRA FERIADOS DESCANSO " + valorExtraFeriadosDescanso);

		var valorExtraEspeciales = valorComun * 2.5 * extraFeriadosDescansoEspeciales;
		console.log("EXTRA ESPECIALES " + valorExtraEspeciales);
		
		var montoSinDescuentos = valorExtraDiasHabiles + valorExtraFeriadosDescanso + valorExtraEspeciales;
		
		var tieneHijos = parseFloat(datos["tiene_hijos"]["tiene-hijos"]);
		var tieneConyuge = parseFloat(datos["conyuge_cargo"]["conyuge"]);

		var descuento1 = calculadorAportes.calcularDescuentoAporteJubilatorio(montoSinDescuentos);
		var descuento2 = calculadorAportes.calcularDescuentoFRL(montoSinDescuentos);
		var descuento3 = calculadorAportes.calcularDescuentoSNIS(montoSinDescuentos, tieneConyuge, tieneHijos);

		console.log("SIN DESCUENTOS : " + montoSinDescuentos);
		console.log("DESCUENTO 1 : " + descuento1);
		console.log("DESCUENTO 2 : " + descuento2);
		console.log("DESCUENTO 3 : " + descuento3); 
		
		return { "Sueldo horas extras nominal": [montoSinDescuentos, "suma"], "Aporte jubilatorio": [descuento1, "resta"],
		 "Descuento FRL": [descuento2, "resta"], "Descuento SNIS ": [descuento3, "resta"], "Total líquido": 
		 [(montoSinDescuentos - descuento1 - descuento2 - descuento3), "total"] };
	}

    return calcularHorasExtra;
});