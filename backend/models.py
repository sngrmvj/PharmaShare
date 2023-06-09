from setup import db
from datetime import datetime

class Supplier(db.Model):
    __tablename__ = 'suppliers'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def check_password(self, password):
        return self.password == password

    def __repr__(self):
        return '<User %r>' % self.username

class Consumer(db.Model):
    __tablename__ = 'consumers'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def check_password(self, password):
        return self.password == password

    def __repr__(self):
        return '<User %r>' % self.username
    


class SupplierPublish(db.Model):
    __tablename__ = 'supplier_requests'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tablet_name = db.Column(db.String(100), nullable=False)
    person_name = db.Column(db.String(100), nullable=False)
    manufacture_date = db.Column(db.Date, nullable=False)
    expiry_date = db.Column(db.Date, nullable=False)
    city = db.Column(db.String(128), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    contact = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    def __repr__(self):
        return f"This is the supplier requests "


class ConsumerRequest(db.Model):
    __tablename__ = 'consumer_requests'
    id = db.Column(db.Integer, primary_key=True)
    consumer_name = db.Column(db.String(100), nullable=False)
    supplier_name = db.Column(db.String(100), nullable=False)
    tablet_name = db.Column(db.String(100), nullable=False)
    prescription = db.Column(db.JSON, nullable=False)
    status = db.Column(db.String(100)) # Approve / Reject
    supplier_contact = db.Column(db.String(20), nullable=False)
    consumer_contact = db.Column(db.String(20), nullable=False)
    consumer_email = db.Column(db.String(120), nullable=False) # To display all the items the person has requested for we can retrieve all items based on this
    supplier_email  = db.Column(db.String(120), nullable=False) # To display all the the items for the supplier to display them 
    # We might need to mark it blank once he approves or reject.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)