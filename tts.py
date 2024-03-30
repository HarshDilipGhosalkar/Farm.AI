import json
import requests

headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjgzNTdmMzMtNGJiZS00MjA4LWFiMWUtN2UwY2I0NGU0MzA2IiwidHlwZSI6ImFwaV90b2tlbiJ9.mBYq_yCsQ0r1iSw0tRsA4lBdh2eXlFZ6u6meZkXvNrs"}

url = "https://api.edenai.run/v2/audio/text_to_speech"
payload = {
    "providers": "google,amazon", "language": "mr",
    "option": "MALE",
    "text": "this is a test",
    "fallback_providers": ""
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)
