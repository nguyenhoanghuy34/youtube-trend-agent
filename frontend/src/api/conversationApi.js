import client from "./client";

export async function createConversation(userId) {
  const response = await client.post("/conversations", {
    title: "New Chat",
    user_id: userId,
  });

  return response.data;
}

export async function getConversations(userId) {
  const response = await client.get("/conversations", {
    params: { user_id: userId },
  });
  return response.data;
}

export async function getConversation(id, userId) {
  const response = await client.get(
    `/conversations/${id}`,
    {
      params: { user_id: userId },
    }
  );

  return response.data;
}
