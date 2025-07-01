db.areas.insertMany([
    { "_id": ObjectId("668314e6d3e8a5b71b8b1a3a"), "nombre": "Tecnología y Desarrollo" },
    { "_id": ObjectId("668314e6d3e8a5b71b8b1a3b"), "nombre": "Gestión Humana" }
  ]);
  db.cargos.insertMany([
    {
      "_id": ObjectId("66831512d3e8a5b71b8b1a3c"),
      "nombre": "Desarrollador Backend Senior",
      "area_id": ObjectId("668314e6d3e8a5b71b8b1a3a")
    },
    {
      "_id": ObjectId("66831512d3e8a5b71b8b1a3d"),
      "nombre": "Arquitecto de Software",
      "area_id": ObjectId("668314e6d3e8a5b71b8b1a3a")
    },
    {
      "_id": ObjectId("66831512d3e8a5b71b8b1a3e"),
      "nombre": "Analista de Nómina",
      "area_id": ObjectId("668314e6d3e8a5b71b8b1a3b")
    }
  ]);
  db.tipos_contratos.insertMany([
    { "_id": ObjectId("6683153dd3e8a5b71b8b1a3f"), "nombre": "Término Indefinido" },
    { "_id": ObjectId("6683153dd3e8a5b71b8b1a40"), "nombre": "Término Fijo" }
  ]);
  db.conceptos.insertMany([
    { "_id": ObjectId("6683156ed3e8a5b71b8b1a41"), "nombre": "Salario Básico", "tipo": "DEV", "porcentaje": 1.1, "descripcion": "Pago mensual básico del empleado." },
    { "_id": ObjectId("6683156ed3e8a5b71b8b1a42"), "nombre": "Aporte a Salud", "tipo": "DED", "porcentaje": 0.04, "descripcion": "Deducción obligatoria para salud (4%)." },
    { "_id": ObjectId("6683156ed3e8a5b71b8b1a43"), "nombre": "Aporte a Pensión", "tipo": "DED", "porcentaje": 0.04, "descripcion": "Deducción obligatoria para pensión (4%)." },
    { "_id": ObjectId("6683156ed3e8a5b71b8b1a44"), "nombre": "Horas Extras", "tipo": "DEV", "porcentaje": 0.1, "descripcion": "Pago adicional por trabajo fuera del horario regular."}
  ]);
  db.empleados.insertMany([
    {
      "_id": ObjectId("668315c2d3e8a5b71b8b1a47"),
      "tipoDeIdentificacion": "CC", "numeroIdentificacion": "1122334455",
      "nombres": "Juan David", "apellidos": "Pérez Gómez",
      "telefono": "3112223344", "email": "juan.perez@example.co",
      "genero": "M", "ciudad": "Bogotá", "direccion": "Calle Falsa 123", "activo": "Y"
    },
    {
      "_id": ObjectId("668315c2d3e8a5b71b8b1a48"),
      "tipoDeIdentificacion": "CC", "numeroIdentificacion": "2233445566",
      "nombres": "Maria Camila", "apellidos": "García Rojas",
      "telefono": "3223334455", "email": "maria.garcia@example.co",
      "genero": "F", "ciudad": "Medellín", "direccion": "Avenida Siempre Viva 742", "activo": "Y"
    },
    {
      "_id": ObjectId("668315c2d3e8a5b71b8b1a49"),
      "tipoDeIdentificacion": "CE", "numeroIdentificacion": "9988776655",
      "nombres": "Sofia", "apellidos": "Martínez Castillo",
      "telefono": "3001112233", "email": "sofia.martinez@example.co",
      "genero": "F", "ciudad": "Barranquilla", "direccion": "Carrera 50 # 80-90", "activo": "Y"
    },
    {
      "_id": ObjectId("668315c2d3e8a5b71b8b1a4a"),
      "tipoDeIdentificacion": "CC", "numeroIdentificacion": "3344556677",
      "nombres": "Carlos Andrés", "apellidos": "Hernández Díaz",
      "telefono": "3154445566", "email": "carlos.hernandez@example.co",
      "genero": "M", "ciudad": "Bogotá", "direccion": "Transversal 10 # 20-30", "activo": "N" 
    }
  ]);
  db.contratos.insertMany([
    {
      "_id": ObjectId("668316e0d3e8a5b71b8b1a4b"), "codigo": "C-2024-001",
      "empleado": { "id": ObjectId("668315c2d3e8a5b71b8b1a47"), "nombres": "Juan David", "apellidos": "Pérez Gómez" },
      "tipoContrato": { "id": ObjectId("6683153dd3e8a5b71b8b1a3f"), "nombre": "Término Indefinido" },
      "duracion": 0,
      "cargo": {
        "id": ObjectId("66831512d3e8a5b71b8b1a3c"), "nombre": "Desarrollador Backend Senior",
        "area": { "id": ObjectId("668314e6d3e8a5b71b8b1a3a"), "nombre": "Tecnología y Desarrollo" }
      },
      "salarioBase": NumberLong("7000000"), "activo": "Y"
    },
    {
      "_id": ObjectId("668316e0d3e8a5b71b8b1a4c"), "codigo": "C-2024-002",
      "empleado": { "id": ObjectId("668315c2d3e8a5b71b8b1a48"), "nombres": "Maria Camila", "apellidos": "García Rojas" },
      "tipoContrato": { "id": ObjectId("6683153dd3e8a5b71b8b1a3f"), "nombre": "Término Indefinido" },
      "duracion": 0,
      "cargo": {
        "id": ObjectId("66831512d3e8a5b71b8b1a3d"), "nombre": "Arquitecto de Software",
        "area": { "id": ObjectId("668314e6d3e8a5b71b8b1a3a"), "nombre": "Tecnología y Desarrollo" }
      },
      "salarioBase": NumberLong("11500000"), "activo": "Y"
    },
    {
      "_id": ObjectId("668316e0d3e8a5b71b8b1a4d"), "codigo": "C-2024-003",
      "empleado": { "id": ObjectId("668315c2d3e8a5b71b8b1a49"), "nombres": "Sofia", "apellidos": "Martínez Castillo" },
      "tipoContrato": { "id": ObjectId("6683153dd3e8a5b71b8b1a40"), "nombre": "Término Fijo" },
      "duracion": 12,
      "cargo": {
        "id": ObjectId("66831512d3e8a5b71b8b1a3e"), "nombre": "Analista de Nómina",
        "area": { "id": ObjectId("668314e6d3e8a5b71b8b1a3b"), "nombre": "Gestión Humana" }
      },
      "salarioBase": NumberLong("3200000"), "activo": "Y"
    },
    {
      "_id": ObjectId("668316e0d3e8a5b71b8b1a4e"), "codigo": "C-2023-015",
      "empleado": { "id": ObjectId("668315c2d3e8a5b71b8b1a4a"), "nombres": "Carlos Andrés", "apellidos": "Hernández Díaz" },
      "tipoContrato": { "id": ObjectId("6683153dd3e8a5b71b8b1a40"), "nombre": "Término Fijo" },
      "duracion": 12,
      "cargo": {
        "id": ObjectId("66831512d3e8a5b71b8b1a3c"), "nombre": "Desarrollador Backend Senior",
        "area": { "id": ObjectId("668314e6d3e8a5b71b8b1a3a"), "nombre": "Tecnología y Desarrollo" }
      },
      "salarioBase": NumberLong("6800000"), "activo": "N" 
    }
  ]);
  db.nominas.insertOne({
    "codigo": "NOM-2025-01",
    "fecha_inicial": ISODate("2025-01-01T05:00:00Z"),
    "fecha_final": ISODate("2025-01-31T04:59:59Z"),
    "estado": "Pagada",
    "detalles_contratos": [
        // Detalle para Juan David Pérez
        {
            "contrato_id": ObjectId("668316e0d3e8a5b71b8b1a4b"),
            "empleado": { "id": ObjectId("668315c2d3e8a5b71b8b1a47"), "numeroIdentificacion": "1122334455", "nombres": "Juan David", "apellidos": "Pérez Gómez", "genero": "M", "email": "juan.perez@example.co" },
            "contrato": { "id": ObjectId("668316e0d3e8a5b71b8b1a4b"), "tipoContrato": { "id": ObjectId("6683153dd3e8a5b71b8b1a3f"), "nombre": "Término Indefinido" }, "duracion": 0, "cargo": { "id": ObjectId("66831512d3e8a5b71b8b1a3c"), "nombre": "Desarrollador Backend Senior", "area": { "id": ObjectId("668314e6d3e8a5b71b8b1a3a"), "nombre": "Tecnología y Desarrollo" } }, "salarioBase": NumberLong("7000000") },
            "conceptos": [
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a41"), "tipo": "DEV", "nombre": "Salario Básico", "valor": NumberLong("7000000") },
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a42"), "tipo": "DED", "nombre": "Aporte a Salud", "valor": NumberLong("280000") },
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a43"), "tipo": "DED", "nombre": "Aporte a Pensión", "valor": NumberLong("280000") }
            ],
            "total_devengado": NumberLong("7000000"),
            "total_deducido": NumberLong("560000"),
            "neto_a_pagar": NumberLong("6440000")
        },
        // Detalle para Maria Camila García
        {
            "contrato_id": ObjectId("668316e0d3e8a5b71b8b1a4c"),
            "empleado": { "id": ObjectId("668315c2d3e8a5b71b8b1a48"), "numeroIdentificacion": "2233445566", "nombres": "Maria Camila", "apellidos": "García Rojas", "genero": "F", "email": "maria.garcia@example.co" },
            "contrato": { "id": ObjectId("668316e0d3e8a5b71b8b1a4c"), "tipoContrato": { "id": ObjectId("6683153dd3e8a5b71b8b1a3f"), "nombre": "Término Indefinido" }, "duracion": 0, "cargo": { "id": ObjectId("66831512d3e8a5b71b8b1a3d"), "nombre": "Arquitecto de Software", "area": { "id": ObjectId("668314e6d3e8a5b71b8b1a3a"), "nombre": "Tecnología y Desarrollo" } }, "salarioBase": NumberLong("11500000") },
            "conceptos": [
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a41"), "tipo": "DEV", "nombre": "Salario Básico", "valor": NumberLong("11500000") },
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a42"), "tipo": "DED", "nombre": "Aporte a Salud", "valor": NumberLong("460000") },
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a43"), "tipo": "DED", "nombre": "Aporte a Pensión", "valor": NumberLong("460000") }
            ],
            "total_devengado": NumberLong("11500000"),
            "total_deducido": NumberLong("920000"),
            "neto_a_pagar": NumberLong("10580000")
        },
        // Detalle para Sofia Martínez
        {
            "contrato_id": ObjectId("668316e0d3e8a5b71b8b1a4d"),
            "empleado": { "id": ObjectId("668315c2d3e8a5b71b8b1a49"), "numeroIdentificacion": "9988776655", "nombres": "Sofia", "apellidos": "Martínez Castillo", "genero": "F", "email": "sofia.martinez@example.co" },
            "contrato": { "id": ObjectId("668316e0d3e8a5b71b8b1a4d"), "tipoContrato": { "id": ObjectId("6683153dd3e8a5b71b8b1a40"), "nombre": "Término Fijo" }, "duracion": 12, "cargo": { "id": ObjectId("66831512d3e8a5b71b8b1a3e"), "nombre": "Analista de Nómina", "area": { "id": ObjectId("668314e6d3e8a5b71b8b1a3b"), "nombre": "Gestión Humana" } }, "salarioBase": NumberLong("3200000") },
            "conceptos": [
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a41"), "tipo": "DEV", "nombre": "Salario Básico", "valor": NumberLong("3200000") },
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a42"), "tipo": "DED", "nombre": "Aporte a Salud", "valor": NumberLong("128000") },
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a43"), "tipo": "DED", "nombre": "Aporte a Pensión", "valor": NumberLong("128000") }
            ],
            "total_devengado": NumberLong("3200000"),
            "total_deducido": NumberLong("256000"),
            "neto_a_pagar": NumberLong("2944000")
        }
    ]
});
db.nominas.insertOne({
    "codigo": "NOM-2025-02",
    "fecha_inicial": ISODate("2025-02-01T05:00:00Z"),
    "fecha_final": ISODate("2025-02-28T04:59:59Z"),
    "estado": "Calculada",
    "detalles_contratos": [
        // Detalle para Juan David Pérez CON NOVEDAD DE HORAS EXTRAS
        {
            "contrato_id": ObjectId("668316e0d3e8a5b71b8b1a4b"),
            "empleado": { "id": ObjectId("668315c2d3e8a5b71b8b1a47"), "numeroIdentificacion": "1122334455", "nombres": "Juan David", "apellidos": "Pérez Gómez", "genero": "M", "email": "juan.perez@example.co" },
            "contrato": { "id": ObjectId("668316e0d3e8a5b71b8b1a4b"), "tipoContrato": { "id": ObjectId("6683153dd3e8a5b71b8b1a3f"), "nombre": "Término Indefinido" }, "duracion": 0, "cargo": { "id": ObjectId("66831512d3e8a5b71b8b1a3c"), "nombre": "Desarrollador Backend Senior", "area": { "id": ObjectId("668314e6d3e8a5b71b8b1a3a"), "nombre": "Tecnología y Desarrollo" } }, "salarioBase": NumberLong("7000000") },
            "conceptos": [
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a41"), "tipo": "DEV", "nombre": "Salario Básico", "valor": NumberLong("7000000") },
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a44"), "tipo": "DEV", "nombre": "Horas Extras", "valor": NumberLong("450000") }, // Valor adicional
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a42"), "tipo": "DED", "nombre": "Aporte a Salud", "valor": NumberLong("298000") }, // 4% sobre 7,450,000
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a43"), "tipo": "DED", "nombre": "Aporte a Pensión", "valor": NumberLong("298000") } // 4% sobre 7,450,000
            ],
            "novedades": [{
                "novedad_id": ObjectId(), // ID único para esta instancia de la novedad
                "tipo_novedad": { "id": ObjectId("66831599d3e8a5b71b8b1a46"), "nombre": "Registro de Horas Extras" },
                "fecha_inicial": ISODate("2025-02-10T05:00:00Z"),
                "fecha_final": ISODate("2025-02-12T04:59:59Z"),
                "observaciones": "Horas extras por lanzamiento de proyecto.",
                "impacto_en_nomina": NumberLong("450000")
            }],
            "total_devengado": NumberLong("7450000"), // Salario + Horas Extras
            "total_deducido": NumberLong("596000"),
            "neto_a_pagar": NumberLong("6854000")
        },
        // Detalle para Maria Camila García (sin cambios)
        {
            "contrato_id": ObjectId("668316e0d3e8a5b71b8b1a4c"),
            "empleado": { "id": ObjectId("668315c2d3e8a5b71b8b1a48"), "numeroIdentificacion": "2233445566", "nombres": "Maria Camila", "apellidos": "García Rojas", "genero": "F", "email": "maria.garcia@example.co" },
            "contrato": { "id": ObjectId("668316e0d3e8a5b71b8b1a4c"), "tipoContrato": { "id": ObjectId("6683153dd3e8a5b71b8b1a3f"), "nombre": "Término Indefinido" }, "duracion": 0, "cargo": { "id": ObjectId("66831512d3e8a5b71b8b1a3d"), "nombre": "Arquitecto de Software", "area": { "id": ObjectId("668314e6d3e8a5b71b8b1a3a"), "nombre": "Tecnología y Desarrollo" } }, "salarioBase": NumberLong("11500000") },
            "conceptos": [
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a41"), "tipo": "DEV", "nombre": "Salario Básico", "valor": NumberLong("11500000") },
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a42"), "tipo": "DED", "nombre": "Aporte a Salud", "valor": NumberLong("460000") },
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a43"), "tipo": "DED", "nombre": "Aporte a Pensión", "valor": NumberLong("460000") }
            ],
            "total_devengado": NumberLong("11500000"),
            "total_deducido": NumberLong("920000"),
            "neto_a_pagar": NumberLong("10580000")
        },
        // Detalle para Sofia Martínez (sin cambios)
        {
            "contrato_id": ObjectId("668316e0d3e8a5b71b8b1a4d"),
            "empleado": { "id": ObjectId("668315c2d3e8a5b71b8b1a49"), "numeroIdentificacion": "9988776655", "nombres": "Sofia", "apellidos": "Martínez Castillo", "genero": "F", "email": "sofia.martinez@example.co" },
            "contrato": { "id": ObjectId("668316e0d3e8a5b71b8b1a4d"), "tipoContrato": { "id": ObjectId("6683153dd3e8a5b71b8b1a40"), "nombre": "Término Fijo" }, "duracion": 12, "cargo": { "id": ObjectId("66831512d3e8a5b71b8b1a3e"), "nombre": "Analista de Nómina", "area": { "id": ObjectId("668314e6d3e8a5b71b8b1a3b"), "nombre": "Gestión Humana" } }, "salarioBase": NumberLong("3200000") },
            "conceptos": [
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a41"), "tipo": "DEV", "nombre": "Salario Básico", "valor": NumberLong("3200000") },
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a42"), "tipo": "DED", "nombre": "Aporte a Salud", "valor": NumberLong("128000") },
                { "concepto_id": ObjectId("6683156ed3e8a5b71b8b1a43"), "tipo": "DED", "nombre": "Aporte a Pensión", "valor": NumberLong("128000") }
            ],
            "total_devengado": NumberLong("3200000"),
            "total_deducido": NumberLong("256000"),
            "neto_a_pagar": NumberLong("2944000")
        }
    ]
});