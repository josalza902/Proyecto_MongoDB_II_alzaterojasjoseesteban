db.contratos.aggregate([
  
  { $match: { activo: "Y" } },

  
  {
    $lookup: {
      from: "empleados",
      localField: "empleado.id",
      foreignField: "_id",
      as: "empleadoInfo"
    }
  },

 
  { $unwind: "$empleadoInfo" },


  {
    $project: {
      _id: 0,
      "area_codigo": "$cargo.area.id",
      "area_nombre": "$cargo.area.nombre",
      "cargo_codigo": "$cargo.id",
      "cargo_nombre": "$cargo.nombre",
      "tipo_identificacion": "$empleadoInfo.tipoDeIdentificacion",
      "numero_identificacion": "$empleadoInfo.numeroIdentificacion",
      "nombres": "$empleadoInfo.nombres",
      "apellidos": "$empleadoInfo.apellidos",
      "telefono": "$empleadoInfo.telefono",
      "email": "$empleadoInfo.email",
      "genero": "$empleadoInfo.genero"
    }
  }
]);
db.sacarNomina.aggregate([
  // 1️⃣ Seleccionamos la nómina por código
  {
    $match: {
      nomina_codigo: "NOM-2025-07" // ajusta al campo que estés usando
    }
  },

  // 2️⃣ Descomponemos el array de conceptos
  {
    $unwind: "$conceptos"
  },

  // 3️⃣ Agrupamos por contrato y tipo para sumar los valores
  {
    $group: {
      _id: {
        contrato_id: "$contrato_id",
        tipo: "$conceptos.tipo"
      },
      total: { $sum: "$conceptos.valor" }
    }
  },

  // 4️⃣ Reorganizamos los resultados para tener DEV y DED por contrato
  {
    $group: {
      _id: "$_id.contrato_id",
      devengos: {
        $sum: {
          $cond: [{ $eq: ["$_id.tipo", "DEV"] }, "$total", 0]
        }
      },
      deducciones: {
        $sum: {
          $cond: [{ $eq: ["$_id.tipo", "DED"] }, "$total", 0]
        }
      }
    }
  },

  // 5️⃣ Hacemos join con contratos para obtener salario y datos del empleado
  {
    $lookup: {
      from: "contratos",
      localField: "_id",
      foreignField: "_id",
      as: "contrato"
    }
  },

  // 6️⃣ Aseguramos que el contrato sea un único documento
  { $unwind: "$contrato" },

  // 7️⃣ Proyectamos los campos requeridos
  {
    $project: {
      _id: 0,
      tipoIdentificacion: "$contrato.empleado.tipoDeIdentificacion",
      numeroIdentificacion: "$contrato.empleado.numeroIdentificacion",
      nombres: "$contrato.empleado.nombres",
      apellidos: "$contrato.empleado.apellidos",
      salarioBase: "$contrato.salarioBase",
      totalDevengos: "$devengos",
      totalDeducciones: "$deducciones",
      netoAPagar: { $subtract: ["$devengos", "$deducciones"] }
    }
  }
]);
db.sacarNomina.aggregate([
  // 1️⃣ Filtrar por ID de empleado y nómina
  {
    $match: {
      "contrato.empleado.id": ObjectId("ID_DEL_EMPLEADO"),
      "nomina_id": ObjectId("ID_DE_LA_NOMINA")
    }
  },

  // 2️⃣ Descomponer conceptos uno a uno
  { $unwind: "$conceptos" },

  // 3️⃣ Agrupar todos los conceptos según tipo
  {
    $group: {
      _id: {
        contrato_id: "$contrato._id",
        tipo: "$conceptos.tipo"
      },
      conceptos: {
        $push: {
          codigo: "$conceptos.concepto_id",
          nombre: "$conceptos.nombre",
          valor: "$conceptos.valor"
        }
      },
      total: { $sum: "$conceptos.valor" }
    }
  },

  // 4️⃣ Rearmar para que tengas devengos y deducciones juntos
  {
    $group: {
      _id: "$_id.contrato_id",
      conceptos: {
        $push: {
          tipo: "$_id.tipo",
          total: "$total",
          items: "$conceptos"
        }
      }
    }
  },

  // 5️⃣ Join con contratos para recuperar salario y datos del empleado
  {
    $lookup: {
      from: "contratos",
      localField: "_id",
      foreignField: "_id",
      as: "contrato"
    }
  },
  { $unwind: "$contrato" },

  // 6️⃣ Proyecto final con todos los campos
  {
    $project: {
      _id: 0,
      tipoIdentificacion: "$contrato.empleado.tipoDeIdentificacion",
      numeroIdentificacion: "$contrato.empleado.numeroIdentificacion",
      nombres: "$contrato.empleado.nombres",
      apellidos: "$contrato.empleado.apellidos",
      salarioBase: "$contrato.salarioBase",

      deducciones: {
        $arrayElemAt: [
          {
            $filter: {
              input: "$conceptos",
              as: "item",
              cond: { $eq: ["$$item.tipo", "DED"] }
            }
          },
          0
        ]
      },

      devengos: {
        $arrayElemAt: [
          {
            $filter: {
              input: "$conceptos",
              as: "item",
              cond: { $eq: ["$$item.tipo", "DEV"] }
            }
          },
          0
        ]
      }
    }
  }
]);
db.empleados.aggregate([
  // 1️⃣ Filtramos sólo empleados activos, si quieres excluir los inactivos
  { $match: { activo: "Y" } },

  // 2️⃣ Agrupamos por ciudad y contamos empleados
  {
    $group: {
      _id: "$ciudad",            // Agrupar por ciudad
      cantidadEmpleados: { $sum: 1 } // Contador por cada coincidencia
    }
  },

  // 3️⃣ Proyectamos el resultado en formato legible
  {
    $project: {
      _id: 0,
      ciudad: "$_id",
      cantidadEmpleados: 1
    }
  },

  // 4️⃣ (Opcional) Ordenar por número de empleados descendente
  {
    $sort: { cantidadEmpleados: -1 }
  }
]);
db.contratos.aggregate([
  {
    $match: {
      activo: "Y",
      salarioBase: { $lt: 2600000 } 
    }
  },

  // 2️⃣ Join con empleados
  {
    $lookup: {
      from: "empleados",
      localField: "empleado.id",
      foreignField: "_id",
      as: "empleadoInfo"
    }
  },

  // 3️⃣ Aseguramos un único documento de empleado
  { $unwind: "$empleadoInfo" },

  // 4️⃣ Proyecto final con todos los campos requeridos
  {
    $project: {
      _id: 0,
      area_codigo: "$cargo.area.id",
      area_nombre: "$cargo.area.nombre",
      cargo_codigo: "$cargo.id",
      cargo_nombre: "$cargo.nombre",
      tipo_identificacion: "$empleadoInfo.tipoDeIdentificacion",
      numero_identificacion: "$empleadoInfo.numeroIdentificacion",
      nombres: "$empleadoInfo.nombres",
      apellidos: "$empleadoInfo.apellidos",
      salarioBase: 1
    }
  }
]);
db.contratos.aggregate([
  // 1️⃣ Filtramos contratos activos para centrarnos en los vigentes
  { $match: { activo: "Y" } },

  // 2️⃣ Agrupamos por género del empleado
  {
    $group: {
      _id: "$empleado.genero",               // Agrupamos por género
      promedioSalario: { $avg: "$salarioBase" } // Calculamos el promedio de salario base
    }
  },

  // 3️⃣ Proyectamos el resultado para que sea más legible
  {
    $project: {
      _id: 0,
      genero: "$_id",
      promedioSalario: 1
    }
  }
]);
db.sacarNomina.aggregate([
  // 1️⃣ Filtramos solo novedades de tipo ausencia en el rango de fechas
  {
    $match: {
      "conceptos.novedades.tipo_novedad.nombre": "Incapacidad",
      "conceptos.novedades.fecha_inicial": { $lte: ISODate("2025-08-31") },
      "conceptos.novedades.fecha_final": { $gte: ISODate("2025-07-01") }
    }
  },

  // 2️⃣ Descomponemos conceptos
  { $unwind: "$conceptos" },

  // 3️⃣ Descomponemos novedades dentro del concepto
  { $unwind: "$conceptos.novedades" },

  // 4️⃣ Filtramos nuevamente por tipo de novedad y rango
  {
    $match: {
      "conceptos.novedades.tipo_novedad.nombre": "Incapacidad",
      "conceptos.novedades.fecha_inicial": { $lte: ISODate("2025-08-31") },
      "conceptos.novedades.fecha_final": { $gte: ISODate("2025-07-01") }
    }
  },

  // 5️⃣ Contamos faltas agrupadas por contrato
  {
    $group: {
      _id: "$contrato_id",
      numeroFaltas: { $sum: 1 }
    }
  },

  // 6️⃣ Join con contratos para obtener datos del empleado, área y cargo
  {
    $lookup: {
      from: "contratos",
      localField: "_id",
      foreignField: "_id",
      as: "contrato"
    }
  },
  { $unwind: "$contrato" },

  // 7️⃣ Proyecto final con todos los campos requeridos
  {
    $project: {
      _id: 0,
      area_codigo: "$contrato.cargo.area.id",
      area_nombre: "$contrato.cargo.area.nombre",
      cargo_codigo: "$contrato.cargo.id",
      cargo_nombre: "$contrato.cargo.nombre",
      tipo_identificacion: "$contrato.empleado.tipoDeIdentificacion",
      numero_identificacion: "$contrato.empleado.numeroIdentificacion",
      nombres: "$contrato.empleado.nombres",
      apellidos: "$contrato.empleado.apellidos",
      numeroFaltas: 1
    }
  }
]);
db.contratos.aggregate([
  // 1️⃣ Filtrar sólo contratos activos
  { $match: { activo: "Y" } },

  // 2️⃣ Agrupar por nombre del tipo de contrato
  {
    $group: {
      _id: "$tipoContrato.nombre", // Agrupamos por el nombre del tipo
      cantidadEmpleados: { $sum: 1 }
    }
  },

  // 3️⃣ Proyectamos el resultado de forma legible
  {
    $project: {
      _id: 0,
      tipoContrato: "$_id",
      cantidadEmpleados: 1
    }
  }
])