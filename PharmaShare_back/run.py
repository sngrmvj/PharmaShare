from setup import app, db
from flask import request, jsonify
import flask_excel as excel
from models import Supplier, Consumer

import os
import traceback
import pandas as pd
from io import BytesIO
from pandas import ExcelWriter
from datetime import datetime, timedelta


# ----

def custom_excel(res, filename):
    resp = excel.Response(res)
    resp.headers["Content-Disposition"] = "attachment; filename= %s" % filename
    resp.mimetype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    return resp


# ------


@app.route("/", methods=['GET'])
def ping():
    return jsonify({"message": "Yes you are connected!!"}), 200


@app.route('/user', methods=['POST'])
def add_user():
    try:
        request_body = request.get_json()
        data = request_body['data']
        # TODO Need to check which user it is supplier or consumer
        user = Supplier(username=data['username'], email=data['email'], password=data['password'])
        db.session.add(user)
        db.session.commit()
        user = Supplier.query.filter_by(email=data['email']).first()
        if not user:
            raise Exception("Not able to add the user")
        return jsonify({"valid": True}), 200
    except Exception as error:
        print(traceback.format_exc())
        print(f"Addition of the user failed - {error}")
        return jsonify({"error": f"Addition of the user failed - {error}"}), 500


@app.route("/user", methods=['PUT'])
def validate_user():
    try:
        request_body = request.get_json()
        data = request_body['data']
        # TODO Need to check which user it is supplier or consumer
        user = Supplier.query.filter_by(email=data['email']).first()
        if user and user.check_password(data['password']):
            return jsonify({'id': user.id, 'fullname': user.username, 'email': user.email, 'valid': True}), 200
        return jsonify({'valid': False}), 404
    except Exception as error:
        print(f"Error in validating the user - {error}")
        return jsonify({"error": f"Error in validating the user - {error}"}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5001)
