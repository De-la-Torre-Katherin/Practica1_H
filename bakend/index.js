const express = require('express'); // importar express
const app = express(); // cargar en la constante todas las funcionalidades de express

app.get('/', (req, res) => { // rol a ejecutarse
  res.send('¡Hola, Mundo!');
});

app.get('/json', (req, res) => { // nuevo método GET
  const jsonResponse = {
    mensaje: 'Pong',
  };
  res.json(jsonResponse); // enviar la respuesta como JSON
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000/');
});