define(function (require) {

	var alSolicitarUnCalculo = [];

	var alCalcular = [];

	$('#calcularValorSelect').change(function(evt){
		var value = $(this).val();
		for(var idx in alSolicitarUnCalculo){
			alSolicitarUnCalculo[idx](value);
		}
	});

	$('.nav-tabs').on('shown.bs.tab', function(event){
        var x = $(event.target).text();
        if(x === "Resultado" && !event.target.hasClass('disabled')) {
            var datos = {};
            $.each($('.required-data'), function(clave, valor) {
           		datos[$(this).attr('data-key')] = datos[$(this).attr('data-key')] || {};

                if($(this).attr('type') == 'checkbox') {
                    datos[$(this).attr('data-key')][$(this).attr('name')] = $(this).is(":checked");
                }else if($(this).attr('type') == 'radio'){
                	if($(this).is(":checked")){
            	        datos[$(this).attr('data-key')][$(this).attr('name')] = $(this).val();
                	}
                } else {
                    datos[$(this).attr('data-key')][$(this).attr('name')] = $(this).val();
                }
            });
            var concepto = calculoKey;
			for(var idx in alCalcular){
				alCalcular[idx](datos, concepto);
			}
        }
    });
   
	$(document).on('click', '#result', function(evt){
		var datos = {};
            $.each($('.required-data'), function(clave, valor) {
           		datos[$(this).attr('data-key')] = datos[$(this).attr('data-key')] || {};

                if($(this).attr('type') == 'checkbox') {
                    datos[$(this).attr('data-key')][$(this).attr('name')] = $(this).is(":checked");
                }else if($(this).attr('type') == 'radio'){
                	if($(this).is(":checked")){
            	        datos[$(this).attr('data-key')][$(this).attr('name')] = $(this).val();
                	}
                } else {
                    datos[$(this).attr('data-key')][$(this).attr('name')] = $(this).val();
                }
            });
            var concepto = calculoKey;
			for(var idx in alCalcular){
                setTimeout(function() {
                    alCalcular[idx](datos, concepto);
                }, 0);
				
			}
	});


    return {
    	alSolicitarUnCalculo : function(fn){
    		alSolicitarUnCalculo.push(fn);
    	}, 
    	alCalcular : function(fn) {
    		alCalcular.push(fn);
    	}
    }
});