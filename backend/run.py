from setup import app, db
from flask import request, jsonify
from sqlalchemy import and_
from models import Supplier, Consumer, SupplierPublish, ConsumerRequest

import os
import traceback
import pandas as pd
from io import BytesIO
from pandas import ExcelWriter
from datetime import datetime, timedelta


# ----

# def custom_excel(res, filename):
#     resp = excel.Response(res)
#     resp.headers["Content-Disposition"] = "attachment; filename= %s" % filename
#     resp.mimetype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
#     return resp


# ------


@app.route("/", methods=['GET'])
def ping():
    return jsonify({"message": "Yes you are connected!!"}), 200


@app.route('/user', methods=['POST'])
def add_user():
    try:
        request_body = request.get_json()
        data = request_body['data']
        arguments = request.args

        if arguments['type'] == 'Supplier':
            user = Supplier(username=data['username'], email=data['email'], password=data['password'])
        else:
            user = Consumer(username=data['username'], email=data['email'], password=data['password'])
        db.session.add(user)
        db.session.commit()
        if arguments['type'] == 'Supplier':
            user = Supplier.query.filter_by(email=data['email']).first()
        else:
            user = Consumer.query.filter_by(email=data['email']).first()
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
        arguments = request.args
        if arguments['type'] == 'Supplier':
            user = Supplier.query.filter_by(email=data['email']).first()
        else:
            user = Consumer.query.filter_by(email=data['email']).first()
        if user and user.check_password(data['password']):
            return jsonify({'id': user.id, 'fullname': user.username, 'email': user.email, 'valid': True}), 200
        return jsonify({'valid': False}), 404
    except Exception as error:
        print(f"Error in validating the user - {error}")
        return jsonify({"error": f"Error in validating the user - {error}"}), 500
    


















@app.route("/add_surplus_medicine", methods=['POST'])
def add_surplus_medication():
    try:
        request_body = request.get_json()
        data = request_body['data']

        arguments = request.args
        print(arguments)

        published_medicine = SupplierPublish(tablet_name=data['tablet-name'],person_name=data['person-name'], manufacture_date=data['manufacture-date'],expiry_date=data['expiry-date'], address=data['address'], contact=data['phone-number'], email=arguments['email'])

        db.session.add(published_medicine)
        db.session.commit()

        if not published_medicine:
            raise Exception("Error in entering the surplus medication entry")

    except Exception as error:
        print(f"Error - {error}")
        return jsonify({"error": f"{error}"}), 500
    else:
        return jsonify({'message': "Successfully added"}), 200
    



@app.route("/get_all_requests", methods=['GET'])
def get_supplier_requests():

    """
        Display all the requests of the supplier based on his mail.

    Raises:
        Exception: _description_

    Returns:
        _type_: _description_
    """
    try:

        arguments = request.args
        consumer_results = ConsumerRequest.query.filter_by(supplier_email=arguments['email']).all()

        if consumer_results == None:
            raise Exception("Error in fetching the results of the requests raised for the mail. ")
        
        if len(consumer_results) == 0:
            return jsonify({'message': []}), 200
        
        results = []
        for result in consumer_results:
            temp = {}
            temp['tablet'] = result.tablet_name
            temp['consumer'] = result.consumer_name
            temp['consumer_email'] = result.consumer_email
            temp['status'] = result.status
            temp['created_at'] = result.created_at
            results.append(temp)

    except Exception as error:
        print(traceback.format_exc())
        print(f"Error - {error}")
        return jsonify({"error": f"{error}"}), 500
    else:
        return jsonify({'message': results}), 200
    

@app.route("/list_out_medicines", methods=['GET'])
def list_out_medicines():
    try:

        arguments = request.args
        results = SupplierPublish.query.filter_by(email=arguments['email']).all()

        if results == None:
            raise Exception("Error in fetching the list out medicines for a particular supplier")
        
        if len(results) == 0:
            return jsonify({'message': []}), 200
        

        medicine_list = []
        for result in results:
            medicine = {}
            medicine['tablet'] = result.tablet_name
            medicine['manufacture_date'] = result.manufacture_date
            medicine['expiry_date'] = result.expiry_date
            medicine['created_at'] = result.created_at
            medicine_list.append(medicine)

    except Exception as error:
        print(f"Error - {error}")
        return jsonify({"error": f"{error}"}), 500
    else:
        return jsonify({'message': medicine_list}), 200
    


@app.route("/view_request", methods=['GET'])
def fetch_prescription_based_on_tablet():
    """
        To be used in View Request and displayed from the Supplier menu

    Raises:
        Exception: _description_
    """
    try:

        arguments = request.args
        consumer_results = ConsumerRequest.query.filter_by(tablet_name=arguments['tablet']).all()

        if not consumer_results:
            raise Exception("Error in fetching the results of the requests for the tablet. ")
        
        results = {}

        for result in consumer_results:
            results['tablet'] = result.tablet_name
            results['consumer'] = result.consumer_name
            results['prescription'] = result.prescription
            results['consumer_email'] = result.consumer_email

    except Exception as error:
        print(f"Error - {error}")
        return jsonify({"error": f"{error}"}), 500
    else:
        return jsonify({'message': results}), 200
    


@app.route("/update_status", methods=['PUT'])
def update_status():
    """
        Update the status of the request

    Returns:
        _type_: _description_
    """

    try:
        data = request.get_json()
        result = ConsumerRequest.query.filter_by(id=data['id']).first()
        result.status = data['status']
        db.session.commit()

    except Exception as error:
        print(f"Error - {error}")
        return jsonify({"error": f"{error}"}), 500
    else:
        return jsonify({'message': True}), 200
    















@app.route("/request_medicine", methods=['POST'])
def request_medication():
    try:
        request_body = request.get_json()
        data = request_body['data']

        requested_medicine = ConsumerRequest(consumer_name=data[''],supplier_name=data[''], tablet_name=data[''],prescription=data[''], consumer_email=data[''], supplier_email=data[''])

        db.session.add(requested_medicine)
        db.session.commit()

        if not requested_medicine:
            raise Exception("Error in entering the request medication entry")

    except Exception as error:
        print(f"Error - {error}")
        return jsonify({"error": f"{error}"}), 500
    else:
        return jsonify({'message': "Successfully added in request medicine"}), 200


@app.route("/consumer_menu", methods=['GET'])
def fetch_table1():
    try:

        """
            To be called in consumer menu and 1st table
        """

        arguments = request.args
        results = SupplierPublish.query.join(ConsumerRequest, and_( ConsumerRequest.tablet_name == SupplierPublish.tablet_name, ConsumerRequest.status != "Approved",)).filter(SupplierPublish.address.like(f"%{arguments['location']}%")).all()

    except Exception as error:
        print(f"Error - {error}")
        return jsonify({"error": f"{error}"}), 500
    else:
        return jsonify({'message': results}), 200
    


@app.route("/consumer_menu_table2", methods=['GET'])
def fetch_table2():
    try:

        """
            To be called in consumer menu and 1st table
        """

        arguments = request.args
        consumer_requests = ConsumerRequest.query.filter_by(consumer_email=arguments['email']).all()

    except Exception as error:
        print(f"Error - {error}")
        return jsonify({"error": f"{error}"}), 500
    else:
        return jsonify({'message': consumer_requests}), 200



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5001)