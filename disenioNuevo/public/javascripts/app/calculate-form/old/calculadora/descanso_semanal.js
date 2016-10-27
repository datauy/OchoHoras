define(function (require) {

	function calcularDescansoSemanal(datos) {

		var categorias = ["Industria", "Comercio", "Personal de escritorio", "Bancos", "Farmacias",
		"Florerías", "Estaciones de servicio", "Peluquerías", "Actividades insalubres", "Gastronómicos",
		"Almacenes", "Carnicerías", "Panaderías","Supermercados", "Transporte por carretera"];
		
		var categoria = "Industria";
		switch(categoria) {

			case "Industria":
				return { "": ["Te corresponde descansar 24 horas semanales como mínimo. Las opciones son el "+
				"descanso semanal o el rotativo. En el primer caso se descansa el domingo luego de trabajar de lunes a sábado, " +
				"y en el segundo se tiene un día de descanso cada seis de trabajo, arreglando los descansos rotativos.", "suma"] };
		}

	}

    return calcularDescansoSemanal;
});
