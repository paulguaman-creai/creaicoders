# 📥 Cómo Importar la Colección de Postman

## 🎯 ¿Qué es esto?
Una colección completa de Postman con **25+ requests preconfigurados** para probar todos los métodos HTTP con JSONPlaceholder.

## 📋 Contenido de la Colección

### 📝 Posts (CRUD completo)
- ✅ GET - Obtener todos los posts
- ✅ GET - Obtener post por ID
- ✅ GET - Posts de un usuario específico
- ✅ POST - Crear nuevo post
- ✅ PUT - Actualizar post existente
- ✅ PATCH - Actualizar parcialmente post
- ✅ DELETE - Eliminar post

### 👥 Usuarios
- ✅ GET - Obtener todos los usuarios
- ✅ GET - Usuario por ID

### 💬 Comentarios
- ✅ GET - Todos los comentarios
- ✅ GET - Comentarios de un post
- ✅ GET - Comentarios por post ID

### ✅ Todos (Tareas)
- ✅ GET - Todas las tareas
- ✅ GET - Tareas de un usuario
- ✅ GET - Tareas completadas

### 🖼️ Álbumes
- ✅ GET - Todos los álbumes
- ✅ GET - Álbumes de un usuario

### 🔍 Ejemplos Avanzados
- ✅ GET - Combinar múltiples filtros
- ✅ POST - Crear con datos personalizados

## 🚀 Pasos para Importar

### 1. Descargar la Colección
- El archivo `JSONPlaceholder_Collection.postman_collection.json` ya está en tu proyecto
- O puedes copiar todo el contenido del archivo

### 2. Abrir Postman
- Abre la aplicación Postman
- Asegúrate de estar en la vista principal

### 3. Importar la Colección
**Opción A: Archivo**
1. Haz clic en **"Import"** (botón azul en la esquina superior izquierda)
2. Selecciona **"File"**
3. Haz clic en **"Upload Files"**
4. Selecciona el archivo `JSONPlaceholder_Collection.postman_collection.json`
5. Haz clic en **"Import"**

**Opción B: Copiar y Pegar**
1. Haz clic en **"Import"**
2. Selecciona **"Raw text"**
3. Copia todo el contenido del archivo JSON
4. Pégalo en el campo de texto
5. Haz clic en **"Continue"** y luego **"Import"**

### 4. Verificar la Importación
- Deberías ver la colección **"JSONPlaceholder - APIs REST"** en el panel izquierdo
- Expande la colección para ver todas las carpetas organizadas por categoría

## 🎮 Cómo Usar la Colección

### 1. Probar Requests Individuales
- Haz clic en cualquier request de la colección
- Haz clic en **"Send"** para ejecutarlo
- Observa la respuesta en el panel inferior

### 2. Ejecutar Toda la Colección
- Haz clic derecho en la colección
- Selecciona **"Run collection"**
- Configura las opciones si quieres
- Haz clic en **"Run JSONPlaceholder - APIs REST"**

### 3. Usar Variables
La colección incluye variables predefinidas:
- `{{base_url}}` = https://jsonplaceholder.typicode.com
- `{{user_id}}` = 1
- `{{post_id}}` = 1

## 🔧 Características de la Colección

### ✨ Tests Automáticos
Cada request incluye tests que verifican:
- Status code 200
- Response time < 2000ms
- Response válido con JSON

### 📊 Logs Automáticos
- Se registra cada request enviado
- Se muestra el tiempo de respuesta
- Se verifica el status code

### 🎨 Organización Clara
- Requests organizados por categoría
- Nombres descriptivos y emojis
- Descripciones detalladas de cada endpoint

## 💡 Consejos de Uso

### Para Principiantes
1. **Empieza con GET** - Son los más simples
2. **Lee las descripciones** - Explican qué hace cada request
3. **Observa las respuestas** - Te enseñan la estructura de los datos

### Para Avanzados
1. **Modifica los datos** - Cambia los valores en POST/PUT
2. **Experimenta con filtros** - Combina query parameters
3. **Usa las variables** - Personaliza user_id y post_id

### Para Instructores
1. **Ejecuta la colección completa** para verificar que todo funciona
2. **Modifica los tests** según tus necesidades
3. **Agrega más ejemplos** específicos para tu clase

## 🆘 Solución de Problemas

### La colección no se importa
- Verifica que el archivo JSON esté completo
- Asegúrate de que Postman esté actualizado
- Intenta con la opción "Raw text"

### Los requests no funcionan
- Verifica tu conexión a internet
- Asegúrate de que la API esté disponible
- Revisa la consola de Postman para errores

### Los tests fallan
- Es normal que algunos tests fallen en ciertas condiciones
- Revisa los logs para entender qué está pasando
- Los tests son solo para verificación, no afectan la funcionalidad

## 🎉 ¡Listo!
Ahora tienes una colección completa y profesional para enseñar APIs REST con Postman. Tus alumnos pueden:

- ✅ Probar todos los métodos HTTP
- ✅ Ver ejemplos reales de requests y responses
- ✅ Aprender con tests automáticos
- ✅ Experimentar con diferentes endpoints
- ✅ Entender la estructura de APIs REST

## 🔗 Enlaces Útiles
- [Postman Learning Center](https://learning.postman.com/)
- [JSONPlaceholder Documentation](https://jsonplaceholder.typicode.com/)
- [HTTP Methods Guide](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)

---

**¡Disfruta enseñando APIs REST con esta colección profesional! 🚀**
