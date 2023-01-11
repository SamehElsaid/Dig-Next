import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosClose } from "react-icons/io"
import { BsCheckAll } from "react-icons/bs"
import axios from 'axios';
import { apiPage } from '../../api';

const ProductDashbord = ({ pro, setNum, num }) => {
    const [editTitle, setEditTitle] = useState(false)
    const [editBrand, setEditBrand] = useState(false)
    const [editPrice, setEditPrice] = useState(false)
    const [editStock, setEditStock] = useState(false)
    const [editDescription, setEditDescription] = useState(false)
    const [vaildTitle, SetVaildTitle] = useState(true)
    const [vaildBrand, SetVaildBrand] = useState(true)
    const [vaildPrice, SetVaildPrice] = useState(true)
    const [vaildStock, SetVaildStock] = useState(true)
    const [vaildDescription, SetVaildDescription] = useState(true)
    const [title, setTitle] = useState("")
    const [brand, setBrand] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [description, setDescription] = useState("")
    const [edit, setEdit] = useState(false)
    const productRef = useRef()
    useEffect(() => {
        setTitle(pro.title)
        setBrand(pro.brand)
        setPrice(pro.price)
        setStock(pro.stock)
        setDescription(pro.description)
    }, [])
    const editPro = (e) => {
        e.preventDefault()
        if (edit && vaildTitle && vaildBrand && vaildPrice && vaildStock && vaildDescription) {
            axios.patch(`${apiPage}allProducts/${pro.id}`, {
                title,
                brand,
                price,
                stock,
                description
            }).then(res => {
                setNum(num + 1)
                setEditTitle(false)
                setEditBrand(false)
                setEditPrice(false)
                setEditStock(false)
                setEditDescription(false)
                setEdit(false)
            })
        }
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (productRef.current && !productRef.current.contains(event.target)) {
                setEditTitle(false)
                setEditBrand(false)
                setEditPrice(false)
                setEditStock(false)
                setEditDescription(false)
                setEdit(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [productRef]);
    const removeItems = (e) => {
        axios.delete(`${apiPage}allProducts/${e.id}`).then(res => {
            setNum(num + 1)
        })
    }
    return (
        <div ref={productRef} className='md:w-[45%] w-[100%] px-5 py-5 relative border border-gray-500/30'>
            <div onClick={() => { removeItems(pro) }} className="text-5xl duration-500 absolute top-[0] right-[0] cursor-pointer hover:text-sky-500">
                <IoIosClose />
            </div>
            <div className="w-[100%]  h-[400px]">
                <Image src={pro.images} alt={pro.title} className='w-full h-full object-contain' width={300} height={0} />
            </div>
            <form onSubmit={editPro} action="">
                <div className="">
                    {editTitle ?
                        <div className=" mt-7 border-b py-5 border-gray-500/30">
                            <h2 className='mb-3'><span className='text-sky-500 '>Title:</span>
                            </h2>
                            <div className="relative">
                                <div className="check text-green-600 opacity-0 transition-opacity duration-700 text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                    <BsCheckAll />
                                </div>
                                <div className="most text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    At most 30 characters
                                </div>
                                <div className="least text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    At Least 3 characters
                                </div>
                                <div className="spcial text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    At name have Special Character
                                </div>
                                <input required value={title} className='border-[#a6a6a6] w-full rounded-sm px-3 py-1 border' type="text" placeholder='Add Title' onChange={(e) => {
                                    if (e.target.value.length > 30) {
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 1
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                        SetVaildTitle(false)
                                    }
                                    else if (e.target.value.length === 0) {
                                        SetVaildTitle(false)
                                        setTitle(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                    }
                                    else if (e.target.value.length < 3) {
                                        setTitle(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 1
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                        SetVaildTitle(false)
                                    }
                                    else if (/[!@#$%^&*]/g.test(e.target.value)) {
                                        setTitle(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 1
                                        SetVaildTitle(false)
                                    }
                                    else {
                                        setTitle(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 1
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                        SetVaildTitle(true)
                                        setEdit(true)
                                    }
                                }} />
                            </div>
                        </div> :
                        <h2 className=' flex justify-between min-h-[120px] mt-5 border-b border-gray-500/30 py-3 gap-3'>
                            <div className="grid">
                                <span className='text-sky-500 '>Title:</span>
                                <span className='text-sm font-light '>{pro.title}</span>
                            </div>
                            <div onClick={() => {
                                setEditTitle(true)
                            }} className="self-end text-sky-500 text-sm select-none duration-500 cursor-pointer hover:text-blue-900">
                                Edit
                            </div>
                        </h2>
                    }
                </div>
                <div className="">
                    {editBrand ?
                        <div className=" mt-7 border-b py-5 border-gray-500/30">
                            <h2 className='mb-3'><span className='text-sky-500 '>Brand:</span>
                            </h2>
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
                                <input required value={brand} className='border-[#a6a6a6] w-full rounded-sm px-3 py-1 border' type="text" placeholder='Add Brand' onChange={(e) => {
                                    if (e.target.value.length > 20) {
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 1
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                        SetVaildBrand(false)
                                    }
                                    else if (e.target.value.length === 0) {
                                        SetVaildBrand(false)
                                        setBrand(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                    }
                                    else if (e.target.value.length < 3) {
                                        setBrand(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 1
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                        SetVaildBrand(false)
                                    }
                                    else {
                                        setBrand(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 1
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                        SetVaildBrand(true)
                                        setEdit(true)
                                    }
                                }} />
                            </div>
                        </div> :
                        <h2 className=' flex justify-between min-h-[120px] mt-5 border-b border-gray-500/30 py-3 gap-3'>
                            <div className="grid">
                                <span className='text-sky-500 '>Brand:</span> <span className='text-sm font-light'>{pro.brand}</span>
                            </div>
                            <div onClick={() => {
                                setEditBrand(true)
                            }} className="self-end text-sky-500 text-sm select-none duration-500 cursor-pointer hover:text-blue-900">
                                Edit
                            </div>
                        </h2>
                    }
                </div>
                <div className="">
                    {editPrice ?
                        <div className=" mt-7  border-b py-5 border-gray-500/30">
                            <h2 className='mb-3'><span className='text-sky-500 '>Price:</span>
                            </h2>
                            <div className="relative">
                                <div className="check text-green-600 opacity-0 transition-opacity duration-700 text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                    <BsCheckAll />
                                </div>
                                <div className="most text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    Price Is less Than 0
                                </div>
                                <input value={price} required
                                    className='border-[#a6a6a6] w-full rounded-sm appearance-none m-0 px-3 py-1 border'
                                    type="number" placeholder='Add Price' onChange={(e) => {
                                        setPrice(e.target.value)
                                        if (e.target.value <= 0 && e.target.value.length !== 0) {
                                            e.target.parentElement.querySelector(".check").style.opacity = 0
                                            e.target.parentElement.querySelector(".most").style.opacity = 1
                                            SetVaildPrice(false)
                                        }
                                        else if (e.target.value.length === 0) {
                                            e.target.parentElement.querySelector(".check").style.opacity = 0
                                            e.target.parentElement.querySelector(".most").style.opacity = 0
                                            SetVaildPrice(false)
                                        }
                                        else {
                                            e.target.parentElement.querySelector(".check").style.opacity = 1
                                            e.target.parentElement.querySelector(".most").style.opacity = 0
                                            SetVaildPrice(true)
                                            setEdit(true)
                                        }
                                    }} />
                            </div>
                        </div> :
                        <h2 className=' flex justify-between min-h-[120px] mt-5 border-b border-gray-500/30 py-3 gap-3'>
                            <div className="grid">
                                <span className='text-sky-500 '>Price:</span> <span className='text-sm font-light'>${pro.price}</span>
                            </div>
                            <div onClick={() => {
                                setEditPrice(true)
                            }} className="self-end text-sky-500 text-sm select-none duration-500 cursor-pointer hover:text-blue-900">
                                Edit
                            </div>
                        </h2>
                    }
                </div>
                <div className="">
                    {editStock ?
                        <div className=" mt-7 border-b py-5 border-gray-500/30">
                            <h2 className='mb-3'><span className='text-sky-500 '>In Stock:</span>
                            </h2>
                            <div className="relative">
                                <div className="check text-green-600 opacity-0 transition-opacity duration-700 text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                    <BsCheckAll />
                                </div>
                                <div className="most text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    Price Is less Than 0
                                </div>
                                <input value={stock} required
                                    className='border-[#a6a6a6] w-full rounded-sm appearance-none m-0 px-3 py-1 border'
                                    type="number" placeholder='Add Stock' onChange={(e) => {
                                        setStock(e.target.value)
                                        if (e.target.value <= 0 && e.target.value.length !== 0) {
                                            e.target.parentElement.querySelector(".check").style.opacity = 0
                                            e.target.parentElement.querySelector(".most").style.opacity = 1
                                            SetVaildStock(false)
                                        }
                                        else if (e.target.value.length === 0) {
                                            e.target.parentElement.querySelector(".check").style.opacity = 0
                                            e.target.parentElement.querySelector(".most").style.opacity = 0
                                            SetVaildStock(false)
                                        }
                                        else {
                                            e.target.parentElement.querySelector(".check").style.opacity = 1
                                            e.target.parentElement.querySelector(".most").style.opacity = 0
                                            SetVaildStock(true)
                                            setEdit(true)
                                        }
                                    }} />
                            </div>
                        </div> :
                        <h2 className=' flex justify-between min-h-[120px] mt-5 border-b border-gray-500/30 py-3 gap-3'>
                            <div className="grid">
                                <span className='text-sky-500 '>In Stock:</span> <span className='text-sm font-light'>{pro.stock}</span>
                            </div>
                            <div onClick={() => {
                                setEditStock(true)
                            }} className="self-end text-sky-500 text-sm select-none duration-500 cursor-pointer hover:text-blue-900">
                                Edit
                            </div>
                        </h2>
                    }
                </div>
                <div className="">
                    {editDescription ?
                        <div className=" mt-7  py-5 border-gray-500/30">
                            <h2 className='mb-3'><span className='text-sky-500 '>Description:</span>
                            </h2>
                            <div className="relative">
                                <div className="check text-green-600 opacity-0 transition-opacity duration-700 text-xl absolute right-[10px] top-1/2 -translate-y-1/2">
                                    <BsCheckAll />
                                </div>
                                <div className="most text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    At most 400 characters
                                </div>
                                <div className="least text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    At Least 3 characters
                                </div>
                                <div className="spcial text-red-600 opacity-0 transition-opacity duration-700 text-sm absolute right-[10px] top-[100%]">
                                    At name have Special Character
                                </div>
                                <textarea required rows={10} value={description} className='border-[#a6a6a6] w-full rounded-sm px-3 py-1 border' type="text" placeholder='Add Description' onChange={(e) => {
                                    if (e.target.value.length > 400) {
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 1
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                        SetVaildDescription(false)
                                    }
                                    else if (e.target.value.length === 0) {
                                        SetVaildDescription(false)
                                        setDescription(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                    }
                                    else if (e.target.value.length < 3) {
                                        setDescription(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 1
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                        SetVaildDescription(false)
                                    }
                                    else if (/[!@#$%^&*]/g.test(e.target.value)) {
                                        setTitle(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 0
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 1
                                        SetVaildDescription(false)
                                    }
                                    else {
                                        setDescription(e.target.value);
                                        e.target.parentElement.querySelector(".check").style.opacity = 1
                                        e.target.parentElement.querySelector(".most").style.opacity = 0
                                        e.target.parentElement.querySelector(".least").style.opacity = 0
                                        e.target.parentElement.querySelector(".spcial").style.opacity = 0
                                        SetVaildDescription(true)
                                        setEdit(true)
                                    }
                                }} ></textarea>
                            </div>
                        </div> :
                        <h2 className=' flex justify-between min-h-[120px] mt-5  py-3 gap-3'>
                            <div className="grid">
                                <span className='text-sky-500 '>Description:</span> <span className='text-sm font-light'>{pro.description}</span>
                            </div>
                            <div onClick={() => {
                                setEditDescription(true)
                            }} className="self-end text-sky-500 text-sm select-none duration-500 cursor-pointer hover:text-blue-900">
                                Edit
                            </div>
                        </h2>
                    }
                </div>


                {edit && <><button className='bg-sky-500 text-white px-4 py-2 hover:bg-blue-900 duration-500' type="submit">Save Edit</button></>}
            </form>
        </div>
    );
};

export default ProductDashbord;