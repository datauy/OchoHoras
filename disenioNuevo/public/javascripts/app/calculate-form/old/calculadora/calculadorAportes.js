define(function (require) {

	var BCP = 3611;

	var api = {

		obtenerValorBCP : function() {
			return BCP;
		},

		obtenerTopeAFAP : function() {
			return 131430;
		},

		obtenerSalarioMínimo : function() {
			return 11150;
		},

		calcularDescuentoAporteJubilatorio : function(sueldo){
			return sueldo * 15 / 100;
		},

		calcularDescuentoFRL : function(sueldo) {
			return sueldo * 0.125 / 100;
		},

	 	calcularDescuentoSNIS : function(sueldo, tieneConyuge, tieneHijos) {
			if(sueldo<(BCP * 2.5)) {
				if(tieneConyuge) {
					return sueldo * 5 / 100;
				} else {
					return sueldo * 3 / 100;
				}
			} else if(!tieneConyuge && !tieneHijos) {
				return sueldo * 4.5 /100;
			} else if(!tieneConyuge && tieneHijos) {
				return sueldo * 6 /100;
			} else if(tieneConyuge && !tieneHijos) {
				return sueldo * 6.5 /100;
			} else if(tieneConyuge && tieneHijos) {
				return sueldo * 8 /100;
			} 
		},

		calcularDescuentoSNISAguinaldo : function(sueldo, tieneConyuge) {
			if(sueldo < (BCP * 2.5) || !tieneConyuge) {
				return sueldo * 3 / 100;
			} else {
				return sueldo * 5 / 100;
			}
		},

		calcularDescuentoSNISSalarioConAguinaldo : function(aguinaldo, tieneConyuge, tieneHijos) {
			if(!tieneHijos) {
				return aguinaldo * 1.5 / 100;
			} else if(tieneHijos) {
				return aguinaldo * 3 / 100;
			} 
		},

		calcularTodosAportes : function(sueldo, tieneConyuge, tieneHijos) {
			return calcularTodos(sueldo, tieneConyuge, tieneHijos);
		},

		calcularAportesIRPF : function(sumaBPS, sumaSinBPS, sumaDeducciones, aporteBPS, aplicaMNI) {
			var arrayMaxRenta = [25277, 36110, 54165, 108330, 180550, 270825, 415265];

			var tasaFranjaRenta = [0, 10, 15, 24, 25, 27, 31, 36];

			var arrayMaxDeduc = [54165];

			var tasaFranjaDeduc = [10, 15, 20, 22, 25, 30];

			var minimoNoImponible = 25277;

			//Si los ingresos gravados superan los 10 BCP se hace un incremento del 6%
			if(sumaBPS > (BCP * 10)) {
				var incremento = sumaBPS * 6 / 100;
				console.log(" INCREMENTO " + incremento);
				sumaBPS = sumaBPS + incremento;
			}

			var totalMonto = sumaBPS + sumaSinBPS ;

			if(!aplicaMNI) {
				totalMonto += minimoNoImponible;
			}

			console.log("Renta computable " + totalMonto);
		
			var totalBPS = aporteBPS + sumaDeducciones;

			var sumaRenta = calcularSuma(arrayMaxRenta, tasaFranjaRenta, totalMonto);

			var sumaDeduc = calcularDeducciones(totalBPS);
			console.log("RENTA " + sumaRenta + " DEDUC " + sumaDeduc);

			var aporteIRPF = Math.max(sumaRenta[0] - sumaDeduc[0], 0);

			return aporteIRPF;
		},

		calcularAportesDevolucionIRPF : function(ingresos, deducciones) {

			var arrayMaxRenta = [256368, 366240, 549360, 1831200, 2746800, 4211760];
			var tasaFranjaRenta = [0, 10, 15, 20, 22, 25, 30];

			var arrayMaxDeduc = [109872, 292992, 1574832, 2490432, 3955392];
			var tasaFranjaDeduc = [10, 15, 20, 22, 25, 30];

			var sumaRenta = calcularSuma(arrayMaxRenta, tasaFranjaRenta, ingresos);
			
			var sumaDeduc = calcularSuma(arrayMaxDeduc, tasaFranjaDeduc, deducciones);
			console.log("RENTA " + sumaRenta + " DEDUC " + sumaDeduc);

			var aporteIRPF = Math.max(sumaRenta[0] - sumaDeduc[0], 0);

			return [aporteIRPF, sumaRenta[1]];
		}

	}

	function calcularTodos(sueldo, tieneConyuge, tieneHijos) {
		var primerDesc = api.calcularDescuentoSNIS(sueldo, tieneConyuge, tieneHijos);
		var segundoDesc = api.calcularDescuentoAporteJubilatorio(sueldo);
		var tercerDesc = api.calcularDescuentoFRL(sueldo);
		return primerDesc + segundoDesc + tercerDesc;
	}

	function calcularDeducciones(totalBPS) {
		var tasa = 0;
		if(totalBPS <= BCP * 15) {
			tasa = 10;
		} else {
			tasa = 8; 
		}
		var deduc = totalBPS * tasa / 100;
		return [deduc, tasa];
	}

	function calcularSuma(arrayMax, arrayTasa, total) {

		var sumaTotal = 0;
		var tasa = 36;
		var tasaMaxDescuento = 0;
		for(var j = 0; j < arrayMax.length; j++) {
			tasa = arrayTasa[j];
			var diff = 0;
			if(total > arrayMax[j]) {
				if(j == 0) {
					diff = arrayMax[j];
				} else {
					diff = arrayMax[j] - arrayMax[j-1];
				}
			} else {
				diff = total;
				if(j > 0) {
					diff = diff - arrayMax[j-1];
				} 
				var valorDesc = diff * tasa / 100;
				sumaTotal += valorDesc;
				tasaMaxDescuento = tasa;
				console.log(diff + " " + tasa + "% valor: " + valorDesc);
				break;
			}
			var valorDesc = diff * tasa / 100;
			tasaMaxDescuento = tasa;
			console.log(diff + " " + tasa + "% valor: " + valorDesc);
			sumaTotal += valorDesc;
		}
		return [sumaTotal, tasa];
	}

	return api;

});
