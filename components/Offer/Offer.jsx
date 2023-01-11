import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { apiPage } from '../../api';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Link from 'next/link';
import Loading from '../Loading/Loading';
const Offer = () => {
    const [offerData, setOfferData] = useState([])
    useEffect(() => {
        axios.get(`${apiPage}offer`).then(res => setOfferData(res.data)).catch(err=> setOfferData(false))
    }, [])
    return (
        <div className="container">
            <div className='flex || flex-wrap lg:flex-nowrap || py-10 || gap-4 || select-none'>
                {offerData ? offerData.length > 0 ?
                    <>
                        <div className='w-[100%] || lg:[50%]   || rounded-lg || relative'>
                            <div className="absolute || top-[40px] || left-[30px] || z-10">
                                <h2 className='text-[14px] || text-sky-500'>Best Offer</h2>
                                <h2 className='text-[1.6rem] || my-3 || capitalize'>Let's Visit</h2>
                                <Link className='bg-mainColor || inline-block || text-white || px-5 || py-2 || rounded-full || hover:bg-[#232f3e] || duration-500 || transition-colors' href={"/"} >Shop Now</Link>
                            </div>
                            <Carousel
                                autoPlay
                                infiniteLoop
                                stopOnHover
                                swipeable
                                showArrows={false}
                                showStatus={false}
                                showThumbs={false}
                                interval={5000}
                                emulateTouch
                                className='cursor-pointer'
                            >
                                <div className='h-[calc(300px+1rem)]'>
                                    <Image className='rounded-lg || w-full || object-cover || h-full' src={`https://firebasestorage.googleapis.com/v0/b/amzone-clone-2fe1d.appspot.com/o/Products%2Fmain-banner.jpg?alt=media&token=3598f47a-0b70-4e26-adbd-e2f5363693fc`} alt="mainBanner" width={600} height="0" />
                                </div>
                                <div className='h-[calc(300px+1rem)]'>
                                    <Image className='rounded-lg || w-full || object-cover || h-full' src={`https://firebasestorage.googleapis.com/v0/b/amzone-clone-2fe1d.appspot.com/o/main-banner-1.jpg?alt=media&token=fe2d34f0-f2bb-499d-8a00-2f98e5d87e6f`} alt="mainBanner" width={600} height="0" />
                                </div>
                            </Carousel>
                        </div>
                        <div className="w-[100%] || lg:[50%]  || flex || flex-wrap || justify-center || md:justify-start || gap-4 ">
                            {offerData.map(ele =>
                                <div className="w-[full] md:w-[calc(50%-1rem)]  || h-[150px] || relative" key={ele.id}>
                                    <div className="absolute || top-1/2 || left-[20px] || -translate-y-1/2">
                                        <h2 className='text-[14px] || text-orange-500'>Best sale</h2>
                                        <h2 className='text-[1.4rem] || my-2 || capitalize'>{ele.title}</h2>
                                        <p>{ele.price} $</p>
                                    </div>
                                    <Image className=' rounded-lg || object-center || object-cover || w-full || h-full' src={`${ele.image}`} width={400} height={150} alt={ele.title} />
                                </div>
                            )}
                        </div>
                    </> : <Loading /> :
                    <div className="bg-white w-full min-h-[30vh] flex items-center justify-center">
                        <div className="container text-center text-4xl ">No Data Found</div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Offer;