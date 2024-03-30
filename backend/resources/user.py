from flask_restful import Resource, reqparse
from flask import jsonify, request
from werkzeug.security import (generate_password_hash, check_password_hash)
from flask_jwt_extended import (jwt_required, create_access_token, get_jwt_identity)
from models.user import User as UserModel
from flask_mail import Mail, Message
import json
import random
import datetime

class User(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mobile", type=str, required=True, help="mobile is required")
        user = UserModel.get_user(request.args.get("mobile"))
        if user:
            return {"error": False, "data": json.loads(user.to_json())}
        else:
            return {"error": True, "message": "User not found"}


class Signup(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mobile", type=str, required=True, help="mobile is required")
        parser.add_argument("password", type=str, required=True, help="password is required")
        parser.add_argument("name", type=str, required=True, help="name is required")
        args = parser.parse_args()

        hashed_password = generate_password_hash(args['password'])
        args['password'] = hashed_password

        user = UserModel.create_user(args)
        if user:
            return {'error': False, 'data': json.loads(user.to_json())}
        else:
            return {'error': True, 'message': 'Already registered.'}

        # if user:
        #     access_token = create_access_token(identity=args["email"], expires_delta=datetime.timedelta(days=1))
        #     return {"error": False, "data": json.loads(user.to_json()), "access_token": access_token}
        # else:
        #     return {"error": True, "message": "Already registered."}


class Login(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("email", type=str, required=True, help="email is required")
        parser.add_argument("password", type=str, required=True, help="password is required")
        args = parser.parse_args()

        user = UserModel.get_user(args["email"])
        if user:
            if check_password_hash(user.password, args["password"]):
                access_token = create_access_token(identity=args["email"], expires_delta=datetime.timedelta(days=1))
                return {"error": False, "data": json.loads(user.to_json()), "access_token": access_token}
            else:
                return {"error": True, "message": "Invalid email or password"}
        else:
            return {"error": True, "message": "User not found."}


class Language(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mobile", type=str, required=True, help="mobile is required")

        user = UserModel.get_user(request.args.get("mobile"))
        if user:
            language = user.language
            return {"error": False, "data": language}
        else:
            return {"error": True, "message": "User not found"}
        
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mobile", type=str, required=True, help="mobile is required")
        parser.add_argument("language", type=str, required=True, help="language is required")

        args = parser.parse_args()
        user = UserModel.update_user_language(args["mobile"], args["language"])
        if user:
            return {"error": False, "data": json.loads(user.to_json())}
        else:
            return {"error": True, "message": "User not found"}
                  