define(function (require) {
	
	var calculadorAportes = require('calculadora/calculadorAportes');
	function calcularDevolucionIRPF(datos) {

		var BCP = 3052;

		var ingresosGravados = datos["ingresos"];

		var totalIngresosGravados = 0;

		for(var i=0; i<(Object.keys(ingresosGravados).length); i++) {

 			totalIngresosGravados += parseFloat(ingresosGravados["ingresos-" + i]);

		}

		console.log("TOTAL INGRESOS " + totalIngresosGravados);

		var aguinaldo = parseFloat(datos["aguinaldo_irpf"]["aguinaldo-irpf"]);

		console.log("AGUINALDO " + aguinaldo);

		var salarioVacacional = parseFloat(datos["salario_vacacional"]["salario-vacacional"]);

		console.log("SALARIO VAC " + salarioVacacional);

		var sumaDeducciones = 0;

		//DEDUCCIONES
		//
		//DEDUCCIONES POR HIJOS Y DISCAPACITADOS A CARGO
		var porcentajeDeduccionCantHijos = parseFloat(datos["porcentaje_deduccion_cant_hijos"]["porcentaje-deduccion-cant-hijos"]);
		var cantHijosDisc = parseFloat(datos["cantidad_hijos_disc"]["cantidad-hijos-disc"]);
		var cantHijosSinDisc = parseFloat(datos["cantidad_hijos_sin_disc"]["cantidad-hijos-sin-disc"]);
		
		//var totalACargo = cantHijosDisc + cantHijosSinDisc;
		//Se pagan 13 BCP anuales por cada hijo y 26 BCP por cada disc - como es mensual el 
		//cálculo divido entre 12
		var deduccionHijos = (13 * BCP * cantHijosSinDisc) * porcentajeDeduccionCantHijos /100;
		var deduccionDisc = (26 * BCP * cantHijosDisc) * porcentajeDeduccionCantHijos / 100;

		sumaDeducciones += deduccionHijos + deduccionDisc;

		console.log("DEDUCCION HIJOS : " + (deduccionHijos + deduccionDisc));


		//DEDUCCIONES POR FONDO DE SOLIDARIDAD
		
		var deduccionFondoSolidaridad = 0;

		var duracionCarrera = datos["duracion_carrera"];
		if(duracionCarrera) {
			var valorDuracionCarrera = parseFloat(duracionCarrera["duracion-carrera"]);
			if(duracionCarrera < 4) {
				deduccionFondoSolidaridad = BCP * 1/2;
			} else if(duracionCarrera > 4 && duracionCarrera < 5) {
				deduccionFondoSolidaridad = BCP;
			} else if(duracionCarrera >= 5) {
				deduccionFondoSolidaridad = BCP * 5/3;
				//Preguntar si solo se tiene en cuenta el ingerso nominal
				if(ingresoNominal > (6 * BCP)) {
					deduccionFondoSolidaridad += BCP * 5/3;
				}
			}
			//El cálculo del aporte es anual
			deduccionFondoSolidaridad = deduccionFondoSolidaridad;

		} else {
			var aporteFondoSolidaridad = datos["aporte_fondo_solidaridad"]["aporte-fondo-solidaridad"];
			if(aporteFondoSolidaridad === "1/2") {
				deduccionFondoSolidaridad += BCP / 2;
			} else if(aporteFondoSolidaridad === "1") {
				deduccionFondoSolidaridad += BCP;
			} else if(aporteFondoSolidaridad === "5/3") {
				deduccionFondoSolidaridad += BCP * 5/3;
			} 
			var adicionalFondoSolidaridad = parseFloat(datos["adicional_fondo_solidaridad"]["adicional-fondo-solidaridad"]);
			if(adicionalFondoSolidaridad) {
				deduccionFondoSolidaridad += BCP * 5/3;
			}
		}
		sumaDeducciones += deduccionFondoSolidaridad;

		console.log("DEDUCCION FONDO SOLIDARIDAD " + deduccionFondoSolidaridad);

		//DEDUCCION CAJA PROF O NOTARIAL
		var deduccionCajaProfNot = parseFloat(datos["aporte_caja_notarial"]["aporte-caja-notarial"]);
		sumaDeducciones += deduccionCajaProfNot;

		console.log("CAJA PROF " + deduccionCajaProfNot);

		//OTRAS DEDUCCIONES
		var otrasDeducciones = parseFloat(datos["otras_deducciones"]["otras-deducciones"]);
		sumaDeducciones += otrasDeducciones;

		console.log("OTRAS DEDUC " + otrasDeducciones);

		var correspondeAjusteAnual = parseFloat(datos["ajuste_anual"]["ajuste-anual"]);
		console.log("CORRESPONDE AJUSTE " + correspondeAjusteAnual);

		var reduccionRetNF = parseFloat(datos["reduccion_nf"]["reduccion-nf"]);
		var montoRentasComputablesDic = 0;
		if(reduccionRetNF) {
			montoRentasComputablesDic = parseFloat(datos["rentas_computables_mes"]["rentas-computables-mes"]);
		}
		console.log("REDUCCION RET NF " + reduccionRetNF + " MONTO " + montoRentasComputablesDic);

		var totalRetIRPF = parseFloat(datos["total_retenciones"]["total-retenciones"]);
		console.log("TOTAL RET IRPF " + totalRetIRPF);

		var aportesJubilatorios = parseFloat(datos["aportes_jubilatorios"]["aportes-jubilatorios"]);

		var aportesSNIS = parseFloat(datos["aportes_sse"]["aportes-sse"]);

		var aportesFRL = parseFloat(datos["aportes_frl"]["aportes-frl"]);

		console.log("APORTE JUB " + aportesJubilatorios + " APORTES SNIS " + aportesSNIS + " APORTESFRL " + aportesFRL);

		var totalIngresos = totalIngresosGravados + aguinaldo + salarioVacacional;

		var totalDeducciones = aportesJubilatorios + aportesSNIS + aportesFRL + deduccionHijos + deduccionFondoSolidaridad + adicionalFondoSolidaridad + deduccionCajaProfNot + otrasDeducciones;

		var totalIRPF = calculadorAportes.calcularAportesDevolucionIRPF(totalIngresosGravados, totalDeducciones);

		var tasaAguinaldoSalarioVac = totalIRPF[1];
		var aguinaldoSalarioVac = aguinaldo + salarioVacacional;
		var aporteIRPFSalarioAguinaldo = aguinaldoSalarioVac * tasaAguinaldoSalarioVac / 100;

		var valorTotalIRPF = totalIRPF[0] + aporteIRPFSalarioAguinaldo;
		var aPagarODevolver =  valorTotalIRPF - totalRetIRPF;

		var textoPagarODevolver = "Monto a pagar";
		if(aPagarODevolver < 0) {
			return {
				"Anticipos IRPF": [totalRetIRPF, "suma"],
				"Total descuento IRPF anual": [valorTotalIRPF, "resta"],
				"Monto que te devolverán": [Math.abs(aPagarODevolver), "total"]
			};
		} else {
			return {
				"Anticipos IRPF": [totalRetIRPF, "suma"],
				"Total descuento IRPF anual": [valorTotalIRPF, "resta"],
				"Monto a pagar": [Math.abs(aPagarODevolver), "total"]
			};
		}

		
	}
    return calcularDevolucionIRPF;
});