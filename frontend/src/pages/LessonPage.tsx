import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getLessonContent, getModuleLessons, getModuleBySlug } from '../services/api';
import type { LessonContent, ContentBlock, Lesson, Module } from '../services/api';
import { InteractiveWidget } from '../components/InteractiveWidget';

const LessonPage: React.FC = () => {
  const { moduleSlug, lessonSlug } = useParams<{ moduleSlug: string; lessonSlug: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<Module | null>(null);
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [maxPossibleScore, setMaxPossibleScore] = useState(0);

  useEffect(() => {
    const fetchLessonData = async () => {
      if (!moduleSlug || !lessonSlug) return;
      
      try {
        setLoading(true);
        // Primero obtenemos el módulo para tener su ID
        const moduleData = await getModuleBySlug(moduleSlug);
        if (!moduleData) {
          setError('Módulo no encontrado');
          return;
        }
        setModule(moduleData);
        
        // Luego obtenemos las lecciones del módulo
        const lessonsData = await getModuleLessons(moduleData.id);
        setLessons(lessonsData);
        
        // Encontramos la lección actual por su slug
        const currentLesson = lessonsData.find(l => l.slug === lessonSlug);
        if (!currentLesson) {
          setError('Lección no encontrada');
          return;
        }
        
        // Finalmente obtenemos el contenido de la lección usando el moduleId y el slug
        const lessonData = await getLessonContent(moduleData.id, lessonSlug);
        setLesson(lessonData);
        
        // Calcular puntuación máxima posible
        let maxScore = 0;
        if (lessonData && lessonData.contentBlocks) {
          lessonData.contentBlocks.forEach((block: ContentBlock) => {
            if (block.type === 'interactive') {
              if (block.metadata?.questions) {
                maxScore += block.metadata.questions.reduce((sum: number, q: { points: number }) => sum + q.points, 0);
              } else if (block.metadata?.exercise?.points) {
                maxScore += block.metadata.exercise.points;
              } else {
                maxScore += 10; // Puntos por defecto para widgets básicos
              }
            }
          });
        }
        setMaxPossibleScore(maxScore);
        
      } catch (err) {
        setError('Error al cargar la lección');
        console.error('Error fetching lesson:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [moduleSlug, lessonSlug]);

  const handleWidgetComplete = (score: number) => {
    setTotalScore(prev => prev + score);
    
    // Auto-avanzar al siguiente bloque si no es el último
    if (currentBlockIndex < (lesson?.contentBlocks.length || 0) - 1) {
      setTimeout(() => {
        setCurrentBlockIndex(prev => prev + 1);
      }, 2000);
    }
  };

  const getCurrentLessonIndex = () => {
    if (!lessons || !lesson) return -1;
    return lessons.findIndex(l => l.id === lesson.id);
  };
  const getNextLesson = () => {
    if (!lessons || !lesson) return null;
    const currentIndex = getCurrentLessonIndex();
    return currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  };

  const handleNextBlock = () => {
    if (currentBlockIndex < (lesson?.contentBlocks.length || 0) - 1) {
      setCurrentBlockIndex(prev => prev + 1);
    }
  };

  const handlePreviousBlock = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(prev => prev - 1);
    }
  };

  const handleCompleteLesson = () => {
    // En una implementación real, aquí se guardaría el progreso
    const nextLesson = getNextLesson();
    if (nextLesson) {
      navigate(`/modules/${module?.slug}/lessons/${nextLesson.slug}`);
    } else {
      navigate(`/modules/${module?.slug}`);
    }
  };

  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
              case 'text':
          return (
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: (block.content || '')
                  .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>')
                  .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">$1</h2>')
                  .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-800 mb-3 mt-6">$1</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                  .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>')
                  .replace(/```[\s\S]*?```/g, (match) => {
                    const code = match.replace(/```/g, '').trim();
                    return `<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-sm my-4"><code>${code}</code></pre>`;
                  })
                  .replace(/^- (.*$)/gim, '<li class="mb-2">$1</li>')
                  .replace(/^(\d+)\. (.*$)/gim, '<li class="mb-2">$1. $2</li>')
                  .replace(/\n/g, '<br>')
              }}
            />
          </div>
        );
      
      case 'interactive': {
        // Mapear los tipos antiguos a los nuevos
        const mapWidgetType = (widgetType: string | undefined): 'quiz' | 'code-exercise' | 'widget' => {
          switch (widgetType) {
            case 'ip-validation':
            case 'url-analyzer':
            case 'geolocation':
            case 'real-time-exercise':
              return 'widget';
            case 'quiz':
              return 'quiz';
            case 'code-exercise':
              return 'code-exercise';
            default:
              return 'widget';
          }
        };

        return (
          <InteractiveWidget
            type={mapWidgetType(block.widgetType)}
            metadata={block.metadata}
            onComplete={handleWidgetComplete}
          />
        );
      }

      case 'quiz': {
        return (
          <InteractiveWidget
            type="quiz"
            metadata={block.metadata}
            onComplete={handleWidgetComplete}
          />
        );
      }

      case 'external-quiz': {
        return (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6 my-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                  {block.metadata?.title || 'Quiz Interactivo'}
                </h3>
                <p className="text-purple-700 mb-4">
                  {block.metadata?.description || 'Completa este quiz para poner a prueba tus conocimientos.'}
                </p>
                <div className="flex items-center text-sm text-purple-600 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Se abrirá en una nueva pestaña
                </div>
              </div>
              <div className="ml-6">
                <svg className="w-16 h-16 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <a
              href={block.metadata?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 group"
            >
              <span>Iniciar Quiz</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        );
      }
      
      default:
        return <p className="text-gray-600">Tipo de contenido no soportado: {block.type}</p>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando lección...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ups, algo salió mal</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            to={`/modules/${moduleSlug}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Volver al módulo
          </Link>
        </div>
      </div>
    );
  }

  const progress = lesson.contentBlocks.length > 0 
    ? ((currentBlockIndex + 1) / lesson.contentBlocks.length) * 100 
    : 0;

  const isLastBlock = currentBlockIndex === lesson.contentBlocks.length - 1;
  const isFirstBlock = currentBlockIndex === 0;
  const scorePercentage = maxPossibleScore > 0 
    ? Math.round((totalScore / maxPossibleScore) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header con información de la lección */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to={`/modules/${moduleSlug}`}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Volver al módulo</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{lesson.title}</h1>
                <p className="text-sm text-gray-600">{lesson.description}</p>
              </div>
            </div>
            
            {/* Progreso y puntuación */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-sm text-gray-600">Progreso</div>
                <div className="text-lg font-semibold text-gray-900">{Math.round(progress)}%</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Puntuación</div>
                <div className="text-lg font-semibold text-gray-900">{scorePercentage}%</div>
              </div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.round(progress)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {lesson.contentBlocks[currentBlockIndex] && renderContentBlock(lesson.contentBlocks[currentBlockIndex])}
        </div>

        {/* Navegación entre bloques */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePreviousBlock}
            disabled={isFirstBlock}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 ${
              isFirstBlock 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-white text-blue-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Anterior</span>
          </button>

          {isLastBlock ? (
            <button
              onClick={handleCompleteLesson}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
            >
              Completar lección
            </button>
          ) : (
            <button
              onClick={handleNextBlock}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>Siguiente</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPage; 