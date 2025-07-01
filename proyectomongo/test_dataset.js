// --- 0. Variables para almacenar IDs (para referenciar fácilmente) ---
// Es buena práctica inicializar las variables para evitar errores si se ejecutan parcialmente.
var idDeptoCundinamarca = new ObjectId();
var idDeptoAntioquia = new ObjectId();
var idDeptoValle = new ObjectId();

var idCiudadBogota = new ObjectId();
var idCiudadMedellin = new ObjectId();
var idCiudadCali = new ObjectId();

var idTipoIdentificacionCC = new ObjectId();
var idTipoIdentificacionTI = new ObjectId();
var idTipoIdentificacionPA = new ObjectId();
var idTipoIdentificacionCE = new ObjectId();

var idAreaVentas = new ObjectId();
var idAreaIT = new ObjectId();

var idCargoVendedor = new ObjectId();
var idCargoGerenteVentas = new ObjectId();
var idCargoDesarrollador = new ObjectId();

var idTipoContratoFijo = new ObjectId();
var idTipoContratoIndefinido = new ObjectId();

var idConceptoSalario = new ObjectId();
var idConceptoAuxTransporte = new ObjectId();
var idConceptoSalud = new ObjectId();
var idConceptoPension = new ObjectId();
var idConceptoBonoProductividad = new ObjectId();

var idTipoNovedadIncapacidad = new ObjectId();
var idTipoNovedadBonificacion = new ObjectId();

var idEmpleado1 = new ObjectId(); // Ana María (CC)
var idEmpleado2 = new ObjectId(); // Carlos Alberto (TI)
var idEmpleado3 = new ObjectId(); // Laura Sofía (PA)
var idEmpleado4 = new ObjectId(); // Pedro José (CE - inactivo)

var idContrato1 = new ObjectId();
var idContrato2 = new ObjectId();
var idContrato3 = new ObjectId();
var idContrato4 = new ObjectId();

var idNominaMayo2025 = new ObjectId();
var idNominaJunio2025 = new ObjectId();


// --- 1. Colección: 'departamentos' (mínimo 2) ---
db.departamentos.insertMany([
    { _id: idDeptoCundinamarca, nombre: "Cundinamarca" },
    { _id: idDeptoAntioquia, nombre: "Antioquia" },
    { _id: idDeptoValle, nombre: "Valle del Cauca" } // Añadimos Valle para Cali
]);

// --- 2. Colección: 'ciudades' (mínimo 3) ---
db.ciudades.insertMany([
    { _id: idCiudadBogota, nombre: "Bogotá", departamento_id: idDeptoCundinamarca },
    { _id: idCiudadMedellin, nombre: "Medellín", departamento_id: idDeptoAntioquia },
    { _id: idCiudadCali, nombre: "Cali", departamento_id: idDeptoValle } // Cali ahora en Valle del Cauca
]);

// --- 3. Colección: 'tipos_identificaciones' (nueva y obligatoria) ---
db.tipos_identificaciones.insertMany([
    { _id: idTipoIdentificacionCC, codigo: "CC", nombre: "Cédula de Ciudadanía" },
    { _id: idTipoIdentificacionTI, codigo: "TI", nombre: "Tarjeta de Identidad" },
    { _id: idTipoIdentificacionPA, codigo: "PA", nombre: "Pasaporte" },
    { _id: idTipoIdentificacionCE, codigo: "CE", nombre: "Cédula de Extranjería" }
]);

// --- 4. Colección: 'areas' (mínimo 2) ---
db.areas.insertMany([
    { _id: idAreaVentas, nombre: "Ventas" },
    { _id: idAreaIT, nombre: "Tecnología" }
]);

// --- 5. Colección: 'cargos' (mínimo 3) ---
db.cargos.insertMany([
    { _id: idCargoVendedor, nombre: "Vendedor", area_id: idAreaVentas },
    { _id: idCargoGerenteVentas, nombre: "Gerente de Ventas", area_id: idAreaVentas },
    { _id: idCargoDesarrollador, nombre: "Desarrollador Backend", area_id: idAreaIT }
]);

// --- 6. Colección: 'tipos_contratos' (mínimo 2) ---
db.tipos_contratos.insertMany([
    { _id: idTipoContratoFijo, nombre: "Término Fijo" },
    { _id: idTipoContratoIndefinido, nombre: "Término Indefinido" }
]);

