import React, { memo, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { apiPage } from '../../api';
import { BsCheckAll } from "react-icons/bs"
import { BiLoaderAlt } from "react-icons/bi"
import Loading from '../../components/Loading/Loading'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Head from 'next/head';
const register = memo(() => {
    const [loadingInput, setLoadingInput] = useState(false)
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRepassword] = useState("")
    const rePasswordInput = useRef()
    const inputEmail = useRef()
    const [vaildName, setVaildName] = useState(false)
    const [vaildEmail, setVaildEmail] = useState(false)
    const [vaildPassword, setVaildPassword] = useState(false)
    const [vaildRePassword, setVaildRePassword] = useState(false)
    const user = useSelector((ele) => ele.auth);

    const sendData = (e) => {
        e.preventDefault()
        setLoadingInput(true)
        if (vaildName && vaildEmail && vaildPassword && vaildRePassword) {
            axios.get(`${apiPage}user`).then(res => {
                const emailPersonal = res.data.find(e => e.id === email && e.email === email)
                if (!emailPersonal) {
                    axios.post(`${apiPage}user`, {
                        email,
                        password,
                        name,
                        id: email,
                        cart: { num: 0 },
                        fav: { num: 0 },
                        img: "https://firebasestorage.googleapis.com/v0/b/protofolio-64812.appspot.com/o/New%20Project%20(2).png?alt=media&token=81b54aaf-6768-4cd9-ac63-52b6733a533b"
                    }).then(
                        res => {
                            router.push("/auth/login")
                            setLoadingInput(false)
                            setName("")
                            setEmail("")
                            setPassword("")
                            setRepassword("")
                            setVaildEmail(false)
                        }
                    )
                } else {
                    inputEmail.current.focus()
                    inputEmail.current.parentElement.querySelector(".isUsed").style.opacity = 1
                    inputEmail.current.parentElement.querySelector(".check").style.opacity = 0
                    setLoadingInput(false)
                }
            })
        } else {
            setLoadingInput(false)
        }
    }
    useEffect(() => {
        if (user.isLoggedin) {
            router.push("/")
        }
    }, [user])
    return (
        <>
            <Head>
                <title>Dig | register</title>
            </Head>
            <div className="container mx-auto h-full ">
                <div className="flex  flex-col items-center justify-center h-full py-10">
                    <form className='flex relative gap-5 bg-white text-sm flex-col rounded-md w-[330px] border-[#ddd] border px-4 py-5' onSubmit={sendData}>
                        {loadingInput &&
                            <div className="absolute flex justify-center items-center inset-0 bg-white z-10">
                                <Loading />
                            </div>
                        }
                        <h2 className='text-xl'>Create account</h2>
                        <div className="">
                            <h2 className='mb-1'>Your name</h2>
                            <div className="relative">
                                <div className="check text-green-600 opacity-0 transition-opacity duration-700 text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                    <BsCheckAll />
                                </div>
                                <div className="most text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    At most 20 characters
                                </div>
                                <div className="least text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    At Least 5 characters
                                </div>
                                <div className="spcial text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    At name have Special Character
                                </div>
                                <input value={name} className='border-[#a6a6a6] w-full rounded-sm px-3 py-1 border' type="text" placeholder='Frist Name and Last' onChange={(e) => {
                                    if (e.target.value.length > 20) {
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 1
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                        setVaildName(false)
                                    }
                                    else if (e.target.value.length === 0) {
                                        setVaildName(false)
                                        setName(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                    }
                                    else if (e.target.value.length < 5) {
                                        setName(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 1
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                        setVaildName(false)
                                    }
                                    else if (/[!@#$%^&*]/g.test(e.target.value)) {
                                        setName(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 1
                                        setVaildName(false)
                                    }
                                    else {
                                        setName(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 1
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                        setVaildName(true)
                                    }
                                }} />
                            </div>
                        </div>
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
                                    Email is already register
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
                                <input className='border-[#a6a6a6] w-full rounded-sm px-3 py-1 border' type="password" placeholder='At least 6 characters' value={password} onChange={(e) => {
                                    const upper = /[A-Z]/
                                    if (upper.test(e.target.value) && e.target.value.length > 6) {
                                        e.target.parentElement.querySelector(".check").style.opacity = 1
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        setVaildPassword(true)
                                    } else if (e.target.value.length === 0) {
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        setVaildPassword(false)
                                    } else {
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 1
                                        setVaildPassword(false)
                                    }
                                    if (rePassword !== "") {
                                        if (rePassword !== e.target.value) {
                                            rePasswordInput.current.parentElement.querySelector(".check").style.opacity = 0
                                            rePasswordInput.current.parentElement.querySelector(".most").style.opacity = 1
                                            setVaildRePassword(false)
                                        }
                                        else {
                                            rePasswordInput.current.parentElement.querySelector(".check").style.opacity = 1
                                            rePasswordInput.current.parentElement.querySelector(".most").style.opacity = 0
                                            setVaildRePassword(true)
                                        }
                                    }
                                    setPassword(e.target.value)
                                }} />
                            </div>
                        </div>
                        <div className="">
                            <h2 className='mb-1'>Re-enter Password</h2>
                            <div className="relative">
                                <div className="check text-green-600 opacity-0 transition-opacity duration-700 text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                    <BsCheckAll />
                                </div>
                                <div className="most text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    Passwords must match
                                </div>
                                <input ref={rePasswordInput} className='border-[#a6a6a6] w-full rounded-sm px-3 py-1 border' type="password" placeholder='' value={rePassword} onChange={(e) => {
                                    if (e.target.value === password && password !== "") {
                                        e.target.parentElement.querySelector(".check").style.opacity = 1
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        setVaildRePassword(true)
                                    } else if (e.target.value.length === 0) {
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        setVaildRePassword(false)

                                    } else {
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 1
                                        setVaildRePassword(false)
                                    }
                                    setRepassword(e.target.value)
                                }} />
                            </div>
                        </div>
                        <button className='btn btn-info' type="submit">Create</button>
                    </form>
                    <div className="w-[330px]   py-5 text-sm">
                        <Link href="/auth/login" className='btn btn-info text-center btn-white w-full ' type="submit">Already have an account? Sign in</Link>
                    </div>
                </div>
            </div>
        </>
    );
});

export default register;