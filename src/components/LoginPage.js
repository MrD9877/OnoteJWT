import React from 'react';
import logo from "../images/discord-round.avif"
import logo2 from "../images/github.svg"
import logo3 from "../images/google.png"
import Form from "./Form.js"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function LoginPage() {
    const [style, setStyle] = useState();
    const navigate = useNavigate()
    const redInputStyle = {
        background: 'rgba(225, 0, 0, 0.2)',
        border: '2px solid red',
        // color: 'red',
    }

    const popTost = (msg, success) => {
        let emote = "❌";
        if (success) emote = "✅"
        toast(`${msg}`,
            {
                icon: `${emote}`,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
    }

    const navigateTOlogin = (url, delay) => {
        setTimeout(() => {
            navigate(url)
        }, delay)
    }
    const onSubmit = async (data) => {
        try {
            const checkUser = await fetch(`https://onotesbackend-production.up.railway.app/login`, {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            console.log(checkUser)
            if (checkUser.status === 401) {
                popTost("Envalid Username or password", false)
                setStyle(redInputStyle)
                return
            }
            console.log(checkUser)
            if (checkUser.status === 200) {
                popTost('You are now loged in', true)
                navigateTOlogin("/auth/home", 1000)
            }
        } catch (err) {
            popTost('Sorry server is down', false)
        }
    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='flex align-middle h-screen'>
                <div className="m-auto  max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="/">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome to &lt;ONOTES/&gt;</h5>
                    </a>
                    <p className="font-normal text-gray-700 dark:text-gray-400">To start writiing your notes online please Login:</p>
                    <div>
                        <Form onSubmit={onSubmit} style={style} />
                    </div>
                    <div className='flex align-top justify-evenly'>
                        <a href="http://localhost:3000/discord/login" className="inline-flex items-center">
                            <img className='loginLogo' src={logo} alt="not found" />
                        </a>
                        <a href="http://localhost:3000" className="mx-2 inline-flex items-center ">
                            <img className='loginLogo' src={logo2} alt="not found" />
                        </a>
                        <a href="/google/auth" className="inline-flex items-center ">
                            <img className='loginLogo' src={logo3} alt="not found" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