// --- 7. Colección: 'conceptos' (mínimo 3) ---
// Porcentaje ahora es double
db.conceptos.insertMany([
    { _id: idConceptoSalario, nombre: "Salario Básico", tipo: "DEV", porcentaje: 0.0, descripcion: "Remuneración fija mensual." },
    { _id: idConceptoAuxTransporte, nombre: "Auxilio de Transporte", tipo: "DEV", porcentaje: 0.0, descripcion: "Ayuda para costos de transporte (cuando aplica)." },
    { _id: idConceptoSalud, nombre: "Aporte Salud", tipo: "DED", porcentaje: 0.04, descripcion: "Aporte obligatorio a salud (4% empleado)." },
    { _id: idConceptoPension, nombre: "Aporte Pensión", tipo: "DED", porcentaje: 0.04, descripcion: "Aporte obligatorio a pensión (4% empleado)." },
    { _id: idConceptoBonoProductividad, nombre: "Bono Productividad", tipo: "DEV", porcentaje: 0.0, descripcion: "Incentivo por cumplimiento de metas." }
]);

// --- 8. Colección: 'tipos_novedades' (mínimo 2) ---
db.tipos_novedades.insertMany([
    { _id: idTipoNovedadIncapacidad, nombre: "Incapacidad Médica", impacto: "Negativo", descripcion: "Ausencia por motivos de salud." },
    { _id: idTipoNovedadBonificacion, nombre: "Bonificación Extra", impacto: "Positivo", descripcion: "Pago adicional por desempeño excepcional." }
]);

// --- 9. Colección: 'empleados' (mínimo 4) ---
// Ajustado el enum de 'genero' y diferentes tipos de identificación.
db.empleados.insertMany([
    {
        _id: idEmpleado1,
        tipoDeIdentificacion: "CC",
        numeroIdentificacion: "1018456789",
        nombres: "Ana María",
        apellidos: "Gómez Pérez",
        telefono: "3001234567",
        email: "ana.gomez@example.com",
        genero: "F",
        ciudad: "Bogotá",
        direccion: "Calle 10 # 5-20",
        activo: "Y"
    },
    {
        _id: idEmpleado2,
        tipoDeIdentificacion: "TI", // Tarjeta de Identidad
        numeroIdentificacion: "9876543210",
        nombres: "Carlos Alberto",
        apellidos: "Rodríguez Díaz",
        telefono: "3109876543",
        email: "carlos.r@example.com",
        genero: "M",
        ciudad: "Medellín",
        direccion: "Carrera 80 # 25-10",
        activo: "Y"
    },
    {
        _id: idEmpleado3,
        tipoDeIdentificacion: "PA", // Pasaporte
        numeroIdentificacion: "ABC123456",
        nombres: "Laura Sofía",
        apellidos: "Martínez Rojas",
        telefono: "3205551122",
        email: "laura.m@example.com",
        genero: "Otro", // Nuevo valor para género
        ciudad: "Bogotá",
        direccion: "Avenida 15 # 40-30",
        activo: "Y"
    },
    {
        _id: idEmpleado4,
        tipoDeIdentificacion: "CE", // Cédula de Extranjería
        numeroIdentificacion: "XYZ789012",
        nombres: "Pedro José",
        apellidos: "López Castro",
        telefono: "3154448877",
        email: "pedro.l@example.com",
        genero: "M",
        ciudad: "Cali",
        direccion: "Calle 50 # 10-100",
        activo: "N" // Este empleado está inactivo
    }
]);

