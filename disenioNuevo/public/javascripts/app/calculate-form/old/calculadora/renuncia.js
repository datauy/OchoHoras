define(function (require) {
	var moment = require('moment');

	var calculadorAportes = require('calculadorAportes');
	var BCP = calculadorAportes.obtenerValorBCP();

	function calcularRenuncia(datos) {

		var sueldo = parseFloat(datos["sueldo_nominal"]["sueldo-nominal"]);

		var sueldoLiquido = parseFloat(datos["sueldo_liquido"]["sueldo-liquido"]);

		var fechaIngreso = datos["fecha_de_ingreso"]["fecha-ingreso"];

		var fechaRenuncia = datos["fecha_de_renuncia"]["fecha-renuncia"];

		var momentIngreso = moment(fechaIngreso);
		
		//cálculo salario del mes de renuncia
		var momentRenuncia = moment(fechaRenuncia);
		var dias = momentRenuncia.date();
		var sueldoAPagarLiquido = 0;
		var sueldoAPagarNominal = 0;

		var correspondeSueldoEntero = false;

		if(dias >= 30 || (momentRenuncia.month() == 1 && dias >= 28)) {
			sueldoAPagarLiquido = parseFloat(sueldoLiquido);
			sueldoAPagarNominal = parseFloat(sueldo);
			correspondeSueldoEntero = true;
		} else {
			sueldoAPagarLiquido = sueldoLiquido / 30 * dias;
			sueldoAPagarNominal = sueldo / 30 * dias;
		}

		console.log("SUELDO NOMINAL " + sueldoAPagarNominal);
		console.log("SUELDO LIQUIDO " + sueldoAPagarLiquido); 

		// hay que fijarse hasta qué mes corresponde..con la fecha de inicio
		//cálculo del aguinaldo del semestre de la renuncia sin descuentos
		var pagoAguinaldo = 0;

		var mes = momentRenuncia.month();

		var diaIngreso = momentIngreso.date();
		var diasDelMes = momentIngreso.daysInMonth();

		var mesesDesdeInicio = Math.ceil(momentRenuncia.diff(momentIngreso, 'months', true));

		//si el mes es de diciembre
		if(mes == 11){
			pagoAguinaldo = sueldoAPagarNominal/12 / 2;
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
				mesSumadoPorSueldoMasSueldoPagar = (mesesAguinaldo - 1) * sueldo + sueldoAPagarNominal;
			} else {
				mesSumadoPorSueldoMasSueldoPagar = mesesAguinaldo * sueldo;
			}
				//sueldo / 2 / 6 * meses
			pagoAguinaldo += (mesSumadoPorSueldoMasSueldoPagar)/12;
			
			
		} 
		//si el mes es de junio a noviembre
		else {
			var aguinaldoMensual = sueldo / 2 / 6;
			var divisor = 30;
			if(dias == 31) {
				divisor = 31;
			}
			var aguinaldoParte = dias * aguinaldoMensual / divisor;

			var mesPorSueldo = (mes - 5) * aguinaldoMensual;
			if(!correspondeSueldoEntero) {
				mesPorSueldo = mesPorSueldo + aguinaldoParte;
			} else {
				mesPorSueldo = mesPorSueldo + aguinaldoMensual;
			}
			pagoAguinaldo = mesPorSueldo;
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

		//var pagoSalarioVacacionalSinDescuentos = pagoLicencia;
		//var descuento1SV = calculadorAportes.calcularDescuentoAporteJubilatorio(pagoSalarioVacacionalSinDescuentos);
		//var descuento2SV = calculadorAportes.calcularDescuentoFRL(pagoSalarioVacacionalSinDescuentos);
		//var descuento3SV = calculadorAportes.calcularDescuentoSNIS(pagoSalarioVacacionalSinDescuentos, tieneConyuge, tieneHijos);

		//var pagoSalarioVacacionalConDescuentos = pagoSalarioVacacionalSinDescuentos - descuento1SV - descuento2SV - descuento3SV;

		/*console.log("SALARIO VAC SIN DESC : " + pagoSalarioVacacionalSinDescuentos);
		console.log("DESCUENTO 1  : " + descuento1SV);
		console.log("DESCUENTO 2  : " + descuento2SV);
		console.log("DESCUENTO 3  : " + descuento3SV);*/

		//console.log("PAGO SALARIO VAC CON DESC: " + pagoSalarioVacacionalConDescuentos);

		return {
			"Sueldo nominal": [sueldoAPagarNominal, "suma"], "Aguinaldo nominal": [pagoAguinaldo, "suma"],
			"Aporte jubilatorio aguinaldo": [(descuento1), "resta"], 
			"Descuento FRL aguinaldo": [(descuento2), "resta"],
			"Descuento SNIS aguinaldo": [(descuento3), "resta"], 
			"Salario vacacional": [pagoLicencia, "suma"], 
			"Licencia no gozada": [pagoLicencia, "suma"],
			"Total líquido": [(sueldoAPagarLiquido + 
			pagoAguinaldo + pagoLicencia + pagoLicencia), "total"] 
		};
		//return sueldoConDescuento + aguinaldoConDescuentos + pagoLicencia + pagoSalarioVacacionalConDescuentos;
	}

    return calcularRenuncia;
});