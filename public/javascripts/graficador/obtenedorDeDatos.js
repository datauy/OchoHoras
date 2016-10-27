define(function (require) {
    
	var api = {
		obtenerDatoDeSubrubro : function(subRubro, param){
			var datos = [];
			for(var i = 0; i < 12; i++){
				switch (param){
					case 'sueldo_minimo':
						datos.push(subRubro.sueldo_minimo + Math.floor(Math.random() * 6));
					break;
					case 'sueldo_maximo':
						datos.push(subRubro.sueldo_minimo + Math.floor(Math.random() * 6) + 1000);
					break;
					case 'sueldo_promedio':
						datos.push(subRubro.sueldo_minimo + Math.floor(Math.random() * 6) + 100);
					break;
				}
			}

			return datos;
		}
	}

    return api;
});