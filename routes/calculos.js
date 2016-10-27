var express = require('express');
var router = express.Router();
var app = express();

app.set('view engine', 'ejs');

var q = require('q');

/* GET home page. */
router.get('/:calculo', function(req, res, next) {
	var calculosMap = {
		'salario-líquido' : 'Salario líquido',
    'devolución-IRPF' : 'Devolución anual IRPF',
		'aguinaldo' :'Aguinaldo',
		'salario-vacacional' : 'Salario vacacional',
		'renuncia' : 'Renuncia',
		'despido' : 'Despido',
		'horas-extra' : 'Horas extra',
		'seguro-de-paro' : 'Seguro de paro',
		'licencia-paternal' : 'Licencia por paternidad',
		'licencia-estudio' : 'Licencia por estudio',
		'licencia-adopción' : 'Licencia por adopción',
		'licencia-matrimonio' : 'Licencia por matrimonio',
		'licencia-duelo' : 'Licencia por duelo',
		'licencia-maternal' : 'Licencia maternal',
    'leyes-relacionadas' : 'Leyes relacionadas',
    'licencias-especiales': 'Licencias especiales'
	};
	var key = req.param('calculo');

  if(calculosMap[key]){
    obtenerDescripcionConcepto(calculosMap[key]).then(function(descripcion) {
      res.render('calculos/calculador', { title: 'Express', aCalcular: calculosMap[key], key: key, descripcion: descripcion});
    });
  }else{
  	res.render('error', {
  	  message: 'No se encontro el calculo',
  	  error: '404'
  	});
  }
});

function obtenerDescripcionConcepto(concepto) {
  var deferred = q.defer();
	switch(concepto) {

                case "Aguinaldo":
                    app.render('descripciones/aguinaldo', function(err, html) {
                      deferred.resolve(html);
                    });
                case "Salario vacacional":
                    app.render('descripciones/salario_vacacional', function(err, html) {
                      deferred.resolve(html);
                    });
                case "Horas extra":
                    app.render('descripciones/horas_extra', function(err, html) {
                      deferred.resolve(html);
                    });
                case "Renuncia":
                    app.render('descripciones/renuncia', function(err, html) {
                      deferred.resolve(html);
                    });
                case "Despido":
                    app.render('descripciones/despido', function(err, html) {
                      deferred.resolve(html);
                    });
                case "Licencia por estudio":
                    app.render('descripciones/licencia_estudio', function(err, html) {
                      deferred.resolve(html);
                    });
                case "Licencia por paternidad":
                    app.render('descripciones/licencia_paternal', function(err, html) {
                      deferred.resolve(html);
                    });
                case "Licencia por matrimonio":
                    app.render('descripciones/licencia_matrimonio', function(err, html) {
                      deferred.resolve(html);
                    });
                case "Licencia por duelo":
                    app.render('descripciones/licencia_duelo', function(err, html) {
                      deferred.resolve(html);
                    });
                case "Licencia por adopción":
                    app.render('descripciones/licencia_adopcion', function(err, html) {
                      deferred.resolve(html);
                    });
                case "Licencias especiales":
                  app.render('descripciones/licencias_especiales', function(err, html) {
                      deferred.resolve(html);
                  });
                case "Licencia maternal":
                  app.render('descripciones/licencia_maternal', function(err, html) {
                      deferred.resolve(html);
                  });
                case "Leyes relacionadas":
                  app.render('descripciones/leyes_asociadas', function(err, html) {
                      deferred.resolve(html);
                  });
                case "Seguro de paro":
                  app.render('descripciones/seguro_paro', function(err, html) {
                      deferred.resolve(html);
                  });
                case "Salario líquido":
                  app.render('descripciones/salarioliquido', function(err, html) {
                      deferred.resolve(html);
                  });

                case "Devolución anual IRPF":
                  deferred.resolve("");
             }
             return deferred.promise;
}

module.exports = router;
