import requests
import base64
from io import BytesIO

models_ids = {
    "en": "6576a17e00d64169e2f8f43d",
    "hindi": "6576a1e500d64169e2f8f43e",
    "marathi": "633c02befd966563f61bc2be",
    "bengali": "6576a16c4e7d42484da63532",
    "odia": "6576a26b00d64169e2f8f43f",
    "telgu": "6576a2a34e7d42484da63539",
    "gujrati": "6576a18d4e7d42484da63533",
    "rajasthani": "6576a2854e7d42484da63538"
}

def get_tts_audio(text, model_id="633c02befd966563f61bc2be", gender="female"):
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


if __name__ == "__main__":
  text = "आजचे वातावरण ढगाळ आहे. कृपया बाहेर जाऊ नका."
  audio_data = get_tts_audio(text)
  if audio_data:
      # You can now send the 'audio_data' (base64 encoded string) to your frontend via your API
      print(f"Audio data (base64): {audio_data}")