// --- 10. Colección: 'contratos' (mínimo 4) ---
// Embebemos los objetos 'empleado', 'tipoContrato' y 'cargo'.
// Salario base se almacena como NumberLong (en centavos).
db.contratos.insertMany([
    {
        _id: idContrato1,
        codigo: "CONT-001",
        empleado: {
            id: idEmpleado1,
            nombres: "Ana María",
            apellidos: "Gómez Pérez"
        },
        tipoContrato: {
            id: idTipoContratoIndefinido,
            nombre: "Término Indefinido"
        },
        duracion: 0, // Indefinido
        cargo: {
            id: idCargoGerenteVentas,
            nombre: "Gerente de Ventas",
            area: {
                id: idAreaVentas,
                nombre: "Ventas"
            }
        },
        salarioBase: NumberLong(350000000), // $3,500,000.00
        activo: "Y"
    },
    {
        _id: idContrato2,
        codigo: "CONT-002",
        empleado: {
            id: idEmpleado2,
            nombres: "Carlos Alberto",
            apellidos: "Rodríguez Díaz"
        },
        tipoContrato: {
            id: idTipoContratoFijo,
            nombre: "Término Fijo"
        },
        duracion: 12, // 12 meses
        cargo: {
            id: idCargoVendedor,
            nombre: "Vendedor",
            area: {
                id: idAreaVentas,
                nombre: "Ventas"
            }
        },
        salarioBase: NumberLong(150000000), // $1,500,000.00
        activo: "Y"
    },
    {
        _id: idContrato3,
        codigo: "CONT-003",
        empleado: {
            id: idEmpleado3,
            nombres: "Laura Sofía",
            apellidos: "Martínez Rojas"
        },
        tipoContrato: {
            id: idTipoContratoIndefinido,
            nombre: "Término Indefinido"
        },
        duracion: 0,
        cargo: {
            id: idCargoDesarrollador,
            nombre: "Desarrollador Backend",
            area: {
                id: idAreaIT,
                nombre: "Tecnología"
            }
        },
        salarioBase: NumberLong(280000000), // $2,800,000.00
        activo: "Y"
    },
    {
        _id: idContrato4,
        codigo: "CONT-004",
        empleado: {
            id: idEmpleado4,
            nombres: "Pedro José",
            apellidos: "López Castro"
        },
        tipoContrato: {
            id: idTipoContratoFijo,
            nombre: "Término Fijo"
        },
        duracion: 6,
        cargo: {
            id: idCargoVendedor,
            nombre: "Vendedor",
            area: {
                id: idAreaVentas,
                nombre: "Ventas"
            }
        },
        salarioBase: NumberLong(120000000), // $1,200,000.00
        activo: "N" // Contrato inactivo
    }
]);

// --- 11. Colección: 'nominas' (nómina de 2 meses) ---
// Calculamos los valores en centavos usando NumberLong.
var salarioAna = NumberLong(350000000); // 3,500,000.00
var auxTransporte2025 = NumberLong(162000); // Auxilio de transporte para 2025 (162.000 COP)
var porcentajeSalud = 0.04; // 4%
var porcentajePension = 0.04; // 4%

var saludAna = NumberLong(salarioAna * porcentajeSalud);
var pensionAna = NumberLong(salarioAna * porcentajePension);
var netoAna = salarioAna - saludAna - pensionAna;

var salarioCarlos = NumberLong(150000000); // 1,500,000.00
var saludCarlos = NumberLong(salarioCarlos * porcentajeSalud);
var pensionCarlos = NumberLong(salarioCarlos * porcentajePension);
var netoCarlos = salarioCarlos + auxTransporte2025 - saludCarlos - pensionCarlos;

var salarioLaura = NumberLong(280000000); // 2,800,000.00
var saludLaura = NumberLong(salarioLaura * porcentajeSalud);
var pensionLaura = NumberLong(salarioLaura * porcentajePension);
var netoLaura = salarioLaura - saludLaura - pensionLaura;


