import axios from 'axios';
import React, { useRef, useState } from 'react';
import { AiOutlineCamera } from "react-icons/ai"
import { BiLoaderAlt } from "react-icons/bi"
import { BsCheckAll } from "react-icons/bs"
import { apiPage } from '../../api';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../firebase/firebase';
const AddProduct = ({ category, num, setNum }) => {
    const [img, setImg] = useState(false)
    const [title, setTitle] = useState("")
    const [vaildTitle, SetVaildTitle] = useState(false)
    const [brand, setBrand] = useState("")
    const [vaildBrand, SetVaildBrand] = useState(false)
    const [price, setPrice] = useState("")
    const [vaildPrice, SetVaildPrice] = useState(false)
    const [stock, setStock] = useState("")
    const [vaildStock, SetVaildStock] = useState(false)
    const [description, setDescription] = useState("")
    const [vaildDescription, SetVaildDescription] = useState(false)
    const [logind, setLoging] = useState(false)
    const showUpdateImg = useRef()
    const textControl = useRef()
    const handleUpdate = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0].name.split(".").at(-1) === "jpeg"
                || e.target.files[0].name.split(".").at(-1) === "png"
                || e.target.files[0].name.split(".").at(-1) === "jpg"
            ) {
                setImg(e.target.files[0]);
                textControl.current.style.display = "block"
                if (textControl.current.classList.contains("notAllow")) {
                    textControl.current.classList.remove("notAllow")
                    textControl.current.classList.add("accepted")
                } else {
                    textControl.current.classList.add("accepted")
                }
                textControl.current.innerText = "Selected Image"
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

    const addProduct = (e) => {
        e.preventDefault()
        if (vaildTitle && img && vaildPrice && vaildStock && vaildBrand && vaildDescription) {
            if (img) {
                const storageRef = ref(storage, `/img/${img.name}`);
                const uploadTask = uploadBytesResumable(storageRef, img);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setLoging(true)

                    },
                    (err) => { },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                axios.get(`${apiPage}sameh`).then(res => {
                                    const cate = res.data.find(e => e.id === +category)
                                    axios.post(`${apiPage}allProducts`, {
                                        title,
                                        description,
                                        price,
                                        rating: 5,
                                        stock,
                                        brand,
                                        category: cate.cateogr,
                                        images: downloadURL
                                    }).then(
                                        res => {
                                            setNum(+num + 1)
                                            setTitle("")
                                            setBrand("")
                                            setDescription("")
                                            setPrice("")
                                            setStock("")
                                            setImg(false)
                                            SetVaildTitle(false)
                                            SetVaildBrand(false)
                                            SetVaildDescription(false)
                                            SetVaildPrice(false)
                                            SetVaildStock(false)
                                            textControl.current.style.display = "none"
                                            document.querySelectorAll(".check").forEach(ele => {
                                                ele.style.display = "none"
                                            })
                                            setLoging(false)
                                        }
                                    )
                                })
                            })
                    }
                );
            } else {
            }

        }
    }
    return (
        <div>
            <h2 className='text-center || text-3xl 
            || text-sky-600 || select-none |
            | cursor-pointer'>Add Product</h2>
            <form action="" onSubmit={addProduct} className='px-10'>
                <div className="relative || flex 
                || items-center || justify-center || mt-4">
                    <div className="flex || items-center 
                    || group || relative 
                    || gap-5 flex-wrap 
                    || overflow-hidden || h-[100px] 
                    || w-[100px] || cursor-pointer 
                    || rounded-full">
                        <div className="absolute || flex 
                        || group-hover:bg-sky-300 || duration-500 
                        || items-center || justify-center 
                        || rounded-3xl || bg-sky-600 w-full  h-full">
                            <div className="text-3xl text-white">
                                <AiOutlineCamera />
                            </div>
                        </div>
                        <input name="file" className='w-full 
                        || opacity-0 ||  relative 
                        || rounded-3xl || text-[0px] 
                        || h-full || cursor-pointer ' required type="file" onChange={handleUpdate}
                            accept="image/png, image/jpg, image/jpeg" />
                    </div>
                </div>
                <div className="grid justify-center">
                    {img &&
                        <h2 className='mt-5 '><span className='text-sky-500 '>Img: </span><span className='text-sm '>{img.name}</span></h2>
                    }
                    <span style={{ display: "none", paddingLeft: 0 }} className="accepted  text-center  pl-0 cursor-pointer  " ref={textControl}></span>

                </div>
                <div className="relative mt-7">
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
                    <input required value={title} className='border-[#a6a6a6] w-full rounded-sm px-3 py-1 border' type="text" placeholder='Add Title' onChange={(e) => {
                        if (e.target.value.length > 20) {
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
                        }
                    }} />
                </div>
                <div className="relative mt-7">
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
                        else if (/[!@#$%^&*]/g.test(e.target.value)) {
                            setBrand(e.target.value);
                            e.target.parentElement.querySelector(".check").style.opacity = 0
                            e.target.parentElement.querySelector(".most").style.opacity = 0
                            e.target.parentElement.querySelector(".least").style.opacity = 0
                            e.target.parentElement.querySelector(".spcial").style.opacity = 1
                            SetVaildBrand(false)
                        }
                        else {
                            setBrand(e.target.value);
                            e.target.parentElement.querySelector(".check").style.opacity = 1
                            e.target.parentElement.querySelector(".most").style.opacity = 0
                            e.target.parentElement.querySelector(".least").style.opacity = 0
                            e.target.parentElement.querySelector(".spcial").style.opacity = 0
                            SetVaildBrand(true)
                        }
                    }} />
                </div>
                <div className="relative mt-7">
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
                            }
                        }} />
                </div>
                <div className="relative mt-7">
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
                            }
                        }} />
                </div>
                <div className="relative mt-7">
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
                        }
                    }} ></textarea>
                </div>
                <div className="mt-7">
                    <button type="submit" className='bg-sky-500 text-white px-4 py-2'>
                        {logind ?
                            <div className="relative">
                                <div className="opacity-0">Add Product</div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                                    <div className="animate-spin">
                                        <BiLoaderAlt />
                                    </div>
                                </div>
                            </div>
                            : <div className="relative">
                                Add Product
                            </div>
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;