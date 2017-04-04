define(function (require) {

    var $ = require('jquery');

    var api = {
    	dibujarDatosRequeridos : function(datosRequeridos, concepto){
    		$("div#tabs ul").empty();
            $("div#tab-content").empty();
            $('#rubro-data').hide();
            $('#result-div').show();
            var ticks = {};
            if(datosRequeridos && datosRequeridos.length>0 && (concepto.indexOf('licencia') == -1 || concepto.indexOf('leyes') == -1)) {
        		$.each(datosRequeridos, 
        		    function(clave,valor){

                        $("#tabs-ul").append(
                            "<li><a data-toggle='tab' data-key='" + clave + "'href='#tab" + clave + "'>" + valor.name + "</a><span data-key='" + clave + "'class='icon-ok glyphicon glyphicon-ok' style='display: none;'></span></li>"
                        );

                        var htmlContenido = obtenerHtmlParaDato(valor.key,clave);
                        if(clave == datosRequeridos.length-1) {
                            $("div#tab-content").append(
                            "<div id='tab" + clave + "' class='tab-pane fade in'>" +
                            htmlContenido + 
                            "<button class='btn next-button disabled' type='button' id='siguiente"+ clave + "'>Siguiente</button></div>"
                        );
                        } else {
                            $("div#tab-content").append(
                                "<div id='tab" + clave + "' class='tab-pane fade in'>" +
                                htmlContenido + 
                                "<button class='btn next-button enabled' type='button' id='siguiente"+ clave + "'>Siguiente</button></div>"
                            );

                        }
                        angular.element(document).ready(function () {
                            angular.element(document.getElementById('tab-content')).injector().invoke(
                            [
                                "$compile", function($compile) {
                                    var scope = angular.element(document.getElementById('tab-content')).scope();
                                    $compile(document.getElementById('tab-content'))(scope);
                                }
                            ]);
                        });
                        asociarEventosADatos(valor.key);

                        $('#siguiente'+clave).click(function(){
                            $('.nav-pills > .active').next('li').find('a')[0].click();
                            $('.icon-ok[data-key="' + clave + '"]').show('fast');
                            if(!(valor.name in ticks)) {
                                ticks[valor.name] = valor.name;
                            }
                            if(Object.keys(ticks).length == (datosRequeridos.length-1)) {
                                $('#result-li').attr('class', 'enabled');
                                $('#siguiente' + (datosRequeridos.length-1)).attr('class', 'btn next-button enabled');
                            }
                        });

                        
                             
                    }
                );


                $("ul#tabs-ul li:first-of-type").addClass('active');
                $("div#tab-content .tab-pane:first-of-type").addClass('active');

                $("#tabs-ul").append(
                    "<li id='result-li' class='disabled'><a id='result' data-toggle='tab' href='#tabResult'>Resultado</a></li>"
                    );

                $('.nav-pills li a').click(function(){
                    $('.nav-pills li.active').find('.icon-ok').show();
                    var clave = $('.nav-pills li.active').find('a').html();
                    if(!(clave in ticks)) {
                        ticks[clave] = clave;
                    }
                    if(Object.keys(ticks).length == (datosRequeridos.length-1)) {
                        debugger;
                        $('#result-li').attr('class', 'enabled');
                        $('#siguiente' + (datosRequeridos.length-1)).attr('class', 'btn next-button enabled');
                    }
                });

                $('#datosRequeridos').change(function(){
                    var idx = $(this).find(":selected").attr('idx');
                    $('.required-data-input').hide();
                    $('#required-data-'+idx).show();
                });
            } else {
                $("#reslut-div").css('display', 'none');
                $("#tabs").css('display', 'none');
                $(".panel-result").css('display', 'none');
            }

            $('#conceptoTexto').text(concepto);
            
    	},

        dibujarResultado: function(resultado, concepto) {
            //if(!$("#result-li").hasClass("disabled")) {
                $("div#tab-content").empty();
                var splitted= concepto.split('-').join(' ');
                var concepto = splitted.charAt(0).toUpperCase() + splitted.slice(1);
                $("div#tab-content").append("<h5 style='font-size:25px;margin-top:30px'>"+ concepto.split('-').join(' ') + "</h5>");
              //  $('#resultadoCalculo').append('<span id="resultado">'+ resultado +'</span>');
                var htmlResultado = "";
                if(concepto == "Salario vacacional") {
                    htmlResultado = "<div id='tabResult' class='tab-pane fade in active'> <h5 id='resultadoCalculo'>Salario vacacional: "+ resultado[0] + "</h5> <h5 id='resultadoCalculo2'> Días de licencia: "+ resultado[1] + "</h5></div>";
                } else {
                    htmlResultado = "<div id='tabResult' class='tab-pane fade in active'> <h5 id='resultadoCalculo'>"+ resultado + "</h5> </div>";             
                }

                var templates = {
                    resultado : require('text!templates/resultado.ejs')
                };
                htmlResultado = new EJS({text: templates.resultado}).render({ items : resultado });
             
                $("div#tab-content").append(htmlResultado);
           // }
                
        }
    }

    function obtenerHtmlParaDato(dato, clave) {

        var templates = {
            datos : require('text!templates/datos.ejs')
        };
        var html = new EJS({text: templates.datos}).render({ dato : dato, clave: clave });
        return html;
    }

    function asociarEventosADatos(dato) {
        var templates = {
            inputsIngresos : require('text!templates/inputsIngresos.ejs')
        };
        var numeroInputs = 1;
        switch(dato) {
            case 'ingresos_dev_irpf':
                $('#agregar-input-ingreso').click(function(evt) {
                    var coso = new EJS(
                            {
                                text: templates.inputsIngresos
                            }).render(
                                { 
                                    numero: numeroInputs, 
                                    clave: dato 
                                }
                            )
                    $('#mas-inputs').append(
                        coso
                    );
                    numeroInputs++;
                });
                break;
            case 'profesionales':
                $('#calcular-fondo-solidaridad').on('click', function(event) {
                    $('.adicional_fondo_select').css('display', 'none');
                    for(var i=0; i<6; i++) {
                        $('#adicional_fondo_label' + i).css('display', 'none');
                    }
                    $('#calculos-fondo-solidaridad').append("<label style='display: block; "+
                        "margin-top:20px; margin-left: 70px;' class='input-data-normal-weight'>Duración de la carrera profesional (años)</label><input "+
                        "type=text placeholder='Duración de la carrera' data-key=duracion_carrera "+
                        "class='form-control ingresos-custom required-data-input required-data' id= 'required-data-"+
                        "<%= clave %>' name='duracion-carrera' value='0' style='margin-top:5px; margin-left: 70px !important;'> "+
                        "</input>");
                    $('#calculos-fondo-solidaridad').append("<label style='display: block; " +
                        "margin-top: 15px; margin-left: 70px;' class='input-data-normal-weight'>Años desde egreso de la carrera</label><input " +
                        "type=text placeholder='Años desde egreso' data-key=años_desde_egreso "+
                        "class='form-control ingresos-custom required-data-input required-data' id= 'required-data-"+
                        "<%= clave %>' name='años-desde-egreso' value='0' style='margin-top:5px; margin-left: 70px !important;'> "+
                        "</input>");

                    $('#calculos-fondo-solidaridad').append("<label class='input-data-normal-weight' style='margin-left: 70px;'>"+
                        "Institución donde estudiaste</label>"
                        +"<select data-key='instituto-estudio' id='required-data-<%= clave %>'"
                        +" name='instituto-estudio' class='required-data-input required-data "
                        +"form-control' style='display: block; margin-top:5px; margin-left: 70px;'>" 
                          +"<option value='udelar'>UDELAR</option>"
                        +"<option value='cetp-utu'>CETP-UTU</option>"
                          +"<option value='utec'>UTEC</option>"
                      +"</select>");
                    $('#calcular-fondo-solidaridad').css('display', 'none');
                });
                break;
            case 'ingresos_aguinaldo':
                $('.semestre_aguinaldo_select').on('change', function(event){
                    var value = $(this).val();
                    var meses = [];
                    if(value === 'primero') {
                        meses = ["diciembre", "enero", "febrero", "marzo", "abril", "mayo"];
                    } else {
                        meses = ["junio", "julio", "agosto", "setiembre", "octubre", "noviembre"];
                    }
                    $('#ingresos_aguinaldo_div').empty();
                    $('#ingresos_aguinaldo_div').append("<label style='display: inline-block; font-weight: 300; margin-left: 70px;'> Ingreso nominal " + meses[0] + "</label>" +
                   " <div style='margin-left: 70px;'> <div class='input-group-addon input-group-addon-currency'>UYU</div>"+
        "<input type='text' placeholder='Ingreso nominal' data-key=aguinaldo_0 class='form-control ingresos-custom " + 
        "required-data-input required-data input-to-copy' id= 'required-data-00' name='aguinaldo-0'" +
         " value='0'> </input>"+
        " <button type='button' id='copiar' style='margin-left: 15px;' class='btn'>Copiar</button>"+
        "<button type='button' id='copiar-todos' style='margin-left: 15px;' class='btn'>Copiar a todos</button>"+
      "</div>");


                    for(var i=1; i<meses.length; i++) {
                        $('#ingresos_aguinaldo_div').append("<label style='display: inline-block; font-weight: 300; margin-left: 70px;'> Ingreso nominal " + meses[i] + "</label>" +
                   " <div style='margin-left: 70px;'>"+
        "<div class='input-group-addon input-group-addon-currency'>UYU</div>"+
        "<input type='text' placeholder='Ingreso nominal' data-key=aguinaldo_" + i + " class='form-control ingresos-custom " + 
        "required-data-input required-data input-to-copy' id= 'required-data-<%= clave %>'" + i + " name='aguinaldo-" + i + "'" +
         " value='0'> </input></div>");
                    }
                });
                $('#copiar').on('click', function(event) {
                    var inputToCopy = document.getElementById("required-data-00");
                    inputToCopy.setSelectionRange(0, inputToCopy.value.length);
                    var copysuccess;
                    try{
                        copysuccess = document.execCommand("copy");
                    } catch(e){
                        copysuccess = false
                    }
                });
                $('#copiar-todos').on('click', function(event) {
                    var valorInput = $('#required-data-00').val();
                    for (var i = 0; i < 6; i++) {
                        $('#required-data-0' + i).val(valorInput);
                    };
                });
                break;
            case 'causal_subsidio':
                $('.causal_select').on('change', function(event){
                    var value = $(this).val();
                    if(value === 'reduccion') {
                        $('#ingresos_seguro_paro').append("<h3 style='margin-top:0px; display: inline-block;'>¿Cuáles fueron tus ingresos en el mes a "+ 
                        "calcular?</h3> <span class='glyphicon glyphicon-info-sign' data-toggle='tooltip' title='No debes incluir el aguinaldo"+ 
                        " ni tampoco los feriados pagos'" +
                        "data-placement='right'></span><input type=text placeholder='Ingresos' data-key=ingresos_seguro_paro"+
                        " class='ingresos-custom required-data-input required-data' id= 'required-data-<%= clave %>'"
                        + " name='ingresos-seguro-paro' value='0' style='margin-top: 20px !important;'></input>");
                    } else {
                        $('#ingresos_seguro_paro').empty();
                    }
                });
                break;
            case 'otros_datos_dev_irpf':
                $('.input_reduccion_nf_si').on('click', function(event) {
                    $('#reduccion_nf_adicional').css('display', 'block');
                });
                $('.input_reduccion_nf_no').on('click', function(event) {
                    $('#reduccion_nf_adicional').css('display', 'none');
                });
                break;
            case 'ultimos_ingresos':
                $('#copiar-seg-paro').on('click', function(event) {
                    var inputToCopy = document.getElementById("required-data-10");
                    inputToCopy.setSelectionRange(0, inputToCopy.value.length);
                    var copysuccess;
                    try{
                        copysuccess = document.execCommand("copy");
                    } catch(e){
                        copysuccess = false
                    }
                });
                $('#copiar-todos-seg-paro').on('click', function(event) {
                    var valorInput = $('#required-data-10').val();
                    for (var i = 1; i < 6; i++) {
                        $('#required-data-1' + i).val(valorInput);
                    };
                });
                break;
            case 'ingresos': 
                $('.mes_calculo_select').on('change', function(event){
                    var value = $(this).val();
                    if(value === 'diciembre' || value === 'junio') {
                        $('#aguinaldo_salario').css('display', 'block');
                    } else {
                        $('#aguinaldo_salario').css('display', 'none');
                    }
                });
                break;
            case 'sueldo_liquido': 
                $('#calcular-salario').click(function() {
                    var url = window.location.href;
                    var newUrl = url.split('/');
                    window.location.href = newUrl[0] + "//" + newUrl[2] +"/"+ newUrl[3] + "/salario-líquido";
                });
        }

    }

    return api;
});

