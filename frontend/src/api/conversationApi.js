import client from "./client";


export async function createConversation(userId) {
  const response = await client.post(
    "/conversations",
    {
      title: "New Chat",
      user_id: userId,
    }
  );

  return response.data;
}


export async function getConversations(userId) {
  const response = await client.get(
    "/conversations",
    {
      params: {
        user_id: userId,
      },
    }
  );

  return response.data;
}


export async function getConversation(
  conversationId,
  userId
) {
  const response = await client.get(
    `/conversations/${conversationId}`,
    {
      params: {
        user_id: userId,
      },
    }
  );

  return response.data;
}


export async function updateConversation(
  conversationId,
  userId,
  title
) {
  const response = await client.patch(
    `/conversations/${conversationId}`,
    {
      title: title.trim(),
      user_id: userId,
    }
  );

  return response.data;
}