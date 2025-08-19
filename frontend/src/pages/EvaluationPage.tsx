import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getModuleBySlug } from '../services/api';
import type { Module } from '../services/api';
import type { Evaluation } from '@/types/education';

const EvaluationPage: React.FC = () => {
  const { moduleSlug, evaluationId } = useParams<{ moduleSlug: string; evaluationId: string }>();
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvaluationData = async () => {
      if (!moduleSlug || !evaluationId) return;

      try {
        setLoading(true);
        const moduleData = await getModuleBySlug(moduleSlug);
        if (!moduleData) {
          setError('Módulo no encontrado');
          return;
        }

        const allEvaluations = moduleData.evaluations;
        const evaluationData = allEvaluations.find(e => e.id === evaluationId);
        if (!evaluationData) {
          setError('Evaluación no encontrada');
          return;
        }
        setEvaluation(evaluationData);

      } catch (err) {
        setError('Error al cargar la evaluación');
        console.error('Error fetching evaluation:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluationData();
  }, [moduleSlug, evaluationId]);



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando evaluación...</p>
        </div>
      </div>
    );
  }

  if (error || !evaluation) {
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
                <h1 className="text-lg font-semibold text-gray-900">{evaluation.name}</h1>
                <p className="text-sm text-gray-600">{evaluation.objective}</p>
              </div>
            </div>

          </div>


        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">


          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: (evaluation.instructions || '')
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
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-lg font-semibold text-gray-900">Herramientas</h2>
          {evaluation.tools.map((tool) => (
            <div key={tool.url}>
              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">🔗 {tool.description}</a>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-lg font-semibold text-gray-900">Evaluación</h2>
          <div
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: (evaluation.evaluation || '')
                .replace(/\n/g, '<br>')
            }}
          />
        </div>

        {/* AI Warning */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-lg font-semibold text-gray-900">🤖 Uso Ético de la IA (ChatGPT, Copilot, Cursor)</h2>
          <p className="text-gray-600 mt-4">
            Estas herramientas pueden ayudarte a aprender, pero deben usarse con responsabilidad:
            <br />✅ Úsala como apoyo, no como sustituto de tu razonamiento.
            <br />📚 Verifica siempre en fuentes oficiales (no confíes ciegamente en la IA).
            <br />🧠 Comprende el código antes de copiarlo. Si no puedes explicarlo, no lo uses.
            <br />🛠️ Evita el autocompletado sin revisión. Revisa y adapta lo que te sugiere.
            <br />🗣️ Sé transparente: menciona si la usaste y cómo te ayudó.
            <br />🚫 No la uses para evadir el aprendizaje. El objetivo es que tú desarrolles las habilidades.
            <br />Tu crecimiento como desarrollador depende de tu esfuerzo, no solo de las herramientas que usas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage; 