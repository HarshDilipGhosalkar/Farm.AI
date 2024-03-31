from flask import request
from flask_restful import Resource, reqparse
import google.generativeai as genai
from pathlib import Path
import json
from io import BytesIO
from googletrans import Translator
from models.user import User as UserModel

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


genai.configure(api_key="AIzaSyAHdcVytlmDRiSuApXlTkCq3Qwnnn76Cu8")

generation_config = {
    "temperature": 0.4,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 4096,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
]

model = genai.GenerativeModel(
    model_name="gemini-pro-vision",
    generation_config=generation_config,
    safety_settings=safety_settings,
)


def input_image_setup(image):
    image_parts = [{"mime_type": "image/png", "data": image.getvalue()}]
    return image_parts


def generate_gemini_response(input_prompt, image, question_prompt):

    image_prompt = input_image_setup(image)
    prompt_parts = [input_prompt, image_prompt[0], question_prompt]
    response = model.generate_content(prompt_parts)
    return response.text


input_prompt = """
You will receive input images of any plant or crop and you have to predict the plant/crop name and also whether the plant is healthy or not if plant/crop is not healthy then also provide disease name and if the plant is healthy then return empty crop_disease field.Strictly,note don't give general disease name give the exact name of the disease the crop has. Also rate the crop damage from scale of 1 to 3 (if crop is completely healthy then arte it to 1, if the crop is in the middle stage of damage then rate it to 2,rating 2 is also given when the crop even if removed can be reused for some other industrial use, and give rating 3 if very severe damage has happen to crop and it cannot be reused any further.) 
               
"""

question_prompt = """You will receive input images of any plant or crop and you have to predict the plant/crop name and also whether the plant is healthy or not if plant/crop is not healthy then also provide disease name and if the plant is healthy then return empty crop_disease field and aslo give a small description of the image like which crop/plant is present and describe that image in few words like is the crop/plant is having certain disease the write about it if not then dont.Note don't give general disease name give the exact name of the disease the crop has. Strictly no other words, introduction and outro are allowed.Also plant description should not be more than 3 4 lines.Also rate the crop damage from scale of 1 to 3 (if crop is completely healthy then arte it to 1, if the crop is in the middle stage of damage then rate it to 2,rating 2 is also given when the crop even if removed can be reused for some other industrial use, and give rating 3 if very severe damage has happen to crop and it cannot be reused any further.)
    for example if crop/plant is healthy: 
        
            {"cropName": "mango", "health_status": "yes","disease_name":"" ,"plant_description":"A fresh mago plant","lossRating":"1"}
            
        example if plant/crop is not healthy: 
        
            {"cropName": "mango", "health_status": "no","disease_name":"xzy","plant_description":"A mango plant with the outer skin damaged","lossRating":"3"},

         
           
        
        The above format is just for example return the response in above format .Also remember lossRating should never be empty give in appropriate value.
        Also plant_description should not be more than 25 words(1 or 2 lines).
    Strictly no \n or \ or any other special characters are allowed. don't format your response in any way.
"""


class ImageToItems(Resource):
    def post(self):
        image = request.files["image"]

        user = UserModel.get_user("9137357003")
        if not user:
            return {"error": True, "message": "User not found"}
        
        language = user.language

        image_content = BytesIO(image.read())
        response = generate_gemini_response(
            input_prompt, image_content, question_prompt
        )
        parsed_array = json.loads(response)
        print(parsed_array)

        translate = Translator()

        if parsed_array["health_status"] == "no":
            parsed_array["disease_name"] = translate.translate(
                parsed_array["disease_name"], src="en", dest=langcodes[language]
            ).text

        parsed_array["cropName"] = translate.translate(
            parsed_array["cropName"], src="en", dest=langcodes[language]
        ).text
        parsed_array["health_status"] = translate.translate(
            parsed_array["health_status"], src="en", dest=langcodes[language]
        ).text
        parsed_array["plant_description"] = translate.translate(
            parsed_array["plant_description"], src="en", dest=langcodes[language]
        ).text

        return {"error": False, "data": parsed_array}, 200
