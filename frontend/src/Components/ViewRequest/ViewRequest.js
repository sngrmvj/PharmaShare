

import './ViewRequest.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import FileSaver from 'file-saver';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SHOW_REQUEST, UPDATE_STATUS } from '../../constants';



const ViewRequest = () => {

    const {state} = useLocation();
    const navigate = useNavigate();
    const [id, setID] = useState();
    const [tablet_name, setTabletName] = useState();
    const [consumer_name, setConsumer] = useState();
    const [consumer_email, setConsumerEmail] = useState();
    const [prescription, setPrescription] = useState();


    const logout = () => {
        navigate("/");
        localStorage.removeItem('user_type');
        localStorage.setItem('isLoggedIn',false);
        localStorage.removeItem('email');
        localStorage.removeItem('fullname');
    }

    const navigateBack = () => {
        navigate("/suppliermenu");
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
        
        axios.get(`${SHOW_REQUEST}?tablet=${tablet_name}`, options)
        .then(result=>{
            console.log(result);
            if (result.status === 200){
                setConsumer(result.message.consumer);
                setPrescription(result.message.prescription);
                setConsumerEmail(result.message.consumer_email);
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
                id: id,
                status: "Approved",
            }
        };

        axios.put(`${UPDATE_STATUS}`, options)
        .then(result=>{
            console.log(result);
            if (result.status === 200){
                setConsumer(result.message.consumer);
                setPrescription(result.message.prescription);
                setConsumerEmail(result.message.consumer_email);
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
                id: id,
                status: "Rejected",
            }
        };

        axios.put(`${UPDATE_STATUS}`, options)
        .then(result=>{
            console.log(result);
            if (result.status === 200){
                setConsumer(result.message.consumer);
                setPrescription(result.message.prescription);
                setConsumerEmail(result.message.consumer_email);
            }
        }).catch(error => {
            toast.error(error.error);
        })
    }

    useEffect(() => {
        if (state != null){
            const { tabletName, id } = state;
            setTabletName(tabletName);
            setID(id);
        }
        // else{
        //     navigate("/suppliermenu");
        // }
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

                        <label>Person Name: <b>{consumer_name}</b></label> <br/><br/>
                        <label>Email: <b>{consumer_email}</b></label><br/><br/>

                        <label>Prescription Details</label><br/>
                        <label>{prescription}</label><br/><br/>

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