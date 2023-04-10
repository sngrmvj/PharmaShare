

import './supplier_menu.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileSaver from 'file-saver';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { GET_SUPPLIER_PUBLICATIONS, ADD_SURPLUS_MEDICINE, LIST_OUT_MEDICINES } from '../../constants';



const SupplierMenu = () => {

    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");


    const logout = () =>{
        localStorage.setItem('isLoggedIn',false);
        if (localStorage.getItem('user_type') == 'Supplier'){
            localStorage.removeItem('supplierEmail');
        } else {
            localStorage.removeItem('consumerEmail');
        }
        localStorage.removeItem('user_type');
        localStorage.removeItem('fullname');
        navigate("/");
    }



    const navigateToViewMedicine = (tablet_name) => {
        navigate("/viewrequest",{ state: { tablet_name: tablet_name } })
    }

    const [rowData, setRowData] = useState([]);
    const columns = [
        { headerName: 'Tablet Name', field: 'tablet' },
        { headerName: 'Consumer Name', field: 'consumer' },
        { headerName: 'Consumer Email', field: 'consumer_email' },
        { headerName: 'Consumer Contact', field: 'consumer_phone' },
        { headerName: 'Status', field: 'status' },
        { headerName: 'Created', field: 'created_at' },
        {
            headerName: 'Requests',
            field: 'requests',
            cellRenderer: (params) =>{
                return <a onClick={() => navigateToViewMedicine(params.data['tablet'] )} style={{color:'#046FAA',cursor:'pointer', textAlign:'center'}}>View Request</a>
            }
        },
    ];


    const [medicineData, setMedicineData] = useState([]);
    const columnsMedicineData = [
        { headerName: 'Tablet Name', field: 'tablet', resizable: true },
        { headerName: 'Manufacture Date', field: 'manufacture_date',resizable: true, width:200 },
        { headerName: 'Expiry Date', field: 'expiry_date',resizable: true, width:200 },
        { headerName: 'Created', field: 'created_at', resizable: true },
    ]

    const [formData, setFormData] = useState({
        'tablet-name': '',
        'manufacture-date': '',
        'expiry-date': '',
        'person-name': '',
        'city-name': '',
        'address': '',
        'phone-number': '',
    });

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const all_added_surplus_medicines = () => {

        const options = {
            withCredentials: true,
            credentials: 'same-origin', 
            
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Content-Type': 'application/json',
            },
        };
        
        let email = localStorage.getItem('supplierEmail');
        axios.get(`${LIST_OUT_MEDICINES}?email=${email}`, options)
        .then(result=>{
            if (result.status === 200){
                setMedicineData(result.data.message)
            } else {
                toast.warn("Please check your parameters to fetch the request details")
            }
            
        }).catch(error => {
            if (error.status === 500){
                toast.error(error.error);
            }
        })
    }

    const getSubmissions = () => {

        const options = {
            withCredentials: true,
            credentials: 'same-origin', 
            
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Content-Type': 'application/json',
            },

        };
        
        let email = localStorage.getItem('supplierEmail');
        axios.get(`${GET_SUPPLIER_PUBLICATIONS}?email=${email}`, options)
        .then(result=>{
            if (result.status === 200){
                setRowData(result.data.message);
            } else {
                toast.warn("Please check your parameters to fetch the request details")
            }
            
        }).catch(error => {
            if (error.status === 500){
                toast.error(error.error);
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const manufactureDate = new Date(formData['manufacture-date']);
        const expiryDate = new Date(formData['expiry-date']);

        if (manufactureDate >= expiryDate) {
            toast.warn('Manufacture date must be less than expiry date');
            return false;
        }

        const options = {
            withCredentials: true,
            credentials: 'same-origin', 
            
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Content-Type': 'application/json',
            },

            data : formData
        };

        let email = localStorage.getItem('supplierEmail');
        axios.post(`${ADD_SURPLUS_MEDICINE}?email=${email}`, options)
        .then(result=>{
            if (result.status === 200){
                toast.success("Successfully added");
                all_added_surplus_medicines();
                setFormData({
                    'tablet-name': '',
                    'manufacture-date': '',
                    'expiry-date': '',
                    'person-name': '',
                    'city-name': '',
                    'address': '',
                    'phone-number': '',
                });
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
        getSubmissions();
        all_added_surplus_medicines();
        getUser();
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
                    <div className='tabletSubmissionForm'>
                        <form onSubmit={handleSubmit}>
                            <label for="tablet-name">Tablet Name:</label> <br/>
                            <input type="text" id="tablet-name" name="tablet-name" value={formData['tablet-name']} required onChange={handleChange} /><br/><br/>

                            <label for="manufacture-date">Manufacture Date:</label><br/>
                            <input type="date" id="manufacture-date" name="manufacture-date" value={formData['manufacture-date']} required onChange={handleChange} /><br/><br/>

                            <label for="expiry-date">Expiry Date:</label><br/>
                            <input type="date" id="expiry-date" name="expiry-date" value={formData['expiry-date']} required onChange={handleChange} /><br/><br/>

                            <label for="person-name">Person Name:</label> <br/>
                            <input type="text" id="person-name" name="person-name" value={formData['person-name']} required onChange={handleChange} /><br/><br/>

                            <label for="city-name">City:</label> <br/>
                            <input type="text" id="city-name" name="city-name" value={formData['city-name']} required onChange={handleChange} /><br/><br/>

                            <label for="address">Address:</label><br/>
                            <textarea id="address" name="address" rows="4" cols="50" value={formData.address} required onChange={handleChange}></textarea><br/><br/>

                            <label for="phone-number">Phone Number:</label><br/>
                            <input type="tel" id="phone-number" name="phone-number" value={formData['phone-number']} maxLength={10} required onChange={handleChange} /><br/><br/>
                            {/* /^\+1 \([0-9]{3}\) [0-9]{3}-[0-9]{4}$/ This is US regex number  */}

                            <button type="submit" className='btn'>Publish</button>
                        </form>
                    </div>
                </div>
            </div>

            <br/><br/>

            <div style={{padding:"20px", display:"flex", justifyContent:"center", alignContent:"center"}}>
                <div className="ag-theme-alpine" style={{ height: '500px', width: '1400px' }}>
                    <AgGridReact rowData={rowData} columnDefs={columns} />
                </div>
            </div>
            <br/><br/>

            <div style={{padding:"20px", display:"flex", justifyContent:"center", alignContent:"center"}}>
                <div className="ag-theme-alpine" style={{ height: '500px', width: '900px' }}>
                    <AgGridReact rowData={medicineData} columnDefs={columnsMedicineData} />
                </div>
            </div>
            <br/><br/>


            <ToastContainer />
        </div>
    );
};

export default SupplierMenu;