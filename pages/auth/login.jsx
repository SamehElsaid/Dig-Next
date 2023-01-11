import React, { memo, useEffect, useRef, useState } from 'react';
import { BsCheckAll } from "react-icons/bs"
import { BiLoaderAlt } from "react-icons/bi"
import axios from 'axios';
import Loading from '../../components/Loading/Loading'
import { apiPage } from '../../api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTICE_USER } from '../../Redux/authSlice/authSlice';
import Head from 'next/head';
const login = memo(() => {
    const [loadingInput, setLoadingInput] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [vaildEmail, setVaildEmail] = useState(false)
    const [vaildPassword, setVaildPassword] = useState(false)
    const inputEmail = useRef()
    const inputPassword = useRef()
    const user = useSelector((ele) => ele.auth);
    const router = useRouter()
    const dispatch = useDispatch()

    const sendData = (e) => {
        e.preventDefault()
        setLoadingInput(true)
        inputPassword.current.parentElement.querySelector(".isUsed").style.opacity = 0
        inputEmail.current.parentElement.querySelector(".isUsed").style.opacity = 0
        if (vaildEmail && vaildPassword) {
            axios.get(`${apiPage}user`).then(res => {
                let emailFind = res.data.find(e => e.email === email)
                if (emailFind.password === password) {
                    router.push("/")
                    setEmail("")
                    setPassword("")
                    dispatch(SET_ACTICE_USER(emailFind))
                    localStorage.setItem('isLogin', JSON.stringify(emailFind));
                } else {
                    setLoadingInput(false)
                    inputPassword.current.parentElement.querySelector(".isUsed").style.opacity = 1
                    setLoadingInput(false)
                }
            }).catch(err => {
                setLoadingInput(false)
                inputEmail.current.parentElement.querySelector(".isUsed").style.opacity = 1

            })
        } else {
            setLoadingInput(false)
        }
    }
    useEffect(() => {
        if (user.isLoggedin) {
            router.push("/")
        }
    }, [user.isLoggedin])
    return (
        <div>
            <Head>
                <title>Dig | Login</title>
            </Head>
            
            <div className="container  mx-auto h-full  ">
                <div className="flex  relative flex-col items-center justify-center  h-full py-10">
                    {loadingInput &&
                        <div className="absolute flex justify-center items-center inset-0 bg-white z-10">
                            <Loading />
                        </div>
                    }
                    <form className='flex  gap-5 text-sm flex-col  bg-white rounded-md w-[330px] border-[#ddd] border-b-0 rounded-b-none border px-4 py-5' onSubmit={sendData}>
                        <h2 className='text-xl'>Sign in</h2>
                        <div className="">
                            <h2 className='mb-1'>Your Email</h2>
                            <div className="relative">
                                <div className="check text-green-600 opacity-0 transition-opacity duration-700 text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                    <BsCheckAll />
                                </div>
                                <div className="most text-red-600 opacity-0 transition-opacity duration-700  text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                    <div className="animate-spin">
                                        <BiLoaderAlt />
                                    </div>
                                </div>
                                <div className="isUsed text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    cannot find an  email address
                                </div>
                                <input ref={inputEmail} className='border-[#a6a6a6] w-full rounded-sm px-3 py-1 border' type="text" placeholder='' value={email} onChange={(e) => {
                                    const reexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                    if (reexp.test(e.target.value)) {
                                        e.target.parentElement.querySelector(".check").style.opacity = 1
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".isUsed").style.opacity = 0
                                        setVaildEmail(true)
                                    }
                                    else if (e.target.value.length === 0) {
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".isUsed").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        setVaildEmail(false)
                                    }
                                    else {
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 1
                                        e.target.parentElement.querySelector(".isUsed").style.opacity = 0
                                        setVaildEmail(false)
                                    }
                                    setEmail(e.target.value.toLowerCase().trim())
                                }} />
                            </div>
                        </div>
                        <div className="">
                            <h2 className='mb-1'>Password</h2>
                            <div className="relative">
                                <div className="check text-green-600 opacity-0 transition-opacity duration-700 text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                    <BsCheckAll />
                                </div>
                                <div className="most text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    Not contains uppercase  And least 6 char
                                </div>
                                <div className="isUsed text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    The password not true
                                </div>
                                <input ref={inputPassword} className='border-[#a6a6a6] w-full rounded-sm px-3 py-1 border' type="password" placeholder='At least 6 characters' value={password} onChange={(e) => {
                                    const upper = /[A-Z]/
                                    if (upper.test(e.target.value) && e.target.value.length > 6) {
                                        e.target.parentElement.querySelector(".check").style.opacity = 1
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".isUsed").style.opacity = 0
                                        setVaildPassword(true)
                                    } else if (e.target.value.length === 0) {
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".isUsed").style.opacity = 0
                                        setVaildPassword(false)
                                    } else {
                                        e.target.parentElement.querySelector(".isUsed").style.opacity = 0
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 1
                                        setVaildPassword(false)
                                    }
                                    setPassword(e.target.value)
                                }} />
                            </div>
                        </div>

                        <button className='btn btn-info' type="submit">Continue</button>
                    </form>
                    <div className="w-[330px] bg-white rounded-lg px-3 rounded-t-none  py-5 text-sm border-[#ddd] border-t-0  border">
                        <Link href="/auth/register" className='btn btn-info text-center btn-white w-full ' type="submit">Create your Amazon </Link>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default login;