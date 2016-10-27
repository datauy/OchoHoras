var bd = require('./../database');

module.exports.obtenerActividades  = obtenerActividades;
module.exports.obtenerEstadisticas = obtenerEstadisticas;



function obtenerActividades(req){
	if(req.params.ciiu){

		return bd.query('SELECT * FROM CIIU_V4 WHERE CIIU = '+req.params.ciiu);
		
	} else if(hasNotParameter(req)){
		
		return bd.query('SELECT * FROM CIIU_V4');
	
	} else {
		if(req.query.descripcion){

			return bd.query('SELECT * FROM CIIU_V4 WHERE DESCRIPCION like "%'+req.query.descripcion+'%"');
		}	
	}


}


function obtenerEstadisticas(req){
	if(req.params.years){
		console.log(req.params.years)
	}
	if(req.params.ciiu){
		return bd.query('SELECT CALCULO_SALARIOS_2014.* FROM CIIU_V4 JOIN CALCULO_SALARIOS_2014 ' +
		 				'ON CIIU_V4.CIIU = CALCULO_SALARIOS_2014.CIIU WHERE CIIU_V4.CIIU ='+req.params.ciiu);
		
	}
} 

function hasNotParameter(req){
	for(var idx in req.query){
		if(req.query[idx]){
			return false;
		}
	}
	return true;
}
