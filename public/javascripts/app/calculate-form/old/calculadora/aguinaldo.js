define(function (require) {
	var moment = require('moment');
	
	function calcularAguinaldo(datos) {

		var calculadorAportes = require('calculadorAportes');

		var BCP = calculadorAportes.obtenerValorBCP();

		var aguinaldoSinDescuentos = 0;
		for(var i=0; i<6; i++) {
			var sueldoMes = parseFloat(datos["aguinaldo_" + i]["aguinaldo-" + i]);
			aguinaldoSinDescuentos += sueldoMes / 12;
		}

		var tieneConyuge = parseFloat(datos["conyuge_cargo"]["conyuge"]);

		var descuento1 = calculadorAportes.calcularDescuentoAporteJubilatorio(aguinaldoSinDescuentos);

		var descuento2 = calculadorAportes.calcularDescuentoFRL(aguinaldoSinDescuentos);

		var descuento3 = calculadorAportes.calcularDescuentoSNISAguinaldo(aguinaldoSinDescuentos, tieneConyuge);
		
		return { "Sueldo aguinaldo nominal": [aguinaldoSinDescuentos, "suma"], "Aporte jubilatorio": [descuento1, "resta"],
		 "Descuento FRL": [descuento2, "resta"], "Descuento SNIS ": [descuento3, "resta"], "Total líquido": 
		 [(aguinaldoSinDescuentos - descuento1 - descuento2 - descuento3), "total"] };
	}
    return calcularAguinaldo;
});