from flask_restful import Resource, request, reqparse
from googletrans import Translator
import requests
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from models.user import User as UserModel
import json

os.environ["GOOGLE_API_KEY"] = os.getenv("FLASK_GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.7)

langcodes = {
    "english": "en",
    "hindi": "hi",
    "marathi": "mr",
    "bengali": "bn",
    "odia": "or",
    "telgu": "te",
    "gujrati": "gu",
    # "rajasthani": "6576a2854e7d42484da63538"
}

user_details = {
    "location": "Mumbai, Maharashtra",
    "size of land": "5 acres"
}

class AiChatBot(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('message', type=str, required=True)
        args = parser.parse_args()

        user = UserModel.get_user("9137357003")
        if not user:
            return {"error": True, "message": "User not found"}
        
        language = user.language

        translator = Translator()
        translated_message = translator.translate(args['message'], src=langcodes[language], dest="en").text

        prompt = f"""Act as an expert of argiculture and using your knowledge, answer the following question:
        question: {translated_message}
        Output should be in the json format like below:
        {{
            "answer": ""
        }}

        farmer details: {json.dumps(user_details)}
        """

        response = llm.invoke(prompt)
        data = json.loads(response.content)
        answer = translator.translate(data["answer"], src="en", dest=langcodes[language]).text

        return {"error": False, "data": answer}
    
    