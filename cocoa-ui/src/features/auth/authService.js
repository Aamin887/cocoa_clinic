import axios from 'axios';

const URL_API = 'http://localhost:3001/api'

// register user
const register = async function(formData){
    const res = await axios.post(URL_API + '/register', formData);
    if(res.data){
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

// login user
const login = async function(formData){ 
    const res = await axios.post(URL_API, formData);
    if(res.data){
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

// admin login
const adminLogin = async function(formData){ 
    const res = await axios.post(URL_API + '/admin', formData);
    if(res.data){
        localStorage.setItem('admin', JSON.stringify(res.data))
    }
    return res.data
}

// user logout
const logout = function(){
    localStorage.removeItem('user')
}

// admin logout
const adminLogout = function(){
    localStorage.removeItem('admin')
}

// get user info
const getUser = async function(token){
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL_API + '/info', config)
    return res.data
}

// get all users
const allUsers = async function(token){
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL_API + '/users', config)
    return res.data
}




const authService = {
    register,
    login,
    adminLogin,
    adminLogout,
    logout,
    getUser,
    allUsers
}

export default authService