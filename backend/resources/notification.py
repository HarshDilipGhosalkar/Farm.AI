from flask_restful import Resource, request, reqparse
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import json
from functions.whatsapp import send_whatpsapp_message

os.environ["GOOGLE_API_KEY"] = os.getenv("FLASK_GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.7)

class Notification(Resource):
    def get(self):

        prompt = """Give me a daily Tip about farming. The tip should be 2-3 lines.
        output should be in the json format like below:
        {
            "tip": ""
        }
        """

        response = llm.invoke(prompt)
        data = json.loads(response.content)

        return send_whatpsapp_message(number="9137357003", message=data["tip"])



    # def get(self):