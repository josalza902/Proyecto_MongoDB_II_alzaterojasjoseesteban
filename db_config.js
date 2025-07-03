use (nominaAcme);
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
        _id: { bsonType: "objectId" },
        codigo: { bsonType: "string" },
        empleado: {
          bsonType: "object",
          required: ["id", "nombres", "apellidos"],
          properties: {
            id: { bsonType: "objectId" },
            nombres: { bsonType: "string" },
            apellidos: { bsonType: "string" },
            telefono: { bsonType: "string" },
            email: {
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$"
            },
            genero: {
              bsonType: "string",
              enum: ["M", "F", "39tiposdegay"]
            },
            ciudad: { bsonType: "string" },
            direccion: { bsonType: "string" },
            activo: {
              bsonType: "string",
              enum: ["Y", "N"]
            }
          }
        },
        tipoContrato: {
          bsonType: "object",
          required: ["id", "nombre"],
          properties: {
            id: { bsonType: "objectId" },
            nombre: { bsonType: "string" }
          }
        },
        duracion: { bsonType: "int" },
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
          }
        },
        salarioBase: { bsonType: "long" },
        activo: {
          bsonType: "string",
          enum: ["Y", "N"]
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
            }
        }
    }
}

)
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
                departamento_id: { 
                    bsonType: "objectId",
                    description: "ID del departamento al que pertenece la ciudad."
                },             
                departamento: {
                    bsonType: "object",
                    required: ["id", "nombre"],
                    properties: {
                        id: { bsonType: "objectId" },
                        nombre: { bsonType: "string" }
                    },
                    description: "Información del departamento al que pertenece la ciudad."
                
            }
        }
    }
}});
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
db.createCollection("sacarNomina", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            description: "Lista de conceptos (devengados y deducidos) para este contrato.",
            items: {
                bsonType: "object",
                required: ["concepto_id", "tipo", "nombre"],
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
                                },
                            }
                        }
                    }
                }
            }
        }
    }
});

db.empleados.createIndex({ ciudad: 1 }) // Para conteo por ciudad
db.empleados.createIndex({ tipoDeIdentificacion: 1, numeroIdentificacion: 1 }) // Identificación única
db.contratos.createIndex({ activo: 1 }) // Filtro de contratos vigentes
db.contratos.createIndex({ "empleado.id": 1 }) // Join con empleados
db.contratos.createIndex({ "tipoContrato.nombre": 1 }) // Agrupación por tipo de contrato
db.contratos.createIndex({ salarioBase: 1 }) // Filtrado para auxilio de transporte
db.sacarNomina.createIndex({ contrato_id: 1 }) // Agregaciones por contrato
db.sacarNomina.createIndex({ nomina_id: 1 }) // Filtrado por nómina específica
db.sacarNomina.createIndex({ "conceptos.tipo": 1 }) // DEV / DED
db.sacarNomina.createIndex({ "conceptos.novedades.fecha_inicial": 1 }) // Rango de fechas
db.sacarNomina.createIndex({ "conceptos.novedades.tipo_novedad.nombre": 1 }) // Filtro por tipo de novedad
db.sacarNomina.createIndex({ contrato_id: 1 }) // Agregaciones por contrato
db.sacarNomina.createIndex({ nomina_id: 1 }) // Filtrado por nómina específica
db.sacarNomina.createIndex({ "conceptos.tipo": 1 }) // DEV / DED
db.sacarNomina.createIndex({ "conceptos.novedades.fecha_inicial": 1 }) // Rango de fechas
db.sacarNomina.createIndex({ "conceptos.novedades.tipo_novedad.nombre": 1 }) // Filtro por tipo de novedad
db.nominas.createIndex({ codigo: 1 }, { unique: true }) // Identificador de nómina
db.createRole({
  role: "Administrador",
  privileges: [
    {
      resource: { db: "", collection: "" },
      actions: ["readWrite", "dbAdmin", "userAdmin", "clusterMonitor", "dropCollection"]
    }
  ],
  roles: []
})
db.createRole({
  role: "GestorDeNomina",
  privileges: [
    {
      resource: { db: "acme_corporate", collection: "empleados" },
      actions: ["find", "insert", "update"]
    },
    {
      resource: { db: "acme_corporate", collection: "contratos" },
      actions: ["find", "insert", "update"]
    },
    {
      resource: { db: "acme_corporate", collection: "sacarNomina" },
      actions: ["find", "insert", "update"]
    },
    {
      resource: { db: "acme_corporate", collection: "nominas" },
      actions: ["find", "insert", "update"]
    },
    {
      resource: { db: "acme_corporate", collection: "conceptos" },
      actions: ["find"]
    },
    {
      resource: { db: "acme_corporate", collection: "tipos_novedades" },
      actions: ["find"]
    }
  ],
  roles: []
})
db.createRole({
  role: "Empleado",
  privileges: [
    {
      resource: { db: "acme_corporate", collection: "empleados" },
      actions: ["find"]
    },
    {
      resource: { db: "acme_corporate", collection: "contratos" },
      actions: ["find"]
    },
    {
      resource: { db: "acme_corporate", collection: "sacarNomina" },
      actions: ["find"]
    },
    {
      resource: { db: "acme_corporate", collection: "nominas" },
      actions: ["find"]
    }
  ],
  roles: []
})
db.createUser({
  user: "gestor01",
  pwd: "contraseña_segura",
  roles: [{ role: "GestorDeNomina", db: "acme_corporate" }]
})

db.createUser({
  user: "empleado01",
  pwd: "su_clave_segura",
  roles: [{ role: "Empleado", db: "acme_corporate" }]
})

db.createUser({
  user: "admin01",
  pwd: "clave_maestra",
  roles: [{ role: "Administrador", db: "admin" }]
})