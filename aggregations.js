db.contratos.aggregate([
    {
      $match: {
        "activo": "Y" 
      }
    },
    {
      $lookup: {
        from: "empleados", 
        localField: "empleado.id", 
        foreignField: "_id", 
        as: "datosEmpleado" 
      }
    },
    {
      $unwind: "$datosEmpleado" 
    },
    {
      $group: {
        _id: {
          areaId: "$cargo.area.id",
          areaNombre: "$cargo.area.nombre",
          cargoId: "$cargo.id",
          cargoNombre: "$cargo.nombre"
        },
        empleados: {
          $push: {
            tipoDeIdentificacion: "$datosEmpleado.tipoDeIdentificacion",
            numeroIdentificacion: "$datosEmpleado.numeroIdentificacion",
            nombres: "$datosEmpleado.nombres",
            apellidos: "$datosEmpleado.apellidos",
            telefono: "$datosEmpleado.telefono",
            email: "$datosEmpleado.email",
            genero: "$datosEmpleado.genero"
          }
        }
      }
    },
    {
      $project: {
        _id: 0, 
        areaCodigo: "$_id.areaId", 
        areaNombre: "$_id.areaNombre",
        cargoCodigo: "$_id.cargoId", 
        cargoNombre: "$_id.cargoNombre",
        empleados: 1 
      }
    },
    {
      $sort: {
        areaNombre: 1,
        cargoNombre: 1
      }
    }
  ])
  db.nominas.aggregate([
    {
      $match: {
        "codigo": "NOM-2025-01" 
      }
    },
    {
      $unwind: "$detalles_contratos" 
    },
    {
      $project: {
        _id: 0, 
        tipoDeIdentificacion: "$detalles_contratos.empleado.tipoDeIdentificacion",
        numeroIdentificacion: "$detalles_contratos.empleado.numeroIdentificacion",
        nombres: "$detalles_contratos.empleado.nombres",
        apellidos: "$detalles_contratos.empleado.apellidos",
        salarioBase: "$detalles_contratos.contrato.salarioBase",
        totalDeducciones: "$detalles_contratos.total_deducido",
        totalDevengos: "$detalles_contratos.total_devengado",
        netoAPagar: "$detalles_contratos.neto_a_pagar"
      }
    },
    {
      $sort: {
        apellidos: 1, 
        nombres: 1
      }
    }
  ])
  db.nominas.aggregate([
    {
      $match: {
        "codigo": "NOM-2025-01" 
      }
    },
    {
      $unwind: "$detalles_contratos" 
    },
    {
      $project: {
        _id: 0, 
        tipoDeIdentificacion: "$detalles_contratos.empleado.tipoDeIdentificacion",
        numeroIdentificacion: "$detalles_contratos.empleado.numeroIdentificacion",
        nombres: "$detalles_contratos.empleado.nombres",
        apellidos: "$detalles_contratos.empleado.apellidos",
        salarioBase: "$detalles_contratos.contrato.salarioBase",
        
        
        deducciones: {
          $filter: {
            input: "$detalles_contratos.conceptos",
            as: "concepto",
            cond: { $eq: ["$$concepto.tipo", "DED"] }
          }
        },
        
        devengos: {
          $filter: {
            input: "$detalles_contratos.conceptos",
            as: "concepto",
            cond: { $eq: ["$$concepto.tipo", "DEV"] }
          }
        }
      }
    },
    {
      $sort: {
        apellidos: 1, 
        nombres: 1
      }
    }
  ])
  db.empleados.aggregate([
    {
      $match: {
        "activo": "Y" 
      }
    },
    {
      $group: {
        _id: "$ciudad", 
        totalEmpleados: { $count: {} } 
      }
    },
    {
      $project: {
        _id: 0, 
        ciudad: "$_id", 
        totalEmpleados: 1 
      }
    },
    {
      $sort: {
        totalEmpleados: -1 
      }
    }
  ])
  db.contratos.aggregate([
    {
      $match: {
        "activo": "Y", 
        "salarioBase": { $lte: 280000000 } // Salario base menor o igual a 2 SMMLV (2,800,000 en centavos)
         // Ajusta este valor (280000000) según el SMMLV actual en centavos
      }
    },
    {
      $lookup: {
        from: "empleados",
        localField: "empleado.id",
        foreignField: "_id",
        as: "datosEmpleado"
      }
    },
    {
      $unwind: "$datosEmpleado"
    },
    {
      $group: {
        _id: {
          areaCodigo: "$cargo.area.id",
          areaNombre: "$cargo.area.nombre",
          cargoCodigo: "$cargo.id",
          cargoNombre: "$cargo.nombre"
        },
        empleadosConAuxilio: {
          $push: {
            tipoDeIdentificacion: "$datosEmpleado.tipoDeIdentificacion",
            numeroIdentificacion: "$datosEmpleado.numeroIdentificacion",
            nombres: "$datosEmpleado.nombres",
            apellidos: "$datosEmpleado.apellidos",
            salarioBase: "$salarioBase"
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        areaCodigo: "$_id.areaCodigo",
        areaNombre: "$_id.areaNombre",
        cargoCodigo: "$_id.cargoCodigo",
        cargoNombre: "$_id.cargoNombre",
        empleadosConAuxilio: 1
      }
    },
    {
      $sort: {
        areaNombre: 1,
        cargoNombre: 1
      }
    }
  ])
  db.contratos.aggregate([
  {
    $match: {
      "activo": "Y" // Filtra solo los contratos vigentes
    }
  },
  {
    $lookup: {
      from: "empleados", // Colección a la que nos unimos
      localField: "empleado.id", // Campo en 'contratos'
      foreignField: "_id", // Campo en 'empleados'
      as: "datosEmpleado" // Alias para los datos del empleado
    }
  },
  {
    $unwind: "$datosEmpleado" // Desestructura el array 'datosEmpleado'
  },
  {
    $group: {
      _id: "$datosEmpleado.genero", // Agrupa por el campo 'genero' del empleado
      salarioPromedio: { $avg: "$salarioBase" } // Calcula el promedio del salarioBase para cada grupo
    }
  },
  {
    $project: {
      _id: 0, // Excluye el _id por defecto del grupo
      genero: "$_id", // Renombra _id a 'genero'
      salarioPromedio: 1 // Incluye el salario promedio
    }
  },
  {
    $sort: {
      genero: 1 // Ordena por género (M, F, etc.)
    }
  }
])
db.nominas.aggregate([
    {
      // 1. Filtrar las nóminas que potencialmente contengan novedades en el rango de fechas
      $match: {
        "fecha_inicial": { $lte: ISODate("2025-01-31T23:59:59Z") }, // La nómina debe iniciar antes o en la fecha final del rango
        "fecha_final": { $gte: ISODate("2025-01-01T00:00:00Z") }   // Y finalizar después o en la fecha inicial del rango
      }
    },
    {
      // 2. Desestructurar el array de detalles_contratos para trabajar con cada empleado
      $unwind: "$detalles_contratos"
    },
    {
      // 3. Desestructurar el array de novedades dentro de cada detalle_contrato
      $unwind: "$detalles_contratos.novedades"
    },
    {
      // 4. Filtrar las novedades que caen dentro del rango de fechas especificado
      $match: {
        "detalles_contratos.novedades.fecha_inicial": { $lte: ISODate("2025-01-31T23:59:59Z") },
        "detalles_contratos.novedades.fecha_final": { $gte: ISODate("2025-01-01T00:00:00Z") }
      }
    },
    {
      // 5. Unir con la colección 'tipos_novedades' para obtener el nombre de la novedad
      $lookup: {
        from: "tipos_novedades",
        localField: "detalles_contratos.novedades.tipo_novedad.id",
        foreignField: "_id",
        as: "tipoNovedadInfo"
      }
    },
    {
      // 6. Desestructurar el array tipoNovedadInfo y filtrar por el nombre de la novedad de "falta"
      $unwind: "$tipoNovedadInfo"
    },
    {
      $match: {
        // Ajusta este nombre si tu tipo de novedad para faltas es diferente
        "tipoNovedadInfo.nombre": "Ausencia Injustificada" 
        // O podrías usar un array si hay varios tipos de novedades que representan faltas:
        // "tipoNovedadInfo.nombre": { $in: ["Ausencia Injustificada", "Falta"] }
      }
    },
    {
      // 7. Agrupar por empleado, área y cargo para contar las faltas
      $group: {
        _id: {
          empleadoId: "$detalles_contratos.empleado.id",
          tipoDeIdentificacion: "$detalles_contratos.empleado.tipoDeIdentificacion",
          numeroIdentificacion: "$detalles_contratos.empleado.numeroIdentificacion",
          nombres: "$detalles_contratos.empleado.nombres",
          apellidos: "$detalles_contratos.empleado.apellidos",
          areaCodigo: "$detalles_contratos.contrato.cargo.area.id",
          areaNombre: "$detalles_contratos.contrato.cargo.area.nombre",
          cargoCodigo: "$detalles_contratos.contrato.cargo.id",
          cargoNombre: "$detalles_contratos.contrato.cargo.nombre"
        },
        numeroDeFaltas: { $sum: 1 } // Cuenta cada novedad como una falta
      }
    },
    {
      // 8. Proyectar los campos finales con nombres claros
      $project: {
        _id: 0,
        tipoDeIdentificacion: "$_id.tipoDeIdentificacion",
        numeroIdentificacion: "$_id.numeroIdentificacion",
        nombres: "$_id.nombres",
        apellidos: "$_id.apellidos",
        areaCodigo: "$_id.areaCodigo",
        areaNombre: "$_id.areaNombre",
        cargoCodigo: "$_id.cargoCodigo",
        cargoNombre: "$_id.cargoNombre",
        numeroDeFaltas: 1
      }
    },
    {
      // 9. Ordenar los resultados para una mejor lectura
      $sort: {
        areaNombre: 1,
        cargoNombre: 1,
        apellidos: 1,
        nombres: 1
      }
    }
  ])
  db.contratos.aggregate([
    {
      $match: {
        "activo": "Y" // Filtra solo los contratos que están vigentes
      }
    },
    {
      $group: {
        _id: "$tipoContrato.nombre", // Agrupa por el nombre del tipo de contrato
        cantidadEmpleados: { $sum: 1 } // Cuenta la cantidad de contratos (y por ende empleados) para cada tipo
      }
    },
    {
      $project: {
        _id: 0, // Excluye el _id por defecto
        tipoDeContrato: "$_id", // Renombra _id a 'tipoDeContrato'
        cantidadEmpleados: 1 // Incluye la cantidad contada
      }
    },
    {
      $sort: {
        cantidadEmpleados: -1 // Ordena los resultados de mayor a menor cantidad de empleados
      }
    }
  ])