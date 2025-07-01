use nominaAcme;
db.createCollection('empleados', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: [
                "tipoDeIdentificacion",
                "numeroIdentificacion",
                "nombres",
                "apellidos",
                "telefono",
                "email",
                "genero",
                "ciudad",
                "direccion",
                "activo"
            ],
            properties: {
                tipoDeIdentificacion: {
                    bsonType: "string", 
                    enum: ["CC", "TI", "PA", "CE"]
                },
                numeroIdentificacion: {
                    bsonType: "string", 
                    
                    
                },
                nombres: {
                    bsonType: "string"
                },
                apellidos: {
                    bsonType: "string"
                },
                telefono: {
                    bsonType: "string", 
                   
                    
                },
                email: {
                    bsonType: "string",
                    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
                    
                },
                genero: {
                    bsonType: "string",
                    enum: ["M", "F", "39tiposdegay"] 
                },
                ciudad: {
                    bsonType: "string" 
                },
                direccion: {
                    bsonType: "string"
                },
                activo: {
                    bsonType: "string",
                    enum: ["Y", "N"]
                }
            }
        }
    }
})
db.createCollection('contratos', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
             
                "codigo",
                "empleado", 
                "tipoContrato",
                "duracion",
                "cargo",
                "salarioBase",
                "activo"
            ],
            properties: {
                _id: { 
                    bsonType: "objectId",
                   
                },
                codigo: {
                    bsonType: "string", 
                    
                },
                empleado: { 
                    bsonType: "object",
                    required: ["id", "nombres", "apellidos"], 
                    properties: {
                        id: {
                            bsonType: "objectId",
                            
                        },
                        nombres: {
                            bsonType: "string",
                            
                        },
                        apellidos: {
                            bsonType: "string",
                            
                        }
                        
                    },
                   
                },
                tipoContrato: { 
                    bsonType: "object",
                    required: ["id", "nombre"],
                    properties: {
                        id: {
                            bsonType: "objectId",
                            
                        },
                        nombre: {
                            bsonType: "string",
                            
                        }
                    },
                    
                },
                duracion: {
                    bsonType: "int", 
                   
                },
                cargo: { 
                    bsonType: "object",
                    required: ["id", "nombre", "area"],
                    properties: {
                        id: {
                            bsonType: "objectId",
                            
                        },
                        nombre: {
                            bsonType: "string",
                            
                        },
                        area: { 
                            bsonType: "object",
                            required: ["id", "nombre"],
                            properties: {
                                id: {
                                    bsonType: "objectId",
                                    
                                },
                                nombre: {
                                    bsonType: "string",
                                    
                                }
                            },
                           
                        }
                    },
                    
                },
                salarioBase: {
                    bsonType: "long",
                    
                },
                activo: {
                    bsonType: "string",
                    enum: ["Y", "N"],
                    
                }
            }
        }
    }
})
db.createCollection('nominas', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                
                "codigo",
                "fecha_inicial",
                "fecha_final",
                "estado",
                "detalles_contratos" 
            ],
            properties: {
                
                codigo: {
                    bsonType: "string",
                    description: "Código identificador de la nómina (ej. NOM-2024-06-01)."
                },
                fecha_inicial: {
                    bsonType: "date",
                    description: "Fecha de inicio del período de la nómina."
                },
                fecha_final: {
                    bsonType: "date",
                    description: "Fecha de fin del período de la nómina."
                },
                estado: {
                    bsonType: "string",
                    enum: ["Creada", "Calculada", "Aprobada", "Pagada", "Anulada"],
                    description: "Estado actual de la nómina."
                },
                detalles_contratos: {
                    bsonType: "array",
                    description: "Array de objetos, cada uno conteniendo el detalle de nómina para un contrato/empleado.",
                    items: { 
                        bsonType: "object",
                        required: [
                            "contrato_id",
                            "empleado",
                            "contrato",
                            "conceptos",
                            "total_devengado",
                            "total_deducido",
                            "neto_a_pagar"
                        ],
                        properties: {
                            contrato_id: { 
                                bsonType: "objectId",
                                description: "ID del contrato al que se refiere este detalle de nómina."
                            },
                            empleado: { 
                                bsonType: "object",
                                required: ["id", "numeroIdentificacion", "nombres", "apellidos", "genero", "email"],
                                properties: {
                                    id: {
                                        bsonType: "objectId",
                                        description: "ID del empleado."
                                    },
                                    tipoDeIdentificacion: { 
                                        bsonType: "string",
                                        enum: ["CC", "TI", "PA", "CE"],
                                        description: "Tipo de identificación del empleado."
                                    },
                                    numeroIdentificacion: {
                                        bsonType: "string",
                                        description: "Número de identificación del empleado."
                                    },
                                    nombres: {
                                        bsonType: "string",
                                        description: "Nombres del empleado."
                                    },
                                    apellidos: {
                                        bsonType: "string",
                                        description: "Apellidos del empleado."
                                    },
                                    telefono: {
                                        bsonType: "string",
                                        description: "Número de teléfono del empleado."
                                    },
                                    email: {
                                        bsonType: "string",
                                        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
                                        description: "Email del empleado."
                                    },
                                    genero: {
                                        bsonType: "string",
                                        enum: ["M", "F", "Otro", "No Especificado"], 
                                        description: "Género del empleado."
                                    },
                                    ciudad: { 
                                        bsonType: "string",
                                        description: "Ciudad del empleado."
                                    },
                                    direccion: {
                                        bsonType: "string",
                                        description: "Dirección del empleado."
                                    }
                                }
                            },
                            contrato: { 
                                bsonType: "object",
                                required: ["id", "tipoContrato", "duracion", "cargo", "salarioBase"],
                                properties: {
                                    id: {
                                        bsonType: "objectId",
                                        description: "ID del contrato (original)."
                                    },
                                    codigo: { 
                                        bsonType: "string",
                                        description: "Código alfanumérico del contrato."
                                    },
                                    tipoContrato: {
                                        bsonType: "object",
                                        required: ["id", "nombre"],
                                        properties: {
                                            id: { bsonType: "objectId" },
                                            nombre: { bsonType: "string" }
                                        },
                                        description: "Tipo de contrato (ej. 'Término Fijo')."
                                    },
                                    duracion: {
                                        bsonType: "int",
                                        description: "Duración del contrato en meses."
                                    },
                                    cargo: {
                                        bsonType: "object",
                                        required: ["id", "nombre", "area"],
                                        properties: {
                                            id: { bsonType: "objectId" },
                                            nombre: { bsonType: "string" },
                                            area: {
                                                bsonType: "object",
                                                required: ["id", "nombre"],
                                                properties: {
                                                    id: { bsonType: "objectId" },
                                                    nombre: { bsonType: "string" }
                                                }
                                            }
                                        },
                                        description: "Cargo y área del empleado en este contrato."
                                    },
                                    salarioBase: {
                                        bsonType: "long", 
                                        description: "Salario base del contrato (valor en centavos/unidad mínima)."
                                    },
                                    activo: { 
                                        bsonType: "string",
                                        enum: ["Y", "N"],
                                        description: "Estado activo del contrato."
                                    }
                                }
                            },
                            conceptos: { 
                                bsonType: "array",
                                description: "Lista de conceptos (devengados y deducidos) para este contrato.",
                                items: {
                                    bsonType: "object",
                                    required: ["concepto_id", "tipo", "nombre", "valor"],
                                    properties: {
                                        concepto_id: {
                                            bsonType: "objectId",
                                            description: "ID del concepto de la colección de Conceptos."
                                        },
                                        tipo: {
                                            bsonType: "string",
                                            enum: ["DEV", "DED"], 
                                            description: "Tipo de concepto: DEV (Devengado) o DED (Deducido)."
                                        },
                                        nombre: {
                                            bsonType: "string",
                                            description: "Nombre del concepto (ej. 'Salario Básico', 'Salud')."
                                        },
                                        valor: {
                                            bsonType: "long", 
                                            description: "Valor del concepto (en centavos/unidad mínima)."
                                        }
                                    }
                                }
                            },
                            novedades: { 
                                bsonType: "array",
                                description: "Lista de novedades que afectan esta nómina para el contrato.",
                                items: {
                                    bsonType: "object",
                                    required: ["novedad_id", "tipo_novedad", "fecha_inicial", "fecha_final"],
                                    properties: {
                                        novedad_id: {
                                            bsonType: "objectId",
                                            description: "ID de la novedad (original)."
                                        },
                                        tipo_novedad: {
                                            bsonType: "object",
                                            required: ["id", "nombre"],
                                            properties: {
                                                id: { bsonType: "objectId" },
                                                nombre: { bsonType: "string" }
                                            },
                                            description: "Tipo de novedad (ej. 'Incapacidad')."
                                        },
                                        fecha_inicial: { bsonType: "date" },
                                        fecha_final: { bsonType: "date" },
                                        observaciones: {
                                            bsonType: "string",
                                            description: "Observaciones sobre la novedad."
                                        },
                                        impacto_en_nomina: {
                                            bsonType: "long", 
                                            description: "Valor del impacto de la novedad en la nómina (en centavos/unidad mínima)."
                                        }
                                    }
                                }
                            },
                            total_devengado: {
                                bsonType: "long", 
                            },
                            total_deducido: {
                                bsonType: "long",
                            },
                            neto_a_pagar: {
                                bsonType: "long",                                
                            }
                        }
                    }
                }
            }
        }
    }
})
db.createCollection('tipos_identificaciones', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "codigo", "nombre"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "ID único del tipo de identificación."
                },
                codigo: {
                    bsonType: "string",
                    description: "Código corto del tipo de identificación (ej. 'CC', 'TI')."
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre completo del tipo de identificación (ej. 'Cédula de Ciudadanía')."
                }
            }
        }
    }
});
db.createCollection('ciudades', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "nombre", "departamento_id"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "ID único de la ciudad."
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre de la ciudad."
                },
                departamento_id: { // Referencia al departamento al que pertenece
                    bsonType: "objectId",
                    description: "ID del departamento al que pertenece la ciudad."
                }
                // Opcional: Podrías embeber el nombre del departamento aquí para lecturas rápidas
                /*
                departamento: {
                    bsonType: "object",
                    required: ["id", "nombre"],
                    properties: {
                        id: { bsonType: "objectId" },
                        nombre: { bsonType: "string" }
                    },
                    description: "Información del departamento al que pertenece la ciudad."
                }
                */
            }
        }
    }
});
db.createCollection('departamentos', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "nombre"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "ID único del departamento."
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre del departamento."
                }
            }
        }
    }
});
db.createCollection('tipos_contratos', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "nombre"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "ID único del tipo de contrato."
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre del tipo de contrato (ej. 'Término Fijo', 'Indefinido')."
                }
            }
        }
    }
});
db.createCollection('areas', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "nombre"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "ID único del área."
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre del área (ej. 'Contabilidad', 'Ventas')."
                }
            }
        }
    }
});
db.createCollection('cargos', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "nombre", "area_id"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "ID único del cargo."
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre del cargo (ej. 'Analista', 'Gerente')."
                },
                area_id: { 
                    bsonType: "objectId",
                    description: "ID del área a la que pertenece el cargo."
                }
              
            }
        }
    }
});
db.createCollection('conceptos', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "nombre", "tipo", "porcentaje"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "ID único del concepto."
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre del concepto (ej. 'Salario Básico', 'Salud')."
                },
                tipo: {
                    bsonType: "string",
                    enum: ["DEV", "DED"], 
                    description: "Tipo de concepto: DEV (Devengado) o DED (Deducido)."
                },
                porcentaje: {
                    bsonType: "double", 
                    description: "Porcentaje asociado al concepto (ej. 0.04 para 4%)."
                },
                descripcion: {
                    bsonType: "string",
                    description: "Descripción detallada del concepto.",
                    
                }
            }
        }
    }
});
db.createCollection('tipos_novedades', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "nombre", "impacto"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "ID único del tipo de novedad."
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre del tipo de novedad (ej. 'Incapacidad', 'Ausencia Injustificada')."
                },
                impacto: {
                    bsonType: "string",
                    enum: ["Positivo", "Negativo", "Neutro"], // Cómo afecta la nómina
                    description: "Tipo de impacto de la novedad en la nómina."
                },
                descripcion: {
                    bsonType: "string",
                    description: "Descripción detallada del tipo de novedad."
                }
            }
        }
    }
});
// --- Índices para la colección 'empleados' ---
db.empleados.createIndex({ "numeroIdentificacion": 1 }, { unique: true, name: "idx_empleado_numeroIdentificacion_unique" });
db.empleados.createIndex({ "email": 1 }, { unique: true, name: "idx_empleado_email_unique" });
db.empleados.createIndex({ "apellidos": 1, "nombres": 1 }, { name: "idx_empleado_apellidos_nombres" });
db.empleados.createIndex({ "activo": 1 }, { name: "idx_empleado_activo" });

