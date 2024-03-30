from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import json

os.environ["GOOGLE_API_KEY"] = os.getenv("FLASK_GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.7)

response = llm.invoke("""Who is the PM of India? output should be in the json format like below:
    {
        "answer": ""
    }
""")

answer = json.loads(response.content)
print(answer["answer"])

