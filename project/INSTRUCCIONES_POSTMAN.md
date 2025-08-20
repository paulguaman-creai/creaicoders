# 📋 Instrucciones Simples para Probar APIs con Postman

## 🎯 Objetivo
Aprender a usar Postman para probar métodos HTTP básicos (GET, POST, PUT, DELETE) usando la API gratuita de JSONPlaceholder.

## 📥 Paso 1: Descargar Postman
1. Ve a [postman.com](https://postman.com)
2. Haz clic en "Download the App"
3. Instala Postman en tu computadora

## 🚀 Paso 2: Probar Método GET

### GET - Obtener todos los posts
1. Abre Postman
2. Haz clic en "New" → "Request"
3. Selecciona método **GET**
4. Escribe la URL: `https://jsonplaceholder.typicode.com/posts`
5. Haz clic en **Send**
6. Observa la respuesta (deberías ver una lista de 100 posts)

### GET - Obtener un post específico
1. Cambia la URL a: `https://jsonplaceholder.typicode.com/posts/1`
2. Haz clic en **Send**
3. Observa la respuesta (deberías ver solo el post con ID 1)

## ➕ Paso 3: Probar Método POST

### POST - Crear un nuevo post
1. Cambia el método a **POST**
2. Mantén la URL: `https://jsonplaceholder.typicode.com/posts`
3. Ve a la pestaña **Body**
4. Selecciona **raw** y **JSON**
5. Pega este contenido:
```json
{
  "title": "Mi primer post",
  "body": "Este es el contenido de mi post",
  "userId": 1
}
```
6. Haz clic en **Send**
7. Observa la respuesta (deberías ver el post creado con ID 101)

## ✏️ Paso 4: Probar Método PUT

### PUT - Actualizar un post existente
1. Cambia el método a **PUT**
2. Cambia la URL a: `https://jsonplaceholder.typicode.com/posts/1`
3. En el Body, pega este contenido:
```json
{
  "id": 1,
  "title": "Título actualizado",
  "body": "Contenido actualizado",
  "userId": 1
}
```
4. Haz clic en **Send**
5. Observa la respuesta (deberías ver el post actualizado)

## 🗑️ Paso 5: Probar Método DELETE

### DELETE - Eliminar un post
1. Cambia el método a **DELETE**
2. Mantén la URL: `https://jsonplaceholder.typicode.com/posts/1`
3. Haz clic en **Send**
4. Observa la respuesta (deberías ver un objeto vacío `{}`)

## 🔍 Otros Endpoints para Probar

### Usuarios
- `GET https://jsonplaceholder.typicode.com/users` - Todos los usuarios
- `GET https://jsonplaceholder.typicode.com/users/1` - Usuario específico

### Comentarios
- `GET https://jsonplaceholder.typicode.com/comments` - Todos los comentarios
- `GET https://jsonplaceholder.typicode.com/posts/1/comments` - Comentarios de un post

### Todos
- `GET https://jsonplaceholder.typicode.com/todos` - Todas las tareas
- `GET https://jsonplaceholder.typicode.com/todos?userId=1` - Tareas de un usuario

## 💡 Consejos Importantes

1. **Para GET**: No necesitas Body
2. **Para POST/PUT**: Siempre usa Body con formato JSON
3. **Para DELETE**: No necesitas Body
4. **Headers**: Postman automáticamente agrega `Content-Type: application/json`
5. **Respuestas**: JSONPlaceholder siempre responde con código 200 (éxito)

## 🎉 ¡Listo!
Has probado todos los métodos HTTP básicos. Ahora entiendes cómo funcionan las APIs REST.

## 🔗 Enlaces Útiles
- [JSONPlaceholder](https://jsonplaceholder.typicode.com)
- [Postman](https://postman.com)
- [Métodos HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)
