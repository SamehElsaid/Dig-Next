import axios from 'axios';
import Image from 'next/image';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiPage } from '../../api';
import { AiOutlineCamera } from "react-icons/ai"
import { BsCheckAll } from "react-icons/bs"
import { BiLoaderAlt } from "react-icons/bi"
import { REMOVE_ACTICE_USER, SET_ACTICE_USER } from '../../Redux/authSlice/authSlice';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../firebase/firebase';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Head from 'next/head';
const setting = memo(() => {
    const user = useSelector(res => res.auth)
    const passwordRef = useRef()
    const passwordRef2 = useRef()
    const changePasswordPop = useRef()
    const emailReg = useRef()
    const nameRefPop = useRef()
    const textControl = useRef()
    const nameEmailPop = useRef()
    const rePasswordInput = useRef()
    const showUpdateImg = useRef()
    const progRef = useRef()
    const [data, setData] = useState([])
    const [editName, setEditName] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [email, setEmail] = useState("")
    const [img, setImg] = useState("")
    const [vaildEmail, setVaildEmail] = useState(false)
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [checkPasswordEmail, setCheckPasswordEmail] = useState(false)
    const [checkPasswordEmail2, setCheckPasswordEmail2] = useState(false)
    const [name, setName] = useState(false)
    const [name2, setName2] = useState(false)
    const [vaildName, setVaildName] = useState(false)
    const [vaildPassword, setVaildPassword] = useState(false)
    const [vaildPassword2, setVaildPassword2] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordVaild, setNewPasswordVaild] = useState("")
    const [vaildRePassword, setVaildRePassword] = useState("")
    const [rePassword, setRepassword] = useState("")
    const [progressNum, SetProgressNum] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        function handleClickOutside(event) {
            if (nameRefPop.current && !nameRefPop.current.contains(event.target)) {
                setEditName(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [nameRefPop]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (nameEmailPop.current && !nameEmailPop.current.contains(event.target)) {
                setCheckPasswordEmail(false)
                setEditEmail(false)
                setPassword("")
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [nameEmailPop]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (changePasswordPop.current && !changePasswordPop.current.contains(event.target)) {
                setCheckPasswordEmail2(false)
                setEditPassword(false)
                setNewPasswordVaild(false)
                setVaildRePassword(false)
                setNewPassword("")
                setRepassword("")
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [changePasswordPop]);
    useEffect(() => {
        if (user.isLoggedin) {
            axios.get(`${apiPage}user/${user.id}`).then(res => {
                setData(res.data);
                setName(res.data.name)
                setName2(res.data.name)
                setEmail(res.data.email)
            }).catch(err => {
                setData(false)
            })
        }
    }, [user])
    const saveName = (e) => {
        e.preventDefault()
        if (vaildName) {
            if (user.isLoggedin) {
                axios.patch(`${apiPage}user/${user.id}`, {
                    name: name
                }).then(res => {
                    setEditName(false)
                    dispatch(SET_ACTICE_USER(res.data))
                }).catch(err => {
                })
            }
        }
    }
    const editEmailForm = (e) => {
        e.preventDefault()
        if (vaildEmail) {
            if (user.isLoggedin) {
                axios.get(`${apiPage}user`).then(res => {
                    let findEmail = res.data.find(e => e.email === email)
                    if (findEmail) {
                    } else {
                        if (vaildEmail) {
                            if (user.isLoggedin) {
                                axios.patch(`${apiPage}user/${user.id}`, {
                                    email,
                                    id: email
                                }).then(res => {
                                    setCheckPasswordEmail(false)
                                    dispatch(REMOVE_ACTICE_USER())
                                }).catch(err => {
                                })
                            }
                        }
                    }
                }).catch(err => {
                })
            }
        }
    }
    const checkPassword2 = () => {
        if (vaildPassword2) {
            if (user.isLoggedin) {
                axios.get(`${apiPage}user/${user.id}`).then(res => {
                    if (res.data.password === password2) {
                        setEditPassword(true)
                        setPassword2("")
                    } else {
                        passwordRef2.current.parentElement.querySelector(".isUsed").style.opacity = 1
                    }
                }).catch(err => {
                })
            }
        }
    }
    const checkPassword = () => {
        if (vaildPassword) {
            if (user.isLoggedin) {
                axios.get(`${apiPage}user/${user.id}`).then(res => {
                    if (res.data.password === password) {
                        setEditEmail(true)
                        document.querySelectorAll(".check ").forEach(ele => ele.style.opacity = 0)
                        emailReg.current.parentElement.querySelector(".check ").style.opacity = 0
                    } else {
                        passwordRef.current.parentElement.querySelector(".isUsed").style.opacity = 1
                    }
                }).catch(err => {
                })
            }
        }
    }
    const editPasswordSub = (e) => {
        e.preventDefault()
        if (newPassword == rePassword && vaildRePassword && newPasswordVaild) {
            axios.get(`${apiPage}user/${user.id}`).then(res => {
                if (res.data.password === newPassword) {
                } else {
                    axios.patch(`${apiPage}user/${user.id}`, {
                        password: newPassword
                    }).then(res => {
                        setCheckPasswordEmail2(false)
                        setEditPassword(false)
                        setNewPasswordVaild(false)
                        setVaildRePassword(false)
                        setNewPassword("")
                        setRepassword("")
                    })
                }
            })
        }
    }
    const handleUpdate = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0].name.split(".").at(-1) === "jpeg"
                || e.target.files[0].name.split(".").at(-1) === "png"
                || e.target.files[0].name.split(".").at(-1) === "jpg"
            ) {
                setImg(e.target.files[0]);
                textControl.current.style.display = "block"
                showUpdateImg.current.style.display = "block"
                if (textControl.current.classList.contains("notAllow")) {
                    textControl.current.classList.remove("notAllow")
                    textControl.current.classList.add("accepted")
                    showUpdateImg.current.style.display = "block"
                } else {
                    textControl.current.classList.add("accepted")
                    showUpdateImg.current.style.display = "block"
                }
                textControl.current.innerText = "Selected Image"
                showUpdateImg.current.style.display = "block"
            } else {
                setImg(false);
                textControl.current.style.display = "block"
                if (textControl.current.classList.contains("accepted")) {
                    textControl.current.classList.remove("accepted")
                    textControl.current.classList.add("notAllow")
                } else {
                    textControl.current.classList.add("notAllow")
                }
                textControl.current.innerText = "This File is not Allow"
            }
        }
    };
    const updateImg = () => {
        if (img) {
            const storageRef = ref(storage, `/img/${img.name}`);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    progRef.current.style.display = "block"
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    SetProgressNum(Math.round(progress))
                    if (progress === 100) {
                        setImg(false);
                    }
                },
                (err) => { },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            if (user.isLoggedin) {
                                axios.patch(`${apiPage}user/${user.id}`, {
                                    img: downloadURL
                                }).then(res => {
                                    dispatch(SET_ACTICE_USER(res.data))
                                    setImg(false);
                                    SetProgressNum(0)
                                    textControl.current.style.display = "none"
                                    showUpdateImg.current.style.display = "none"
                                    progRef.current.style.display = "none"
                                }).catch(err => {
                                })
                            }
                        })
                }
            );
        } else {
        }
    }
    return (
        <div className='flex py-5'>
            <Head>
                <title>Dig | </title>
            </Head>
            <div className="container flex || items-center || justify-center bg-white px-5 py-4">
                {user.isLoggedin ?
                    <div>
                        {data ?
                            <div className=' px-4'>
                                <Head>
                                    <title>Dig | {data.name}</title>
                                </Head>
                                <div className="bg-[#333]  || mx-auto || w-[200px] || border-4 || border-[#333] || h-[200px] || relative || rounded-full">
                                    {data.img &&
                                        <Image src={`${data.img}`} alt={data.name} className="w-full || h-full ||  rounded-full || object-cover" width={300} height={300} />
                                    }
                                    <div className="bg-[#333] || cursor-pointer || || absolute || bottom-0 || right-[20px] w-9 h-9 flex justify-center || rounded-full items-center text-white">
                                        <div className="text-2xl">
                                            <AiOutlineCamera />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5 flex-wrap || absolute || cursor-pointer || w-9 h-9 || bottom-0 || right-[20px] rounded-full">
                                        <input style={{ cursor: "pointer" }} name="file" className='text-[0px] w-full h-full rounded-full opacity-0 || cursor-pointer' required type="file" onChange={handleUpdate} accept="image/png, image/jpg, image/jpeg" />
                                    </div>
                                </div>
                                <div className="w-[350px]  lg:w-[500px] flex flex-col gap-5  mt-3">
                                    <div className="px-4">
                                        <div ref={progRef} style={{ display: "none" }} className="w-[100px] mx-auto h-[100px]">
                                            <CircularProgressbar
                                                className='sdas relative'

                                                value={progressNum} text={progressNum} circleRatio={0.7} styles={{
                                                    trail: {
                                                        strokeLinecap: "butt",
                                                        transform: "rotate(-126deg)",
                                                        transformOrigin: "center center"
                                                    },
                                                    path: {
                                                        strokeLinecap: "butt",
                                                        transform: "rotate(-126deg)",
                                                        transformOrigin: "center center",
                                                        stroke: "#0ea5ec"
                                                    }
                                                    , text: {
                                                        textAlign: "center",
                                                        fill: "#0ea5ec"
                                                    },

                                                }} strokeWidth={10} />
                                        </div>
                                        <div className="flex mt-2 text-center  justify-between w-[500px]">
                                            <span onClick={updateImg} style={{ display: "none" }} ref={showUpdateImg} className="  text-center cursor-pointer bottom-[-100%] w-fit  px-5 py-2 rounded-md text-white bg-sky-700 " >Update  Image</span>
                                            <span style={{ display: "none" }} className="accepted ml-auto  text-center cursor-pointer bottom-[-100%]  w-[200px]" ref={textControl}></span>
                                        </div>
                                    </div>
                                    <div onClick={() => setEditName(true)} className="hover:bg-[#333]/25 px-4 cursor-pointer group py-2">
                                        <div className="flex items-center justify-between">
                                            {editName ?
                                                <div ref={nameRefPop} className='w-full'>
                                                    <h2 className='mb-1'>Set New Name</h2>
                                                    <form onSubmit={saveName} action="">
                                                        <div className="flex gap-5 py-5 justify-between items-center">
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
                                                                <input value={name} className='border-[#a6a6a6] w-full outline-none rounded-sm px-3 py-1 border' type="text" placeholder='Frist Name and Last' onChange={(e) => {
                                                                    if (e.target.value.length > 20) {
                                                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                                                        e.target.parentElement.querySelector(".most").style.opacity = 1
                                                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                                                        setVaildName(false)
                                                                    }
                                                                    else if (e.target.value.length === 0) {
                                                                        setName(e.target.value);
                                                                        setVaildName(false)
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
                                                                        setVaildName(false)
                                                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                                                        e.target.parentElement.querySelector(".spcial").style.opacity = 1
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
                                                            <button type='submit' className='bg-sky-500 || text-sm || text-white px-3 py-2'>Save Change</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                :
                                                <>
                                                    <h2>Name:{data.name}</h2>
                                                    <button className='text-sky-500 text-sm border-blue-400  group-hover:border-b '>Edit</button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div ref={nameEmailPop} onClick={() => setCheckPasswordEmail(true)} className="hover:bg-[#333]/25 px-4 cursor-pointer group py-2">
                                        <div className="flex items-center justify-between">
                                            {checkPasswordEmail ?
                                                editEmail ? <div className='w-full'>
                                                    <h2 className='mb-1'>Set New Email</h2>
                                                    <form onSubmit={editEmailForm} action="">
                                                        <div className="flex gap-5 py-5 justify-between items-center">
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
                                                                <input ref={emailReg} className='border-[#a6a6a6] outline-none w-full rounded-sm px-3 py-1 border' type="text" placeholder='' value={email} onChange={(e) => {
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
                                                            <button type='submit' className='bg-sky-500 || text-sm || text-white px-3 py-2'>Save Change</button>
                                                        </div>
                                                    </form>
                                                </div> :
                                                    <div className='w-full'>
                                                        <h2 className='mb-1'>Enter Your password</h2>
                                                        <div className="flex gap-5 py-5 justify-between items-center">
                                                            <div className="relative">
                                                                <div className="check text-green-600 opacity-0 transition-opacity duration-700 text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                                                    <BsCheckAll />
                                                                </div>
                                                                <div className="most text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                                                    Not contains uppercase  least 6 char
                                                                </div>
                                                                <div className="isUsed text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                                                    The password not true
                                                                </div>
                                                                <input ref={passwordRef} className='border-[#a6a6a6] outline-0 w-full rounded-sm px-3 py-1 border' type="password" placeholder='At least 6 characters' value={password} onChange={(e) => {
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
                                                            <button onClick={checkPassword} className='bg-sky-500 || text-sm || text-white px-3 py-2'>Continue</button>
                                                        </div>
                                                    </div>
                                                :
                                                <>
                                                    <h2>Email:{data.email}</h2>
                                                    <button className='text-sky-500 text-sm border-blue-400  group-hover:border-b '>Edit</button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div ref={changePasswordPop} onClick={() => setCheckPasswordEmail2(true)} className="hover:bg-[#333]/25 px-4 cursor-pointer group py-2">
                                        <div className="flex items-center justify-between">
                                            {checkPasswordEmail2 ?
                                                editPassword ?
                                                    <form onSubmit={editPasswordSub} className="w-full" action="">
                                                        <div className="grid w-full gap-5 py-5">
                                                            <div className="">
                                                                <h2 className='mb-1'>Password</h2>
                                                                <div className="relative">
                                                                    <div className="check text-green-600 opacity-0 transition-opacity duration-700 text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                                                        <BsCheckAll />
                                                                    </div>
                                                                    <div className="most text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                                                        Not contains uppercase  And least 6 char
                                                                    </div>
                                                                    <input className='border-[#a6a6a6] w-full rounded-sm px-3 py-1 border' type="password" placeholder='At least 6 characters' value={newPassword} onChange={(e) => {
                                                                        const upper = /[A-Z]/
                                                                        if (upper.test(e.target.value) && e.target.value.length > 6) {
                                                                            e.target.parentElement.querySelector(".check").style.opacity = 1
                                                                            e.target.parentElement.querySelector(".most").style.opacity = 0
                                                                            setNewPasswordVaild(true)
                                                                        } else if (e.target.value.length === 0) {
                                                                            e.target.parentElement.querySelector(".check").style.opacity = 0
                                                                            e.target.parentElement.querySelector(".most").style.opacity = 0
                                                                            setNewPasswordVaild(false)
                                                                        } else {
                                                                            e.target.parentElement.querySelector(".check").style.opacity = 0
                                                                            e.target.parentElement.querySelector(".most").style.opacity = 1
                                                                            setNewPasswordVaild(false)
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
                                                                        setNewPassword(e.target.value)
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
                                                                        if (e.target.value === newPassword && newPassword !== "") {
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
                                                            <button type='submit' className='bg-sky-500 || text-sm || text-white px-3 py-2'>Save Change</button>
                                                        </div>
                                                    </form>
                                                    :
                                                    <div className='w-full'>
                                                        <h2 className='mb-1'>Enter Your password</h2>
                                                        <div className="flex gap-5 py-5 justify-between items-center">
                                                            <div className="relative">
                                                                <div className="check text-green-600 opacity-0 transition-opacity duration-700 text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                                                    <BsCheckAll />
                                                                </div>
                                                                <div className="most text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                                                    Not contains uppercase  least 6 char
                                                                </div>
                                                                <div className="isUsed text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                                                    The password not true
                                                                </div>
                                                                <input ref={passwordRef2} className='border-[#a6a6a6] outline-0 w-full rounded-sm px-3 py-1 border' type="password" placeholder='At least 6 characters' value={password2} onChange={(e) => {
                                                                    const upper = /[A-Z]/
                                                                    if (upper.test(e.target.value) && e.target.value.length > 6) {
                                                                        e.target.parentElement.querySelector(".check").style.opacity = 1
                                                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                                                        e.target.parentElement.querySelector(".isUsed").style.opacity = 0
                                                                        setVaildPassword2(true)
                                                                    } else if (e.target.value.length === 0) {
                                                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                                                        e.target.parentElement.querySelector(".isUsed").style.opacity = 0
                                                                        setVaildPassword2(false)
                                                                    } else {
                                                                        e.target.parentElement.querySelector(".isUsed").style.opacity = 0
                                                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                                                        e.target.parentElement.querySelector(".most").style.opacity = 1
                                                                        setVaildPassword2(false)
                                                                    }
                                                                    setPassword2(e.target.value)
                                                                }} />
                                                            </div>
                                                            <button onClick={checkPassword2} className='bg-sky-500 || text-sm || text-white px-3 py-2'>Continue</button>
                                                        </div>
                                                    </div>
                                                :
                                                <>
                                                    <h2>Change Password</h2>
                                                    <button className='text-sky-500 text-sm border-blue-400  group-hover:border-b '>Edit</button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <h2 className='min-h-[50vh] || flex || items-center || justify-center || text-3xl'>No user Found</h2>}
                    </div> :
                    <h2 className='min-h-[50vh] || flex || items-center || justify-center || text-3xl'>No user Found</h2>}
            </div>
        </div>
    );
});

export default setting;