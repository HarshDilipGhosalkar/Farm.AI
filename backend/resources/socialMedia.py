from flask_restful import Resource, request
from models.socialMedia import SocialMedia as SocialMediaModel
import json
from functions.imageToUrl import image_to_url

class SocialMedia(Resource):
    def post(self):
        image = request.files['image']
        text = request.form['text']

        image = image_to_url(image)

        social_media = SocialMediaModel.create_social_media({
            "image": image,
            "text": text
        })

        if not social_media:
            return {"error": True, "message": "Social Media not created"}
        

        return {"error": False, "data": json.loads(social_media.to_json())}
    
    def get(self):
        social_media = SocialMediaModel.get_all_social_media()
        if not social_media:
            return {"error": True, "message": "Social Media not found"}
        
        return {"error": False, "data": json.loads(social_media.to_json())}