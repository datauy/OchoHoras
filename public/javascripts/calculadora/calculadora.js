define(function (require) {
	var api = {
		calcular : function(datos, concepto){
			console.log(datos)
			console.log(concepto)
			var conceptosENUM = require('conceptos');
			switch(concepto) {
				case conceptosENUM.AGUINALDO:
					var calculadorAguinaldo = require('calculadora/aguinaldo');
					return calculadorAguinaldo(datos);
				case conceptosENUM.SALARIO_VACACIONAL:
					var calcularSalarioVacacional = require('calculadora/salario_vacacional');
					return calcularSalarioVacacional(datos);
				case conceptosENUM.HORAS_EXTRA:
					var calculadorHorasExtra = require('calculadora/horas_extra');
					return calculadorHorasExtra(datos);
				case conceptosENUM.SALARIO_LIQUIDO:
					var calculadorSalarioLiquido = require('calculadora/salario_líquido');
					return calculadorSalarioLiquido(datos);
				case conceptosENUM.RENUNCIA:
					var calculadorRenuncia = require('calculadora/renuncia');
					return calculadorRenuncia(datos);
				case conceptosENUM.DESPIDO:
					var calculadorDespido = require('calculadora/despido');
					return calculadorDespido(datos);
				case conceptosENUM.SEGURO_PARO:
					var calculadorSeguroParo = require('calculadora/seguro_de_paro');
					return calculadorSeguroParo(datos);
				case conceptosENUM.DESCANSO_SEMANAL:
					var calculadorDescansoSemanal = require('calculadora/descanso_semanal');
					return calculadorDescansoSemanal(datos);
				case conceptosENUM.DEVOLUCION_IRPF:
					var calculadorDevolucionIRPF = require('calculadora/devolución_irpf');
					return calculadorDevolucionIRPF(datos);
				default:
				return 200;
			}
		}
	}
    return api;
});