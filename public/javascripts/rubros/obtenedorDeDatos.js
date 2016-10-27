define(function () {

    var api = {
    	/*Obtiene los rubros del server*/
    	obtenerRubros : function(call){
    		$.ajax({
    			url:'/rubros',
    			method:'GET',
    			success:function(data) {
    				call(data);
    			}
    		});
    	}
    }

    return api;
});