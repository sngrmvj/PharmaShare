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

        published_medicine = SupplierPublish(tablet_name=data['tablet-name'],person_name=data['person-name'], manufacture_date=data['manufacture-date'],expiry_date=data['expiry-date'],city=data['city-name'], address=data['address'], contact=data['phone-number'], email=arguments['email'])

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
            temp['consumer_phone'] = result.consumer_contact
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
            results['consumer_phone'] = result.consumer_contact
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
        print(data)
        result = ConsumerRequest.query.filter_by(tablet_name=data['data']['tablet_name']).first()
        result.status = data['data']['status']
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

        requested_medicine = ConsumerRequest(
            consumer_name=data['formData']['your-name'],
            supplier_name=data['supplier_name'], 
            tablet_name=data['tablet_name'],
            prescription={
                'patient-name': data['formData']['patient-name'],
                'practitioner-name': data['formData']['practitioner-name'],
                'condition-name': data['formData']['condition-name'],
                'instructions-name': data['formData']['instructions-name'],
                'frequency-name': data['formData']['frequency-name'],
                'tablet_count': data['formData']['tablet_count'],
                'concentration-name': data['formData']['concentration-name']
            }, 
            supplier_contact=data['supplier_contact'] ,
            consumer_contact=data['formData']['consumer-phone'] ,
            consumer_email=data['consumer_email'], 
            supplier_email=data['supplier_email']
        )

        db.session.add(requested_medicine)
        db.session.commit()

        if not requested_medicine:
            raise Exception("Error in entering the request medication entry")

    except Exception as error:
        print(f"Error - {error}")
        return jsonify({"error": f"{error}"}), 500
    else:
        return jsonify({'message': "Successfully added in request medicine"}), 200
    





@app.route("/get_locations", methods=['GET'])
def get_all_locations():

    try:

        """
            To be called in consumer menu and 1st table
        """

        locations = db.session.query(SupplierPublish.city).distinct().all()

        if len(locations) == 0:
            return jsonify({'message': []}), 200
        
        results = [result.city for result in locations]

    except Exception as error:
        print(f"Error - {error}")
        return jsonify({"error": f"{error}"}), 500
    else:
        return jsonify({'message': results}), 200





@app.route("/consumer_menu", methods=['GET'])
def fetch_table1():
    try:

        """
            To be called in consumer menu and 1st table
        """

        arguments = request.args
        supplier_requests = SupplierPublish.query.filter_by(city=arguments['location']).all()

        if len(supplier_requests) == 0:
            return jsonify({'message': []}), 200

        results = []
        for result in supplier_requests:
            temp = {}
            temp['tabletName'] = result.tablet_name
            exists = ConsumerRequest.query.filter_by(tablet_name=result.tablet_name).all() # Checking whether the item is Approved or not
            isApproved = False 
            if exists:
                for line in exists:
                    if line.status == "Approved":
                        isApproved = True 
                        break
            if isApproved:
                continue
            temp['manufactureDate'] = result.manufacture_date
            temp['expiryDate'] = result.expiry_date
            temp['personName'] = result.person_name
            temp['supplier_email'] = result.email
            temp['address'] = result.address
            temp['contact'] = result.contact
            results.append(temp)


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


        if len(consumer_requests) == 0:
            return jsonify({'message': []}), 200

        results = []
        for result in consumer_requests:
            temp = {}
            temp['tabletName'] = result.tablet_name
            temp['status'] = result.status
            temp['contact'] = result.supplier_contact
            temp['personName'] = result.supplier_name
            results.append(temp)

    except Exception as error:
        print(f"Error - {error}")
        return jsonify({"error": f"{error}"}), 500
    else:
        return jsonify({'message': results}), 200






if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5001)