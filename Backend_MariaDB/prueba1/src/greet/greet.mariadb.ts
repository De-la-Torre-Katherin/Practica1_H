import { createConnection, Connection, ConnectionConfig } from "mariadb";
import * as dotenv from "dotenv";
dotenv.config();  // Carga las variables de entorno desde el archivo .env

// Verifica que las variables de entorno estén correctamente cargadas
console.log("Contraseña de la base de datos:", process.env.DB_PASSWORD);
console.log("Usuario de la base de datos:", process.env.DB_USER);

// Configuración de la base de datos
const dbConfig: ConnectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    port: Number(process.env.DB_PORT),  
    database: process.env.DB_NAME,
};

// Declaración de la conexión
let connection: Connection | null = null;

// Función para conectar a la base de datos
async function connectToDatabase(): Promise<void> {
    if (!connection) {
        connection = await createConnection(dbConfig);
        console.log("Conexión establecida con la base de datos");
    }
}

// Clase de saludos con métodos para insertar, actualizar, eliminar y consultar
export class Greet {
    // Método para obtener todos los saludos
    static async findAll() {
        if (!connection) {
            await connectToDatabase(); // Asegúrate de estar conectado antes de ejecutar la consulta
        }
        return await connection!.query('SELECT * FROM regards');
    }

    // Método para obtener un saludo por ID
    static async findById(id: number) {
        if (!connection) {
            await connectToDatabase();
        }
        const result = await connection!.query(
            'SELECT id, greet, language FROM regards WHERE id = ?', [id]
        );
        return result[0]; // Retorna el primer resultado
    }

    // Método para crear un saludo

    static async create(param: Param) {
        if (!connection) {
            await connectToDatabase();
        }
        const [{ id }] = await connection!.query(
            'INSERT INTO regards (greet, language) VALUES (?, ?) RETURNING id',
            [param.greet, param.language]
        );

        const result = await connection!.query(
            'SELECT id, greet, language FROM regards WHERE id = ?', [id]
        );
        return result[0]; // Retorna el primer resultado
    }

static async update(id: number, param: Param) {
  if (!connection) await connectToDatabase();

  // Ejecutamos el UPDATE y comprobamos si afectó filas
  const res = await connection!.query(
    'UPDATE regards SET greet = ?, language = ? WHERE id = ?',
    [param.greet, param.language, id]
  );
  if ((res as any).affectedRows === 0) {
    return null; // no encontró nada que actualizar
  }

  // Y devolvemos el registro ya actualizado
  const rows = await connection!.query(
    'SELECT id, greet, language FROM regards WHERE id = ?',
    [id]
  );
  return rows[0];
}
 
     
static async delete(id: number) {
  if (!connection) await connectToDatabase();

  const res = await connection!.query(
    'DELETE FROM regards WHERE id = ?',
    [id]
  );
  // MariaDB devuelve affectedRows en el resultado
  return { affectedRows: (res as any).affectedRows };
}

  static async stats() {
    if (!connection) await connectToDatabase();
    const totalRows = await connection!.query<{ total: number }[]>(
      'SELECT COUNT(*) AS total FROM regards'
    );
    const total = totalRows[0]?.total ?? 0;
    const langCount = await connection!.query<{ language: string; count: number }[]>(
      'SELECT language, COUNT(*) AS count FROM regards GROUP BY language'
    );
    return {
      total,
      conteo_por_idioma: langCount
    };
  }
    
}



// LO DE ARIBA ERA POR ESO DE EXPORT 
// Tipo para los parámetros de saludo
export type Param = {
    greet: string;  // Corregido el nombre de la propiedad a 'greeting'
    language: string;
};



