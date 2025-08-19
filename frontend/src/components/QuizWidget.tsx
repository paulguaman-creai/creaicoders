import React, { useState } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

interface QuizWidgetProps {
  questions: QuizQuestion[];
  title?: string;
  onComplete?: (score: number, totalPoints: number) => void;
}

const QuizWidget: React.FC<QuizWidgetProps> = ({ questions, title = "Quiz Interactivo", onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (optionIndex: number) => {
    if (showExplanation) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);

    // Calcular puntuación
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + currentQuestion.points);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Completar quiz
      setIsCompleted(true);
      const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
      onComplete?.(score, totalPoints);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setIsCompleted(false);
    setScore(0);
  };

  const getScorePercentage = () => {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    return Math.round((score / totalPoints) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return { emoji: '🏆', message: '¡Excelente!', color: 'text-yellow-600' };
    if (percentage >= 70) return { emoji: '🎉', message: '¡Muy bien!', color: 'text-green-600' };
    if (percentage >= 50) return { emoji: '👍', message: '¡Buen trabajo!', color: 'text-blue-600' };
    return { emoji: '💪', message: 'Sigue practicando', color: 'text-orange-600' };
  };

  if (isCompleted) {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const { emoji, message, color } = getScoreMessage();

    return (
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border-2 border-green-200">
        <div className="text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{message}</h2>
          <div className="text-4xl font-bold mb-4">
            <span className={color}>{score}</span>
            <span className="text-gray-500"> / {totalPoints} puntos</span>
          </div>
          <div className="text-lg text-gray-700 mb-6">
            {getScorePercentage()}% de aciertos
          </div>

          {/* Resumen de respuestas */}
          <div className="bg-white rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Resumen de respuestas:</h3>
            <div className="space-y-2">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                return (
                  <div key={question.id} className="flex items-center space-x-3">
                    <span className={`text-lg ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {isCorrect ? '✅' : '❌'}
                    </span>
                    <span className="text-sm text-gray-700">
                      Pregunta {index + 1}: {isCorrect ? 'Correcta' : 'Incorrecta'}
                    </span>
                    <span className="text-xs text-gray-500">
                      (+{isCorrect ? question.points : 0} pts)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleRestart}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Reintentar Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
      {/* Header del quiz */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
          <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
          <span>•</span>
          <span>{currentQuestion.points} puntos</span>
        </div>
        
        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Pregunta actual */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          {currentQuestion.question}
        </h4>

        {/* Opciones */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const shouldShowCorrect = showExplanation && isCorrect;
            const shouldShowIncorrect = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  shouldShowCorrect
                    ? 'bg-green-100 border-green-400 text-green-800'
                    : shouldShowIncorrect
                    ? 'bg-red-100 border-red-400 text-red-800'
                    : isSelected
                    ? 'bg-blue-100 border-blue-400 text-blue-800'
                    : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                    shouldShowCorrect
                      ? 'bg-green-500 border-green-500 text-white'
                      : shouldShowIncorrect
                      ? 'bg-red-500 border-red-500 text-white'
                      : isSelected
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-gray-300'
                  }`}>
                    {shouldShowCorrect ? '✓' : shouldShowIncorrect ? '✗' : String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explicación */}
        {showExplanation && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 text-lg">💡</span>
              <div>
                <h5 className="font-semibold text-yellow-800 mb-1">Explicación:</h5>
                <p className="text-yellow-700 text-sm">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navegación */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Puntuación actual: <span className="font-semibold text-blue-600">{score} puntos</span>
        </div>
        
        {showExplanation && (
          <button
            onClick={handleNextQuestion}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>{isLastQuestion ? 'Finalizar Quiz' : 'Siguiente Pregunta'}</span>
            {!isLastQuestion && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizWidget; 