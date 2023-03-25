

import './consumer_menu.css';
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



const ConsumerMenu = () => {

    const navigate = useNavigate();

    const [rowDataTable1, setRowDataTable1] = useState([]);
    const [rowDataTable2, setRowDataTable2] = useState([]);


    const columnsTable1 = [
        { headerName: 'Tablet Name', field: 'tabletName' },
        { headerName: 'Manufacture Date', field: 'manufactureDate' },
        { headerName: 'Expiry Date', field: 'expiryDate' },
        { headerName: 'Person Name', field: 'personName' },
        { headerName: 'Address', field: 'address' },
        {
            headerName: 'Requests',
            field: 'make_request',
            cellRenderer: () => {
                return '<button>Request Medicine</button>';
            },
        },
    ];

    const columnsTable2 = [
        { headerName: 'Tablet Name', field: 'tabletName' },
        { headerName: 'Manufacture Date', field: 'manufactureDate' },
        { headerName: 'Expiry Date', field: 'expiryDate' },
        { headerName: 'Status', field: 'status' },
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
                {/* TODO 
                    Create a drop down and the drop down gets created based on the location the suppliers' enter
                    We fetch it from database.
                */}
            </div>

            {/* TODO

                The idea is we display all the details of the requests based on the selected location.
                The user selects the location and we display all the tablets / medicine available in the table.
                Consumer can make request. (We need to forward the Id of the supplier entry into )
                Once the request is approved we display the contact number in the second table below, if the 
                request is rejected we show rejected entry in the second table below and the consumer can't make the request again (We need to keep track on how we can avoid this). 
            
            */}


            <div style={{padding:"20px", display:"flex", justifyContent:"center", alignContent:"center"}}>
                <div className="ag-theme-alpine" style={{ height: '500px', width: '1200px' }}>
                    <AgGridReact rowData={rowDataTable1} columnDefs={columnsTable1} />
                </div>
            </div>
            <br/>

            
            {/* TODO 
                This table is basically the history of the tablests the consumer has requested for. This entry gets deleted from supplier table and 
                pops up in consumer table tagged with the email id
            */}
            <div style={{padding:"20px", display:"flex", justifyContent:"center", alignContent:"center"}}>
                <div className="ag-theme-alpine" style={{ height: '500px', width: '600px' }}>
                    <AgGridReact rowData={rowDataTable2} columnDefs={columnsTable2} />
                </div>
            </div>
            <br/>


            <ToastContainer />
        </div>
    );
};

export default ConsumerMenu;