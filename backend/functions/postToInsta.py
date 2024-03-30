from functions.imageToUrl import image_to_url
import requests
import json
import os


def postPhotoToInsta(photo, caption):
    image_url = image_to_url(photo)

    if not image_url:
        return {"error": True, "message": "Error uploading photo to Cloudinary"}

    response = upload_media(image_url, "IMAGE", os.getenv("INSTA_ACCESS_TOKEN"), os.getenv("INSTA_USER_ID"), caption)

    if response:
        return response
    else:
        return {"error": True, "message": "Error posting photo to Instagram"}


def upload_media(media_url, media_type, access_token, insta_user_id, caption):
    post_url = "https://graph.facebook.com/v19.0/{}/media".format(insta_user_id)
    
    payload = {
        'media_type': media_type,
        'caption': caption
    }

    if media_type == 'IMAGE':
        payload['image_url'] = media_url
    elif media_type == 'REELS':
        payload['video_url'] = media_url
    else:
        print("Invalid media type. Supported types are 'IMAGE' and 'REELS'.")
        return None

    r = requests.post(post_url, params={'access_token': access_token}, data=payload)

    try:
        result = r.json()
        print(result)
        return result
    except json.decoder.JSONDecodeError:
        print("Error decoding JSON. Response might not be in JSON format.")
        print("HTTP Status Code:", r.status_code)
        print("Response Text:", r.text)

        try:
            html_response = r.text
            print("HTML Response:", html_response)
        except Exception as e:
            print("Error parsing HTML response:", str(e))

        return None
