from pymongo import MongoClient
from fhir.resources.medicationrequest import MedicationRequest
from fhir.resources.patient import Patient
from fhir.resources.medication import Medication
from fhir.resources.practitioner import Practitioner


# Refer 
# https://pypi.org/project/fhir.resources/


# create a MongoDB client and database instance
client = MongoClient('mongodb://localhost:27017/')
db = client['my_database']

# create a collection for storing MedicationRequest resources
med_request_collection = db['medication_requests']

# create a MedicationRequest resource
med_request = MedicationRequest()

# populate the resource with relevant fields
med_request.medication = Medication(reference='Medication/123')
med_request.subject = Patient(reference='Patient/456')
med_request.requester = Practitioner(reference='Practitioner/789')
med_request.dosageInstruction = [{
    'text': 'Take 1 tablet by mouth once a day',
    'timing': {
        'repeat': {
            'frequency': 1,
            'period': 1,
            'periodUnit': 'd'
        }
    }
}]

# insert the MedicationRequest resource into the database
result = med_request_collection.insert_one(med_request.as_json())

# print the ID of the inserted document
print(result.inserted_id)
