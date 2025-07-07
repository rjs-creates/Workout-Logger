import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const PROMPT = `You're a gym trainer, and your task is critque the user's workout sessions
I will provide you with a workout session, and the end goal that the user wants to achieve.
You will provide a detailed analysis of the workout session, including: What the user did well, what they could improve, and how they can achieve their goal.
You will also provide a list of exercises that the user can do to achieve their goal.` + `Here's the workout session:
{{workoutSession}}` + `The user's goal is: {{goal}}`;

export const callGeminiApi = async(workoutSessionData, goal) => {
    try {
        const finalPrompt = PROMPT.replace("{{workoutSession}}", workoutSessionData)
            .replace("{{goal}}", goal);
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: finalPrompt ,
        });
        console.log(response.text);
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