// Nómina de Mayo 2025
db.nominas.insertOne({
    _id: idNominaMayo2025,
    codigo: "NOM-2025-05",
    fecha_inicial: ISODate("2025-05-01T00:00:00Z"),
    fecha_final: ISODate("2025-05-31T23:59:59Z"),
    estado: "Pagada",
    detalles_contratos: [
        // Detalle de Ana María
        {
            contrato_id: idContrato1,
            empleado: {
                id: idEmpleado1,
                tipoDeIdentificacion: "CC",
                numeroIdentificacion: "1018456789",
                nombres: "Ana María",
                apellidos: "Gómez Pérez",
                telefono: "3001234567",
                email: "ana.gomez@example.com",
                genero: "F",
                ciudad: "Bogotá",
                direccion: "Calle 10 # 5-20"
            },
            contrato: {
                id: idContrato1,
                codigo: "CONT-001",
                tipoContrato: { id: idTipoContratoIndefinido, nombre: "Término Indefinido" },
                duracion: 0,
                cargo: { id: idCargoGerenteVentas, nombre: "Gerente de Ventas", area: { id: idAreaVentas, nombre: "Ventas" } },
                salarioBase: salarioAna,
                activo: "Y"
            },
            conceptos: [
                { concepto_id: idConceptoSalario, tipo: "DEV", nombre: "Salario Básico", valor: salarioAna },
                { concepto_id: idConceptoSalud, tipo: "DED", nombre: "Aporte Salud", valor: saludAna },
                { concepto_id: idConceptoPension, tipo: "DED", nombre: "Aporte Pensión", valor: pensionAna }
            ],
            novedades: [],
            total_devengado: salarioAna,
            total_deducido: saludAna + pensionAna,
            neto_a_pagar: netoAna
        },
        // Detalle de Carlos Alberto
        {
            contrato_id: idContrato2,
            empleado: {
                id: idEmpleado2,
                tipoDeIdentificacion: "TI",
                numeroIdentificacion: "9876543210",
                nombres: "Carlos Alberto",
                apellidos: "Rodríguez Díaz",
                telefono: "3109876543",
                email: "carlos.r@example.com",
                genero: "M",
                ciudad: "Medellín",
                direccion: "Carrera 80 # 25-10"
            },
            contrato: {
                id: idContrato2,
                codigo: "CONT-002",
                tipoContrato: { id: idTipoContratoFijo, nombre: "Término Fijo" },
                duracion: 12,
                cargo: { id: idCargoVendedor, nombre: "Vendedor", area: { id: idAreaVentas, nombre: "Ventas" } },
                salarioBase: salarioCarlos,
                activo: "Y"
            },
            conceptos: [
                { concepto_id: idConceptoSalario, tipo: "DEV", nombre: "Salario Básico", valor: salarioCarlos },
                { concepto_id: idConceptoAuxTransporte, tipo: "DEV", nombre: "Auxilio de Transporte", valor: auxTransporte2025 },
                { concepto_id: idConceptoSalud, tipo: "DED", nombre: "Aporte Salud", valor: saludCarlos },
                { concepto_id: idConceptoPension, tipo: "DED", nombre: "Aporte Pensión", valor: pensionCarlos }
            ],
            novedades: [],
            total_devengado: salarioCarlos + auxTransporte2025,
            total_deducido: saludCarlos + pensionCarlos,
            neto_a_pagar: netoCarlos
        },
        // Detalle de Laura Sofía
        {
            contrato_id: idContrato3,
            empleado: {
                id: idEmpleado3,
                tipoDeIdentificacion: "PA",
                numeroIdentificacion: "ABC123456",
                nombres: "Laura Sofía",
                apellidos: "Martínez Rojas",
                telefono: "3205551122",
                email: "laura.m@example.com",
                genero: "Otro",
                ciudad: "Bogotá",
                direccion: "Avenida 15 # 40-30"
            },
            contrato: {
                id: idContrato3,
                codigo: "CONT-003",
                tipoContrato: { id: idTipoContratoIndefinido, nombre: "Término Indefinido" },
                duracion: 0,
                cargo: { id: idCargoDesarrollador, nombre: "Desarrollador Backend", area: { id: idAreaIT, nombre: "Tecnología" } },
                salarioBase: salarioLaura,
                activo: "Y"
            },
            conceptos: [
                { concepto_id: idConceptoSalario, tipo: "DEV", nombre: "Salario Básico", valor: salarioLaura },
                { concepto_id: idConceptoSalud, tipo: "DED", nombre: "Aporte Salud", valor: saludLaura },
                { concepto_id: idConceptoPension, tipo: "DED", nombre: "Aporte Pensión", valor: pensionLaura }
            ],
            novedades: [],
            total_devengado: salarioLaura,
            total_deducido: saludLaura + pensionLaura,
            neto_a_pagar: netoLaura
        }
    ]
});

// Nómina de Junio 2025 (Con una novedad para Carlos)
var impactoNovedadCarlos = NumberLong(5000000); // Bonificación de $50,000.00
var netoCarlosJunio = netoCarlos + impactoNovedadCarlos;

