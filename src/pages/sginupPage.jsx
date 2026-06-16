import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signup } from '../services/authService'


const formstate = {
    name: "",
    email: "",
    phno: "",
    password: ""
}


const SginupPage = () => {
    const [userDetails, setUserDetails] = useState(formstate)
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        if (!userDetails.name) {
            return toast.error("Enter Name")
        }
        if (!userDetails.email) {
            return toast.error("Enter Email")
        }
        if (!userDetails.phno) {
            return toast.error("Enter Phone Number")
        }
        if (!userDetails.password) {
            return toast.error("Enter password")
        }
        console.log(userDetails);
        try {
            const data = await signup(userDetails)
            toast.success(data.message)
            setUserDetails({
                name: "",
                email: "",
                phno: "",
                password: ""
            })
            navigate('/')
        } catch (error) {
            toast.error(error.response?.data?.message);
        }


    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md p-8 rounded-2xl border border-blue-500/50 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.6)]">

                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    Create Account
                </h1>

                <form className="space-y-5" onSubmit={handleSignup}>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={userDetails.name}
                        className="w-full px-4 py-3 bg-transparent border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                        onChange={(e) => {
                            setUserDetails({
                                ...userDetails,
                                name: e.target.value
                            })
                        }}
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={userDetails.email}
                        className="w-full px-4 py-3 bg-transparent border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                        onChange={(e) => {
                            setUserDetails({
                                ...userDetails,
                                email: e.target.value
                            })
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={userDetails.phno}
                        className="w-full px-4 py-3 bg-transparent border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                        onChange={(e) => {
                            setUserDetails({
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
                            setUserDetails({
                                ...userDetails,
                                password: e.target.value
                            })
                        }} />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-gray-400 text-sm">
                        Already have an account?
                        <Link
                            to="/"
                            className="text-blue-400 ml-1 hover:text-blue-300"
                        >
                            Login
                        </Link>
                    </p>

                </form>

            </div>
        </div>
    )
}

export default SginupPage
