define(function (require) {
    var $ = require('jquery');
    var ejs = require('ejs');

    require('typeahead');

    var templates = {
        datosDeRubro : require('text!rubros/templates/infoRubro.ejs')
    };

    var domIds = {
        infoSubRubro : '#info-sub-rubro'
    };
    
    var opciones;
    var rubrosActuales;
    var rubroActual;
    var subRubros;
    var subRubro;

    var alSolicitarUnSubRubro = [];

    //Helpers
    function appendSubRubros(rubro){
        $.each(rubro.sub_rubros,function(clave,valor){
            $('<option/>',{
                value: valor.nombre
            }).appendTo('#subRubro');
        });
        subRubros = rubro.sub_rubros;
    }

    function findRubro(rubroName) {
        for(var idx in rubrosActuales){
            var rubro = rubrosActuales[idx];
            if(rubro.nombre === rubroName){
                return rubro;
            }
        }
        return null;
    }

    function findSubRubro(subRubroName) {
        for(var idx in subRubros) {
            var subRubro = subRubros[idx];
            if(subRubro.nombre === subRubroName) {
                return subRubro;
            }
        }
        return null;
    }

    function dibujarInfoOcupacion(ocupacion){
        //Que es esto?
        // Esto es un motor de html
        // Sirve para no escribir todo el html por javascript
        // Le paso un template, variables y el loco me devuelve el html pronto
        var html = new EJS({text: templates.datosDeRubro}).render({ ocupacion : ocupacion});
        $(domIds.infoSubRubro).html(html);
        $(domIds.infoSubRubro).show();

        for(var idx in alSolicitarUnSubRubro){
            alSolicitarUnSubRubro[idx](ocupacion);
        }
    }
    
    $('input[name="ocupacion"]').autoComplete({
        source: function(term, response){
            $.getJSON('/ocupaciones', { descripcion: term }, 
                function(data){ 
                    response(data); 
            });
        },
        renderItem: function (item, search){
            search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
            return '<div class="autocomplete-suggestion" data-id="'+item['CIUO']+'" data-descripcion="'+item['DESCRIPCION']+'" data-ciuo="'+item['CIUO']+'" data-val="'+item['DESCRIPCION']+'">'+item['DESCRIPCION'].replace(re, "<b>$1</b>")+'</div>';
        },
        onSelect: function(e, term, item){
            var data = {};
            $.when(
                $.getJSON('/ocupaciones/'+item.data('id')+'/estadisticas?years[]=2015&years[]=2014&years[]=2013&years[]=2012&years[]=2011'), 
                $.getJSON('/ocupaciones/'+item.data('id')+'/salarios?years[]=2015&years[]=2014&years[]=2013&years[]=2012&years[]=2011'))
              .then(function(estadisticas, salarios){
                dibujarInfoOcupacion({
                    nombre : item.data('descripcion'),
                    estadisticas : estadisticas[0],
                    salarios: salarios[0]
                })
              });
        }
    });

    $('input[name="actividad"]').autoComplete({
        source: function(term, response){
            $.getJSON('/actividades', { descripcion: term }, 
                function(data){ 
                    response(
                    data.map(function(obj){
                        return obj['DESCRIPCION'];
                    })
                ); 
            });
        }
    });

    var api = {
        dibujarSubRubro : function(subRubro){
            $('#sueldoMinimoContainer').show();
            $('#sueldoMinimo').html(subRubro.sueldo_minimo);
            $('#ingresoCalculo').show();
            $('#main').hide();
        },

        alSolicitarUnSubRubro : function(fn){
            alSolicitarUnSubRubro.push(fn);
        }
    }

    return api;
});