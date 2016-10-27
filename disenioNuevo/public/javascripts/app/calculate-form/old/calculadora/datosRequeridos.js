define(function () {
    return {
        "aguinaldo" : [
	        {
	        	name : "Últimos ingresos",
	        	key : "ingresos_aguinaldo",
	        	type : "text"
	        },
	        {	
	        	name : "Cónyuge/concubino",
	        	key  : "conyuge_cargo",
	        	type : "checkbox"
	        }
        ],
        "salario-vacacional" : [
        	{
	        	name : "Sueldo",
	        	key  : "sueldo",
	        	type : "text"
	        },
        	{
        		name : "Fecha de ingreso",
	        	key  : "fecha_de_ingreso",
	        	type : "date"
        	}, 
            {
                name : "Hijos menores/discapacitados",
                key  : "tiene_hijos",
                type : "checkbox"
            },
            {   
                name : "Cónyuge/concubino",
                key  : "conyuge_cargo",
                type : "checkbox"
            }

        ], 
        "horas-extra" : [
        	{
	        	name : "Sueldo",
	        	key  : "sueldo",
	        	type : "text"
	        },
        	{
        		name : "Horas trabajadas",
        		key  : "horas_trabajadas",
        		type : "text"
        	},
        	{
        		name : "Días hábiles",
        		key  : "horas_extra_dias_habiles",
        		type : "text"
        	},
        	{
        		name : "Feriados o descanso",
        		key  : "horas_extra_feriados_descanso",
        		type : "text"
        	}, 
            {
                name : "Hijos menores/discapacitados",
                key  : "tiene_hijos",
                type : "checkbox"
            },
            {   
                name : "Cónyuge/concubino",
                key  : "conyuge_cargo",
                type : "checkbox"
            }
        ], 
        "salario-líquido" : [
            {
                name : "Ingresos",
                key  : "ingresos",
                type : "custom"
            },
            {
                name : "Horas extra",
                key  : "horas_extra",
                type : "custom"
            },
            {
                name : "Hijos menores/discapacitados",
                key  : "cantidad_hijos",
                type : "custom"
            },
            {
                name : "Profesionales",
                key  : "profesionales",
                type : "custom"
            },
            {
                name : "Otros datos",
                key  : "otros_datos",
                type : "text"
            },
            {   
                name : "Cónyuge/concubino",
                key  : "conyuge_cargo",
                type : "checkbox"
            }
        ],
        "renuncia": [
            {
                name : "Sueldo",
                key  : "sueldo_liquido",
                type : "text"
            },
            {
                name : "Fecha de renuncia",
                key : "fecha_de_renuncia",
                type : "date"
            },
            {
                name : "Fecha de ingreso",
                key : "fecha_de_ingreso",
                type : "date"
            },
            {
                name : "Licencia no gozada",
                key : "dias_licencia_pendientes",
                type : "text"
            },
            {
                name : "Hijos menores/discapacitados",
                key  : "tiene_hijos",
                type : "checkbox"
            },
            {   
                name : "Cónyuge/concubino",
                key  : "conyuge_cargo",
                type : "checkbox"
            }
        ],
        "despido": [
            {
                name : "Sueldo",
                key  : "sueldo_liquido",
                type : "text"
            },
            {
                name : "Fecha de despido",
                key : "fecha_de_despido",
                type : "date"
            },
            {
                name : "Fecha de ingreso",
                key : "fecha_de_ingreso",
                type : "date"
            },
            {
                name : "Licencia no gozada",
                key : "dias_licencia_pendientes",
                type : "text"
            },
            {
                name : "Hijos menores/discapacitados",
                key  : "tiene_hijos",
                type : "checkbox"
            },
            {   
                name : "Cónyuge/concubino",
                key  : "conyuge_cargo",
                type : "checkbox"
            }
        ],
        "Licencia por estudio": [
        ],
        "Licencia por matrimonio": [
        ],
        "Licencia por duelo": [
        ],
        "Licencia por paternidad": [
        ],
        "Licencia por adopción y legitimación adoptiva": [
        ],
        "Licencia por maternidad": [
        ],
        "Licencias especiales": [
        ],
        "seguro-de-paro": [
            {
                name : "Causal del subsidio",
                key  : "causal_subsidio",
                type : "custom"
            },
            {
                name : "Últimos ingresos",
                key  : "ultimos_ingresos",
                type : "custom"
            },
            {
                name : "Horas diarias",
                key  : "horas_diarias",
                type : "custom"
            },
            {
                name : "Aplica suplemento",
                key  : "aplica_suplemento",
                type : "checkbox"
            }
        ],
        "descanso-semanal": [
            {
                name : "Descanso semanal",
                key  : "descanso_semanal",
                type : "custom"
            }
        ],
        "devolución-IRPF": [
            {
                name : "Ingresos",
                key  : "ingresos_dev_irpf",
                type : "custom"
            },
            {
                name : "Hijos menores/discapacitados",
                key  : "cantidad_hijos",
                type : "custom"
            },
            {
                name : "Profesionales",
                key  : "profesionales",
                type : "custom"
            },
            {
                name : "Otros datos",
                key  : "otros_datos_dev_irpf",
                type : "custom"
            },
            {
                name : "Aportes del año",
                key  : "aportes_del_año",
                type : "custom"
            }
        ]
    };
});