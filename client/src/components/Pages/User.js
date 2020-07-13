import React, { useContext, useEffect, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext'
import AssignContext from '../../context/assignments/AssignContext'
import SideBar from '../Sidebar/Sidebar'

function User() {
    const authContext = useContext(AuthContext)
    const { user, loadUser } = authContext
    const assignContext = useContext(AssignContext)
    const { files, downloadfiles } = assignContext
    useEffect(() => {
        loadUser()
    })
    let name = '';
    let contactno = ''
    let email = ''
    let locs = []
    if (user) {
        name = user.name
        contactno = user.phone
        email = user.email
        downloadfiles(contactno)
    }
    if (files) {
        files.map((file) => {
            let temp = "/api/Specific/" + file.file
            locs.push(temp)
        })
    }

    return (
        <>
            <SideBar />
        </>
    )
}

export default User;