import axios from 'axios';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useRef, useState } from 'react';
import { apiPage } from '../api';
import { BsCheckAll } from "react-icons/bs"
import AddProduct from '../components/AddProduct/AddProduct';
import ProductDashbord from '../components/ProductDashbord/ProductDashbord';
import { useSelector } from 'react-redux';
import Head from 'next/head';
const dashbord = memo(() => {
    const user = useSelector(ele => ele.auth)
    const [data, setData] = useState([])
    const [vaildName, setVaildName] = useState([])
    const [name, setName] = useState([])
    const [users, setUsers] = useState([])
    const router = useRouter()
    const [num, setNum] = useState(1)
    const [prodct, setProdct] = useState([])
    const [cat, setCat] = useState("")
    const [menu, setMenu] = useState(false)
    const overY = useRef()
    const overInput = useRef()
    useEffect(() => {
        axios.get(`${apiPage}sameh`).then(res => {
            setData(res.data);
        })
    }, [num])

    const addSection = (e) => {
        e.preventDefault()
        axios.get(`${apiPage}sameh`).then(res => {
            const find = res.data.find(ele => ele.cateogr.toLocaleLowerCase().trim() === name.toLocaleLowerCase().trim())
            if (find) {
                // السكشن موجود بالفعل 
            } else {
                axios.post(`${apiPage}sameh`, {
                    cateogr: name,
                    postId: name
                }).then(res => {
                    setNum(num + 1)
                })
            }
        })
    }
    useEffect(() => {
        if (router.query.addnew && router.query.addnew !== "user") {
            axios.get(`${apiPage}sameh/${router.query.addnew}`).then(res => {
                axios.get(`${apiPage}allProducts`).then(resp => {
                    const filter = resp.data.filter(e => e.category.toLocaleLowerCase().trim() === res.data.cateogr.toLocaleLowerCase().trim())
                    setProdct(filter);
                    setCat(res.data.cateogr.substring(0, 1).toUpperCase() + res.data.cateogr.substring(1));
                    setMenu(false)
                })
            })
        } else if (router.query.addnew === "user") {
            axios.get(`${apiPage}user`).then(res => {
                setUsers(res.data)
            })
        }
    }, [router.query.addnew, num])
    useEffect(() => {
        let heightDiv = 0
        if (overY.current) {
            overY.current.querySelectorAll("h2").forEach(e => {
                heightDiv += e.offsetHeight
            })
            if (heightDiv > 300) {
                overY.current.style.overflowY = "scroll"
            } else {
                overY.current.style.overflowY = "auto"
            }
        }
    }, [data.length])
    useEffect(() => {
        function handleClickOutside(event) {
            if (overInput.current && !overInput.current.contains(event.target)) {
                setMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [overInput]);
    const addAdmin = (e)=>{
        console.log(e.id);
        axios.patch(`${apiPage}user/${e.id}`,{
            control : "admin"
        }).then(res=>setNum(num +1))
    }   
    const removeAdmin = (e)=>{
        console.log(e.id);
        axios.patch(`${apiPage}user/${e.id}`,{
            control : ""
        }).then(res=>setNum(num +1))
    }   
    const removeUser = (e)=>{
        console.log(e.id);
        axios.delete(`${apiPage}user/${e.id}`).then(res=>setNum(num +1))
    }   
     return (
        <div className='flex || py-5'>
            <Head>
                {router.query.addnew ? <title>Dig | {cat}</title>
                    :
                    <title>Dig | Add Section</title>
                }
            </Head>
            {user.control && user.control === "admin" ?
                <div className="container  || gap-10  || min-h-[70vh] || bg-white px-5 py-4">
                    <ul ref={overInput} className=' relative justify-center mb-10 '>
                        <div className="flex justify-center">
                            {data && data.length > 0 && <li className={`${!router.query.addnew && router.query.addnew !== "user" && `bg-gray-500/30`} select-none cursor-pointer px-5 hover:bg-gray-500/30 duration-300 py-3`} onClick={() => {
                                setMenu(false)
                                router.push(`/dashbord`)
                            }}>Add Section</li>}
                            {data && data.length > 0 && <li className={`${router.query.addnew === "user" && `bg-gray-500/30`} select-none cursor-pointer px-5 hover:bg-gray-500/30 duration-300 py-3`} onClick={() => {
                                setMenu(false)
                                router.push(`/dashbord/?addnew=user`)
                            }}>Users</li>}
                            {data && data.length > 0 && <li className={`${router.query.addnew && router.query.addnew !== "user" && `bg-gray-500/30`} select-none cursor-pointer px-5 hover:bg-gray-500/30 duration-300 py-3`} onClick={() => { setMenu(!menu) }}>{router.query.addnew && router.query.addnew !== "user" ? `${cat}` : "All Sections"}</li>}
                        </div>
                        <div ref={overY} className={`${menu ? `opacity-100 visible` : `opacity-0 invisible`} absolute  || z-[99999]  || rounded-lg || scrollStyle || max-h-[300px] ||  || px-3 || py-4  || bg-black/80 text-white w-full`}>
                            {data && data.length > 0 && data.map(sec =>
                                <li key={sec.id} className={`${+router.query.addnew === sec.id && `bg-gray-500/30`} cursor-pointer select-none px-5 hover:bg-gray-500/30 duration-300 py-3`} onClick={() => { router.push(`/dashbord/?addnew=${sec.id}`) }}>{sec.cateogr}</li>
                            )}
                        </div>
                    </ul>
                    {router.query.addnew
                        && router.query.addnew !== "user"
                        ? prodct && prodct.length > 0 ?
                            <div className='flex flex-wrap gap-y-10 gap-x-[10%] '>
                                {prodct.map(pro =>
                                    <ProductDashbord setNum={setNum} num={num} key={pro.id} pro={pro} />)
                                }
                                <div className="md:w-[45%] w-[100%] ">
                                    <AddProduct setNum={setNum} num={num} category={router.query.addnew} />
                                </div>
                            </div>
                            : <div className="md:w-[45%] w-[100%] ">
                                <AddProduct setNum={setNum} num={num} category={router.query.addnew} />
                            </div>
                        :
                        <div className=''>
                            {router.query.addnew !== "user" ? <form action="" onSubmit={addSection} className='flex gap-4 py-5 justify-center items-center flex-col'>
                                <div className="py-2">
                                    <h2 className='mb-1'>New Section</h2>
                                    <div className="relative">
                                        <div className="check text-green-600 opacity-0 transition-opacity duration-700 text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                            <BsCheckAll />
                                        </div>
                                        <div className="most text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                            At most 20 characters
                                        </div>
                                        <div className="least text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                            At Least 3 characters
                                        </div>
                                        <div className="spcial text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                            At name have Special Character
                                        </div>
                                        <input value={name} className='border-[#a6a6a6] w-full rounded-sm px-3 py-1 border' type="text" placeholder='Add New Section' onChange={(e) => {
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
                                            else if (e.target.value.length < 3) {
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
                                <button className='bg-sky-500 text-white px-5 py-2' type='submit'>Add</button>
                            </form> :
                                <div className="flex justify-center items-center">
                                    <Head>
                                            <title>Dig | User</title>
                                    </Head>
                                    <div className="w-[400px] ">
                                        {users && users.length > 0 && users.map(use =>
                                            <div className="flex flex-wrap bg-sky-500 text-white mb-5 px-5 py-5 justify-between items-center">
                                                <div className="w-full">
                                                    <h2><span>Name : </span>{use.name}</h2>
                                                    <h2 className='mt-3'><span>Email : </span>{use.email}</h2>
                                                </div>
                                                <div className="flex w-full mt-4 justify-between gap-3">
                                                    {use.control && use.control==="admin" ? <button onClick={()=>{removeAdmin(use)}}  className='bg-white hover:bg-gray-800/80 duration-500 text-red-500 px-5 py-2'>Remove Admin</button>:
                                                    <button onClick={()=>{addAdmin(use)}} className='bg-white hover:bg-gray-800/80 duration-500 text-sky-500 px-5 py-2'>Set Admin</button> }
                                                    <button  onClick={()=>{removeUser(use)}}  className='bg-white text-rose-400 hover:bg-red-900/80 duration-500 px-5 py-2'>Block User</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div> :
                <h2 className='w-full'>
                    <div className="container bg-white min-h-[50vh] flex items-center justify-center text-3xl">
                        You do not have permission to enter
                    </div>
                </h2>}
        </div>
    );
});

export default dashbord;