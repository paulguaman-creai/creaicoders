import React, { useState } from 'react';

interface CodeExercise {
  id: string;
  title: string;
  description: string;
  startingCode: string;
  expectedOutput: string;
  testCases: Array<{
    input: string;
    expected: string;
    description: string;
  }>;
  hints: string[];
  points: number;
}

interface CodeExerciseWidgetProps {
  exercise: CodeExercise;
  onComplete?: (success: boolean, score: number) => void;
}

const CodeExerciseWidget: React.FC<CodeExerciseWidgetProps> = ({ exercise, onComplete }) => {
  const [userCode, setUserCode] = useState(exercise.startingCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [testResults, setTestResults] = useState<Array<{passed: boolean, message: string}>>([]);

  // Simulador básico de JavaScript para ejercicios específicos
  const executeCode = (code: string, testCase?: {input: string, expected: string}) => {
    try {
      // Validaciones de seguridad básicas
      if (code.includes('fetch') || code.includes('XMLHttpRequest') || code.includes('import')) {
        throw new Error('Operaciones de red no permitidas');
      }

      // Crear función para evaluar el código
      const func = new Function('input', `
        ${code}
        return typeof result !== 'undefined' ? result : null;
      `);

      if (testCase) {
        const result = func(testCase.input);
        return result?.toString() === testCase.expected;
      } else {
        const result = func('');
        return result?.toString();
      }
    } catch (error) {
      if (testCase) {
        return false;
      }
      return `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`;
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    setTestResults([]);

    setTimeout(() => {
      // Ejecutar código principal
      const mainOutput = executeCode(userCode);
      setOutput(typeof mainOutput === 'string' ? mainOutput : JSON.stringify(mainOutput));

      // Ejecutar casos de prueba
      const results = exercise.testCases.map(testCase => {
        const passed = executeCode(userCode, testCase);
        return {
          passed,
          message: passed 
            ? `✅ ${testCase.description}: Correcto`
            : `❌ ${testCase.description}: Esperado "${testCase.expected}"`
        };
      });

      setTestResults(results);

      // Verificar si está completo
      const allPassed = results.every(r => r.passed);
      if (allPassed && !isCompleted) {
        setIsCompleted(true);
        onComplete?.(true, exercise.points);
      }

      setIsRunning(false);
    }, 1000);
  };

  const resetCode = () => {
    setUserCode(exercise.startingCode);
    setOutput('');
    setTestResults([]);
    setIsCompleted(false);
  };

  const showNextHint = () => {
    if (currentHint < exercise.hints.length - 1) {
      setCurrentHint(prev => prev + 1);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{exercise.title}</h3>
          <div className="flex items-center space-x-2">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              💎 {exercise.points} puntos
            </span>
            {isCompleted && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✅ Completado
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-700">{exercise.description}</p>
      </div>

      {/* Editor de código */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">📝 Tu código:</h4>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                💡 {showHints ? 'Ocultar' : 'Mostrar'} pistas
              </button>
              <button
                onClick={resetCode}
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors"
              >
                🔄 Reiniciar
              </button>
            </div>
          </div>

          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="Escribe tu código aquí..."
          />

          <button
            onClick={runCode}
            disabled={isRunning}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isRunning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Ejecutando...</span>
              </>
            ) : (
              <>
                <span>▶️</span>
                <span>Ejecutar Código</span>
              </>
            )}
          </button>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          {/* Output */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">📤 Salida:</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[100px] whitespace-pre-wrap">
              {output || (isRunning ? 'Ejecutando...' : 'Presiona "Ejecutar" para ver la salida')}
            </div>
          </div>

          {/* Casos de prueba */}
          {testResults.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🧪 Resultados de prueba:</h4>
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-sm ${
                      result.passed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {result.message}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Objetivo */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">🎯 Objetivo:</h4>
            <p className="text-blue-800 text-sm">
              Tu código debe producir: <code className="bg-blue-100 px-2 py-1 rounded">{exercise.expectedOutput}</code>
            </p>
          </div>
        </div>
      </div>

      {/* Pistas */}
      {showHints && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-yellow-900">💡 Pistas:</h4>
            <span className="text-sm text-yellow-700">
              {currentHint + 1} de {exercise.hints.length}
            </span>
          </div>
          
          <div className="space-y-2">
            {exercise.hints.slice(0, currentHint + 1).map((hint, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-yellow-600 font-bold text-sm">{index + 1}.</span>
                <span className="text-yellow-800 text-sm">{hint}</span>
              </div>
            ))}
          </div>

          {currentHint < exercise.hints.length - 1 && (
            <button
              onClick={showNextHint}
              className="mt-3 text-sm bg-yellow-200 text-yellow-800 px-3 py-1 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Mostrar siguiente pista
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeExerciseWidget; 