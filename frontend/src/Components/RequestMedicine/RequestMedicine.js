

import './RequestMedicine.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { REQUEST_MEDICINE } from '../../constants';







const RequestMedicine = () => {
    const navigate = useNavigate();
    const {state} = useLocation();

    const [fullName, setFullName] = useState("");
    const [supplierName, setSupplierName] = useState();
    const [supplierEmail, setSupplierEmail] = useState();
    const [tablet_name, setTabletName] = useState();
    const [supplier_contact, setSupplierContact] = useState();



    const logout = () =>{
        localStorage.setItem('isLoggedIn',false);
        if (localStorage.getItem('user_type') == 'Supplier'){
            localStorage.removeItem('supplierEmail');
        } else {
            localStorage.removeItem('consumerEmail');
        }
        localStorage.removeItem('user_type');
        localStorage.removeItem('fullname');
        navigate("/")
    }


    const checkLoggedIn =() =>{
        if (localStorage.getItem('isLoggedIn') === "false"){
            navigate("/");
        }
    }


    const [formData, setFormData] = useState({
        'your-name': '',
        'consumer-phone': '',
        'consumer-email': '',
        'patient-name': '',
        'practitioner-name': '',
        'condition-name': '',
        'instructions-name': '',
        'frequency-name': '',
        'tablet_count': '',
        'concentration-name': '',
    });

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        const options = {
            withCredentials: true,
            credentials: 'same-origin', 
            
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Content-Type': 'application/json',
            },

            data : {
                "formData":  formData,
                "supplier_email": supplierEmail,
                "supplier_contact": supplier_contact,
                "tablet_name": tablet_name,
                "supplier_name": supplierName,
                "consumer_email": localStorage.getItem('consumerEmail')
            } 
        };

        axios.post(`${REQUEST_MEDICINE}`, options)
        .then(result=>{
            console.log(result);
            if (result.status === 200){
                toast.success("Successfully added");
                setFormData({
                    'your-name': '',
                    'consumer-phone': '',
                    'consumer-email': '',
                    'patient-name': '',
                    'practitioner-name': '',
                    'condition-name': '',
                    'instructions-name': '',
                    'frequency-name': '',
                    'tablet_count': '',
                    'concentration-name': '',
                });
                navigate("/consumermenu");
            } else {
                toast.warn("Please check your parameters to fetch the request details")
            }
        }).catch(error => {
            if (error.status === 500){
                toast.error(error.error);
            }
        })
    }


    useEffect(() => {
        if (localStorage.getItem('user_type') != 'Consumer'){
            logout();
        }
        checkLoggedIn();
        getUser(); // To get the user firstname and lastname
        if (state != null){
            const { tablet_name, supplier_email, contact, name } = state;
            setTabletName(tablet_name);
            setSupplierEmail(supplier_email);
            setSupplierContact(contact);
            setSupplierName(name);
        }
        else{
            navigate("/consumermenu")
        }
    }, []);

    
    const getUser = () =>{
        setFullName(localStorage.getItem('fullname'));
    }




    
    return (
        <div>
            <div style={{padding:"20px"}}>
                <label style={{color:"#2E8DCD", fontSize:"20px"}}><span style={{fontSize:"20px",color:"#046FAA", marginRight:"18px"}}><b>PharmaShare</b> <br/> <span style={{fontSize:"12px",padding:"0px",color:"#046FAA"}}>({fullName})</span></span></label>
                <label style={{float:"right", color:"#046FAA", cursor:"pointer"}} onClick={logout}><b>Logout</b></label>
            </div><br/>


            <div>
                <div style={{padding:"20px",display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                    <div className='requestmedicineForm'>
                        <form onSubmit={handleSubmit}>
                            <label for="tablet-name">Your Name:</label> <br/>
                            <input type="text" id="your-name" name="your-name" required onChange={handleChange} /><br/><br/>

                            <label for="phone-number">Phone Number:</label><br/>
                            <input type="tel" id="consumer-phone" name="consumer-phone" maxLength={10} required onChange={handleChange} /><br/><br/>

                            <label for="manufacture-date">Consumer email:</label><br/>
                            <input type="email" id="consumer-email" name="consumer-email" required onChange={handleChange} /><br/><br/>

                            <label for="expiry-date">Patient Name:</label><br/>
                            <input type="text" id="patient-name" name="patient-name" required onChange={handleChange} /><br/><br/>

                            <label for="person-name">Practitioner Name:</label> <br/>
                            <input type="text" id="practitioner-name" name="practitioner-name" required onChange={handleChange} /><br/><br/>

                            <label for="city-name">Condition:</label> <br/>
                            <input type="text" id="condition-name" name="condition-name" required onChange={handleChange} /><br/><br/>

                            <label for="address">Dosage Instructions:</label><br/>
                            <input type="text" id="instructions-name" name="instructions-name" required onChange={handleChange} /><br/><br/>

                            <label for="address">Dosage Frequency:</label><br/>
                            <input type="text" id="frequency-name" name="frequency-name" required onChange={handleChange} /><br/><br/>

                            <label for="address">Tablet count:</label><br/>
                            <input type="text" id="tablet_count" name="tablet_count" required onChange={handleChange} /><br/><br/>

                            <label for="phone-number">Dosage Concentration:</label><br/>
                            <input type="text" id="concentration-name" name="concentration-name" required onChange={handleChange} /><br/><br/>


                            <button type="submit" className='btn'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <br/><br/>
        </div>
    );
}


export default RequestMedicine;