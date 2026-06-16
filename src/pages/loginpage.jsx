import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../services/authService'

const userState = {
    phno: "",
    password: ""
}

const Loginpage = () => {
    const navigate = useNavigate()
    const [userDetails, setUserDetail] = useState(userState)


    useEffect(()=>{
        const token=localStorage.getItem('userToken')
        if(token){
            navigate('/chat')
        }
    })

    const handleLoginButton = async (e) => {
        e.preventDefault()
        if (!userDetails.phno) {
            return toast.error("Enter Phone Number")
        }
        if (!userDetails.password) {
            return toast.error("Enter password")
        }
        try {
            const response = await login(userDetails)
            console.log(response.data.token);

            if (response?.data?.token) {
                localStorage.setItem('userToken', response.data.token)
                toast.success(response.message)
                navigate('/chat')
                setUserDetail({
                    phno: "",
                    password: ""
                })
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed"
            );

            console.log(error);
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md p-8 rounded-2xl border border-blue-500/50 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.6)]">

                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    Login
                </h1>

                <form className="space-y-5" onSubmit={handleLoginButton}>

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={userDetails.phno}
                        className="w-full px-4 py-3 bg-transparent border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                        onChange={(e) => {
                            setUserDetail({
                                ...userDetails,
                                phno: e.target.value
                            })
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={userDetails.password}
                        className="w-full px-4 py-3 bg-transparent border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                        onChange={(e) => {
                            setUserDetail({
                                ...userDetails,
                                password: e.target.value
                            })
                        }}
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition duration-300 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                    >
                        Login
                    </button>
                    <p className="text-center text-gray-400 text-sm">
                        New user?
                        <Link
                            to="/signup"
                            className="text-blue-400 ml-1 hover:text-blue-300"
                        >
                            Register
                        </Link>
                    </p>
                </form>

            </div>
        </div>
    )
}

export default Loginpage
