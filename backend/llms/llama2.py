from langchain_fireworks import Fireworks

llm = Fireworks(
    fireworks_api_key="api_key",
    model="accounts/fireworks/models/llama-v2-70b-chat",
    temperature=0.1,
    max_tokens=4096
)

res = llm.invoke("""Who is the PM of India? output should be in the json format like below:
                    {{
                        "answer": "Narendra Modi"
                    }}
                """)
print(res)

# import requests
# import json

# url = "https://api.fireworks.ai/inference/v1/chat/completions"
# payload = {
#   "model": "accounts/fireworks/models/llama-v2-70b-chat",
#   "max_tokens": 512,
#   "top_p": 1,
#   "top_k": 40,
#   "presence_penalty": 0,
#   "frequency_penalty": 0,
#   "temperature": 0.6,
#   "messages": [
#     {
#         "role": "user",
#         "content": "Who is the PM of India? just name of the PM."
#     }
#   ]
# }
# headers = {
#   "Accept": "application/json",
#   "Content-Type": "application/json",
#   "Authorization": "Bearer token"
# }
# res = requests.request("POST", url, headers=headers, data=json.dumps(payload))
# print(res.json()["choices"][0]["message"]["content"])