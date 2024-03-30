from flask_restful import Resource, reqparse
from googletrans import Translator
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
import os
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

class Timeline(Resource):
    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument("text", type=str, help="text is required", required=True)
        parser.add_argument("language", type=str, help="language is required", required=True)

        args = parser.parse_args()

        translate = Translator()
        try:
            translated_text = translate.translate(args["text"], dest=langcodes[args["language"]]).text
            print(translated_text)
        except Exception as e:
            print(f"Translation Error: {e}")
            translated_text = "Translation failed."

        prompt = f"""Create a crop cultivation timeline for the crop {translated_text}
        Key should be in the english and value should be in the {args["language"]} language.
        Output should be in the json format like below:
        [
        {{
            "title": "",
            "description": "",
            "date": ""
        }},
        ...
        ]
        """

        response = llm.invoke(prompt)
        answer = json.loads(response.content)

        return {"error": False, "data": answer}
        