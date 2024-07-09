import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './Profile.css';
import default_profile from '../../assets/default_profile.png'


const Profile = ({setLog,setUsername,username,baseURL}) => {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[institute,setInstitute] = useState("");
    const navigate = useNavigate()
    
    useEffect(() => {
        const predet = JSON.parse(localStorage.getItem('predetail'))
        setUsername(predet.username)
        setLog(predet.logged)

        const fetchProfile = async()=>{
            try{const response = await fetch(baseURL+`/profile`,{
                method:'POST',
                mode:'cors',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username:username
                })
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUsername(data.username)
            setName(data.name)
            setEmail(data.email)
            setInstitute(data.institute)
            localStorage.setItem('profile',JSON.stringify(data));
            }
            catch(err){
                console.error('Fetch profile failed:', err);
            }
        }

        const savedProfile = localStorage.getItem('profile')
        if(savedProfile){
            const profileData = JSON.parse(savedProfile);
            setUsername(profileData.username);
            setName(profileData.name);
            setEmail(profileData.email);
            setInstitute(profileData.institute);
        }
        else
        fetchProfile();
        },[username,setUsername])
    

    const handleLogout=()=>{
        setLog(false)
        localStorage.removeItem('profile');
        localStorage.removeItem('predetail');
        navigate('/')
    }
    
    return(
        <div className="profile">
            <div className="pf-header">
                <div className="pf-left">
                    <img src={default_profile} alt="" />
                </div>
                <div className="pf-right">
                    <div className="username"> {username}</div>
                    <div className="text"> Name: {name}</div>
                    <div className="text"> Email : {email}</div>
                    <div className="text"> Institute: {institute}</div>
                </div>
            </div>
            <div className="logout">
                <button onClick={handleLogout}> Logout </button>
            </div>
        </div>
    )
};

export default Profile;
