from mongo_engine import db
from pymongo.errors import DuplicateKeyError
from mongoengine import NotUniqueError

class User(db.Document):
    mobile = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)
    name = db.StringField(required=True)
    language = db.StringField(required=True, default='en')


    @classmethod
    def create_user(cls, args):
        try:
            user = cls(**args)
            user.save()
            return user
        except NotUniqueError:
            return None
        
    @classmethod
    def get_user(cls, mobile):
        try:
            user = cls.objects.get(mobile=mobile)
            return user
        except:
            return None
        
    @classmethod
    def update_user_language(cls, mobile, language):
        try:
            user = cls.objects.get(mobile=mobile)
            user.language = language
            user.save()
            return user
        except:
            return None
    
