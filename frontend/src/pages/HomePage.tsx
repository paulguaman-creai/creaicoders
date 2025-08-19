import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { moduleService } from '../services/moduleService';
import type { Module } from '../types/education';

const HomePage: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await moduleService.getAllModules();
      setModules(data);
    } catch (err) {
      setError('Error al cargar los módulos');
      console.error('Error fetching modules:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando módulos...</p>
        </div>
          </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error de conexión</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            🚀 CreAI Coders Academy
            </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Aprende programación y tecnología de forma interactiva con ejercicios evaluables automáticamente, 
            quizzes inteligentes y proyectos prácticos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">🎯</div>
              <div className="text-sm opacity-80">Ejercicios Evaluables</div>
              </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">🧠</div>
              <div className="text-sm opacity-80">Quizzes Interactivos</div>
              </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">💡</div>
              <div className="text-sm opacity-80">Aprendizaje Práctico</div>
              </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">🏆</div>
              <div className="text-sm opacity-80">Puntuación y Badges</div>
            </div>
          </div>
        </div>
      </div>

      {/* Módulos Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explora Nuestros Módulos Educativos
            </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada módulo incluye teoría, ejercicios prácticos evaluables automáticamente, 
            y un sistema de puntuación para hacer el aprendizaje más divertido.
            </p>
          </div>

        {modules.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay módulos disponibles</h3>
            <p className="text-gray-600">Regresa pronto para nuevos contenidos educativos.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => (
              <div key={module.id} className="group">
                <Link 
                  to={`/modules/${module.slug}`}
                  className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105"
                >
                  {/* Header del módulo */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">🌐</div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-full text-xs font-medium">
                          {module.difficulty}
                        </span>
                        <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-full text-xs font-medium">
                          {module.estimatedTime}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                  </div>

                  {/* Contenido del módulo */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {module.description}
                    </p>

                    {/* Estadísticas del módulo */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{module.totalLessons}</div>
                          <div className="text-xs text-gray-500">lecciones</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{module.completedLessons}</div>
                          <div className="text-xs text-gray-500">completadas</div>
                        </div>
                      </div>

                      {/* Progreso */}
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800">
                          {module.totalLessons > 0 ? Math.round((module.completedLessons / module.totalLessons) * 100) : 0}%
                        </div>
                        <div className="text-xs text-gray-500">progreso</div>
                      </div>
                    </div>

                    {/* Barra de progreso */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${module.totalLessons > 0 ? (module.completedLessons / module.totalLessons) * 100 : 0}%` 
                        }}
                      />
                    </div>

                    {/* Features del módulo */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-blue-500">🎯</span>
                        <span>Ejercicios evaluables</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-green-500">🧠</span>
                        <span>Quizzes interactivos</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-purple-500">💡</span>
                        <span>Teoría práctica</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-yellow-500">🏆</span>
                        <span>Sistema de puntos</span>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {module.completedLessons === 0 ? 'Comenzar ahora' : 'Continuar aprendiendo'}
                      </span>
                      <div className="flex items-center space-x-2 text-blue-600 font-medium group-hover:text-blue-800">
                        <span>Explorar</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir CreAI Coders Academy?
            </h2>
            <p className="text-lg text-gray-600">
              Nuestra plataforma combina lo mejor de la educación tradicional con tecnología moderna
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Evaluación Automática</h3>
              <p className="text-gray-600">
                Obtén feedback inmediato en tus ejercicios de código, quizzes y proyectos prácticos.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Progreso Gamificado</h3>
              <p className="text-gray-600">
                Gana puntos, desbloquea badges y sigue tu progreso de aprendizaje en tiempo real.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
            </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Aprendizaje Práctico</h3>
              <p className="text-gray-600">
                Cada concepto viene acompañado de ejercicios prácticos y aplicaciones del mundo real.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para comenzar tu viaje de aprendizaje?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de estudiantes que ya están transformando su futuro con CreAI Coders Academy
          </p>
          
          {modules.length > 0 && (
            <Link 
              to={`/modules/${modules[0].slug}`}
              className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              <span>Comenzar Ahora</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 