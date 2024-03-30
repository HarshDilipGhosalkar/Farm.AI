from flask_restful import Resource, reqparse
from flask import Flask, request, jsonify
from googletrans import Translator
import requests
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

class weatherTTS(Resource):
    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument("temp", type=str, required=True, help="temp is required")
        parser.add_argument("wind", type=str, required=True, help="wind is required")
        parser.add_argument("humidity", type=str, required=True, help="humidity is required")
        parser.add_argument("clouds", type=str, required=True, help="clouds is required")
        parser.add_argument("language", type=str, required=True, help="language is required")

        args = parser.parse_args()

        english_sentence = prepare_weather_text(args["temp"], args["wind"], args["humidity"], args["clouds"])

        translator = Translator()
        try:
            translated_text = translator.translate(english_sentence, src='en', dest=langcodes[args["language"]]).text
        except Exception as e:
            print(f"Translation Error: {e}")
            translated_text = "Translation failed."

        audio = get_tts_audio(translated_text, args["language"])

        return {"error": False, "data": audio}


def prepare_weather_text(temp, wind, humidity, clouds):
    return f"Currently, the temperature stands at {temp} degrees Celsius. Winds are blowing at {wind} meter per second. Humidity levels are at {humidity} percent. Cloud cover is {clouds} percent."


models_ids = {
    "english": "6576a17e00d64169e2f8f43d",
    "hindi": "6576a1e500d64169e2f8f43e",
    "marathi": "633c02befd966563f61bc2be",
    "bengali": "6576a16c4e7d42484da63532",
    "odia": "6576a26b00d64169e2f8f43f",
    "telgu": "6576a2a34e7d42484da63539",
    "gujrati": "6576a18d4e7d42484da63533",
    "rajasthani": "6576a2854e7d42484da63538"
}


def get_tts_audio(text, langauge, gender="female"):
    model_id = models_ids[langauge]
    url = "https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/compute"
    payload = {
        "modelId": model_id,
        "task": "tts",
        "input": [
            {
                "source": text
            }
        ],
        "gender": gender,
        "userId": None
    }

    response = requests.post(url, json=payload)
    if response.status_code == 200:
        audio_data = response.json()["audio"][0]["audioContent"]
        return audio_data
    else:
        print("Failed to fetch audio")
        return None


class WhatGrownLastYear(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("language", type=str, required=True, help="language is required")
        args = parser.parse_args()

        sentence = "What crop was grown last year in this field"

        translator = Translator()
        try:
            translated_text = translator.translate(sentence, dest=langcodes["marathi"]).text
            print(translated_text)
        except Exception as e:
            print(f"Translation Error: {e}")
            translated_text = "Translation failed."

        audio = get_tts_audio(translated_text, args["language"])

        return {"error": False, "data": audio}


class CropRecommendation(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("crop", type=str, required=True, help="crop is required")
        parser.add_argument("language", type=str, required=True, help="language is required")
        args = parser.parse_args()

        translator = Translator()
        try:
            crop = translator.translate(args["crop"], src=args["language"], dest="en").text
        except Exception as e:
            print(f"Translation Error: {e}")
            crop = "Translation failed."

        prompt = f"""Act as Expert of Argiculture and using your expertise answer my question.
        Previously I have grown {crop} in this field. What crop should I grow this year?
        Your reply should be strictly in the json format like below:
        {{
            "crop_name": "crop_name",
            "description": "description"
            "current_market_price": "current_market_price",
            "reason": "reason"
        }}
        """

        response = llm.invoke(prompt)
        answer = json.loads(response.content)

        return {"error": False, "data": answer}


