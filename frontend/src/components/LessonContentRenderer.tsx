import React from 'react';
import { InteractiveWidget } from './InteractiveWidget';
import QuizWidget from './QuizWidget';

interface LessonContent {
  type: 'text' | 'quiz' | 'widget';
  content: any;
}

interface LessonContentRendererProps {
  content: LessonContent[];
  onQuizComplete?: (score: number, totalPoints: number) => void;
}

export const LessonContentRenderer: React.FC<LessonContentRendererProps> = ({
  content,
  onQuizComplete
}) => {
  return (
    <div className="space-y-8">
      {content.map((item, index) => {
        switch (item.type) {
          case 'text':
            return (
              <div key={index} className="prose prose-lg max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: item.content.replace(/\n/g, '<br />') 
                  }} 
                />
              </div>
            );

          case 'quiz':
            return (
              <div key={index} className="my-8">
                <QuizWidget
                  questions={[{
                    id: `quiz-${index}`,
                    question: item.content.question,
                    options: item.content.options,
                    correctAnswer: item.content.correctAnswer,
                    explanation: item.content.explanation,
                    points: 10
                  }]}
                  title="Quiz de Comprensión"
                  onComplete={onQuizComplete || (() => {})}
                />
              </div>
            );

          case 'widget':
            return (
              <div key={index} className="my-8">
                <InteractiveWidget
                  type="widget"
                  metadata={item.content}
                  onComplete={() => {}}
                />
              </div>
            );

          default:
            return (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  ⚠️ Tipo de contenido no reconocido: {item.type}
                </p>
              </div>
            );
        }
      })}
    </div>
  );
}; 