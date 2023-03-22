

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
import { ADD_MONTHLY_REPORT, GET_MONTHLY_REPORT } from '../../constants';



const SupplierMenu = () => {

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
                        <form>
                            <label for="tablet-name">Tablet Name:</label> <br/>
                            <input type="text" id="tablet-name" name="tablet-name" required /><br/><br/>

                            <label for="manufacture-date">Manufacture Date:</label><br/>
                            <input type="date" id="manufacture-date" name="manufacture-date" required /><br/><br/>

                            <label for="expiry-date">Expiry Date:</label><br/>
                            <input type="date" id="expiry-date" name="expiry-date" required/ ><br/><br/>

                            <label for="person-name">Person Name:</label> <br/>
                            <input type="text" id="person-name" name="person-name" required /><br/><br/>

                            <label for="address">Address:</label><br/>
                            <textarea id="address" name="address" rows="4" cols="50" required></textarea><br/><br/>

                            <label for="phone-number">Phone Number:</label><br/>
                            <input type="tel" id="phone-number" name="phone-number" required /><br/><br/>

                            <button type="submit" className='btn'>Publish</button>
                        </form>
                    </div>
                </div>
            </div>

            <br/>

            <div style={{padding:"20px", display:"flex", justifyContent:"center", alignContent:"center"}}>
                <div className="ag-theme-alpine" style={{ height: '500px', width: '1400px' }}>
                    <AgGridReact rowData={rowData} columnDefs={columns} />
                </div>
            </div>
            <br/>


            <ToastContainer />
        </div>
    );
};

export default SupplierMenu;