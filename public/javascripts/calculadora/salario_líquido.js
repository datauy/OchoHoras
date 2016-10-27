//    Si la carrera dura menos de 4 años, 1/2 BPC anual; más de 4 y menos de 5, 1 BPC anual; 5 o más, 5/3 BPC anual. Además hay un adicional de 5/3 BPC anuales más, para los que la carrera es de 5 años o más, cuyos ingresos mensuales sean superiores a 6 BPC.



/*salario nominal - aporte al bps - irpf


Aporte al bps:
Se calcula igual que aguinaldo

IRPF:

Cálculo por mes
Se suma todo lo que se pagó en el mes
*/

define(function (require) {
	var moment = require('moment');

	var calculadorAportes = require('calculadora/calculadorAportes');
	
	function calcularSalarioLíquido(datos) {

		//INGRESOS
		var BCP = calculadorAportes.obtenerValorBCP();
		var topeAFAP = calculadorAportes.obtenerTopeAFAP();

		var opcionAFAP = parseFloat(datos["opcion_afap"]["opcion-afap"]);
		var minimoNoImp = parseFloat(datos["minimo_no_imponible"]["minimo-no-imponible"]);
		var reduccionNF = parseFloat(datos["reduccion_nf"]["reduccion-nf"]);
		var regimenRetenciones = parseFloat(datos["regimen_retenciones"]["regimen-retenciones"]);

		console.log("AFAP " + opcionAFAP + " minimo no imp " + minimoNoImp + " reduccion nf " + reduccionNF + " retenciones " + regimenRetenciones);
		
		var ingresoNominal = parseFloat(datos["ingreso_nominal"]["ingreso-nominal"]);
		var ingresosGravados = parseFloat(datos["ingresos_gravados"]["ingresos-gravados"]);
		var ingresosNoGravados = parseFloat(datos["ingresos_no_gravados"]["ingresos-no-gravados"]);
		var ingresoSalarioVac = parseFloat(datos["ingreso_salario_vacacional"]["ingreso-salario-vacacional"]);

		var sumaSinBPS = ingresosNoGravados + ingresoSalarioVac;
		var sumaBPS = ingresoNominal + ingresosGravados;

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
		var deduccionHijos = (13 * BCP / 12 * cantHijosSinDisc) * porcentajeDeduccionCantHijos /100;
		var deduccionDisc = (26 * BCP / 12 * cantHijosDisc) * porcentajeDeduccionCantHijos / 100;

		sumaDeducciones += deduccionHijos + deduccionDisc;

		console.log("DEDUCCION HIJOS : " + (deduccionHijos + deduccionDisc));

		var aguinaldo = datos["aguinaldo_salario"];
		var aporteFaltanteAguinaldo = 0;
		if(aguinaldo) {
			aguinaldo = parseFloat(aguinaldo["aguinaldo-salario"]);
			aporteFaltanteAguinaldo = calculadorAportes.calcularDescuentoSNISSalarioConAguinaldo(aguinaldo, tieneConyuge, tieneHijos);
		}
		
		console.log("AGUINALDO " + aguinaldo);

		//DEDUCCIONES POR FONDO DE SOLIDARIDAD
		
		var deduccionFondoSolidaridad = 0;

		var duracionCarrera = datos["duracion_carrera"];
		if(duracionCarrera) {
			var valorDuracionCarrera = parseFloat(duracionCarrera["duracion-carrera"]);
			var anosDesdeEgreso = parseFloat(datos["años_desde_egreso"]["años-desde-egreso"]);
			
			console.log("DURACION " + valorDuracionCarrera + " EGRESO " + anosDesdeEgreso);
			if(anosDesdeEgreso <= 4) {
				deduccionFondoSolidaridad = 0;
			} else if(anosDesdeEgreso >=5 && anosDesdeEgreso <= 9) {
				if(valorDuracionCarrera < 4) {
					deduccionFondoSolidaridad = BCP * 1/2;
				} else {
					deduccionFondoSolidaridad = BCP;
				}
			} else if(anosDesdeEgreso >= 10) {
				if(valorDuracionCarrera < 4) {
					deduccionFondoSolidaridad = BCP;
				} else {
					deduccionFondoSolidaridad = BCP * 2;
				}
			} 
			
			//El cálculo del aporte es anual
			deduccionFondoSolidaridad = deduccionFondoSolidaridad / 12;
			console.log("FONDO ANTES SIN ADICIONAL " + deduccionFondoSolidaridad);
			if(valorDuracionCarrera >= 5 && anosDesdeEgreso >= 5) {
				deduccionFondoSolidaridad += BCP * 5/3 / 12;
			}

			console.log("FONDO CON ADICIONAL " + deduccionFondoSolidaridad);


		} else {
			var aporteFondoSolidaridad = datos["aporte_fondo_solidaridad"]["aporte-fondo-solidaridad"];
			if(aporteFondoSolidaridad === "1/2") {
				deduccionFondoSolidaridad += BCP / 2 /12;
			} else if(aporteFondoSolidaridad === "1") {
				deduccionFondoSolidaridad += BCP / 12;
			} else if(aporteFondoSolidaridad === "2") {
				deduccionFondoSolidaridad += BCP * 5/3 /12;
			} 
			var adicionalFondoSolidaridad = parseFloat(datos["adicional_fondo_solidaridad"]["adicional-fondo-solidaridad"]);
			if(adicionalFondoSolidaridad) {
				deduccionFondoSolidaridad += BCP * 5/3 /12;
			}
		}

		sumaDeducciones += deduccionFondoSolidaridad;

		console.log("DEDUCCION FONDO SOLIDARIDAD " + deduccionFondoSolidaridad);

		//DEDUCCION CAJA PROF O NOTARIAL
		var deduccionCajaProfNot = parseFloat(datos["aporte_caja_notarial"]["aporte-caja-notarial"]);
		sumaDeducciones += deduccionCajaProfNot;

		//OTRAS DEDUCCIONES
		var otrasDeducciones = parseFloat(datos["otras_deducciones"]["otras-deducciones"]);
		sumaDeducciones += otrasDeducciones;

		var tieneConyuge = parseFloat(datos["conyuge_cargo"]["conyuge"]);

		
 		var descuento1 = calculadorAportes.calcularDescuentoAporteJubilatorio(sumaBPS);
		console.log("DESCUENTO 1 " + descuento1);
		var topeAporteJubilatorio = topeAFAP * 15/100;
		if(opcionAFAP && descuento1 > topeAporteJubilatorio) {
			descuento1 = topeAporteJubilatorio;
		}

		var descuento2 = calculadorAportes.calcularDescuentoFRL(sumaBPS);
		console.log("DESCUENTO 2 " + descuento2);

		var tieneHijos = false;
		if(cantHijosDisc > 0 || cantHijosSinDisc > 0) {
			tieneHijos = true;
		}
		var descuento3 = calculadorAportes.calcularDescuentoSNIS(sumaBPS, tieneConyuge, tieneHijos)
		console.log("DESCUENTO 3 " + descuento3);

		var aporteBPS = descuento1 + descuento2 + descuento3 + aporteFaltanteAguinaldo;

		console.log("TOTAL DEDUCCIONES " + (aporteBPS + deduccionHijos +deduccionFondoSolidaridad + deduccionCajaProfNot
			+ otrasDeducciones)); 

		var totalMonto = sumaBPS + sumaSinBPS ;

		console.log("APORTE BPS " + aporteBPS);

		var aporteIRPF = 0;
		if(!regimenRetenciones) {
			//CALCULO IRPF
			aporteIRPF = calculadorAportes.calcularAportesIRPF(sumaBPS, sumaSinBPS, sumaDeducciones, aporteBPS, minimoNoImp);
		} 
		if(reduccionNF) {
			var descuento = aporteIRPF * 5 / 100;
			aporteIRPF = aporteIRPF - descuento;
		}
		
		console.log("APORTE IRPF " + aporteIRPF);

		if(aguinaldo) {
			return {
			"Ingresos nominales": [Math.round(totalMonto*100)/100, "suma"], "Aguinaldo": [Math.round(aguinaldo*100)/100, "suma"], "Aporte jubilatorio": [Math.round(descuento1*100)/100, "resta"],
			"Descuento FRL": [Math.round(descuento2*100)/100, "resta"], "Descuento SNIS": [Math.round(descuento3*100)/100, "resta"], 
			"Descuento SNIS aguinaldo": [Math.round(aporteFaltanteAguinaldo*100)/100, "resta"],
			"Descuento IRPF": [Math.round(aporteIRPF*100)/100, "resta"], 
			"Total líquido": [Math.round((totalMonto - aporteBPS - aporteIRPF)*100)/100, "total"]
		};
		}
		return {
			"Ingresos nominales": [Math.round(totalMonto*100)/100, "suma"], "Aporte jubilatorio": [Math.round(descuento1*100)/100, "resta"],
			"Descuento FRL": [Math.round(descuento2*100)/100, "resta"], "Descuento SNIS": [Math.round(descuento3*100)/100, "resta"],
			"Descuento IRPF": [Math.round(aporteIRPF*100)/100, "resta"], 
			"Total líquido": [Math.round((totalMonto - aporteBPS - aporteIRPF)*100)/100, "total"]
		};
		
	}
    return calcularSalarioLíquido;
});

