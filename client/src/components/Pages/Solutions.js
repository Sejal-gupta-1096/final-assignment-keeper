import React, { Component, useContext,useEffect,Fragment } from 'react';
import axios from 'axios';
import AuthContext from '../../context/auth/authContext'
import AssignContext from '../../context/assignments/AssignContext'
import SideBar from '../Sidebar/Sidebar'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner'

function Solutions(props) {
    const authContext = useContext(AuthContext)
    const {isAuthenticated,user,setLoading,loadUser,token} = authContext
    let {loading} = authContext
    const assignContext = useContext(AssignContext)
    const {files,downloadfiles,sols,getsolutions} = assignContext
    let name = '';
    let contactno = ''
    let email = ''
    let locs =[]
    let names=[]
    useEffect(()=>{
        loadUser()
        
    },[])
    useEffect(()=>{
        if(user){
            name=user.name
            contactno = user.phone
            email = user.email
            getsolutions(contactno)
            if(files){
                files.map((file)=>{
                    let temp = "/api/Specific/" + file.file
                    locs.push(temp)
                })
            }
            if(files){
                files.map((file)=>{
                    names.push(file.file)
                })
            }
        }
    },[user])
    
    
    
    
    
    

    const handleclick = (event)=>{
        setLoading(true)
        const res = event.target.value
        const url = "/api/Specific/sols/"+res
        axios.get(`${url}`, {
            responseType: 'blob' //Force to receive data in a Blob Format
        })
        .then(response => {
        //Create a Blob from the PDF Stream
            const file = new Blob(
              [response.data], 
              {type: 'application/pdf'});
        //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
            setLoading(false)
            window.open(fileURL);

        })
        .catch(error => {
            console.log(error);
        });
    }
    
    
        return (
            <>
            <SideBar/>
            <div className="container" id="user3" >
                <div className="row">
                
                    <div className="col-lg-12 text-center">
                    <span class="badge badge-danger mb-3 mt-5" style={{backgroundColor:"#900c3f"}}><h2>Recent Sent Solutions!</h2>
                        <h6>Click on any file to view it...</h6></span>
                    </div>
                    <div className="col-lg-12">
                    </div>
                    <div className="col-lg-12">
                            {loading?(<>
                                    <center><Spinner/><br/>
                                    <h5 style={{color:"black"}}>Please Wait Your document is loading !</h5>
                                    </center>
                            </>):(<></>)}
                    </div>
                </div>
                    
                <div className="row">
                   
                        {   sols.length!==0?(
                            sols.map((file)=>(
                                <div className="col-lg-4">
                                <div key={Math.floor((Math.random()*(1000+10))*(Math.random()*(1000+10)))}  className="card p-2 m-2" id="hoverchange" style={{padding:"2%"}} style={{border:"2px solid #010a43"}}>
                                    <center>
                                    <h6 style={{color:"black"}}><b>File</b>: {file.file}</h6>
                                    <h6 style={{color:"black"}}><b>Subject</b> : {file.subject}</h6>
                                    <h6 style={{color:"black"}}><b>Deadline</b> : {file.deadline}</h6>
                                    <h6 style={{color:"black"}}><b>Price</b> : {file.range}</h6>
                                    {contactno==9876543210?<>
                                    <h6 style={{color:"black"}}><b>Name</b>: {file.name}</h6>
                                    <h6 style={{color:"black"}}><b>Email</b> : {file.email}</h6>
                                    <h6 style={{color:"black"}}><b>Contact NO</b> : {file.phone}</h6>
                                    </>
                                    :<></>}
                                    </center>
                                    <button value={file.file} type='submit' onClick={handleclick} className='btn btn-outline-light' id="makechange2" style={{backgroundColor:"#900c3f"}}>View File</button></div>
                                </div>
                            ))
                        ):<></>
                        }
                    
                </div>
            </div>
            
            </>
        )
}

export default Solutions;