db.nominas.insertOne({
    _id: idNominaJunio2025,
    codigo: "NOM-2025-06",
    fecha_inicial: ISODate("2025-06-01T00:00:00Z"),
    fecha_final: ISODate("2025-06-30T23:59:59Z"),
    estado: "Calculada", // Todavía no pagada
    detalles_contratos: [
        // Detalle de Ana María (igual que mayo)
        {
            contrato_id: idContrato1,
            empleado: {
                id: idEmpleado1,
                tipoDeIdentificacion: "CC",
                numeroIdentificacion: "1018456789",
                nombres: "Ana María",
                apellidos: "Gómez Pérez",
                telefono: "3001234567",
                email: "ana.gomez@example.com",
                genero: "F",
                ciudad: "Bogotá",
                direccion: "Calle 10 # 5-20"
            },
            contrato: {
                id: idContrato1,
                codigo: "CONT-001",
                tipoContrato: { id: idTipoContratoIndefinido, nombre: "Término Indefinido" },
                duracion: 0,
                cargo: { id: idCargoGerenteVentas, nombre: "Gerente de Ventas", area: { id: idAreaVentas, nombre: "Ventas" } },
                salarioBase: salarioAna,
                activo: "Y"
            },
            conceptos: [
                { concepto_id: idConceptoSalario, tipo: "DEV", nombre: "Salario Básico", valor: salarioAna },
                { concepto_id: idConceptoSalud, tipo: "DED", nombre: "Aporte Salud", valor: saludAna },
                { concepto_id: idConceptoPension, tipo: "DED", nombre: "Aporte Pensión", valor: pensionAna }
            ],
            novedades: [],
            total_devengado: salarioAna,
            total_deducido: saludAna + pensionAna,
            neto_a_pagar: netoAna
        },
        // Detalle de Carlos Alberto (con bonificación)
        {
            contrato_id: idContrato2,
            empleado: {
                id: idEmpleado2,
                tipoDeIdentificacion: "TI",
                numeroIdentificacion: "9876543210",
                nombres: "Carlos Alberto",
                apellidos: "Rodríguez Díaz",
                telefono: "3109876543",
                email: "carlos.r@example.com",
                genero: "M",
                ciudad: "Medellín",
                direccion: "Carrera 80 # 25-10"
            },
            contrato: {
                id: idContrato2,
                codigo: "CONT-002",
                tipoContrato: { id: idTipoContratoFijo, nombre: "Término Fijo" },
                duracion: 12,
                cargo: { id: idCargoVendedor, nombre: "Vendedor", area: { id: idAreaVentas, nombre: "Ventas" } },
                salarioBase: salarioCarlos,
                activo: "Y"
            },
            conceptos: [
                { concepto_id: idConceptoSalario, tipo: "DEV", nombre: "Salario Básico", valor: salarioCarlos },
                { concepto_id: idConceptoAuxTransporte, tipo: "DEV", nombre: "Auxilio de Transporte", valor: auxTransporte2025 },
                { concepto_id: idConceptoSalud, tipo: "DED", nombre: "Aporte Salud", valor: saludCarlos },
                { concepto_id: idConceptoPension, tipo: "DED", nombre: "Aporte Pensión", valor: pensionCarlos },
                { concepto_id: idConceptoBonoProductividad, tipo: "DEV", nombre: "Bono Productividad", valor: impactoNovedadCarlos }
            ],
            novedades: [
                {
                    novedad_id: new ObjectId(),
                    tipo_novedad: { id: idTipoNovedadBonificacion, nombre: "Bonificación Extra" },
                    fecha_inicial: ISODate("2025-06-15T00:00:00Z"),
                    fecha_final: ISODate("2025-06-15T23:59:59Z"),
                    observaciones: "Bono por desempeño excepcional en ventas del Q2.",
                    impacto_en_nomina: impactoNovedadCarlos
                }
            ],
            total_devengado: salarioCarlos + auxTransporte2025 + impactoNovedadCarlos,
            total_deducido: saludCarlos + pensionCarlos,
            neto_a_pagar: netoCarlosJunio
        },
        // Detalle de Laura Sofía (igual que mayo)
        {
            contrato_id: idContrato3,
            empleado: {
                id: idEmpleado3,
                tipoDeIdentificacion: "PA",
                numeroIdentificacion: "ABC123456",
                nombres: "Laura Sofía",
                apellidos: "Martínez Rojas",
                telefono: "3205551122",
                email: "laura.m@example.com",
                genero: "Otro",
                ciudad: "Bogotá",
                direccion: "Avenida 15 # 40-30"
            },
            contrato: {
                id: idContrato3,
                codigo: "CONT-003",
                tipoContrato: { id: idTipoContratoIndefinido, nombre: "Término Indefinido" },
                duracion: 0,
                cargo: { id: idCargoDesarrollador, nombre: "Desarrollador Backend", area: { id: idAreaIT, nombre: "Tecnología" } },
                salarioBase: salarioLaura,
                activo: "Y"
            },
            conceptos: [
                { concepto_id: idConceptoSalario, tipo: "DEV", nombre: "Salario Básico", valor: salarioLaura },
                { concepto_id: idConceptoSalud, tipo: "DED", nombre: "Aporte Salud", valor: saludLaura },
                { concepto_id: idConceptoPension, tipo: "DED", nombre: "Aporte Pensión", valor: pensionLaura }
            ],
            novedades: [],
            total_devengado: salarioLaura,
            total_deducido: saludLaura + pensionLaura,
            neto_a_pagar: netoLaura
        }
    ]
});