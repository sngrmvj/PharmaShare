
from fhir.resources.medicationrequest import MedicationRequest
from datetime import datetime
import random

# Refer 
# https://pypi.org/project/fhir.resources/





def create_medication_request(patient_name, medication_name, practitioner_name, condition_name, dosage_instructions):

    MedicationRequestJson = {
        "resourceType": "MedicationRequest",
        "id": "1620518",
        "meta": {
            "versionId": "1",
            "lastUpdated": "",
            "source": "#z072VeAlQWM94jpc",
            "tag": [
                {
                    "system": "http://www.alpha.alp/use-case",
                    "code": "EX20"
                }
            ]
        },
        "status": "completed",
        "_intent": {
            "extension": [
                {
                    "url": "http://hl7.org/fhir/StructureDefinition/data-absent-reason",
                    "valueCode": "unknown"
                }
            ]
        },
        "medicationReference": {
            "reference": f"Medication/{random.randint(1000000, 2000000)}",
            "display": f"{medication_name}"
        },
        "subject": {
            "reference": f"Patient/{random.randint(1000000, 2000000)}",
            "display": f"{patient_name}"
        },
        "encounter": {
            "reference": f"Encounter/{random.randint(1000000, 2000000)}",
            "display": "Follow up encounter"
        },
        "authoredOn": "2018-06-16",
        "requester": {
            "reference": f"Practitioner/{random.randint(1000000, 2000000)}",
            "display": f"{practitioner_name}"
        },
        "reasonReference": [
            {
                "reference": f"Condition/{random.randint(1000000, 2000000)}",
                "display": f"{condition_name}"
            }
        ],
        "dosageInstruction": [
            {
                "text": dosage_instructions['text'],
                "timing": {
                    "repeat": {
                        "boundsDuration": {
                            "value": dosage_instructions['value'],
                            "unit": dosage_instructions['part_of_day'],
                            "system": "http://unitsofmeasure.org",
                            "code": "d"
                        },
                        "frequency": dosage_instructions['frequency'],
                        "period": 1,
                        "periodUnit": "d"
                    }
                },
                "doseAndRate": [
                    {
                        "doseQuantity": {
                            "value": dosage_instructions['concentration'],
                            "unit": "mg",
                            "system": "http://unitsofmeasure.org",
                            "code": "mg"
                        }
                    }
                ]
            }
        ],
        "priorPrescription": {
            "reference": f"MedicationRequest/{random.randint(1000000, 2000000)}",
            "display": "Amoxicillin prescription"
        }
    }


    # create a MedicationRequest resource
    med_request = MedicationRequest.parse_raw(MedicationRequestJson)

    if MedicationRequestJson['medicationReference']['display'] != "" and MedicationRequestJson['medicationReference']['display'] == med_request.dict():
        return med_request.as_json(), True
    else:
        return {}, False


# {
#     'text': 'Take 1 tablet by mouth once a day',
#     'timing': {
#         'repeat': {
#             'frequency': 1,
#             'period': 1,
#             'periodUnit': 'd'
#         }
#     }
# }