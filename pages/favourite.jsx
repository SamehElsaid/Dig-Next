import { Rate } from 'antd';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSound from 'use-sound';
import RemoveFav from '../components/RemoveFav/RemoveFav';

const favourite = memo(() => {
    const [playClick] = useSound("/audio/click.mp3")
    const favDatas = useSelector(eles => eles.cart.favProducts)
    const user = useSelector(eles => eles.auth)
    const [favData, setFavData] = useState(false)
    useEffect(() => {
        if (user.isLoggedin) {
            setFavData(favDatas)
        } else {
            setFavData(false)
        }
    }, [user, favDatas.length])
    return (
        <div>
            <Head>
                <title> Dig | Favourite </title>
            </Head>
            <div className="flex || flex-wrap || xl:flex-nowrap || relative container py-5 gap-5">
                <div className="w-[100%]  bg-white || p-4">
                    <div className="flex || border-[#ddd] || pb-2 border-b || || justify-between || items-end">
                        <p className='text-xl'>Shopping Favourite</p>
                    </div>
                    {favData && favData.length > 0 ? favData.map(product =>
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
                                    <h2 className='my-2'>
                                        <Rate
                                            allowHalf
                                            disabled
                                            value={+product.rating}
                                            style={{ color: "coral" }}
                                        />
                                        <span className='pl-3 text-[coral]'>({product.rating})</span>
                                    </h2>
                                    <RemoveFav product={product}>
                                        <button className='bg-red-500  text-white px-4 py-1'>Remove From Favourite</button>
                                    </RemoveFav>
                                </div>
                            </div>
                        </div>
                    ) :
                        <h2 className='min-h-[50vh] flex justify-center items-center text-3xl'>No Favourite Found</h2>
                    }
                </div>
            </div>
        </div>
    );
});

export default favourite;