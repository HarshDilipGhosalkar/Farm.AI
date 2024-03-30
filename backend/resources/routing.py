from flask_restful import Resource, reqparse
from googletrans import Translator
from models.user import User as UserModel
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

class Routing(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("text", type=str, help="text is required", required=True)
        args = parser.parse_args()

        user = UserModel.get_user("9137357003")
        if not user:
            return {"error": True, "message": "User not found"}
        
        language = user.language

        translate = Translator()
        try:
            translated_text = translate.translate(args["text"], src=langcodes[language], dest="en").text
        except Exception as e:
            print(f"Translation Error: {e}")
            translated_text = "Translation failed."

        prompt = f"""I am giving you user request and the routing of my application, You have to analyse and decide the routing of the request. route should be strictly from the below list:
        [
            {{
                "route": "/weather"
                "when": "any request for weather data or describing today's weather/atmosphere"
            }},
            {{
                "route": "/timeline",
                "when": "any request for timeline or time required to grow a crop or crop planing or procedure to grow a crop"
            }},
            {{
                "route": "/market",
                "when": "any request asking to know the market price of a crop should only route on this route"
            }},
            {{
                "route": "/learning",
                "when": "any request for learning about agriculture, crops, farming, etc."
            }},
            {{
                "route": "/budgeting",
                "when": "any request for knowing the budget required for a growing that crop in his field should only route on this route"
            }},
            {{
                "route": "/loan",
                "when": "any request for loan for farming or knowing government schemes for farmers"
            }},
            {{
                "route": "/disease",
                "when": "any request for knowing about diseases in crops or their health"
            }},
            {{
                "route": "/crop",
                "when": "any request asking for recommendations for crops should only route on this route"
            }}
        ]

        user request: {translated_text}

        Your reply should be strictly in the json format like below:
        {{
            "route": "the most suitable route for the user request"
        }}
        """

        response = llm.invoke(prompt)
        answer = json.loads(response.content)

        return {"error": False, "data": answer["route"]}


        