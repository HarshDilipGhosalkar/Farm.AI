from mongo_engine import db
from pymongo.errors import DuplicateKeyError
from mongoengine import NotUniqueError

class SocialMedia(db.Document):
    image = db.StringField(required=True)
    text = db.StringField(required=True)

    @classmethod
    def get_all_social_media(cls):
        try:
            social_media = cls.objects()
            return social_media
        except:
            return None


    @classmethod
    def create_social_media(cls, args):
        try:
            social_media = cls(**args)
            social_media.save()
            return social_media
        except NotUniqueError:
            return None
        
    @classmethod
    def get_social_media(cls, image):
        try:
            social_media = cls.objects.get(image=image)
            return social_media
        except:
            return None