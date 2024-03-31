from langchain_google_genai import ChatGoogleGenerativeAI
from flask_restful import Resource, reqparse
import os
import json

os.environ["GOOGLE_API_KEY"] = "AIzaSyAHdcVytlmDRiSuApXlTkCq3Qwnnn76Cu8"
llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.5)

class Remedies(Resource):
    def post(self):
        print("Hello")
        # parser = reqparse.RequestParser()

        # parser.add_argument(
        #     "symptoms", type=str, required=True, help="symptoms is required"
        # )
        # parser.add_argument(
        #     "cropName", type=str, required=True, help="cropName is required"
        # )
        # parser.add_argument(
        #     "disease_name", type=str, required=True, help="disease_name is required"
        # )
        # args = parser.parse_args()
        parser = reqparse.RequestParser()
        parser.add_argument('symptoms', type=str, required=True)
        parser.add_argument('cropName', type=str, required=True)
        parser.add_argument('disease_name', type=str, required=True)
        args = parser.parse_args()
        symptoms = args["symptoms"]
        cropName = args["cropName"]
        disease_name = args["disease_name"]
        print(symptoms,cropName,disease_name)
        prompt="""I will tell you the plant/crop name and disease it is suffering through and also description of the crop/plant. You should analyse them and tell the treatment for that disease and also provide specific fertilizers(suggest names of fertilizers).
               input format:
            {{
                cropName: {cropName},
                disease_name: {disease_name},
                symptoms: {symptoms}
            }}

               Output should be strictly in json format and should strictly contain nothing extra before and after that:
               Output format:
               {{
                "Treatment": [
                 {{
                   "treatmentName": "",
                   "treatment": ""
                 }}
                ],
                "Fertilizer":[
                {{
                   "fertilizerName": "",
                   "fertilizer": ""
                 }}
                ]
                }}
                Strictly no \n or \ or any other special characters are allowed. don't format your response in any other way.
                """
        # prompt = f"cropName={cropName},disease_name={disease_name},symptoms={symptoms} give treatment and fertilizers"

        response = llm.invoke(prompt.format(
            cropName=cropName,
            disease_name=disease_name,
            symptoms=symptoms
        ))

        print("res",response.content)

        return {"error": False, "data": json.loads(response.content)}, 200
    


    