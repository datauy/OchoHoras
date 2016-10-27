var express = require('express');
var router = express.Router();
var ocupaciones = require('./../components/ocupaciones')

/**
 * @api {get} /ocupaciones Ocupaciones
 * @apiDescription Obtiene todas las ocupaciones disponibles de la Clasificación Internacional Uniforme de Ocupaciones
 * @apiName ObtenerOcupaciones
 * @apiGroup Ocupaciones
 *
 * @apiParam {String} [descripcion]  Descripcion de la ocupacion.
 * @apiParam {String} [ciuo]  Codigo CIUO de la ocupacion.
 * @apiParam {String} [grupo]  Grupo en la cual se encuetra la ocupacion.
 * @apiSampleRequest /ocupaciones
 * @apiSuccess {String} grupo Descripcion de la clasficiacion.
 * @apiSuccess {String} ciuo Codigo de la clasificacion.
 * @apiSuccess {String} descripcion Grupo en la cual se encuetra la ocupacion.
 */
router.get('/', function(req, res, next) {
	ocupaciones
		.obtenerOcupaciones(req)
		.spread(function (rows) {
  			res.send(rows);
		});
});

/**
 * @api {get} /ocupaciones/:id Ocupacion
 * @apiDescription Obtiene una ocupacion
 * @apiName ObtenerOcupacion
 * @apiGroup Ocupaciones
 *
 * @apiSampleRequest /ocupaciones
 * @apiSuccess {String} grupo Descripcion de la clasficiacion.
 * @apiSuccess {String} ciuo Codigo de la clasificacion.
 * @apiSuccess {String} descripcion Grupo en la cual se encuetra la ocupacion.
 */
router.get('/:id', function(req, res, next) {
	ocupaciones
		.obtenerOcupaciones(req)
		.spread(function (rows) {
  			res.send(rows);
		});
});

/**
 * @api {get} /ocupaciones/:id/estadisticas Estadisticas de na ocupacion
 * @apiDescription Obtiene las estadisticas de una ocupacion
 * @apiName ObtenerEstadisticaOcupacion
 * @apiGroup Ocupaciones
 * @apiParam {Array} [years='[2014]']  Año de la estadistica
 * @apiSampleRequest /ocupaciones/:id/estadisticas
 * @apiSuccess {Id} grupo Descripcion de la clasficiacion.
 * @apiSuccess {Ciiu} ciuo Codigo de la clasificacion.
 * @apiSuccess {Ciuo} descripcion Grupo en la cual se encuetra la ocupacion.
 * @apiSuccess {Promedio} descripcion Grupo en la cual se encuetra la ocupacion.
 * @apiSuccess {Maximo} descripcion Grupo en la cual se encuetra la ocupacion.
 */
router.get('/:id/estadisticas', function(req, res, next) {
	ocupaciones
		.obtenerSalarios(req)
		.then(function (rows) {
  			res.send(ocupaciones.calcularEstadisticas(rows));
		});
});

/**
 * @api {get} /ocupaciones/:id/salarios Salarios de una ocupacion
 * @apiDescription Obtiene los salarios de una ocupacion
 * @apiName ObtenerSalariosOcupacion
 * @apiGroup Ocupaciones
 * @apiParam {Array} [years='[2014]']  Año de la estadistica
 * @apiSampleRequest /ocupaciones/:id/estadisticas
 * @apiSuccess {Id} grupo Descripcion de la clasficiacion.
 * @apiSuccess {Ciiu} ciuo Codigo de la clasificacion.
 * @apiSuccess {Ciuo} descripcion Grupo en la cual se encuetra la ocupacion.
 * @apiSuccess {Promedio} descripcion Grupo en la cual se encuetra la ocupacion.
 * @apiSuccess {Maximo} descripcion Grupo en la cual se encuetra la ocupacion.
 */
router.get('/:id/salarios', function(req, res, next) {
	ocupaciones
		.obtenerSalarios(req)
		.then(function (rows) {
  			res.send(rows);
		});
});

/**
 * @api {get} /ocupaciones/:id/salarios Salarios de una ocupacion
 * @apiDescription Obtiene los salarios de una ocupacion
 * @apiName ObtenerSalariosOcupacion
 * @apiGroup Ocupaciones
 * @apiParam {Array} [years='[2014]']  Año de la estadistica
 * @apiSampleRequest /ocupaciones/:id/estadisticas
 * @apiSuccess {Id} grupo Descripcion de la clasficiacion.
 * @apiSuccess {Ciiu} ciuo Codigo de la clasificacion.
 * @apiSuccess {Ciuo} descripcion Grupo en la cual se encuetra la ocupacion.
 * @apiSuccess {Promedio} descripcion Grupo en la cual se encuetra la ocupacion.
 * @apiSuccess {Maximo} descripcion Grupo en la cual se encuetra la ocupacion.
 */
router.get('/:id/consejo-salarios', function(req, res, next) {
	ocupaciones
		.obtenerEncuestaHogares(req)
		.spread(function (rows) {
  			res.send(rows);
		});
});


module.exports = router;
