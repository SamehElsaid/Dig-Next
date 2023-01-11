import Image from 'next/image';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
import 'swiper/swiper.min.css';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Keyboard, Scrollbar, Navigation } from 'swiper/core';
import { useDispatch, useSelector } from "react-redux"
import { BsFillCartFill } from "react-icons/bs"
import AddtoCart from '../AddToCart/AddtoCart';
import Link from 'next/link';
import Loading from '../Loading/Loading';
import FavouriteSection from '../FavouriteSection/FavouriteSection';
import axios from 'axios';
SwiperCore.use([Navigation, Keyboard, Scrollbar])
function SectionProducts({ cateogry, allData }) {
    const [data, setData] = useState(false)
    const user = useSelector(ele => ele.auth)
    useEffect(() => {
        if (allData) {
            setData(allData.filter(ele => ele.category === cateogry));
        }
    }, [allData, user.isLoggedin])
    return (
        <>
            {data ? data.length >  0 && <div className="container mt-0 bg-white py-3 px-2 productsSwiper">
                <h2 className='text-3xl p-3'>{cateogry}</h2>
                <Swiper
                    className={`${Math.random()}`}
                    spaceBetween={50}
                    slidesPerView={4}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                    }}
                    nested={true}
                    keyboard={{
                        enabled: true,
                        onlyInViewport: true,
                        pageUpDown: true,
                    }}
                    navigation scrollbar={true}
                >
                    {data.map(ele =>
                        <SwiperSlide className='flex select-none py-10 flex-col justify-center  items-center' key={ele.id}>
                            <div className="w-[250px] relative  h-[275px] cursor-pointer group">
                                <div className="absolute bg-black/80 px-2 py-2 top-[10px] z-40 right-0 text-xl">
                                    <AddtoCart product={ele}>
                                        <div className="hover:text-[#febd69] text-white duration-500">
                                            <BsFillCartFill />
                                        </div>
                                    </AddtoCart>
                                    <FavouriteSection ele={ele}/>
                                </div>
                                <h2 className='absolute bg-slate-900 left-0 text-center right-0 bottom-[-30px] group-hover:opacity-100 duration-700 opacity-0 text-white px-3 py-2'>{ele.title}</h2>
                                <Link href={`/product/${ele.id}`}>
                                    <Image className='w-full h-full object-contain' alt={ele.title} src={ele.images} width={400} height={0} />
                                </Link>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
                :
                <div className="container mt-0 bg-white py-3 px-2 productsSwiper">
                    <Loading />
                </div>
            }

        </>
    )
}

export default SectionProducts
