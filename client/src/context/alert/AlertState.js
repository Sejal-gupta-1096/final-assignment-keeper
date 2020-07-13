import React, { useReducer } from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const alertState = () => {
    const initialState = [];
    const [state, dispatch] = useReducer(alertReducer, initialState)


    const setAlert = () => {
        dispatch({
            type: SET_ALERT,
            payload: { msg, type }
        })
        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT
            })

        }, 5000);
    }


    return (
        <alertContext.Provider
            value={{
                alerts: state,
                setAlert
            }}>
            {props.children}
        </alertContext.Provider>
    )
}