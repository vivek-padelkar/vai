import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

// Get the Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Define the prompt
const prompt = "Explain how AI works in a few words";

// Function to call the Gemini API
async function generateText(prompt) {
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        console.log(response.text());
        return response.text()
    } catch (error) {
        console.error("Error calling Gemini API:", error);
    }
}

// Call the function to generate text
// generateText(prompt);

// Example of streaming the response
async function generateTextStream(prompt) {
    try {
        const result = await model.generateContentStream(prompt);
        for await (const chunk of result.stream) {
            console.log(chunk.text());
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
    }
}

// Call the function to stream generate text
// generateTextStream(prompt); 

export default generateText