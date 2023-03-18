

import './main_menu.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileSaver from 'file-saver';
import Timer from '../Timer/timer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccrodionComponent from '../Accordion/acordion';
import { ADD_MONTHLY_REPORT, GET_MONTHLY_REPORT } from '../../constants';



const SupplierMenu = () => {

    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [takeMinutes,setMinutes] = useState(0);
    const [takeSeconds,setSeconds] = useState(0);
    const [takeHours,setHours] = useState(0);
    const [selectedCategory, setExerciseCategory] = useState("Select exercise category");
    const [fullName, setFullName] = useState("");

        // Game Type
        const exerciseCategories = [
            "Select exercise category",
            "Light exercises",
            "Moderate exercises",
            "Heavy exercises"
        ]
        let execiseCategoryDropdown = exerciseCategories.map((execiseCategory) => <option key={execiseCategory}>{execiseCategory}</option>)
        // Selection of the gametype dropdown
        const exerciseCategorySelection = (event) =>{
            setExerciseCategory(event.target.value);
        }

    const navigateToAnalytics = () => {
        navigate("/analytics");
    };

    const logout = () =>{
        localStorage.setItem('isLoggedIn',false);
        localStorage.removeItem('email');
        localStorage.removeItem('fullname');
        navigate("/");
    }

    const checkLoggedIn =() =>{
        if (localStorage.getItem('isLoggedIn') === 'false'){
            navigate("/");
        }
    }

    const getUser = () =>{
        setFullName(localStorage.getItem('fullname'));
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        if (takeHours === 0 && takeMinutes === 0 && takeSeconds === 0){
            toast.warn("You have not entered workout duration");
            return;
        }

        if (takeHours === "" || takeHours === " "){
            toast.warn("The hours has to be entered something");
            return;
        } else if (takeMinutes === "" || takeMinutes === " "){
            toast.warn("The minutes has to be entered something");
            return;
        } else if (takeSeconds === "" || takeSeconds === " "){
            toast.warn("The seconds has to be entered something");
            return;
        }

        if(takeHours > 24 || takeHours < 0){
            toast.warn("Please provide valid hours");
            return;
        }

        if(takeMinutes > 59 || takeMinutes < 0){
            toast.warn("The minutes has to be >=0 and <=59");
            return;
        }
        if (takeSeconds > 59 || takeSeconds < 0){
            toast.warn("The seconds has to be >=0 and <=59");
            return;
        }
        if (selectedCategory === 'Select exercise category'){
            toast.warn("Please select proper exercise category");
            return;
        }
        // Note - Hours doesn't have the condition as more than 60 hrs there is nothing like minutes have hours 
        const options = {
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },

            data: {
                hours: takeHours,
                minutes: takeMinutes,
                seconds: takeSeconds,
                category: selectedCategory
            }
        };
        let personEmailId = localStorage.getItem("email");
        axios.post(`${ADD_MONTHLY_REPORT}?email=${personEmailId}`, options)
        .then(result => {
            if(result.status === 200){
                toast.success("Successfully added to your record");
                setHours(0);
                setMinutes(0);
                setSeconds(0);
            }
        }).catch(error => {
            toast.error(error.error);
        })

    }


    const downloadReport = (e) => {
        e.preventDefault();
        const options = {
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
            responseType: 'blob'
        };

        let personEmailId = localStorage.getItem("email");
        axios.get(`${GET_MONTHLY_REPORT}?email=${personEmailId}`, options)
        .then(result => {
            if (result.status === 200){
                const blob = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                FileSaver.saveAs(blob, 'Monthly Report.xlsx');
            }
            
        }).catch(error => {
            toast.error(error.error)
        })
    }



    useEffect(() => {
        checkLoggedIn();
        getUser(); // To get the user firstname and lastname
    }, []);





    return (
        <div>


            <ToastContainer />
        </div>
    );
};

export default SupplierMenu;