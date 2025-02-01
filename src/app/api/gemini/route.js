import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
});

export const runtime = "edge";

const generatedId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAIPrompt = (messages) => {
  if (!messages || !Array.isArray(messages)) {
    throw new Error("Invalid messages format");
  }

  const formattedMessages = [
    {
      id: generatedId(),
      role: "user",
      content: messages[0]?.content || ""
    },
    ...messages.slice(1).map((message) => ({
      id: message.id || generatedId(),
      role: message.role || "user",
      content: message.content || ""
    }))
  ];

  return formattedMessages;
};

export async function POST(request) {
  try {
    const { messages } = await request.json();
    const formattedMessages = buildGoogleGenAIPrompt(messages);
    
    const stream = await streamText({
      model: google("gemini-pro"),
      messages: formattedMessages,
      temperature: 0.7,
    });

    return stream?.toDataStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500 }
    );
  }
}