// --- Índices para la colección 'contratos' ---
db.contratos.createIndex({ "codigo": 1 }, { unique: true, name: "idx_contrato_codigo_unique" });
db.contratos.createIndex({ "empleado.id": 1 }, { name: "idx_contrato_empleadoId" });
db.contratos.createIndex({ "activo": 1 }, { name: "idx_contrato_activo" });
db.contratos.createIndex({ "tipoContrato.id": 1 }, { name: "idx_contrato_tipoContratoId" });
db.contratos.createIndex({ "cargo.id": 1 }, { name: "idx_contrato_cargoId" });

// --- Índices para la colección 'nominas' ---
db.nominas.createIndex({ "codigo": 1 }, { unique: true, name: "idx_nomina_codigo_unique" });
db.nominas.createIndex({ "fecha_final": -1, "fecha_inicial": -1 }, { name: "idx_nomina_fechas" });
db.nominas.createIndex({ "estado": 1 }, { name: "idx_nomina_estado" });
db.nominas.createIndex({ "detalles_contratos.empleado.id": 1 }, { name: "idx_nomina_detalles_empleadoId" });
db.nominas.createIndex({ "detalles_contratos.contrato_id": 1 }, { name: "idx_nomina_detalles_contratoId" });

// --- Índices para las colecciones de Catálogo (Lookup Tables) ---
db.tipos_identificaciones.createIndex({ "nombre": 1 }, { unique: true, name: "idx_tipoIdentificacion_nombre_unique" });
db.ciudades.createIndex({ "nombre": 1 }, { unique: true, name: "idx_ciudad_nombre_unique" });
db.departamentos.createIndex({ "nombre": 1 }, { unique: true, name: "idx_departamento_nombre_unique" });
db.tipos_contratos.createIndex({ "nombre": 1 }, { unique: true, name: "idx_tipoContrato_nombre_unique" });
db.areas.createIndex({ "nombre": 1 }, { unique: true, name: "idx_area_nombre_unique" });
db.cargos.createIndex({ "nombre": 1 }, { unique: true, name: "idx_cargo_nombre_unique" });
db.conceptos.createIndex({ "nombre": 1 }, { unique: true, name: "idx_concepto_nombre_unique" });
db.tipos_novedades.createIndex({ "nombre": 1 }, { unique: true, name: "idx_tipoNovedad_nombre_unique" });
