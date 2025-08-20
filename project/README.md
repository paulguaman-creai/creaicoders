# 🚀 Ejercicio Simple: APIs REST con Postman

## 📚 ¿Qué es esto?
Un ejercicio súper simple para que tus alumnos aprendan a usar **Postman** y prueben métodos HTTP básicos con la API gratuita de **JSONPlaceholder**.

## 🎯 Objetivo
Aprender a probar APIs REST usando Postman con ejemplos prácticos y reales.

## 🛠️ Lo que necesitas
- **Postman** (descarga gratuita desde [postman.com](https://postman.com))
- **Internet** para acceder a la API
- **Ganas de aprender** 😊

## 🔗 API que vamos a usar
**JSONPlaceholder** - Una API REST gratuita que no requiere autenticación.

- 🌐 URL Base: `https://jsonplaceholder.typicode.com`
- 📝 Endpoints: `/posts`, `/users`, `/comments`, `/todos`
- 🔓 Sin autenticación
- 📊 Datos de prueba reales

## 📋 Métodos HTTP que aprenderás

| Método | Color | ¿Qué hace? |
|--------|-------|------------|
| **GET** | 🟢 | Obtener datos |
| **POST** | 🔵 | Crear nuevos recursos |
| **PUT** | 🟡 | Actualizar recursos |
| **DELETE** | 🔴 | Eliminar recursos |

## 🚀 Cómo empezar

### 1. Descarga Postman
- Ve a [postman.com](https://postman.com)
- Haz clic en "Download the App"
- Instala la aplicación

### 2. Abre el proyecto
- Ejecuta `npm run dev` en la terminal
- Abre [http://localhost:3000](http://localhost:3000) en tu navegador
- Sigue las instrucciones paso a paso

### 3. Sigue la guía
- Lee el archivo `INSTRUCCIONES_POSTMAN.md`
- Prueba cada método HTTP
- Observa las respuestas

## 📖 Instrucciones Detalladas
Consulta el archivo `INSTRUCCIONES_POSTMAN.md` para instrucciones paso a paso con ejemplos específicos.

## 🎉 ¿Qué aprenderás?
- ✅ Usar Postman para probar APIs
- ✅ Entender métodos HTTP (GET, POST, PUT, DELETE)
- ✅ Ver cómo funcionan las APIs REST en la práctica
- ✅ Manejar respuestas JSON
- ✅ Crear y modificar datos a través de APIs

## 🔍 Endpoints de ejemplo

### Posts
```
GET    /posts              → Obtener todos los posts
GET    /posts/1            → Obtener el post con ID 1
POST   /posts              → Crear un nuevo post
PUT    /posts/1            → Actualizar el post con ID 1
DELETE /posts/1            → Eliminar el post con ID 1
```

### Usuarios
```
GET    /users              → Obtener todos los usuarios
GET    /users/1            → Obtener el usuario con ID 1
```

### Comentarios
```
GET    /comments           → Obtener todos los comentarios
GET    /posts/1/comments   → Obtener comentarios del post 1
```

### Todos
```
GET    /todos              → Obtener todas las tareas
GET    /todos?userId=1     → Obtener tareas del usuario 1
```

## 💡 Consejos para estudiantes
1. **Empieza con GET** - Es el más fácil
2. **Para POST/PUT** - Siempre agrega un Body en formato JSON
3. **Observa las respuestas** - Te enseñan mucho
4. **Experimenta** - Cambia los datos y ve qué pasa
5. **No te preocupes por romper nada** - Es solo para pruebas

## 🆘 Si algo no funciona
- Verifica que la URL esté bien escrita
- Asegúrate de que el método HTTP esté seleccionado
- Para POST/PUT, verifica que el Body esté en formato JSON
- Revisa que tengas conexión a internet

## 🔗 Enlaces útiles
- [JSONPlaceholder](https://jsonplaceholder.typicode.com) - La API que usamos
- [Postman](https://postman.com) - Descargar la aplicación
- [Métodos HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Methods) - Documentación oficial

## 📝 Nota para instructores
Este ejercicio está diseñado para ser **súper simple** y directo. Los alumnos solo necesitan:
1. Descargar Postman
2. Seguir las instrucciones
3. Probar los métodos HTTP

No hay código complejo, no hay frameworks, solo Postman + API = aprendizaje práctico.

---

**¡Simple, directo y efectivo! 🎯**
