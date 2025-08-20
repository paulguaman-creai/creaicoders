import { Post, User, Comment, Todo, Album } from '@/types/jsonplaceholder';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export class JsonPlaceholderService {
  // GET - Obtener todos los posts
  static async getPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${BASE_URL}/posts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // GET - Obtener un post específico por ID
  static async getPost(id: number): Promise<Post> {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      throw error;
    }
  }

  // GET - Obtener posts de un usuario específico
  static async getPostsByUser(userId: number): Promise<Post[]> {
    try {
      const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error);
      throw error;
    }
  }

  // GET - Obtener todos los usuarios
  static async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // GET - Obtener un usuario específico por ID
  static async getUser(id: number): Promise<User> {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }

  // GET - Obtener comentarios de un post específico
  static async getCommentsByPost(postId: number): Promise<Comment[]> {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
      throw error;
    }
  }

  // GET - Obtener todos los comentarios
  static async getComments(): Promise<Comment[]> {
    try {
      const response = await fetch(`${BASE_URL}/comments`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  // GET - Obtener todos los todos
  static async getTodos(): Promise<Todo[]> {
    try {
      const response = await fetch(`${BASE_URL}/todos`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  // GET - Obtener todos de un usuario específico
  static async getTodosByUser(userId: number): Promise<Todo[]> {
    try {
      const response = await fetch(`${BASE_URL}/todos?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching todos for user ${userId}:`, error);
      throw error;
    }
  }

  // GET - Obtener todos los álbumes
  static async getAlbums(): Promise<Album[]> {
    try {
      const response = await fetch(`${BASE_URL}/albums`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching albums:', error);
      throw error;
    }
  }

  // POST - Crear un nuevo post
  static async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // PUT - Actualizar un post existente
  static async updatePost(id: number, post: Partial<Post>): Promise<Post> {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating post ${id}:`, error);
      throw error;
    }
  }

  // DELETE - Eliminar un post
  static async deletePost(id: number): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting post ${id}:`, error);
      throw error;
    }
  }
}
