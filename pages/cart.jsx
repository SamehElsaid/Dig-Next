import Image from 'next/image';
import React, { memo, useEffect, useState } from 'react';
import { Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { apiPage } from "../api";
import AddtoCart from "../components/AddToCart/AddtoCart"
import { SET_NUM_CARD } from '../Redux/cartSlice/cartSlice';
import SectionProducts from '../components/SectionProducts/SectionProducts';
import { useSound } from "use-sound"
import Link from 'next/link';
import Loading from '../components/Loading/Loading';
import AddToFavourite from '../components/AddToFavourite/AddToFavourite';
import Head from 'next/head';
const Cart = memo(() => {
    const [playClick] = useSound("/audio/click.mp3")
    const user = useSelector(ele => ele.auth.id)
    const num = useSelector(ele => ele.cart.num)
    const price = useSelector(ele => ele.cart.price)
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [allData, setAllData] = useState([])
    const [reData, setReData] = useState(0)
    const [category, setCategory] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        if (user) {
            console.log(user);
            axios.get(`${apiPage}cart/${user}`).then(res => {
                setProducts(res.data.products)
                const category = []
                res.data.products.forEach(ele => {
                    if (!category.includes(ele.category)) {
                        category.push(ele.category)
                    }
                })
                setCategory(category.slice(0, 3));
            }).catch(err=> setProducts([]))
        }
    }, [num])
    useEffect(() => {
        axios.get(`${apiPage}allProducts`).then(res => {
            const n = 4
            const shuffledArray = res.data.sort(() => 0.5 - Math.random());
            const result = shuffledArray.slice(0, n);
            setAllProducts(result)
            setAllData(res.data)
        })
    }, [reData])
    const delet = (e) => {
        playClick()
        axios.get(`${apiPage}cart/${user}`).then(res => {
            const deletProduct = res.data.products.filter(product => product.id !== e.id)
            axios.patch(`${apiPage}cart/${user}`, {
                products: [...deletProduct]
            }).then(res => {
                dispatch(SET_NUM_CARD({ num: num - e.num, price: price - e.price * e.num }))
            })
        })
    }
    const decrease = (e) => {
        playClick()
        axios.get(`${apiPage}cart/${user}`).then(res => {
            const deletProduct = res.data.products.find(product => product.id === e.id)
            deletProduct.num -= 1
            axios.patch(`${apiPage}cart/${user}`, {
                products: [...res.data.products]
            }).then(res => {
                dispatch(SET_NUM_CARD({ num: num - 1, price: price - e.price }))
            })
        })
    }
    return (
        <div className=''>
            <Head>
                <title>Dig | Cart</title>
            </Head>
            <div className="flex || flex-wrap || xl:flex-nowrap || relative container py-5 gap-5">
                <div className="w-[100%] xl:w-[80%] bg-white || p-4">
                    <div className="flex || border-[#ddd] || pb-2 border-b || || justify-between || items-end">
                        <p className='text-xl'>Shopping Cart</p>
                        <p className='text-sm'>Price</p>
                    </div>
                    <div className="sticky || top-0">
                        {user ? products ? products.length > 0 &&
                            products.map(product =>
                                <div key={product.id} className="w-full">
                                    <div className="py-5 || justify-center || xl:justify-start  || flex-wrap  || xl:flex-nowrap || gap-4 || flex || items-center || border-[#ddd] || border-b ">
                                        <Link href={`/product/${product.id}`}>
                                            <div className="w-[250px] flex h-[275px]">
                                                <Image src={product.images} width="400" height={0} className="w-full || object-contain || h-full" alt="" />
                                            </div>
                                        </Link>
                                        <div className="w-[60%] xl:w-[auto]">
                                            <h2 className='overLap'>{product.title}</h2>
                                            <h2 className='my-2'>{product.brand}</h2>
                                            <h2 className='text-green-600'>In Stock <span className='text-black'>{product.stock}</span></h2>
                                            <h2 className='text-sm'>Price : ${product.price}</h2>
                                            <div className="ml-auto || block  || xl:hidden || self-start">
                                                <h2>Total Price:${Math.round(product.price * product.num)}</h2>
                                            </div>
                                            <h2 className='my-2'>
                                                <Rate
                                                    allowHalf
                                                    disabled
                                                    value={+product.rating}
                                                    style={{ color: "coral" }}
                                                />
                                                <span className='pl-3 text-[coral]'>({product.rating})</span>
                                            </h2>
                                            <div className="">
                                                <div className="flex ">
                                                    <AddtoCart product={product}>
                                                        <button onClick={playClick} className='bg-sky-500 text-white px-4 py-1'>+</button>
                                                    </AddtoCart>
                                                    <span className=' w-[50px] flex items-center justify-center'>{product.num}</span>
                                                    {product.num > 1 &&
                                                        <button onClick={() => decrease(product)} className='bg-pink-700 text-white px-4 py-1'>-</button>
                                                    }
                                                    <button onClick={() => delet(product)} className=' border-[#ddd] || pl-4 || ml-4 || text-sm || text-sky-700 || border-l'>Delete</button>
                                                </div>
                                                <AddToFavourite product={product}>
                                                    <button  className='bg-rose-500 || mt-4  text-white px-4 py-1'>Add To Favourite</button>
                                                </AddToFavourite>
                                            </div>
                                        </div>
                                        <div className="ml-auto || hidden || lg:block || self-start">
                                            <h2>${Math.round(product.price * product.num)}</h2>
                                        </div>
                                    </div>
                                </div>
                            )
                            : <Loading />
                            : <div className='flex justify-center pt-14'>
                                <h2 className='text-4xl'>You Must Loging To can Add to Card</h2>
                            </div>}
                    </div>
                </div>
                <div className="w-[100%] xl:w-[20%]">
                    <div className="sticky || top-0 ">
                        <div className="bg-white || text-center || lg:text-start || p-4">
                            <h2>Subtotal ( {num ? num : "0"} <span className='text-green-600'>items </span> ) : ${price ? price : "0"}</h2>
                            <div className="bg-[#ffd814] || cursor-pointer border-[#FCD200] || shadow-lg || border || mt-2 || text-sm || text-center || py-1 || rounded-lg">
                                <h2>Checkout</h2>
                            </div>
                        </div>
                        <div className=" bg-white || flex || flex-col || items-center  || p-4 || mt-4">
                            <h2>Your recently viewed items</h2>
                            <div className="w-[90%] lg:w-[100%]">
                                {allProducts && allProducts.length > 0 &&
                                    allProducts.map(product => (
                                        <div key={product.id} className="flex || w-full || gap-2 || my-3">
                                            <Link href={`/product/${product.id}`} className="w-[30%] lg:w-[100px] h-[200px] lg:h-[100px]">
                                                <Image src={product.images} width="300" height={300} className="w-full || object-contain || h-full" alt="" />
                                            </Link>
                                            <div className="flex w-[70%] lg:w-[60%] flex-col justify-between">
                                                <h2 className='text-sm overLap'>{product.title}</h2>
                                                <h2 className='text-sm recently'>
                                                    <Rate
                                                        allowHalf
                                                        disabled
                                                        value={+product.rating}
                                                        style={{ color: "coral", fontSize: "12px" }}
                                                    />
                                                    <span className='pl-3 text-[coral]'>({+product.rating})</span>
                                                </h2>
                                                <h2 className='text-red-500 text-sm'>${+product.price}</h2>
                                                <AddtoCart product={product}>
                                                    <h2 onClick={() => {
                                                        playClick()
                                                        setReData(reData + 1)
                                                    }} className='bg-[#ffd814] || cursor-pointer border-[#FCD200] || shadow-lg || border || text-[10px] || text-center || py-1 || rounded-lg'>Add to Card</h2>
                                                </AddtoCart>
                                            </div>
                                        </div>)
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container ">
                {category.length > 0 &&
                    <h2 className='text-2xl bg-white pt-5 px-5'>Products related to items in your cart</h2>
                }
                <div className=" flex  flex-col gap-5 pb-5">
                    {category && category.length > 0 &&
                        category.map(ele =>
                            <SectionProducts key={ele.length} allData={allData} cateogry={ele} />
                        )
                    }
                </div>
            </div>
        </div>
    );
});

export default Cart;