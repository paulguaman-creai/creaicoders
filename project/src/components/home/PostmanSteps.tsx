import { Step } from '../../types/home';

export default function PostmanSteps() {
  const steps: Step[] = [
    {
      number: 1,
      title: "Descarga Postman",
      description: "Ve a postman.com y descarga la aplicación"
    },
    {
      number: 2,
      title: "Crea una nueva request",
      description: "Haz clic en \"New\" → \"Request\""
    },
    {
      number: 3,
      title: "Configura el método y URL",
      description: "Selecciona el método HTTP y escribe la URL del endpoint"
    },
    {
      number: 4,
      title: "Para POST/PUT: agrega el body",
      description: "Ve a la pestaña \"Body\" → \"raw\" → \"JSON\" y pega el contenido"
    },
    {
      number: 5,
      title: "Envía la request",
      description: "Haz clic en \"Send\" y observa la respuesta"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        📋 Pasos para Probar en Postman
      </h2>
      
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start gap-4">
            <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              {step.number}
            </span>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {step.number === 1 ? (
                  <>
                    Ve a <a href="https://postman.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">postman.com</a> y descarga la aplicación
                  </>
                ) : (
                  step.description
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
