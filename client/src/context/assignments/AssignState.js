import React, { useReducer,useContext } from 'react';
import AssignContext from './AssignContext';
import AssignReducer from './AssignReducer';

import {
    DOWNLOAD_FILE_S,
    FOUND,
    SET_LOADING
} from '../types'
import axios from 'axios'



const AssignState = (props) => {
    const initialState = {
        files:[],
        sols:[],
        assignload:false
    }
    const [state, dispatch] = useReducer(AssignReducer, initialState)


    //Download files
    const downloadfiles = (contactno)=>{
        console.log('in assignstate');
        let url = ''
        if(contactno==9876543210){
            url = "/GRF/api/get/admin"
        }
        else{
            url = "/GRF/api/"+contactno
        }
        axios.get(url, {
            headers: {
                'Access-Control-Allow-Credentials': true
            }
        })
            .then(res => {
                dispatch({
                    type: DOWNLOAD_FILE_S,
                    payload: res.data
                })
                
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getsolutions = (contactno)=>{
        console.log('in assignstate');
        let url = ''
        if(contactno==9876543210){
            url = "/GRF/api/admin/sol"
        }
        else{
            url = "/GRF/api/sols/"+contactno
        }
        console.log("going");
        axios.get(url, {
            headers: {
                'Access-Control-Allow-Credentials': true
            }
        })
            .then(res => {
                dispatch({
                    type: FOUND,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    const setLoad = async value => {
        console.log(value);
        dispatch({
            type: SET_LOADING,
            payload: value
        })
    }
    
    
    return (
        <AssignContext.Provider
            value={{
                files:state.files,
                sols:state.sols,
                assignload:state.assignload,
                downloadfiles,
                getsolutions,
                setLoad
            }}>
            {props.children}
        </AssignContext.Provider>
    )

}
export default AssignState