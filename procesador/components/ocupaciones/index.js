var bd = require('./../database');
var Promise = require('bluebird');
var sm = require('statistical-methods');

module.exports.obtenerOcupaciones  	= obtenerOcupaciones;
module.exports.obtenerEstadisticas 	= obtenerEstadisticas;
module.exports.obtenerSalarios 		= obtenerSalarios;
module.exports.calcularEstadisticas	= calcularEstadisticas;
module.exports.obtenerEncuestaHogares	= obtenerEncuestaHogares;



function obtenerOcupaciones(req){
	if(req.params.id){

		return bd.query('SELECT * FROM CIUO WHERE ID = '+req.params.id);
		
	} else if(hasNotParameter(req)){
		
		return bd.query('SELECT * FROM CIUO');
	
	} else {
		if(req.query.descripcion){

			return bd.query('SELECT * FROM CIUO WHERE DESCRIPCION like "%'+req.query.descripcion+'%"');
	
		} else if(req.query.grupo){
			
			return bd.query('SELECT * FROM CIUO WHERE GRUPO like "%'+req.query.grupo+'%"');
		
		} else if(req.query.ciuo){
			
			return bd.query('SELECT * FROM CIUO WHERE CIUO ='+req.query.ciuo);
		}
	}


}


function obtenerEstadisticas(req){
	var queries = [];
	if(req.params.id){
			console.log()
			if(!Array.isArray(req.query.years) || req.query.years.indexOf('2015') !== -1){
				queries.push(bd.query('SELECT CALCULO_SALARIOS_2015.* FROM CALCULO_SALARIOS_2015 ' +
						 				'WHERE CALCULO_SALARIOS_2015.CIUO ='+req.params.id));
			}

			if(Array.isArray(req.query.years)){
			
				if(req.query.years.indexOf('2014') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2014.* FROM CALCULO_SALARIOS_2014 ' +
						 				'WHERE CALCULO_SALARIOS_2014.CIUO ='+req.params.id));
				}
				
				if(req.query.years.indexOf('2013') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2013.* FROM CALCULO_SALARIOS_2013 ' +
						 				'WHERE CALCULO_SALARIOS_2013.CIUO ='+req.params.id));
				}

				if(req.query.years.indexOf('2012') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2012.* FROM CALCULO_SALARIOS_2012 ' +
						 				'WHERE CALCULO_SALARIOS_2012.CIUO ='+req.params.id));
				}

				if(req.query.years.indexOf('2011') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2011.* FROM CALCULO_SALARIOS_2011 ' +
						 				'WHERE CALCULO_SALARIOS_2011.CIUO ='+req.params.id));
				}

				if(req.query.years.indexOf('2010') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2010.* FROM CALCULO_SALARIOS_2010 ' +
						 				'WHERE CALCULO_SALARIOS_2010.CIUO ='+req.params.id));
				}

				if(req.query.years.indexOf('2009') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2009.* FROM CALCULO_SALARIOS_2009 ' +
						 				'WHERE CALCULO_SALARIOS_2009.CIUO ='+req.params.id));
				}

				if(req.query.years.indexOf('2008') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2008.* FROM CALCULO_SALARIOS_2008 ' +
						 				'WHERE CALCULO_SALARIOS_2008.CIUO ='+req.params.id));
				}
			}

			return Promise.map(queries, function(row, key){
				return row[0][0];
			});
	}
}

