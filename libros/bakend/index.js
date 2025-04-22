const express = require('express');
const app = express();

// Middleware para leer JSON del cuerpo de las peticiones
app.use(express.json());

// Lista de libros (con varios libros iniciales)
let libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez' },
  { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes' },
  { id: 3, titulo: '1984', autor: 'George Orwell' },
  { id: 4, titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry' },
  { id: 5, titulo: 'Rayuela', autor: 'Julio Cortázar' },
  { id: 6, titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafón' },
  { id: 7, titulo: 'Fahrenheit 451', autor: 'Ray Bradbury' },
  { id: 8, titulo: 'Crónica de una muerte anunciada', autor: 'Gabriel García Márquez' },
  { id: 9, titulo: 'Orgullo y prejuicio', autor: 'Jane Austen' },
  { id: 10, titulo: 'El nombre del viento', autor: 'Patrick Rothfuss' }
];

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola, Mundo!');
});

// Ruta para obtener todos los libros
app.get('/libros', (req, res) => {
  res.json(libros);
});

// Ruta para obtener un libro por ID
app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id === id);

  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ error: 'Libro no encontrado' });
  }
});

// Ruta para agregar un nuevo libro (POST)
app.post('/libros', (req, res) => {
  const { titulo, autor } = req.body;

  // Validar que el cuerpo tenga título y autor
  if (!titulo || !autor) {
    return res.status(400).json({ error: 'Faltan campos: titulo y autor son requeridos' });
  }

  const nuevoLibro = {
    id: libros.length + 1,
    titulo,
    autor
  };

  libros.push(nuevoLibro);
  res.status(201).json({
    mensaje: 'Libro agregado correctamente',
    libro: nuevoLibro
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000/');
});















