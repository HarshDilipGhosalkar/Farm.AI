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
    @jwt_required()
    def get(self):
        user_email = get_jwt_identity()
        print(user_email)
        user = UserModel.get_user(user_email)
        if user:
            return {"error": False, "data": json.loads(user.to_json())}
        else:
            return {"error": True, "message": "User not found"}


class Signup(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("email", type=str, required=True, help="email is required")
        parser.add_argument("password", type=str, required=True, help="password is required")
        parser.add_argument("name", type=str, required=True, help="name is required")
        args = parser.parse_args()

        hashed_password = generate_password_hash(args['password'])
        args['password'] = hashed_password

        user = UserModel.create_user(args)
        if user:
            access_token = create_access_token(identity=args["email"], expires_delta=datetime.timedelta(days=1))
            return {"error": False, "data": json.loads(user.to_json()), "access_token": access_token}
        else:
            return {"error": True, "message": "Already registered."}


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
        
                  