function obtenerSalarios(req){
	var queries = [];
	if(req.params.id){
			
			if(!Array.isArray(req.query.years) || req.query.years.indexOf('2015') !== -1){
				queries.push(bd.query('SELECT CALCULO_SALARIOS_2015.CIUO, SALARIOS_2015.ID, SALARIOS_2015.SALARIO, CALCULO_SALARIOS_2015.YEAR ' + 
								'FROM SALARIOS_2015 JOIN CALCULO_SALARIOS_2015 ON CALCULO_SALARIOS_2015.ID = SALARIOS_2015.ID_CAL_SALARIOS_ECH2015 '+ 
								'WHERE CALCULO_SALARIOS_2015.CIUO = '+req.params.id));
			}

			if(Array.isArray(req.query.years)){
				if(req.query.years.indexOf('2014') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2014.CIUO, SALARIOS_2014.ID, SALARIOS_2014.SALARIO, CALCULO_SALARIOS_2014.YEAR ' + 
								'FROM SALARIOS_2014 JOIN CALCULO_SALARIOS_2014 ON CALCULO_SALARIOS_2014.ID = SALARIOS_2014.ID_CAL_SALARIOS_ECH2014 '+ 
								'WHERE CALCULO_SALARIOS_2014.CIUO = '+req.params.id));
				}
				
				if(req.query.years.indexOf('2013') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2013.CIUO, SALARIOS_2013.ID, SALARIOS_2013.SALARIO, CALCULO_SALARIOS_2013.YEAR ' + 
								'FROM SALARIOS_2013 JOIN CALCULO_SALARIOS_2013 ON CALCULO_SALARIOS_2013.ID = SALARIOS_2013.ID_CAL_SALARIOS_ECH2013 '+ 
								'WHERE CALCULO_SALARIOS_2013.CIUO = '+req.params.id));
				}

				if(req.query.years.indexOf('2012') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2012.CIUO, SALARIOS_2012.ID, SALARIOS_2012.SALARIO, CALCULO_SALARIOS_2012.YEAR ' + 
								'FROM SALARIOS_2012 JOIN CALCULO_SALARIOS_2012 ON CALCULO_SALARIOS_2012.ID = SALARIOS_2012.ID_CAL_SALARIOS_ECH2012 '+ 
								'WHERE CALCULO_SALARIOS_2012.CIUO = '+req.params.id));
				}

				if(req.query.years.indexOf('2011') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2011.CIUO, SALARIOS_2011.ID, SALARIOS_2011.SALARIO, CALCULO_SALARIOS_2011.YEAR ' + 
								'FROM SALARIOS_2011 JOIN CALCULO_SALARIOS_2011 ON CALCULO_SALARIOS_2011.ID = SALARIOS_2011.ID_CAL_SALARIOS_ECH2011 '+ 
								'WHERE CALCULO_SALARIOS_2011.CIUO = '+req.params.id));
				}

				if(req.query.years.indexOf('2010') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2010.CIUO, SALARIOS_2010.ID, SALARIOS_2010.SALARIO, CALCULO_SALARIOS_2010.YEAR ' + 
								'FROM SALARIOS_2010 JOIN CALCULO_SALARIOS_2010 ON CALCULO_SALARIOS_2010.ID = SALARIOS_2010.ID_CAL_SALARIOS_ECH2010 '+ 
								'WHERE CALCULO_SALARIOS_2010.CIUO = '+req.params.id));
				}

				if(req.query.years.indexOf('2009') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2009.CIUO, SALARIOS_2009.ID, SALARIOS_2009.SALARIO, CALCULO_SALARIOS_2009.YEAR ' + 
								'FROM SALARIOS_2009 JOIN CALCULO_SALARIOS_2009 ON CALCULO_SALARIOS_2009.ID = SALARIOS_2009.ID_CAL_SALARIOS_ECH2009 '+ 
								'WHERE CALCULO_SALARIOS_2009.CIUO = '+req.params.id));
				}

				if(req.query.years.indexOf('2008') !== -1){
					queries.push(bd.query('SELECT CALCULO_SALARIOS_2008.CIUO, SALARIOS_2008.ID, SALARIOS_2008.SALARIO, CALCULO_SALARIOS_2008.YEAR ' + 
								'FROM SALARIOS_2008 JOIN CALCULO_SALARIOS_2008 ON CALCULO_SALARIOS_2008.ID = SALARIOS_2008.ID_CAL_SALARIOS_ECH2008 '+ 
								'WHERE CALCULO_SALARIOS_2008.CIUO = '+req.params.id));
				}
			}

			return Promise.map(queries, function(row, key){
				return row[0];
			});
	}
}


function obtenerEncuestaHogares(req){
	return bd.query('SELECT DISTINCT CONSEJO_SALARIOS.*, CONSEJO_SALARIOS_CIIU_V3.PROBLEMA FROM CIIU_V4_CIIU_V3 '+
			'JOIN CALCULO_SALARIOS_2014 ON CALCULO_SALARIOS_2014.CIIU = CIIU_V4_CIIU_V3.CIIU_V4 '+
			'JOIN CONSEJO_SALARIOS_CIIU_V3 ON CONSEJO_SALARIOS_CIIU_V3.CIIU_V3 =  CIIU_V4_CIIU_V3.CIIU_V3 '+
			'JOIN CONSEJO_SALARIOS ON CONSEJO_SALARIOS.ID =  CONSEJO_SALARIOS_CIIU_V3.ID_CONSEJO_SALARIO '+
			'WHERE CALCULO_SALARIOS_2014.CIUO = '+req.params.id);
}


function calcularEstadisticas(rows){
	return rows.map(function(row){
		var salarios = getSalarios(row);
		return {
			salarios : salarios,
			MAX : sm.max(salarios),
			MIN : sm.min(salarios),
			MEAN : sm.mean(salarios),
			MEDIAN : sm.median(salarios),
			RANGE : sm.range(salarios),
			VARIANCE : sm.variance(salarios),
			STDDEV : sm.stddev(salarios),
			MODE : sm.mode(salarios)
		}
	});

	function getSalarios(row){
		return row.map(function(r){
			return r.SALARIO;
		})
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
