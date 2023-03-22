

import './ViewRequest.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileSaver from 'file-saver';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ViewRequest = () => {

    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);



    const columns = [
        { headerName: 'Tablet Name', field: 'tabletName' },
        { headerName: 'Manufacture Date', field: 'manufactureDate' },
        { headerName: 'Expiry Date', field: 'expiryDate' },
        { headerName: 'Person Name', field: 'personName' },
        { headerName: 'Address', field: 'address' },
        { headerName: 'Contact Number', field: 'contactNumber' },
        {
            headerName: 'Requests',
            field: 'requests',
            cellRenderer: () => {
                return '<button>View Request</button>';
            },
        },
    ];

    const logout = () => {
        
    }

    const navigateBack = () => {

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
        
        axios.get(``, options)
        .then(result=>{
            
        }).catch(error => {
            
        })
    }

    const handleApprove = (event) => {
        event.preventDefault();
    }

    const handleReject = (event) => {
        event.preventDefault();
    }



    useEffect(() => {
        getSubmissions();
    }, []);





    return (
        <div>


            <div style={{padding:"20px"}}>
                <header style={{color:"#2E8DCD", fontSize:"20px"}}><b>PharmaShare</b></header>
            </div><br/> <br/><br/> <br/>


            <div style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
                <div className='ViewRequestDiv' >
                    <div style={{padding:"20px",}}>

                        <label>Person Name: <b>{}</b></label> <br/><br/>

                        <label>Prescription Details</label><br/>

                        <label>Is Prescription Genuine? <b>{}</b></label><br/><br/>

                        <label>Phone Number: <b>{}</b></label><br/><br/>

                        <button type="submit" className='btn' onClick={handleApprove}>Approve</button>
                        <button type="submit" className='btn' style={{marginLeft:"10px"}} onClick={handleReject}>Reject</button>
                        <button type="submit" className='btn' style={{marginLeft:"10px"}} onClick={navigateBack}>Back</button>
                    </div>
                </div>
            </div>




            <ToastContainer />
        </div>
    );
};

export default ViewRequest;