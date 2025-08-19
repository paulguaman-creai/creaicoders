import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { moduleService } from '../services/moduleService';
import type { Module, Lesson, Evaluation } from '../types/education';
import { ModuleDifficulty } from '../types/education';

const ModulePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTotalPoints = () => {
    if (!lessons) return 0;
    return lessons.reduce((total, lesson) => total + (lesson.points || 0), 0);
  };

  const getCompletedPoints = () => {
    if (!lessons) return 0;
    return lessons
      .filter(lesson => lesson.isCompleted)
      .reduce((total, lesson) => total + (lesson.points || 0), 0);
  };

  const getProgressPercentage = () => {
    if (!module || !lessons || lessons.length === 0) return 0;
    return Math.round((module.completedLessons || 0) / lessons.length * 100);
  };

  const totalPoints = getTotalPoints();
  const completedPoints = getCompletedPoints();
  const progressPercentage = getProgressPercentage();

  const fetchModuleData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const moduleData = await moduleService.getModuleBySlug(slug || '');
      setModule(moduleData);

      // Usar el ID del módulo para obtener las lecciones
      const lessonsData = await moduleService.getModuleLessons(moduleData.id);
      setLessons(lessonsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el módulo');
      console.error('Error loading module:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!slug) {
      setError('No se encontró el módulo');
      setLoading(false);
      return;
    }
    fetchModuleData();
  }, [slug]);

  const getDifficultyColor = (difficulty: ModuleDifficulty | undefined) => {
    if (!difficulty) return 'bg-gray-100 text-gray-800';
    
    switch (difficulty) {
      case ModuleDifficulty.BEGINNER:
        return 'bg-green-100 text-green-800';
      case ModuleDifficulty.INTERMEDIATE:
        return 'bg-yellow-100 text-yellow-800';
      case ModuleDifficulty.ADVANCED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLessonStatusIcon = (lesson: Lesson) => {
    if (lesson.isCompleted) {
      return '✅';
    }
    return '📚';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando módulo...</p>
        </div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Módulo no encontrado</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header del módulo */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              to="/"
              className="text-blue-200 hover:text-white font-medium flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Volver al inicio</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{module.iconUrl ? <img src={module.iconUrl} alt="" className="w-12 h-12" /> : '🌐'}</div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
                  <p className="text-blue-200 text-lg">{module.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(module?.difficulty)}`}>
                  {module?.difficulty || 'No especificado'}
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium">
                  ⏱️ {module?.estimatedDuration || 'No especificado'} minutos
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium">
                  📚 {lessons.length} lecciones
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium">
                  🎯 {totalPoints} puntos totales
                </span>
              </div>

              {/* Barra de progreso */}
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progreso del módulo</span>
                  <span className="text-sm font-bold">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span>{module.completedLessons} de {lessons.length} lecciones completadas</span>
                  <span>{completedPoints} de {totalPoints} puntos obtenidos</span>
                </div>
              </div>
            </div>

            {/* Estadísticas del módulo */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Lecciones</span>
                  <span className="font-bold text-xl">{lessons.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Completadas</span>
                  <span className="font-bold text-xl text-green-400">{module.completedLessons}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Puntos totales</span>
                  <span className="font-bold text-xl text-yellow-400">{totalPoints}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Puntos obtenidos</span>
                  <span className="font-bold text-xl text-green-400">{completedPoints}</span>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Features del módulo */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Qué aprenderás en este módulo?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Ejercicios Evaluables</h3>
              <p className="text-sm text-gray-600">Practica con ejercicios que se evalúan automáticamente</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="font-semibold text-gray-900 mb-2">Quizzes Interactivos</h3>
              <p className="text-sm text-gray-600">Refuerza tu conocimiento con quizzes inteligentes</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Teoría Práctica</h3>
              <p className="text-sm text-gray-600">Aprende conceptos con aplicaciones del mundo real</p>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-semibold text-gray-900 mb-2">Sistema de Puntos</h3>
              <p className="text-sm text-gray-600">Gana puntos y trackea tu progreso</p>
            </div>
          </div>
        </div>

        {/* Lista de lecciones */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Lecciones del Módulo</h2>
            <p className="text-gray-600 mt-2">Completa las lecciones en orden para obtener la máxima puntuación</p>
          </div>

          <div className="divide-y divide-gray-200">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="group hover:bg-gray-50 transition-colors">
                <Link 
                  to={`/modules/${module?.slug}/lessons/${lesson.slug}`}
                  className="block px-8 py-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Número de lección */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        lesson.isCompleted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600 group-hover:bg-blue-500 group-hover:text-white'
                      } transition-colors`}>
                        {lesson.isCompleted ? '✓' : index + 1}
                      </div>

                      {/* Información de la lección */}
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {lesson.title}
                          </h3>
                          <span className="text-xl">{getLessonStatusIcon(lesson)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <span>⏱️</span>
                            <span>{lesson.estimatedTime}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>🎯</span>
                            <span>{lesson.points} puntos</span>
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                            {lesson.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Estado y acción */}
                    <div className="flex items-center space-x-4">
                      {lesson.isCompleted && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <span className="text-sm font-medium">Completada</span>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2 text-blue-600 group-hover:text-blue-800 transition-colors">
                        <span className="text-sm font-medium">
                          {lesson.isCompleted ? 'Revisar' : 'Comenzar'}
                        </span>
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

          {lessons.length === 0 && (
            <div className="px-8 py-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay lecciones disponibles</h3>
              <p className="text-gray-600">Las lecciones se están preparando</p>
            </div>
          )}
        </div>

        {module.evaluations && <EvaluationSection evaluations={module.evaluations} moduleSlug={module.slug} />}

        {/* Call to Action */}
        {lessons.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-800 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              {module.completedLessons === 0 ? '¿Listo para comenzar?' : '¡Continúa tu aprendizaje!'}
            </h2>
            <p className="text-blue-200 mb-6">
              {module.completedLessons === 0 
                ? 'Sumérgete en este módulo interactivo y comienza a ganar puntos'
                : `Has completado ${module.completedLessons} de ${lessons.length} lecciones. ¡Sigue así!`
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {module.completedLessons === 0 ? (
                <Link
                  to={`/modules/${module?.slug}/lessons/${lessons[0].slug}`}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <span>Comenzar Primera Lección</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              ) : (
                <>
                  {/* Continuar con la siguiente lección no completada */}
                  {(() => {
                    const nextLesson = lessons.find(lesson => !lesson.isCompleted);
                    return nextLesson ? (
                      <Link
                        to={`/modules/${module?.slug}/lessons/${nextLesson.slug}`}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
                      >
                        <span>Continuar con: {nextLesson.title}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    ) : (
                      <div className="bg-green-100 text-green-800 px-8 py-3 rounded-lg font-bold inline-flex items-center justify-center space-x-2">
                        <span>🎉 ¡Módulo Completado!</span>
                      </div>
                    );
                  })()}
                  
                  <Link
                    to="/"
                    className="bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition-colors inline-flex items-center justify-center space-x-2"
                  >
                    <span>Explorar Más Módulos</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default ModulePage; 


const EvaluationSection = ({ evaluations, moduleSlug }: { evaluations: Evaluation[], moduleSlug: string }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-12">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Evaluaciones</h2>
            <p className="text-gray-600 mt-2">Completa las evaluaciones para entender mejor el contenido del módulo</p>
          </div>

          <div className="divide-y divide-gray-200">
            {evaluations.map((evaluation, index) => (
              <div key={evaluation.id} className="group hover:bg-gray-50 transition-colors">
                <Link 
                  to={`/modules/${moduleSlug}/evaluations/${evaluation.id}`}
                  className="block px-8 py-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Número de lección */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-gray-200 text-gray-600 transition-colors`}>
                        {index + 1}
                      </div>

                      {/* Información de la lección */}
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {evaluation.name}
                          </h3>
                        </div>
                    
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
  );
};

