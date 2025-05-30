const express = require('express');
const app = express();

app.use(express.json());

// Lista de libros en memoria
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

// Ruta base
app.get('/', (req, res) => {
  res.send('¡Hola, Mundo!');
});

// Obtener todos los libros o filtrar por autor
app.get('/libros', (req, res) => {
  const { autor } = req.query;
  if (autor) {
    const filtrados = libros.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
    res.json(filtrados);
  } else {
    res.json(libros);
  }
});

// Obtener libro por ID
app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id === id);
  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ error: 'Libro no encontrado' });
  }
});

// Agregar un nuevo libro
app.post('/libros', (req, res) => {
  const { titulo, autor } = req.body;
  if (!titulo || !autor) {
    return res.status(400).json({ error: 'Faltan campos: titulo y autor son requeridos' });
  }

  const nuevoLibro = {
    id: libros.length > 0 ? libros[libros.length - 1].id + 1 : 1,
    titulo,
    autor
  };

  libros.push(nuevoLibro);
  res.status(201).json({ mensaje: 'Libro agregado correctamente', libro: nuevoLibro });
});

// Actualizar libro por ID
app.put('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, autor } = req.body;
  const index = libros.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }

  if (!titulo || !autor) {
    return res.status(400).json({ error: 'Faltan campos: titulo y autor son requeridos' });
  }

  libros[index] = { id, titulo, autor };
  res.json({ mensaje: 'Libro actualizado correctamente', libro: libros[index] });
});

// Eliminar libro por ID
app.delete('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = libros.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }

  const libroEliminado = libros.splice(index, 1);
  res.json({ mensaje: 'Libro eliminado correctamente', libro: libroEliminado[0] });
});


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000/libros');
});
