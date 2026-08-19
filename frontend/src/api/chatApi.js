import client from "./client";

export async function sendChatMessage(
  conversationId,
  message
) {
  const response = await client.post("/chat", {
    conversation_id: conversationId,
    message,
  });

  return response.data;
}