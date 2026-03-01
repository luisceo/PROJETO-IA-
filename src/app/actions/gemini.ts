"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function processConciergeRequest(userMessage: string) {
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set.");
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const prompt = `
Você é o Concierge do Lumina, um marketplace de serviços residenciais premium (Elétrica, Marcenaria, Gesso, Pintura, Reformas, Design de Interiores). 
Um cliente com alto poder aquisitivo e que busca conforto e qualidade absoluta está descrevendo um problema ou projeto que ele precisa realizar em casa.

Seu objetivo é:
1. Responder ao cliente com empatia, tom luxuoso/exclusivo, porém de forma bem concisa (no máximo 2 ou 3 frases curtas). Mostre que entendeu o projeto e que os melhores especialistas do Lumina cuidarão disso.
2. Identificar qual a especialidade técnica EXATA que ele precisa. Pode ser uma de nossas especialidades padrões: "Design de Interiores", "Móveis Planejados", "Reforma", "Reparos Premium". Se não tiver certeza, sugira a mais próxima ou "Geral".
3. Retornar sua análise APENAS em formato JSON válido conforme o esquema abaixo, sem blocos de markdown e sem texto adicional:

{
  "message": "Sua resposta humanizada e premium para o cliente.",
  "specialty": "A especialidade detectada (ex: Móveis Planejados)"
}

Mensagem do cliente: "${userMessage}"
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Extrair apenas o JSON ignorando bad markdowns tipo \`\`\`json
        let jsonStr = text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            jsonStr = jsonMatch[0];
        }

        const parsed = JSON.parse(jsonStr);

        return {
            success: true,
            data: parsed as { message: string, specialty: string }
        };

    } catch (error: any) {
        console.error("Gemini Error:", error);
        return {
            success: false,
            error: error.message || "Erro ao processar a requisição com o Gemini"
        };
    }
}
