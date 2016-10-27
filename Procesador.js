
var mongoose = require('mongoose');
mongoose.connect('mongodb://grupo_proyecto:proyectoucu2015@ds045694.mongolab.com:45694/proyecto_ucu');

var Grupo = mongoose.model('grupos', { nombre: String, rubros: [] });

var Rubro = mongoose.model('rubros', { nombre: String, sub_rubros: [] });

var SubRubro = mongoose.model('sub-rubros', { nombre: String, sueldo_minimo: Number });

function fillDb(){
	var subRubroDespachante = new SubRubro({ nombre: 'Cadete', sueldo_minimo: 16601, sueldo_promedio: 20000, sueldo_maximo: 25000 });

	var subRubroLimpiadora = new SubRubro({ nombre: 'Limpiador/a', sueldo_minimo: 16601, sueldo_promedio: 18500, sueldo_maximo: 20300 });

	var despachante = new Rubro({ nombre: 'Despachante de aduana', sub_rubros: [subRubroDespachante, subRubroLimpiadora] });

	var grupo = new Grupo({ nombre: 'Servicios profesionales, técnicos, especializados y aquellos no incluídos en otros grupos',
		rubros: [despachante] });

	grupo.save(function (err) {
	    if (err) console.log(err);
	});
}

function getAllRubros(callback){
	Grupo.find(function(err, grupos) {
		console.log(grupos)
		console.log(err)
		var rubros = [];
		for(var idx in grupos){
			var rubrosGrupo = grupos[idx].rubros;
			for(var idx2 in rubrosGrupo){
				if(rubrosGrupo[idx2]["nombre"]) {
					rubros.push(rubrosGrupo[idx2]);
				}
			}
		}
		console.log("RUBROS " + rubros);
		callback(rubros);
	});

}

function getRubro(nombre) {

	Grupo.find({ rubros: {"$in" : [ { nombre: nombre }]} }, function(err, grupo) {
		if(err) console.log(err);
		return grupo.rubros;
	});
}

module.exports = {
	getRubro: getRubro,
	getAllRubros : getAllRubros
};
