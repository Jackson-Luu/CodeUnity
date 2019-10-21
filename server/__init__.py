import os
from datetime import timedelta

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api

from server.database import init_db
from server.managers.project_manager import ProjectManager
from server.managers.user_manager import UserManager

# create and configure the app
app = Flask(__name__)
api = Api(app)
CORS(app)
jwt = JWTManager(app)
db = init_db()
user_manager = UserManager(app, db, jwt)
project_manager = ProjectManager(app, db)

app.config.from_mapping(
    SECRET_KEY=b"\xb6\x07\x03a[(\xaaj\x13'\xc8X\xd5%}\x9f",
    JWT_SECRET_KEY=b"\xf8u4\x0f\xfc\xa2\x06\xc5v\xf3\xa1\xfal{\x95\xb8",
    JWT_BLACKLIST_ENABLED=True,
    JWT_BLACKLIST_TOKEN_CHECKS=["access", "refresh"],
    # Access tokens to expire in 1 day
    JWT_ACCESS_TOKEN_EXPIRES=timedelta(1, 0, 0),
)


import server.endpoints
import server.routes
