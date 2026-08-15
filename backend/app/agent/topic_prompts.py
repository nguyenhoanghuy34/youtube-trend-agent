TOPIC_EXTRACTION_PROMPT = """
Extract the main topic from the user's YouTube trend request.

Return ONLY the topic.

Examples:

User:
"Tìm trend về AI"
Output:
AI

User:
"YouTube đang trend gì về du lịch?"
Output:
du lịch

User:
"Thời trang nào đang hot trên YouTube?"
Output:
thời trang

User:
"YouTube đang trend gì?"
Output:
GENERAL

User:
"Top trending videos"
Output:
GENERAL

Do not explain your answer.

User question:
{user_message}
"""