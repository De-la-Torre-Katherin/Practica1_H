# Practica1_H
practica_WS 
se lealiso un crud completo con con la practiaca anterior que ya se teneua con 2 metodos 
pero ahora se aumentaron dos mas que fueron el de actualizar y el de eliminar


- **GET /libros**  
  Devuelve todos los libros en formato JSON.

- **GET /libros/:id**  
  Devuelve un libro específico por ID.  
  Responde 404 si no existe.

- **POST /libros**  
  Crea un nuevo libro.  
  El body debe incluir `titulo` y `autor`.  
  Responde 400 si falta alguno.

- **PUT /libros/:id**  
  Actualiza un libro existente por ID.  
  Responde 404 si no existe.

- **DELETE /libros/:id**  
  Elimina un libro por ID.  
  Responde 404 si no existe.

- **GET /libros?autor=<nombre>**  
  Filtra libros por autor.

## Ejemplos de Requests y Responses

### GET /libros

Request:
