

import './RequestMedicine.css';
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







const RequestMedicine = () => {
    const navigate = useNavigate();

    const [rowData, setRowData] = useState([]);



    return (
        <div>
            {/* TODO FHIR Prescription data  */}
        </div>
    );
}


export default RequestMedicine;