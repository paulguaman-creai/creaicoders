import React from 'react';
import QuizWidget from './QuizWidget';
import CodeExerciseWidget from './CodeExerciseWidget';
import { IPAddressWidget, DNSLookupWidget, HTTPExplorerWidget } from './widgets';

interface InteractiveWidgetProps {
  type: 'quiz' | 'code-exercise' | 'widget';
  metadata: any;
  onComplete?: (score: number, totalPoints: number) => void;
}

export const InteractiveWidget: React.FC<InteractiveWidgetProps> = ({
  type,
  metadata,
  onComplete
}) => {
  // Adaptador para manejar diferentes firmas de onComplete
  const handleQuizComplete = (score: number, totalPoints: number) => {
    onComplete?.(score, totalPoints);
  };

  const handleCodeExerciseComplete = (_success: boolean, score: number) => {
    // Para ejercicios de código, usamos el score como puntuación y asumimos 100 como máximo
    onComplete?.(score, 100);
  };

  switch (type) {
    case 'quiz':
      // Verificar si tenemos questions en metadata
      if (!metadata?.questions || !Array.isArray(metadata.questions)) {
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-yellow-800 font-medium">Quiz no disponible</span>
            </div>
            <p className="text-yellow-700 mt-1 text-sm">Este quiz está configurado incorrectamente. Por favor contacta al administrador.</p>
          </div>
        );
      }
      return (
        <QuizWidget
          questions={metadata.questions}
          title={metadata.title}
          onComplete={handleQuizComplete}
        />
      );

    case 'code-exercise':
      return (
        <CodeExerciseWidget
          exercise={metadata.exercise}
          onComplete={handleCodeExerciseComplete}
        />
      );

    case 'widget':
      // Renderizar widgets específicos basados en el tipo
      switch (metadata.widgetType) {
        case 'IPAddressWidget':
          return <IPAddressWidget />;
        
        case 'DNSLookupWidget':
          return <DNSLookupWidget />;
        
        case 'HTTPExplorerWidget':
          return <HTTPExplorerWidget />;
        
        default:
          return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                ⚠️ Tipo de widget no reconocido: {metadata.widgetType}
              </p>
            </div>
          );
      }

    default:
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            ⚠️ Tipo de componente no reconocido: {type}
          </p>
        </div>
      );
  }
}; 