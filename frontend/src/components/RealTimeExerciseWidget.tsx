import React from 'react';

export interface RealTimeExerciseWidgetProps {
  title: string;
  description: string;
  content: React.ReactNode;
}

export const RealTimeExerciseWidget: React.FC<RealTimeExerciseWidgetProps> = ({
  title,
  description,
  content
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-blue-100 mt-1">{description}</p>
      </div>
      
      <div className="p-6">
        {content}
      </div>
    </div>
  );
}; 