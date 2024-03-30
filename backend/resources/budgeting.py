from flask_restful import Resource, reqparse
from googletrans import Translator
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import json
from models.user import User as UserModel

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

class Budgeting(Resource):
    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument("text", type=str, help="text is required", required=True)
        # parser.add_argument("language", type=str, help="language is required", required=True)

        args = parser.parse_args()

        user = UserModel.get_user("9137357003")
        if not user:
            return {"error": True, "message": "User not found"}
        
        args["language"] = user.language

        translate = Translator()
        try:
            translated_text = translate.translate(text=args["text"], src=langcodes[args["language"]], dest="en").text
            print(translated_text)
        except Exception as e:
            print(f"Translation Error: {e}")
            translated_text = "Translation failed."

        prompt = f"""Create a budgeting plan for the crop {translated_text} in India.
        Output should be strictly in this format:
        {{
            "seeds": "",
            "fertilizer": "",
            "equipment": "",
            "labor": "",
            "total": ""
        }}
        """

        response = llm.invoke(prompt)
        answer = json.loads(response.content)
        
        translated_answer = {}
        for key, value in answer.items():
            translated_answer[key] = translate.translate(text=value, src='en', dest=langcodes[args["language"]]).text

        return {"error": False, "data": translated_answer}
        