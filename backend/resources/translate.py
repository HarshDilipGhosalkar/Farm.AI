from flask_restful import Resource, reqparse
from googletrans import Translator
from models.user import User as UserModel

langcodes = {
    "english": "en",
    "hindi": "hi",
    "marathi": "mr",
    "bengali": "bn",
    "odia": "or",
    "telgu": "te",
    "tamil": "ta",
    "gujrati": "gu",
}

class Translate(Resource):
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
            translated_text = translate.translate(args["text"], dest=language).text
        except Exception as e:
            print(f"Translation Error: {e}")
            translated_text = "Translation failed."

        return {"error": False, "data": translated_text}