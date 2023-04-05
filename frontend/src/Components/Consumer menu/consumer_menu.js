

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
import { GETLOCATIONS, TABLE1, TABLE2 } from '../../constants';



const ConsumerMenu = () => {

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


    const navigateToRequestMedicine = (tablet_name, supplier_email, contact, personName) => {
        navigate("/request_medicine",{ state: { tablet_name: tablet_name, supplier_email: supplier_email, contact:contact, name:personName } })
    }



    // Selection of the Video platform 
    // We can use this to set the state for the Video Media after the api call.
    const [displayLocations, setDisplayLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState();
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
            cellRenderer: (params) =>{
                return <a onClick={() => navigateToRequestMedicine(params.data['tabletName'], params.data['supplier_email'], params.data['contact'], params.data['personName'] )} style={{color:'#046FAA',cursor:'pointer', textAlign:'center'}}>Request Medicine</a>
            }
        },
    ];

    const getTable1 = (located) => {
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
        axios.get(`${TABLE1}?location=${located}`, options)
        .then(result=>{
            console.log(result)
            setRowDataTable1(result.data.message);
        }).catch(error => {
            toast.error(error.data.error);
        })
    }

    const columnsTable2 = [
        { headerName: 'Supplier Name', field: 'personName' },
        { headerName: 'Contact', field: 'contact' },
        { headerName: 'Tablet Name', field: 'tabletName' },
        { headerName: 'Status', field: 'status' },
    ];

    const getTable2 = () => {
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
        let email = localStorage.getItem('consumerEmail');
        axios.get(`${TABLE2}?email=${email}`, options)
        .then(result=>{
            setRowDataTable2(result.data.message);
        }).catch(error => {
            toast.error(error.data.error);
        })
    }


    const locationSelection = (event) =>{
        setSelectedLocation(event.target.value);
        getTable1(event.target.value); // Calling this function.
    }

    const getLocations = () => {
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
        
        axios.get(`${GETLOCATIONS}`, options)
        .then(result=>{
            setDisplayLocation(["Select Location", ...result.data.message]);
        })
    }


    useEffect(() => {
        getLocations();
        getTable2();
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

            <div style={{padding:"20px", display:"flex", justifyContent:"center", alignContent:"center", width:'100%'}}>
                <div style={{display:"flex",flexDirection:"row",width:"400px", justifyContent:"center"}}>
                    <label> <b>Select Location</b> </label> <br/>
                    <select style={{width:"300px",cursor:"pointer", padding:"10px"}} onChange={locationSelection}>
                    <option value="default" disabled>Select an option</option>
                    {displayLocations.map((option,key) => (
                        <option key={key} value={option.value}>
                            {option}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
            

            <br/><br/>


            <div style={{padding:"20px", display:"flex", justifyContent:"center", alignContent:"center", flexDirection:"column"}}>
                <div style={{ display:"flex", justifyContent:"center", alignContent:"center",}}>
                    <label> <b>Search Details</b> </label> <br/>
                </div><br/>
                <div style={{display:"flex", justifyContent:"center", alignContent:"center",}}>
                    <div className="ag-theme-alpine" style={{ height: '500px', width: '1200px',  }}>
                        <AgGridReact rowData={rowDataTable1} columnDefs={columnsTable1} />
                    </div>
                </div>
            </div>

            
            <br/><br/>

            <div style={{padding:"20px", display:"flex", justifyContent:"center", alignContent:"center", flexDirection:"column"}}>
                <div style={{ display:"flex", justifyContent:"center", alignContent:"center",}}>
                    <label> <b>History</b> </label> <br/>
                </div><br/>
                <div style={{display:"flex", justifyContent:"center", alignContent:"center",}}>
                    <div className="ag-theme-alpine" style={{ height: '500px', width: '750px' }}>
                        <AgGridReact rowData={rowDataTable2} columnDefs={columnsTable2} />
                    </div>
                </div>
            </div>
            
            <ToastContainer />
        </div>
    );
};

export default ConsumerMenu;