define(function (require) {
	var moment = require('moment');

	var calculadorAportes = require('calculadorAportes');
	var salarioMinimo = calculadorAportes.obtenerSalarioMínimo();

	//FALTAN DESCUENTOS DE APORTES
	function calcularSeguroDeParo(datos) {

		var BCP = calculadorAportes.obtenerValorBCP();;
		
		var ingresosPrimerMes = parseFloat(datos["ultimos_ingresos"]["ultimos-ingresos0"]);

		var ingresosSegundoMes = parseFloat(datos["ultimos_ingresos"]["ultimos-ingresos1"]);

		var ingresosTercerMes = parseFloat(datos["ultimos_ingresos"]["ultimos-ingresos2"]);

		var ingresosCuartoMes = parseFloat(datos["ultimos_ingresos"]["ultimos-ingresos3"]);

		var ingresosQuintoMes = parseFloat(datos["ultimos_ingresos"]["ultimos-ingresos4"]);

		var ingresosSextoMes = parseFloat(datos["ultimos_ingresos"]["ultimos-ingresos5"]);

		var causalSubsidio = datos["causal_subsidio_dropdown"]["causal-subsidio-dropdown"];

		var aplicaSuplemento = parseFloat(datos["aplica_suplemento"]["aplica-suplemento"]);

		var horasDiarias = parseFloat(datos["horas_diarias"]["horas-diarias"]);

		var promedioIngresos = (ingresosPrimerMes + ingresosSegundoMes + ingresosTercerMes + ingresosCuartoMes 
		+ ingresosQuintoMes + ingresosSextoMes) / 6;

		var valorMinimo = horasDiarias * BCP / 8;
		
		if(causalSubsidio === "despido") {

			var subsidioPrimerMes = Math.min(Math.max(promedioIngresos * 66 / 100, valorMinimo), BCP * 11);

			var subsidioSegundoMes = Math.min(Math.max(promedioIngresos * 57 / 100, valorMinimo), BCP * 9.5);

			var subsidioTercerMes = Math.min(Math.max(promedioIngresos * 50 / 100, valorMinimo), BCP * 8);

			var subsidioCuartoMes = Math.min(Math.max(promedioIngresos * 45 / 100, valorMinimo), BCP * 7);

			var subsidioQuintoMes = Math.min(Math.max(promedioIngresos * 42 / 100, valorMinimo), BCP * 6.5);

			var subsidioSextoMes = Math.min(Math.max(promedioIngresos * 40 / 100, valorMinimo), BCP * 6);

			if(aplicaSuplemento) {
				subsidioPrimerMes += subsidioPrimerMes * 20 / 100;
				subsidioSegundoMes += subsidioSegundoMes * 20 / 100;
				subsidioTercerMes += subsidioTercerMes * 20 / 100;
				subsidioCuartoMes += subsidioCuartoMes * 20 / 100;
				subsidioQuintoMes += subsidioQuintoMes * 20 / 100;
				subsidioSextoMes += subsidioSextoMes * 20 / 100;
			}

			var subsidioLiquidoPrimer = subsidioPrimerMes - calculadorAportes.calcularTodosAportes(subsidioPrimerMes);
			var subsidioLiquidoSegundo = subsidioSegundoMes - calculadorAportes.calcularTodosAportes(subsidioSegundoMes);
			var subsidioLiquidoTercero = subsidioTercerMes - calculadorAportes.calcularTodosAportes(subsidioTercerMes);
			var subsidioLiquidoCuarto = subsidioCuartoMes - calculadorAportes.calcularTodosAportes(subsidioCuartoMes);
			var subsidioLiquidoQuinto = subsidioQuintoMes - calculadorAportes.calcularTodosAportes(subsidioQuintoMes);
			var subsidioLiquidoSexto = subsidioSextoMes - calculadorAportes.calcularTodosAportes(subsidioSextoMes);

			var totalSubsidioLiquido = subsidioLiquidoPrimer + subsidioLiquidoSegundo + subsidioLiquidoTercero + subsidioLiquidoCuarto +
			subsidioLiquidoQuinto + subsidioLiquidoSexto;

			return {
				"Duración del subsidio": ["6 meses", "info"],
				"Subsidio primer mes": [subsidioPrimerMes, "suma"],
				"Subsidio primer mes líquido": [subsidioLiquidoPrimer, "resta"],
				"Subsidio segundo mes": [subsidioSegundoMes, "suma"],
				"Subsidio segundo mes líquido": [subsidioLiquidoSegundo, "resta"],
				"Subsidio tercer mes": [subsidioTercerMes, "suma"],
				"Subsidio tercer mes líquido": [subsidioLiquidoTercero, "resta"],
				"Subsidio cuarto mes": [subsidioCuartoMes, "suma"],
				"Subsidio cuarto mes líquido": [subsidioLiquidoCuarto, "resta"],
				"Subsidio quinto mes": [subsidioQuintoMes, "suma"],
				"Subsidio quinto mes líquido": [subsidioLiquidoQuinto, "resta"],
				"Subsidio sexto mes": [subsidioSextoMes, "suma"],
				"Subsidio sexto mes líquido": [subsidioLiquidoSexto, "resta"],
				"Total líquido": [totalSubsidioLiquido, "total"]
			};
		} else if(causalSubsidio === "suspension") {

			var subsidioPorMes = Math.max(Math.min(promedioIngresos * 50 / 100, BCP * 8), valorMinimo);
			if(aplicaSuplemento) {
				subsidioPorMes += subsidioPorMes * 20 / 100;
			}

			var subsidioLiquido = subsidio - calculadorAportes.calcularTodosAportes(subsidio);

			return {
				"Duración del subsidio": ["4 meses", "info"],
				"Subsidio por mes": [subsidioPorMes, "suma"],
				"Subsidio líquido": [subsidioLiquido, "resta"],
				"Total líquido": [subsidioLiquido * 4, "total"]
			};

		} /*else if(causalSubsidio === "reduccion") {

			var subsidioPorMes = Math.max(Math.min(promedioIngresos * 50 / 100, BCP * 8), valorMinimo);
			var ingresosSeguroParo = parseFloat(datos["ingresos_seguro_paro"]["ingresos-seguro-paro"]);
			
			var subsidio = 0;
			if(subsidioPorMes > ingresosSeguroParo) {
				subsidio = subsidioPorMes - ingresosSeguroParo;
			}
			if(aplicaSuplemento) {
				subsidio += subsidio * 20 / 100;
			}

			var subsidioLiquido = subsidio - calculadorAportes.calcularTodosAportes(subsidio);

			return {
				"Duración del subsidio": ["6 meses", "info"],
				"Subsidio por mes": [subsidio, "suma"],
				"Subsidio líquido por mes": [subsidioLiquido, "resta"], 
				"Total líquido": [subsidioLiquido * 6, "total"]
			};
		}*/
		

		
	}

	function aplicarTope(subsidio) {
		
	}

    return calcularSeguroDeParo;
});