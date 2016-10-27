var express = require('express');
var router = express.Router();
var actividades = require('./../components/actividades')

/**
 * @api {get} /actividades Actividades
 * @apiDescription Obtiene todas las actividades disponibles de la Clasificación Internacional Industrial uniforme
 * @apiName ObtenerActividades
 * @apiGroup Actividades
 *
 * @apiParam {String} [descripcion]  Descripcion de la actividad.
 * @apiParam {String} [ciuo]  Codigo CIIU de la actividad.
 * @apiSampleRequest /actividades
 * @apiSuccess {String} ciuo Codigo de la actividad.
 * @apiSuccess {String} descripcion Grupo en la cual se encuetra la actividad.
 */
router.get('/', function(req, res, next) {
	actividades
		.obtenerActividades(req)
		.spread(function (rows) {
  			res.send(rows);
		});
});

/**
 * @api {get} /actividades/:id Actividad
 * @apiDescription Obtiene una actividad
 * @apiName ObtenerActividad
 * @apiGroup Actividades
 *
 * @apiSampleRequest /actividades
 * @apiSuccess {String} grupo Descripcion de la clasficiacion.
 * @apiSuccess {String} ciuo Codigo de la clasificacion.
 * @apiSuccess {String} descripcion Grupo en la cual se encuetra la ocupacion.
 */
router.get('/:ciiu', function(req, res, next) {
	actividades
		.obtenerActividades(req)
		.spread(function (rows) {
  			res.send(rows);
		});
});

/**
 * @apiIgnore Not finished Method
 * @api {get} /actividades/:id/estadisticas Estadisticas de actividad
 * @apiDescription Obtiene las estadisticas de una actividad
 * @apiName ObtenerEstadisticaActividad
 * @apiGroup Actividades
 *
 * @apiSampleRequest /actividades/:id/estadisticas
 * @apiSuccess {String} ciuo Clasificación Internacional Uniforme de Ocupaciones
 * @apiSuccess {String} ciiu Clasificación Internacional Industrial uniforme
 * @apiSuccess {Int} promedio Grupo en la cual se encuetra la ocupacion.
 * @apiSuccess {Int} maximo Grupo en la cual se encuetra la ocupacion.
 */
router.get('/:ciiu/estadisticas', function(req, res, next) {
	actividades
		.obtenerEstadisticas(req)
		.spread(function (rows) {
  			res.send(rows);
		});
});


module.exports = router;
