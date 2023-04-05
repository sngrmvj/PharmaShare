

import './ViewRequest.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SHOW_REQUEST, UPDATE_STATUS } from '../../constants';



const ViewRequest = () => {

    const {state} = useLocation();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState();
    const [tablet_name, setTabletName] = useState();
    const [consumer_name, setConsumer] = useState();
    const [consumer_email, setConsumerEmail] = useState();
    const [consumer_phone, setConsumerPhone] = useState();
    const [prescription, setPrescription] = useState();



    const logout = () =>{
        localStorage.setItem('isLoggedIn',false);
        if (localStorage.getItem('user_type') === 'Supplier'){
            localStorage.removeItem('supplierEmail');
        } else {
            localStorage.removeItem('consumerEmail');
        }
        localStorage.removeItem('user_type');
        localStorage.removeItem('fullname');
        navigate("/");
    }



    const navigateBack = () => {
        navigate("/suppliermenu");
    }

    const getSubmissions = (to_be_used_tablet) => {

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
        
        axios.get(`${SHOW_REQUEST}?tablet=${to_be_used_tablet}`, options)
        .then(result=>{
            console.log(result);
            if (result.status === 200){
                setConsumer(result.data.message.consumer);
                setTabletName(result.data.message.tablet);
                setPrescription(result.data.message.prescription);
                setConsumerEmail(result.data.message.consumer_email);
                setConsumerPhone(result.data.message.consumer_phone)
            }
        }).catch(error => {
            toast.error(error.error);
        })
    }

    const handleApprove = (event) => {
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
                tablet_name: tablet_name,
                status: "Approved",
            }
        };

        axios.put(`${UPDATE_STATUS}`, options)
        .then(result=>{
            if (result.status === 200){
                toast.success("Successfully updated the status");
                navigate("/suppliermenu");
            }
        }).catch(error => {
            toast.error(error.error);
        })
    }

    const handleReject = (event) => {
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
                tablet_name: tablet_name,
                status: "Rejected",
            }
        };

        axios.put(`${UPDATE_STATUS}`, options)
        .then(result=>{
            if (result.status === 200){
                toast.success("Successfully updated the status");
                navigate("/suppliermenu");
            }
        }).catch(error => {
            toast.error(error.error);
        })
    }

    useEffect(() => {
        if (state != null){
            const { tablet_name } = state;
            setTabletName(tablet_name);
        }
        getSubmissions(tablet_name);
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


            <div style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
                <div className='ViewRequestDiv' >
                    <div style={{padding:"20px",}}>

                        <label>Person Name: <b>{consumer_name}</b></label> <br/><br/>
                        <label>Email: <b>{consumer_email}</b></label><br/><br/>
                        <label>Contact: <b>{consumer_phone}</b></label><br/><br/>
                        <span>
                            <label>Patient Name: <b>{prescription['patient-name']}</b></label> <br/> <br/>
                            <label>Practitioner Name: <b>{prescription['practitioner-name']}</b></label><br/> <br/>
                            <label>Condition Name: <b>{prescription['condition-name']}</b></label><br/> <br/>
                            <label>Instructions: <b>{prescription['instructions-name']}</b></label><br/> <br/>
                            <label>Frequency: <b>{prescription['frequency-name']}</b></label><br/> <br/>
                            <label>Tablet Count: <b>{prescription['tablet_count']}</b></label><br/> <br/>
                            <label>Concentration: <b>{prescription['concentration-name']}</b></label><br/> <br/>
                        </span>
                        <br/><br/>

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