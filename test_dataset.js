db.departamentos.insertMany([
  { _id: ObjectId("66b0f0010000000000000001"), nombre: "Cundinamarca" },
  { _id: ObjectId("66b0f0010000000000000002"), nombre: "Antioquia" }
])
db.ciudades.insertMany([
  {
    _id: ObjectId("66b0f0020000000000000001"),
    nombre: "Bogotá",
    departamento_id: ObjectId("66b0f0010000000000000001"),
    departamento: {
      id: ObjectId("66b0f0010000000000000001"),
      nombre: "Cundinamarca"
    }
  },
  {
    _id: ObjectId("66b0f0020000000000000002"),
    nombre: "Medellín",
    departamento_id: ObjectId("66b0f0010000000000000002"),
    departamento: {
      id: ObjectId("66b0f0010000000000000002"),
      nombre: "Antioquia"
    }
  },
  {
    _id: ObjectId("66b0f0020000000000000003"),
    nombre: "Soacha",
    departamento_id: ObjectId("66b0f0010000000000000001"),
    departamento: {
      id: ObjectId("66b0f0010000000000000001"),
      nombre: "Cundinamarca"
    }
  }
])
db.tipos_identificaciones.insertMany([
  {
    _id: ObjectId("66b0f0030000000000000001"),
    codigo: "CC",
    nombre: "Cédula de Ciudadanía"
  },
  {
    _id: ObjectId("66b0f0030000000000000002"),
    codigo: "TI",
    nombre: "Tarjeta de Identidad"
  },
  {
    _id: ObjectId("66b0f0030000000000000003"),
    codigo: "CE",
    nombre: "Cédula de Extranjería"
  }
])
db.areas.insertMany([
  { _id: ObjectId("66b0f0040000000000000001"), nombre: "Contabilidad" },
  { _id: ObjectId("66b0f0040000000000000002"), nombre: "Recursos Humanos" }
])
db.cargos.insertMany([
  {
    _id: ObjectId("66b0f0050000000000000001"),
    nombre: "Analista Contable",
    area_id: ObjectId("66b0f0040000000000000001") // Contabilidad
  },
  {
    _id: ObjectId("66b0f0050000000000000002"),
    nombre: "Jefe de Talento Humano",
    area_id: ObjectId("66b0f0040000000000000002") // Recursos Humanos
  },
  {
    _id: ObjectId("66b0f0050000000000000003"),
    nombre: "Auxiliar Administrativo",
    area_id: ObjectId("66b0f0040000000000000001") // Contabilidad
  }
])
db.conceptos.insertMany([
  {
    _id: ObjectId("66b0f0060000000000000001"),
    nombre: "Salario Básico",
    tipo: "DEV",
    porcentaje: 1.01,
    descripcion: "Pago mensual base del empleado"
  },
  {
    _id: ObjectId("66b0f0060000000000000002"),
    nombre: "Salud",
    tipo: "DED",
    porcentaje: 0.04,
    descripcion: "Aporte a salud según legislación"
  },
  {
    _id: ObjectId("66b0f0060000000000000003"),
    nombre: "Pensión",
    tipo: "DED",
    porcentaje: 0.04,
    descripcion: "Aporte a pensión según normativa"
  }
])
db.tipos_contratos.insertMany([
  {
    _id: ObjectId("66b0f0070000000000000001"),
    nombre: "Término Fijo"
  },
  {
    _id: ObjectId("66b0f0070000000000000002"),
    nombre: "Indefinido"
  }
])
db.tipos_novedades.insertMany([
  {
    _id: ObjectId("66b0f0080000000000000001"),
    nombre: "Incapacidad",
    impacto: "Negativo",
    descripcion: "Ausencia por enfermedad o accidente con soporte médico."
  },
  {
    _id: ObjectId("66b0f0080000000000000002"),
    nombre: "Vacaciones",
    impacto: "Neutro",
    descripcion: "Tiempo de descanso remunerado otorgado al empleado."
  }
])
db.empleados.insertMany([
  {
    _id: ObjectId("66b0f0090000000000000001"),
    tipoDeIdentificacion: "CC",
    numeroIdentificacion: "1054896320",
    nombres: "Laura",
    apellidos: "Gómez",
    telefono: "3104567890",
    email: "laura.gomez@example.com",
    genero: "F",
    ciudad: "Bogotá",
    direccion: "Calle 45 #30-20",
    activo: "Y"
  },
  {
    _id: ObjectId("66b0f0090000000000000002"),
    tipoDeIdentificacion: "TI",
    numeroIdentificacion: "1023456789",
    nombres: "Daniel",
    apellidos: "Martínez",
    telefono: "3201234567",
    email: "daniel.martinez@example.com",
    genero: "M",
    ciudad: "Medellín",
    direccion: "Carrera 70 #40-15",
    activo: "Y"
  },
  {
    _id: ObjectId("66b0f0090000000000000003"),
    tipoDeIdentificacion: "CE",
    numeroIdentificacion: "3009876543",
    nombres: "Mia",
    apellidos: "Fernández",
    telefono: "3005678901",
    email: "mia.fernandez@example.com",
    genero: "F",
    ciudad: "Soacha",
    direccion: "Diagonal 10 #5-85",
    activo: "Y"
  },
  {
    _id: ObjectId("66b0f0090000000000000004"),
    tipoDeIdentificacion: "CC",
    numeroIdentificacion: "1098765432",
    nombres: "Carlos",
    apellidos: "Ruiz",
    telefono: "3117894560",
    email: "carlos.ruiz@example.com",
    genero: "M",
    ciudad: "Bogotá",
    direccion: "Avenida Siempre Viva #123",
    activo: "Y"
  }
])
db.contratos.insertMany([
  {
    _id: ObjectId("66b0f0100000000000000001"),
    codigo: "CT-202501",
    empleado: {
      id: ObjectId("66b0f0090000000000000001"),
      nombres: "Laura",
      apellidos: "Gómez",
      telefono: "3104567890",
      email: "laura.gomez@example.com",
      genero: "F",
      ciudad: "Bogotá",
      direccion: "Calle 45 #30-20",
      activo: "Y"
    },
    tipoContrato: {
      id: ObjectId("66b0f0070000000000000002"),
      nombre: "Indefinido"
    },
    duracion: 0, 
    cargo: {
      id: ObjectId("66b0f0050000000000000001"),
      nombre: "Analista Contable",
      area: {
        id: ObjectId("66b0f0040000000000000001"),
        nombre: "Contabilidad"
      }
    },
    salarioBase: string(2500000),
    activo: "Y"
  },
  {
    _id: ObjectId("66b0f0100000000000000002"),
    codigo: "CT-202502",
    empleado: {
      id: ObjectId("66b0f0090000000000000002"),
      nombres: "Daniel",
      apellidos: "Martínez",
      telefono: "3201234567",
      email: "daniel.martinez@example.com",
      genero: "M",
      ciudad: "Medellín",
      direccion: "Carrera 70 #40-15",
      activo: "Y"
    },
    tipoContrato: {
      id: ObjectId("66b0f0070000000000000001"),
      nombre: "Término Fijo"
    },
    duracion: 12,
    cargo: {
      id: ObjectId("66b0f0050000000000000002"),
      nombre: "Jefe de Talento Humano",
      area: {
        id: ObjectId("66b0f0040000000000000002"),
        nombre: "Recursos Humanos"
      }
    },
    salarioBase: string(3800000),
    activo: "Y"
  },
  {
    _id: ObjectId("66b0f0100000000000000003"),
    codigo: "CT-202503",
    empleado: {
      id: ObjectId("66b0f0090000000000000003"),
      nombres: "Mia",
      apellidos: "Fernández",
      telefono: "3005678901",
      email: "mia.fernandez@example.com",
      genero: "F",
      ciudad: "Soacha",
      direccion: "Diagonal 10 #5-85",
      activo: "Y"
    },
    tipoContrato: {
      id: ObjectId("66b0f0070000000000000001"), 
      nombre: "Término Fijo"
    },
    duracion: 6,
    cargo: {
      id: ObjectId("66b0f0050000000000000003"),
      nombre: "Auxiliar Administrativo",
      area: {
        id: ObjectId("66b0f0040000000000000001"),
        nombre: "Contabilidad"
      }
    },
    salarioBase: string(1800000),
    activo: "Y"
  },
  {
    _id: ObjectId("66b0f0100000000000000004"),
    codigo: "CT-202504",
    empleado: {
      id: ObjectId("66b0f0090000000000000004"),
      nombres: "Carlos",
      apellidos: "Ruiz",
      telefono: "3117894560",
      email: "carlos.ruiz@example.com",
      genero: "M",
      ciudad: "Bogotá",
      direccion: "Avenida Siempre Viva #123",
      activo: "Y"
    },
    tipoContrato: {
      id: ObjectId("66b0f0070000000000000002"),
      nombre: "Indefinido"
    },
    duracion: 0,
    cargo: {
      id: ObjectId("66b0f0050000000000000003"),
      nombre: "Auxiliar Administrativo",
      area: {
        id: ObjectId("66b0f0040000000000000001"),
        nombre: "Contabilidad"
      }
    },
    salarioBase: string(1900000),
    activo: "Y"
  }
])
db.nominas.insertMany([
  {
    _id: ObjectId("66b0f0110000000000000001"),
    codigo: "NOM-2025-07",
    fecha_inicial: new Date("2025-07-01"),
    fecha_final: new Date("2025-07-31"),
    estado: "Creada"
  },
  {
    _id: ObjectId("66b0f0110000000000000002"),
    codigo: "NOM-2025-08",
    fecha_inicial: new Date("2025-08-01"),
    fecha_final: new Date("2025-08-31"),
    estado: "Creada"
  }
])