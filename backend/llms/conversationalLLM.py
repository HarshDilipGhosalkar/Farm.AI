from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from langchain.llms import OpenAI

os.environ["OPENAI_API_KEY"] = os.getenv("FLASK_OPENAI_API_KEY")
llm = OpenAI(temperature=0)

conversation = ConversationChain(
    llm=llm, verbose=True, memory=ConversationBufferMemory()
)

while True:
    message = input("You: ")
    response = conversation.predict(input=message)
    print("Gemini: ", response)