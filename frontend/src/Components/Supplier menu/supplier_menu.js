

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

    const [rowData, setRowData] = useState([]);
    const columns = [
        { headerName: 'Tablet Name', field: 'tablet' },
        { headerName: 'Consumer Name', field: 'consumer' },
        { headerName: 'Consumer Email', field: 'consumer_email' },
        { headerName: 'Status', field: 'status' },
        { headerName: 'Created', field: 'created_at' },
        {
            headerName: 'Requests',
            field: 'requests',
            cellRenderer: () => {
                return '<button>View Request</button>';
            },
        },
    ];


    const [medicineData, setMedicineData] = useState([]);
    const columnsMedicineData = [
        { headerName: 'Tablet Name', field: 'tablet' },
        { headerName: 'Manufacture Date', field: 'manufacture_date' },
        { headerName: 'Expiry Date', field: 'expiry_date' },
        { headerName: 'Created', field: 'created_at' },
    ]


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
        
        let email = localStorage.getItem('email');
        axios.get(`${LIST_OUT_MEDICINES}?email=${email}`, options)
        .then(result=>{
            console.log(result);
            if (result.status === 200){
                setMedicineData([...medicineData,result.message])
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
        
        let email = localStorage.getItem('email');
        axios.get(`${GET_SUPPLIER_PUBLICATIONS}?email=${email}`, options)
        .then(result=>{
            console.log(result);
            if (result.status === 200){
                setRowData([...rowData, result.message]);
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

        const formData = new FormData(event.target);
        console.log(formData.get('table-name'));

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
                email: localStorage.getItem('email'),
                // password: password,
            }
        };


        axios.post(`${ADD_SURPLUS_MEDICINE}`, options)
        .then(result=>{
            console.log(result);
            if (result.status === 200){
                toast.success("Successfully added");
                all_added_surplus_medicines();
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
    }, []);





    return (
        <div>


            <div style={{padding:"20px"}}>
                <header style={{color:"#2E8DCD", fontSize:"20px"}}><b>PharmaShare</b></header>
            </div><br/> <br/>


            <div>
                <div style={{padding:"20px",display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                    <div className='tabletSubmissionForm'>
                        <form onSubmit={handleSubmit}>
                            <label for="tablet-name">Tablet Name:</label> <br/>
                            <input type="text" id="tablet-name" name="tablet-name" required /><br/><br/>

                            <label for="manufacture-date">Manufacture Date:</label><br/>
                            <input type="date" id="manufacture-date" name="manufacture-date" required /><br/><br/>

                            <label for="expiry-date">Expiry Date:</label><br/>
                            <input type="date" id="expiry-date" name="expiry-date" required /><br/><br/>

                            <label for="person-name">Person Name:</label> <br/>
                            <input type="text" id="person-name" name="person-name" required /><br/><br/>

                            <label for="city-name">City:</label> <br/>
                            <input type="text" id="city-name" name="city-name" required /><br/><br/>

                            <label for="address">Address:</label><br/>
                            <textarea id="address" name="address" rows="4" cols="50" required></textarea><br/><br/>

                            <label for="phone-number">Phone Number:</label><br/>
                            <input type="tel" id="phone-number" name="phone-number" required /><br/><br/>

                            <button type="submit" className='btn'>Publish</button>
                        </form>
                    </div>
                </div>
            </div>

            <br/><br/>

            <div style={{padding:"20px", display:"flex", justifyContent:"center", alignContent:"center"}}>
                <div className="ag-theme-alpine" style={{ height: '500px', width: '1200px' }}>
                    <AgGridReact rowData={rowData} columnDefs={columns} />
                </div>
            </div>
            <br/><br/>

            <div style={{padding:"20px", display:"flex", justifyContent:"center", alignContent:"center"}}>
                <div className="ag-theme-alpine" style={{ height: '500px', width: '1200px' }}>
                    <AgGridReact rowData={medicineData} columnDefs={columnsMedicineData} />
                </div>
            </div>
            <br/><br/>


            <ToastContainer />
        </div>
    );
};

export default SupplierMenu;