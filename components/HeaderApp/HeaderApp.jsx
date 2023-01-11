import React, { memo, useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoMdArrowDropdown, IoIosGitCompare } from "react-icons/io"
import { CiHeart, CiUser } from "react-icons/ci"
import { BiCategory } from "react-icons/bi"
import { BsCart2, BsSearch } from "react-icons/bs"
import { RiArrowDropDownFill, RiMenu4Fill } from "react-icons/ri"
import { IoIosClose } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import Link from 'next/link';
import { REMOVE_ACTICE_USER, SET_ACTICE_USER } from '../../Redux/authSlice/authSlice';
import axios from 'axios';
import { apiPage } from '../../api';
import { SET_NUM_CARD } from '../../Redux/cartSlice/cartSlice';
import Search from '../Search/Search';
import { useRouter } from 'next/router';
import { SET_FAVOURITE } from "../../Redux/cartSlice/cartSlice";

const style = {
    header: `bg-mainColor || hidden || lg:flex  || h-8 || items-center || border-b || border-gray-600 || capitalize`,
    navTop: `container || flex  || justify-between || items-center || text-gray-300 || text-sm`,
    arrowControl: "flex || gap-2 || items-center",
    navBottom: `container || gap-4 || py-5 || text-white || flex || justify-between || items-center`,
    cart: `flex || items-center || gap-3 || cursor-pointer || group || hover:text-[#febd69] || transition-colors  || duration-500`,
    spanCart: `font-thin || text-sm leading-relaxed`,
    action: ` absolute ||  z-20  || duration-500 || transition-colors  || action-hov || left-0 || right-0 || cursor-pointer || grid || bg-mainColor || top-full`,
    actionLink: `flex hover:bg-[#232f3e] || px-3 || py-1 || transition-colors || duration-500`,
    shopCateory: `flex || relative || items-center || gap-3 || cursor-pointer || relative || w-fit || select-none  || py-3`
}
const HeaderApp = memo(() => {
   
    // useEffect(()=>{
    //     axios.get("https://geolocation-db.com/jsonp/67273a00-5c4b-11ed-9204-d161c2da74ce")
    //     .then(res=>setIPv4(JSON.parse(res.data.split("(")[1].split(")")[0]).IPv4))
    // },[])
    const favData = useSelector((eles) => eles.cart.favProducts);
    const user = useSelector((ele) => ele.auth);
    const [openAction, setOpenAction] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [num, setNum] = useState(0)
    // const [IPv4, setIPv4] = useState(null)
    const fixedNav = useRef()
    const navBottom = useRef()
    const refAction = useRef()
    const refMenu = useRef()
    const refSearch = useRef()
    const refSearchParent = useRef()
    const dispatch = useDispatch()
    const router = useRouter()
    const numSlice = useSelector(ele => ele.cart.num)
    const priceSlice = useSelector(ele => ele.cart.price)
    const [openUser, setOpenUser] = useState(false)
    
    useEffect(() => {
        if (localStorage.getItem('isLogin')) {
            dispatch(SET_ACTICE_USER(JSON.parse(localStorage.getItem('isLogin'))))
        } else {
        }
    }, [])
    useEffect(() => {
        if (user.isLoggedin) {
            axios.get(`${apiPage}favourite`).then((res) => {
                const fav = res.data.find((e) => e.id === user.id);
                if (fav) {
                    dispatch(SET_FAVOURITE(fav.products));
                }
            });
        }
    }, [favData.length, user.isLoggedin,num]);

    useEffect(() => {
        if (user.isLoggedin) {
            axios.get(`${apiPage}cart`).then(res => {
                const emailPersonal = res.data.find(e => e.id === user.id)
                if (emailPersonal) {
                    let num = 0
                    let price = 0
                    emailPersonal.products.forEach(ele => {
                        num += ele.num
                        price += ele.price * ele.num
                    })
                    dispatch(SET_NUM_CARD({ num, price }))
                } else {
                    dispatch(SET_NUM_CARD({ num: 0, price: 0 }))
                }
            })
        }
    }, [user.isLoggedin, numSlice,num])
    const logOut = () => {
        dispatch(REMOVE_ACTICE_USER())
        localStorage.removeItem('isLogin');
        setNum(num+1)
        dispatch(SET_FAVOURITE(false));
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (refAction.current && !refAction.current.contains(event.target)) {
                setOpenAction(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refAction]);
    useEffect(()=>{
        if(fixedNav.current){
            if(window.scrollY > 200){
                fixedNav.current.classList.add("scrollActive")
                navBottom.current.classList.add("opacity-0")
            }else{
                fixedNav.current.classList.remove("scrollActive")
                navBottom.current.classList.remove("opacity-0")
            }
        }
        window.addEventListener("scroll",()=>{
            if(fixedNav.current){
                if(window.scrollY > 200){
                    fixedNav.current.classList.add("scrollActive")
                    navBottom.current.classList.add("opacity-0")
                }else{
                    fixedNav.current.classList.remove("scrollActive")
                    navBottom.current.classList.remove("opacity-0")
                }
            }
        })
    },[fixedNav])
    useEffect(() => {
        function handleClickOutside(event) {
            if (refMenu.current && !refMenu.current.contains(event.target)) {
                setOpenMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refMenu]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (refSearch.current && !refSearch.current.contains(event.target) && refSearchParent.current && !refSearchParent.current.contains(event.target)) {
                setOpenSearch(false)

            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refSearch]);
    useEffect(() => {
        setOpenMenu(false)
    }, [router.pathname]);
    return (
        <>
            <header className={style.header} >
                <div className={style.navTop}>
                    <h2>Free shopping over $100 & free returns</h2>
                    <ul className='flex || items-center || gap-3'>
                        <li className='pr-3 || border-r || border-gray-600'>Hotline : (02) 01558290662</li>
                        <li className={style.arrowControl}><span>En</span><span><IoIosArrowDown /></span></li>
                        <li className={style.arrowControl}><span>Usd $</span><span><IoIosArrowDown /></span></li>
                    </ul>
                </div>
            </header>
            <div className="bg-mainColor hidden lg:block">
                <div ref={navBottom} className={style.navBottom}>
                    <h2 className='text-3xl ||  font-medium || w-[10%]'><Link href="/">Digitic.</Link></h2>
                    <div className="|| w-[45%] || rounded-md ">
                        <Search />
                    </div>
                    <div className="flex items-center || gap-4 || w-fit || capitalize">
                        <h2 className={style.cart}>
                            <Link href={"/favourite"}>
                                <h2 className={style.cart}>
                                    <span className='text-4xl'>
                                        <CiHeart />
                                    </span>
                                    <span className={style.spanCart}>
                                        Favourite <br /> wishlist
                                    </span>
                                </h2>
                            </Link>
                        </h2>
                        <Link href="/cart">
                            <h2 className={style.cart}>
                                <span className='text-4xl text-[#febd69]'>
                                    <BsCart2 />
                                </span>
                                <span className={style.spanCart}>
                                    <span className='px-3 || bg-[#febd69] || group-hover:text-[#333] || transition-colors || duration-300 || rounded-full'>
                                        {user.isLoggedin ? numSlice ? numSlice : "0" : "0"}
                                    </span>
                                    <span className='block'>{user.isLoggedin ? priceSlice ? `$${priceSlice}` : "$0.00" : "$0.00"}</span>
                                </span>
                            </h2>
                        </Link>
                        {user.isLoggedin ?
                            <span className={style.spanCart} onClick={() => { setOpenUser(!openUser) }} >
                                <div className="w-11 relative h-11 rounded-full cursor-pointer">
                                    {openUser &&
                                        <div
                                            className={`${openUser ? ` group-hover:opacity-100 || group-hover:visible ` : ` opacity-0 || invisible`}
                                    absolute transition-opacity duration-1000 || rounded-lg top-[130%] z-[999] px-3 py-2 || right-0 w-[200px] bg-[#0b1218]`}>
                                            <h2 className='flex items-center gap-3 px-2 py-2  hover:bg-[#060b10] duration-700 rounded-lg'>
                                                <div className="w-8 h-8">
                                                    <img src={user.img} className="w-full  object-cover rounded-full h-full" alt={user.name} />
                                                </div>
                                                {user.useName}
                                            </h2>
                                            <Link href={`/setting/${user.id}`} >
                                                <h2 className=' px-2 py-2  hover:bg-[#060b10] duration-700 rounded-lg'>Settings</h2>
                                            </Link>
                                            {user.control && user.control === "admin" &&
                                                <Link href={`/dashbord`} >
                                                    <h2 className=' px-2 py-2  hover:bg-[#060b10] duration-700 rounded-lg'>Dashbord</h2>
                                                </Link>
                                            }
                                            <h2 onClick={logOut} className=' px-2 py-2  hover:bg-[#060b10] duration-700 rounded-lg'>Log out</h2>
                                        </div>}
                                    <div className="absolute text-3xl right-0 w-3 h-3 rounded-full flex items-center justify-center top-[90%] bg-white text-black">
                                        <div className=" text-2xl">
                                            <RiArrowDropDownFill />
                                        </div>
                                    </div>
                                    <img src={user.img} className="w-full object-cover rounded-full h-full" alt={user.name} />
                                </div>
                            </span>
                            :
                            <Link href={"/auth/login"}>
                                <h2 className={style.cart}>
                                    <span className='text-4xl'>
                                        <CiUser />
                                    </span>
                                    <span className={style.spanCart}>
                                        Login <br /> MyAccount
                                    </span>
                                </h2>
                            </Link>
                        }
                    </div>
                </div>
            </div>
            <div className="bg-[#232f3e] relative z-50" ref={fixedNav}>
                <div className="container || spaceBettwen || z-50 || relative || text-white || justify-between || lg:justify-start || flex || items-center || gap-7 ">
                    <div ref={refAction} className={style.shopCateory} onClick={() => { setOpenAction(!openAction) }}>
                        <span className='text-2xl'>
                            <BiCategory />
                        </span>
                        <span className='flex || items-end || gap-8 '>
                            <span>
                                Shop Category
                            </span>
                            <span><IoMdArrowDropdown /></span>
                            <span className={`${openAction ? ` group-hover:opacity-100 || group-hover:visible ` : ` opacity-0 || invisible`} ${style.action}`}>
                                <div className="">
                                    <span>
                                        <Link className={style.actionLink} href="/">Action</Link>
                                    </span>
                                    <span>
                                        <Link className={style.actionLink} href="/">Anothor action</Link>
                                    </span>
                                    <span>
                                        <Link className={style.actionLink} href="/">Some else here</Link>
                                    </span>
                                </div>
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center py-3 gap-2 lg:hidden ">
                        <span className=''>
                            <div ref={refSearchParent} className="text-3xl cursor-pointer" onClick={() => setOpenSearch(!openSearch)}>
                                <BsSearch />
                            </div>
                        </span>
                        {user.isLoggedin ?
                            <span className={style.spanCart} onClick={() => { setOpenUser(!openUser) }} >
                                <div className="w-11 relative h-11 rounded-full cursor-pointer">
                                    {openUser &&
                                        <div
                                            className={`${openUser ? ` group-hover:opacity-100 || group-hover:visible ` : ` opacity-0 || invisible`}
                                    absolute transition-opacity duration-1000 rounded-lg top-[130%] z-40 px-3 py-2 right-0 w-[200px] bg-[#0b1218]`}>
                                            <h2 className='flex items-center gap-3 px-2 py-2  hover:bg-[#060b10] duration-700 rounded-lg'>
                                                <div className="w-8 h-8">
                                                    <img src={user.img} className="w-full   rounded-full h-full" alt={user.name} />
                                                </div>
                                                {user.useName}
                                            </h2>
                                            <h2 className=' px-2 py-2  hover:bg-[#060b10] duration-700 rounded-lg'>Settings</h2>
                                            {user.control && user.control === "admin" &&
                                                <Link href={`/dashbord`} >
                                                    <h2 className=' px-2 py-2  hover:bg-[#060b10] duration-700 rounded-lg'>Dashbord</h2>
                                                </Link>
                                            }
                                            <h2 onClick={logOut} className=' px-2 py-2  hover:bg-[#060b10] duration-700 rounded-lg'>Log out</h2>
                                        </div>}
                                    <div className="absolute text-3xl right-0 w-3 h-3 rounded-full flex items-center justify-center top-[90%] bg-white text-black">
                                        <div className=" text-2xl">
                                            <RiArrowDropDownFill />
                                        </div>
                                    </div>
                                    <img src={user.img} className="w-full   rounded-full h-full" alt={user.name} />
                                </div>
                            </span>
                            :
                            <Link href={"/auth/login"}>
                                <h2 className={style.cart}>
                                    <span className='text-4xl'>
                                        <CiUser />
                                    </span>
                                </h2>
                            </Link>
                        }
                        <div className="text-4xl relative">
                            <div className="cursor-pointer" onClick={() => setOpenMenu(true)}>
                                <RiMenu4Fill />
                            </div>
                            <div ref={refMenu} className={`${openMenu ? "translate-x-[0]" : "translate-x-[100%]"} fixed || gap-3 || flex-col min-h-screen || flex || items-center || justify-center z-50 bg-black/90 top-0 right-0 w-full md:w-[50%] duration-1000`}>
                                <div onClick={() => setOpenMenu(false)} className="absolute cursor-pointer top-[20px] text-5xl right-[30px]">
                                    <IoIosClose />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <Link href="/cart" className='relative  flex items-end'>
                                            <h2 className={style.cart}>
                                                <span className='text-4xl hover:text-[#febd69] || duration-500 text-white'>
                                                    <BsCart2 />
                                                </span>
                                                <span className={style.spanCart}>
                                                    <span className='px-3 || text-xl || absolute || top-[-10px] || -translate-y-1/2 || left-[40%] || -translate-x-1/2 || text-white || transition-colors || duration-300 || rounded-full'>
                                                        {user.isLoggedin ? numSlice ? numSlice : "0" : "0"}
                                                    </span>
                                                </span>
                                            </h2>
                                        </Link>
                                        <Link href="/cart" className='relative  flex items-end'>
                                            <h2 className={style.cart}>
                                                <span className='text-4xl'>
                                                    <CiHeart />
                                                </span>
                                            </h2>
                                        </Link>
                                    </div>
                                    <div className="flex || gap-3 || flex-col || text-xl ">
                                        <div className="hover:text-[#febd69] || duration-500">
                                            <Link href="/">Home</Link>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden items-center py-3 gap-2 menuActive  ">
                        <span className=''>
                            <div ref={refSearchParent} className="text-3xl cursor-pointer" onClick={() => setOpenSearch(!openSearch)}>
                                <BsSearch />
                            </div>
                        </span>
                        {user.isLoggedin ?
                            <span className={style.spanCart} onClick={() => { setOpenUser(!openUser) }} >
                                <div className="w-11 relative h-11 rounded-full cursor-pointer">
                                    {openUser &&
                                        <div
                                            className={`${openUser ? ` group-hover:opacity-100 || group-hover:visible ` : ` opacity-0 || invisible`}
                                    absolute transition-opacity duration-1000 rounded-lg top-[130%] z-40 px-3 py-2 right-0 w-[200px] bg-[#0b1218]`}>
                                            <h2 className='flex items-center gap-3 px-2 py-2  hover:bg-[#060b10] duration-700 rounded-lg'>
                                                <div className="w-8 h-8">
                                                    <img src={user.img} className="w-full   rounded-full h-full" alt={user.name} />
                                                </div>
                                                {user.useName}
                                            </h2>
                                            <h2 className=' px-2 py-2  hover:bg-[#060b10] duration-700 rounded-lg'>Settings</h2>
                                            {user.control && user.control === "admin" &&
                                                <Link href={`/dashbord`} >
                                                    <h2 className=' px-2 py-2  hover:bg-[#060b10] duration-700 rounded-lg'>Dashbord</h2>
                                                </Link>
                                            }
                                            <h2 onClick={logOut} className=' px-2 py-2  hover:bg-[#060b10] duration-700 rounded-lg'>Log out</h2>
                                        </div>}
                                    <div className="absolute text-3xl right-0 w-3 h-3 rounded-full flex items-center justify-center top-[90%] bg-white text-black">
                                        <div className=" text-2xl">
                                            <RiArrowDropDownFill />
                                        </div>
                                    </div>
                                    <img src={user.img} className="w-full   rounded-full h-full" alt={user.name} />
                                </div>
                            </span>
                            :
                            <Link href={"/auth/login"}>
                                <h2 className={style.cart}>
                                    <span className='text-4xl'>
                                        <CiUser />
                                    </span>
                                </h2>
                            </Link>
                        }
                        <div className="text-4xl relative">
                            <div className="cursor-pointer" onClick={() => setOpenMenu(true)}>
                                <RiMenu4Fill />
                            </div>
                            <div ref={refMenu} className={`${openMenu ? "translate-x-[0]" : "translate-x-[100%]"} fixed || gap-3 || flex-col min-h-screen || flex || items-center || justify-center z-50 bg-black/90 top-0 right-0 w-full md:w-[50%] duration-1000`}>
                                <div onClick={() => setOpenMenu(false)} className="absolute cursor-pointer top-[20px] text-5xl right-[30px]">
                                    <IoIosClose />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <Link href="/cart" className='relative  flex items-end'>
                                            <h2 className={style.cart}>
                                                <span className='text-4xl hover:text-[#febd69] || duration-500 text-white'>
                                                    <BsCart2 />
                                                </span>
                                                <span className={style.spanCart}>
                                                    <span className='px-3 || text-xl || absolute || top-[-10px] || -translate-y-1/2 || left-[40%] || -translate-x-1/2 || text-white || transition-colors || duration-300 || rounded-full'>
                                                        {user.isLoggedin ? numSlice ? numSlice : "0" : "0"}
                                                    </span>
                                                </span>
                                            </h2>
                                        </Link>
                                        <Link href="/cart" className='relative  flex items-end'>
                                            <h2 className={style.cart}>
                                                <span className='text-4xl'>
                                                    <CiHeart />
                                                </span>
                                            </h2>
                                        </Link>
                                    </div>
                                    <div className="flex  || gap-3 || flex-col || text-xl ">
                                        <div className="hover:text-[#febd69] || duration-500">
                                            <Link href="/">Home</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:flex || gap-3 || linkAcrive || hidden ">
                        <Link href="/">Home</Link>
                    </div>
                </div>
            </div>
            <div ref={refSearch} className={`${openSearch ? `top-[60px]  opacity-100 ` : `top-[0] opacity-0`} absolute || text-white || z-20 right-0 || duration-700 || block || lg:hidden  left-0 w-full bg-black/80 p-4`}>
                <Search />
            </div>
        </>
    );
});

export default HeaderApp;