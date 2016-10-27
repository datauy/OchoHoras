define(function (require) {
	var api = {
		calcular : function(datos, concepto){
			console.log(datos)
			console.log(concepto)
			var conceptosENUM = require('conceptos');
			switch(concepto) {
				case conceptosENUM.AGUINALDO:
					var calculadorAguinaldo = require('aguinaldo');
					return calculadorAguinaldo(datos);
				case conceptosENUM.SALARIO_VACACIONAL:
					var calcularSalarioVacacional = require('salario_vacacional');
					return calcularSalarioVacacional(datos);
				case conceptosENUM.HORAS_EXTRA:
					var calculadorHorasExtra = require('horas_extra');
					return calculadorHorasExtra(datos);
				case conceptosENUM.SALARIO_LIQUIDO:
					var calculadorSalarioLiquido = require('salario_líquido');
					return calculadorSalarioLiquido(datos);
				case conceptosENUM.RENUNCIA:
					var calculadorRenuncia = require('renuncia');
					return calculadorRenuncia(datos);
				case conceptosENUM.DESPIDO:
					var calculadorDespido = require('despido');
					return calculadorDespido(datos);
				case conceptosENUM.SEGURO_PARO:
					var calculadorSeguroParo = require('seguro_de_paro');
					return calculadorSeguroParo(datos);
				case conceptosENUM.DESCANSO_SEMANAL:
					var calculadorDescansoSemanal = require('descanso_semanal');
					return calculadorDescansoSemanal(datos);
				case conceptosENUM.DEVOLUCION_IRPF:
					var calculadorDevolucionIRPF = require('devolución_irpf');
					return calculadorDevolucionIRPF(datos);
				default:
				return 200;
			}
		}
	}
    return api;
});