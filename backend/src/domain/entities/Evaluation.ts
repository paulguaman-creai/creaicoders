import { Timestamp } from "@shared/types/common";

const AI_WARNING = `🤖 Uso Ético de la IA (ChatGPT, Copilot, Cursor)
Estas herramientas pueden ayudarte a aprender, pero deben usarse con responsabilidad:
✅ Úsala como apoyo, no como sustituto de tu razonamiento.
📚 Verifica siempre en fuentes oficiales (no confíes ciegamente en la IA).
🧠 Comprende el código antes de copiarlo. Si no puedes explicarlo, no lo uses.
🛠️ Evita el autocompletado sin revisión. Revisa y adapta lo que te sugiere.
🗣️ Sé transparente: menciona si la usaste y cómo te ayudó.
🚫 No la uses para evadir el aprendizaje. El objetivo es que tú desarrolles las habilidades.
Tu crecimiento como desarrollador depende de tu esfuerzo, no solo de las herramientas que usas.
`;

export interface EvaluationProps {
    id: string;
    name: string;
    objective: string;
    instructions: string;
    schedule: string;
    evaluation: string;
    tools: EvaluationTool[];
}

interface EvaluationTool {
    url: string;
    description: string;
}


export class Evaluation {
    private readonly id: string;
    public readonly name: string;
    public readonly objective: string;
    public readonly instructions: string;
    public readonly schedule: string;
    public readonly evaluation: string;
    public readonly tools: EvaluationTool[];
    public readonly createdAt: Timestamp;
    public readonly updatedAt: Timestamp;
    public readonly aIWarning: string;

    constructor(props: EvaluationProps) {
        this.id = props.id;
        this.name = props.name;
        this.objective = props.objective;
        this.instructions = props.instructions;
        this.schedule = props.schedule;
        this.evaluation = props.evaluation;
        this.tools = props.tools;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.aIWarning = AI_WARNING;
    }

    // Add getter for id to make it accessible
    getId(): string {
        return this.id;
    }
}