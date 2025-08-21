import { Endpoint, PostmanExample } from '../types/home';

export const endpoints: Endpoint[] = [
  {
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/posts",
    description: "Obtener todos los posts",
    color: "bg-green-500"
  },
  {
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    description: "Obtener el post con ID 1",
    color: "bg-green-500"
  },
  {
    method: "POST",
    url: "https://jsonplaceholder.typicode.com/posts",
    description: "Crear un nuevo post",
    color: "bg-blue-500"
  },
  {
    method: "PUT",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    description: "Actualizar el post con ID 1",
    color: "bg-yellow-500"
  },
  {
    method: "DELETE",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    description: "Eliminar el post con ID 1",
    color: "bg-red-500"
  }
];

export const postmanExamples: PostmanExample[] = [
  {
    method: "POST",
    url: "https://jsonplaceholder.typicode.com/posts",
    body: `{
  "title": "Mi primer post",
  "body": "Este es el contenido de mi post",
  "userId": 1
}`,
    description: "Crear un nuevo post"
  },
  {
    method: "PUT",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    body: `{
  "id": 1,
  "title": "Título actualizado",
  "body": "Contenido actualizado",
  "userId": 1
}`,
    description: "Actualizar un post existente"
  }
];
