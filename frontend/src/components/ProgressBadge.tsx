import React from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt?: string;
  criteria: {
    type: 'score' | 'lessons_completed' | 'streak' | 'perfect_quiz';
    value: number;
  };
}

interface ProgressBadgeProps {
  totalScore: number;
  lessonsCompleted: number;
  perfectQuizzes: number;
  currentStreak: number;
  className?: string;
}

const ProgressBadge: React.FC<ProgressBadgeProps> = ({
  totalScore,
  lessonsCompleted,
  perfectQuizzes,
  currentStreak,
  className = ""
}) => {
  const badges: Badge[] = [
    {
      id: 'first-steps',
      name: 'Primeros Pasos',
      description: 'Completa tu primera lección',
      icon: '🎯',
      color: 'bg-blue-100 text-blue-800',
      criteria: { type: 'lessons_completed', value: 1 }
    },
    {
      id: 'knowledge-seeker',
      name: 'Buscador de Conocimiento',
      description: 'Completa 3 lecciones',
      icon: '📚',
      color: 'bg-green-100 text-green-800',
      criteria: { type: 'lessons_completed', value: 3 }
    },
    {
      id: 'score-master',
      name: 'Maestro de Puntuación',
      description: 'Alcanza 100 puntos',
      icon: '🏆',
      color: 'bg-yellow-100 text-yellow-800',
      criteria: { type: 'score', value: 100 }
    },
    {
      id: 'perfectionist',
      name: 'Perfeccionista',
      description: 'Obtén puntuación perfecta en 2 quizzes',
      icon: '💎',
      color: 'bg-purple-100 text-purple-800',
      criteria: { type: 'perfect_quiz', value: 2 }
    },
    {
      id: 'streak-starter',
      name: 'Racha Iniciada',
      description: 'Aprende 3 días consecutivos',
      icon: '🔥',
      color: 'bg-orange-100 text-orange-800',
      criteria: { type: 'streak', value: 3 }
    },
    {
      id: 'dedicated-learner',
      name: 'Estudiante Dedicado',
      description: 'Alcanza 250 puntos',
      icon: '🌟',
      color: 'bg-indigo-100 text-indigo-800',
      criteria: { type: 'score', value: 250 }
    }
  ];

  const isUnlocked = (badge: Badge): boolean => {
    switch (badge.criteria.type) {
      case 'score':
        return totalScore >= badge.criteria.value;
      case 'lessons_completed':
        return lessonsCompleted >= badge.criteria.value;
      case 'perfect_quiz':
        return perfectQuizzes >= badge.criteria.value;
      case 'streak':
        return currentStreak >= badge.criteria.value;
      default:
        return false;
    }
  };

  const getProgress = (badge: Badge): number => {
    let current = 0;
    switch (badge.criteria.type) {
      case 'score':
        current = totalScore;
        break;
      case 'lessons_completed':
        current = lessonsCompleted;
        break;
      case 'perfect_quiz':
        current = perfectQuizzes;
        break;
      case 'streak':
        current = currentStreak;
        break;
    }
    return Math.min(100, (current / badge.criteria.value) * 100);
  };

  const unlockedBadges = badges.filter(isUnlocked);
  const nextBadge = badges.find(badge => !isUnlocked(badge));

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Tu Progreso</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalScore}</div>
            <div className="text-sm text-gray-600">Puntos Totales</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{lessonsCompleted}</div>
            <div className="text-sm text-gray-600">Lecciones</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{currentStreak}</div>
            <div className="text-sm text-gray-600">Días de Racha</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{perfectQuizzes}</div>
            <div className="text-sm text-gray-600">Quiz Perfectos</div>
          </div>
        </div>
      </div>

      {/* Badges desbloqueados */}
      {unlockedBadges.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            🏆 Badges Obtenidos ({unlockedBadges.length})
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {unlockedBadges.map(badge => (
              <div
                key={badge.id}
                className={`flex items-center space-x-3 p-3 rounded-lg ${badge.color} transition-all duration-200 hover:scale-105`}
              >
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <div className="font-semibold text-sm">{badge.name}</div>
                  <div className="text-xs opacity-80">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Próximo badge */}
      {nextBadge && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            🎯 Siguiente Objetivo
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl opacity-50">{nextBadge.icon}</span>
              <div>
                <div className="font-semibold text-gray-900">{nextBadge.name}</div>
                <div className="text-sm text-gray-600">{nextBadge.description}</div>
              </div>
            </div>
            
            {/* Barra de progreso hacia el siguiente badge */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Progreso</span>
                <span className="text-xs font-semibold text-gray-800">
                  {Math.round(getProgress(nextBadge))}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${getProgress(nextBadge)}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {(() => {
                  let current = 0;
                  switch (nextBadge.criteria.type) {
                    case 'score':
                      current = totalScore;
                      break;
                    case 'lessons_completed':
                      current = lessonsCompleted;
                      break;
                    case 'perfect_quiz':
                      current = perfectQuizzes;
                      break;
                    case 'streak':
                      current = currentStreak;
                      break;
                  }
                  return `${current} / ${nextBadge.criteria.value}`;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resumen de logros */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">Nivel de Aprendizaje</div>
          <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            {totalScore < 50 ? 'Principiante' : 
             totalScore < 150 ? 'Intermedio' : 
             totalScore < 300 ? 'Avanzado' : 'Experto'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {totalScore < 50 ? '¡Sigue aprendiendo!' : 
             totalScore < 150 ? '¡Gran progreso!' : 
             totalScore < 300 ? '¡Excelente trabajo!' : '¡Eres increíble!'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBadge; 