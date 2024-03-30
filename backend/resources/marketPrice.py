from flask_restful import Resource, reqparse
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import json

os.environ["GOOGLE_API_KEY"] = os.getenv("FLASK_GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.7)

class MarketPrice(Resource):
    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument("crop_name", type=str, help="Crop name is required", required=True)

        data = parser.parse_args()

        prompt = f"""Get the market price of {data['crop_name']} in India and give. I want the price not code. Don't give blank, if you don't know, give estimated price.
        Output should be in the json format like below:
        {{
            "market_price": ""
        }}
        """

        response = llm.invoke(prompt)

        answer = json.loads(response.content)

        return {"error": False, "data": answer["market_price"]}




