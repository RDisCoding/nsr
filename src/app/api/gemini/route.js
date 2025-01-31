import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
});

export const runtime = "edge";

const generatedId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAIPrompt = (messages) => {
  if (!messages || messages.length === 0) {
    throw new Error("Messages array is empty");
  }

  // Filter out messages with missing content
  const validMessages = messages.filter(msg => msg && msg.content);
  
  if (validMessages.length === 0) {
    throw new Error("No valid messages found");
  }

  return validMessages.map(message => ({
    id: message.id || generatedId(),
    role: message.role || "user", // Default to user if role not specified
    content: message.content.trim() // Sanitize content
  }));
};

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }), 
        { status: 400 }
      );
    }

    const formattedMessages = buildGoogleGenAIPrompt(messages);
    
    const stream = await streamText({
      model: google("gemini-pro"),
      messages: formattedMessages,
      temperature: 0.7,
    });

    if (!stream) {
      throw new Error("Failed to generate stream response");
    }

    return stream.toDataStreamResponse();

  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to process request", 
        details: error.message 
      }), 
      { status: 500 }
    );
  }
}