from mongo_engine import db
from pymongo.errors import DuplicateKeyError
from mongoengine import NotUniqueError

class User(db.Document):
    email = db.StringField(required=True, unique=True)
    # number = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)
    name = db.StringField(required=True)


    @classmethod
    def create_user(cls, args):
        try:
            user = cls(**args)
            user.save()
            return user
        except NotUniqueError:
            return None
        
    @classmethod
    def get_user(cls, email):
        try:
            user = cls.objects.get(email=email)
            return user
        except:
            return None
    
