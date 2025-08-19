import { Evaluation } from "@domain/entities/Evaluation";


const INSTRUCTIONS = `
# Crea un servidor web usando Node.js
- Empieza con la siguiente lectura: "¿Qué es localhost? Ventajas y usos prácticos": https://www.hostinger.com/es/tutoriales/que-es-localhost
- De momento, sólo crea un servidor básico siguiendo el siguiente ejemplo:
https://www.geeksforgeeks.org/node-js/how-to-build-a-simple-web-server-with-node-js/
Edita el archivo index.js para poner un "Hola Mundo [tu nombre]" en el navegador.
- Usa Git para crear un repositorio y subir el proyecto.

`;

const EVALUATION = `
Los temas que se pueden abordar durante la evaluación oral son: 
- DNS e IP
- Protocolos de red
- Seguridad básica con HTTPS
- Node y NPM 
- Comandos de GIT
`;

export const InternetModuleEvaluation = new Evaluation({
    id: 'internet-module-evaluation',
    name: 'Módulo II Semana 1: Cómo Funciona Internet',
    objective: 'Conocer los fundamentos de los servidores web y el uso de localhost. Desarrollar y ejecutar un proyecto utilizando Node.js, y gestionar el control de versiones mediante Git, creando un repositorio y subiendo el proyecto.',
    instructions: INSTRUCTIONS,
    schedule: 'Evaluación oral: 14 de agosto de 2025',
    evaluation: EVALUATION,
    tools: [
        {
            url: 'https://www.hostinger.com/es/tutorials/que-es-localhost',
            description: '¿Qué es localhost? Ventajas y usos prácticos',
        },
        {
            url: 'https://www.geeksforgeeks.org/node-js/how-to-build-a-simple-web-server-with-node-js/',
            description: 'How to Build a Simple Web Server with Node.js',
        },
        {
            url: 'https://www.freecodecamp.org/espanol/news/node-js-npm-tutorial/',
            description: 'Node.js y NPM Tutorial (FreeCodeCamp)',
        },
        {
            url: 'https://git-scm.com/book/es/v2',
            description: 'Git (tiene un libro que te puede interesar)',
        },
        {
            url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
            description: 'Introduction to Node.js (Documentación oficial)',
        },
        {
            url: 'https://learn.microsoft.com/es-es/windows/dev-environment/javascript/nodejs-beginners-tutorial',
            description: 'Node.js Beginners Tutorial (Microsoft)',
        }
    ]
});