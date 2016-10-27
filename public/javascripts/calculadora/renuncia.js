define(function (require) {
	var moment = require('moment');

	var calculadorAportes = require('calculadora/calculadorAportes');
	var BCP = calculadorAportes.obtenerValorBCP();

	function calcularRenuncia(datos) {

		var sueldo = parseFloat(datos["sueldo"]["sueldo"]);

		var fechaIngreso = datos["fecha_de_ingreso"]["fecha-ingreso"];

		var fechaRenuncia = datos["fecha_de_renuncia"]["fecha-renuncia"];

		var momentIngreso = moment(fechaIngreso);
		
		//cálculo salario del mes de renuncia
		var momentRenuncia = moment(fechaRenuncia);
		var dias = momentRenuncia.date();
		var sueldoAPagar = 0;

		var correspondeSueldoEntero = false;

		if(dias > 30 || (momentRenuncia.month() == 1 && dias >= 28)) {
			sueldoAPagar = parseFloat(sueldo);
			correspondeSueldoEntero = true;
		} else {
			sueldoAPagar = sueldo / 30 * dias;
		}

		var descuento1Sueldo = calculadorAportes.calcularDescuentoAporteJubilatorio(sueldoAPagar);
		var descuento2Sueldo = calculadorAportes.calcularDescuentoFRL(sueldoAPagar);
		var descuento3Sueldo = calculadorAportes.calcularDescuentoSNIS(sueldoAPagar, tieneConyuge, tieneHijos);

		console.log("SUELDO SIN DESCUENTOS : " + sueldoAPagar);
		console.log("DESCUENTO 1 : " + descuento1Sueldo);
		console.log("DESCUENTO 2 : " + descuento2Sueldo);
		console.log("DESCUENTO 3 : " + descuento3Sueldo);

		var sueldoConDescuento =  sueldoAPagar - descuento1Sueldo - descuento2Sueldo - descuento3Sueldo;
		console.log("SUELDO CON DESCUENTOS : " + sueldoConDescuento); 

		// hay que fijarse hasta qué mes corresponde..con la fecha de inicio
		//cálculo del aguinaldo del semestre de la renuncia sin descuentos
		var pagoAguinaldo = 0;

		var mes = momentRenuncia.month();

		var diaIngreso = momentIngreso.date();
		var diasDelMes = momentIngreso.daysInMonth();

		var mesesDesdeInicio = Math.ceil(momentRenuncia.diff(momentIngreso, 'months', true));

		//si el mes es de diciembre
		if(mes == 11){
			pagoAguinaldo = sueldoAPagar/12 / 2;
		} 
		//Si es de enero a mayo
		else if(mes >= 0 && mes <= 4) {
			var mesSumado = (mes + 2);
			var distanciaADiciembre = mesSumado;
			var mesesAguinaldo = mesSumado;
			if(distanciaADiciembre > mesesDesdeInicio) {
				mesesAguinaldo = mesesDesdeInicio;
			}
			if(distanciaADiciembre >= mesesDesdeInicio && diaIngreso > 1) {
				pagoAguinaldo = sueldo / 2 / 6 / 30 * (diasDelMes - diaIngreso + 1);
				mesesAguinaldo = mesesAguinaldo - 1;
			} 
			var mesSumadoPorSueldoMasSueldoPagar = 0;
			if(!correspondeSueldoEntero) {
				mesSumadoPorSueldoMasSueldoPagar = (mesesAguinaldo - 1) * sueldo + sueldoAPagar;
			} else {
				mesSumadoPorSueldoMasSueldoPagar = mesesAguinaldo * sueldo;
			}
				//sueldo / 2 / 6 * meses
			pagoAguinaldo += (mesSumadoPorSueldoMasSueldoPagar)/12;
			
			
		} 
		//si el mes es de junio a noviembre
		else {
			var mesPorSueldo = (mes - 5) * sueldo;
			if(!correspondeSueldoEntero) {
				mesPorSueldo = mesPorSueldo + sueldoAPagar;
			}
			pagoAguinaldo = mesPorSueldo/12 / 2;
		}
//		console.log("AGUINALDO NOMINAL" + pagoAguinaldo);

		//calculo descuento aguinaldo
		var tieneHijos = parseFloat(datos["tiene_hijos"]["tiene-hijos"]);
		var tieneConyuge = parseFloat(datos["conyuge_cargo"]["conyuge"]);
		
		
		var descuento1 = calculadorAportes.calcularDescuentoAporteJubilatorio(pagoAguinaldo);
		var descuento2 = calculadorAportes.calcularDescuentoFRL(pagoAguinaldo);
		var descuento3 = calculadorAportes.calcularDescuentoSNIS(pagoAguinaldo, tieneConyuge, tieneHijos);

		
		console.log("AGUINALDO SIN DESCUENTOS : " + pagoAguinaldo);
		console.log("DESCUENTO 1 : " + descuento1);
		console.log("DESCUENTO 2 : " + descuento2);
		console.log("DESCUENTO 3 : " + descuento3); 

		var aguinaldoConDescuentos = pagoAguinaldo - descuento1 - descuento2 - descuento3;
		console.log("AGUINALDO CON DESCUENTOS: " + aguinaldoConDescuentos);

		//AGREGAR PARA INGRESAR DÍAS DE LICENCIA DE AÑOS ANTERIORES CON EL SALARIO CORRESPONDIENTE
		//calculo del pago de días de licencia no gozados
		var diasLicencia = datos["dias_licencia_pendientes"]["dias-licencia-pendientes"];
		var pagoLicencia = sueldo / 30 * diasLicencia;

		console.log("PAGO LICENCIA NO GOZADA: " + pagoLicencia);

		var pagoSalarioVacacionalSinDescuentos = pagoLicencia;
		//var descuento1SV = calculadorAportes.calcularDescuentoAporteJubilatorio(pagoSalarioVacacionalSinDescuentos);
		//var descuento2SV = calculadorAportes.calcularDescuentoFRL(pagoSalarioVacacionalSinDescuentos);
		//var descuento3SV = calculadorAportes.calcularDescuentoSNIS(pagoSalarioVacacionalSinDescuentos, tieneConyuge, tieneHijos);

		//var pagoSalarioVacacionalConDescuentos = pagoSalarioVacacionalSinDescuentos - descuento1SV - descuento2SV - descuento3SV;

		/*console.log("SALARIO VAC SIN DESC : " + pagoSalarioVacacionalSinDescuentos);
		console.log("DESCUENTO 1  : " + descuento1SV);
		console.log("DESCUENTO 2  : " + descuento2SV);
		console.log("DESCUENTO 3  : " + descuento3SV);*/

		console.log("PAGO SALARIO VAC CON DESC: " + pagoSalarioVacacionalSinDescuentos);

		return {
			"Sueldo nominal": [sueldoAPagar, "suma"], "Aguinaldo": [pagoAguinaldo, "suma"],
			"Aporte jubilatorio": [(descuento1Sueldo + descuento1), "resta"], 
			"Descuento FRL": [(descuento2Sueldo + descuento2), "resta"],
			"Descuento SNIS": [(descuento3Sueldo + descuento3), "resta"], 
			"Salario vacacional": [pagoLicencia, "suma"], 
			"Licencia no gozada": [pagoLicencia, "suma"],
			"Total líquido": [(sueldoConDescuento + 
			aguinaldoConDescuentos + pagoLicencia + pagoLicencia), "total"] 
		};
		//return sueldoConDescuento + aguinaldoConDescuentos + pagoLicencia + pagoSalarioVacacionalConDescuentos;
	}

    return calcularRenuncia;
});