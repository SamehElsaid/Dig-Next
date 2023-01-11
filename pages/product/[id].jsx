import React, { memo, useEffect, useRef, useState } from 'react';
import { apiPage } from "../../api"
import Magnifier from "react-magnifier";
import { Rate } from 'antd';
import AddtoCart from '../../components/AddToCart/AddtoCart';
import axios from 'axios';
import SectionProducts from '../../components/SectionProducts/SectionProducts';
import { useRouter } from 'next/router';
import Loading from '../../components/Loading/Loading';
import Loader from '../../components/Loader/Loader';
import AddToFavourite from '../../components/AddToFavourite/AddToFavourite';
import Head from 'next/head';
const productDetails = memo(({ data }) => {
    const [allProducts, setAllProducts] = useState([])
    const [allData, setAllData] = useState([])
    const [category, setCategory] = useState([])
    const [loadingin, setLoadingin] = useState(false)
    const { asPath } = useRouter()
    const imgLoading = useRef()
    useEffect(() => {
        setLoadingin(false)
        axios.get(`${apiPage}allProducts`).then(res => {
            const n = 10
            const shuffledArray = res.data.sort(() => 0.5 - Math.random());
            const result = shuffledArray.slice(0, n);
            const catgory = []
            setLoadingin(true)
            result.forEach(ele => {
                if (ele.category !== data.category) {
                    if (!catgory.includes(ele.category)) {
                        catgory.push(ele.category)
                    }
                }
            })
            setCategory(catgory);
            setAllProducts(result)
            setAllData(res.data)
        })
    }, [asPath])
    return (
        <div className='container my-5'>
            <Head>
                <title>Dig | </title>
            </Head>
            <div className="flex flex-wrap md:flex-nowrap py-5  bg-white">
                <div className="w-full flex justify-center md:w-[40%] ">
                    <div className="w-[400px]  relative flex items-center px-10 min-h-[500px]"
                        onLoad={(e) => {
                        }}>
                        {!loadingin &&
                            <div ref={imgLoading} className="loadingImg ">
                                <div className="absolute z-10 backdrop-blur-[5px]  flex items-center bg-white/50 inset-0 left-[20px]">
                                    <Loading />
                                </div>
                            </div>
                        }
                        <Magnifier src={data.images} width={"400px"} height={"100%"} className="object-cover h-full" />
                    </div>
                </div>
                <div className="w-full md:w-[60%] || border-[#ddd] || pl-5 || ml-5 border-l ||">
                    {!loadingin ?
                        <Loader />
                        :
                        <div className="flex flex-col justify-center gap-4 h-full">
                            <Head>
                                <title>Dig |  {data.title}</title>
                            </Head>
                            <h2>
                                <span>Brand : </span>
                                {data.brand}
                            </h2>
                            <h2>
                                <span>Title : </span>
                                {data.title}
                            </h2>
                            <h2><span>Category : </span>{data.category}</h2>
                            <h2><span>Price : </span>${data.price}</h2>
                            <h2><span>In Stock : </span>${data.stock}</h2>
                            <Rate
                                allowHalf
                                disabled
                                value={+data.rating}
                                style={{ color: "coral" }}
                            />
                            <span className='pl-3 text-[coral]'>({+data.rating})</span>
                            <h2><span>Description : </span>{data.description}</h2>
                            <div className="w-[100px]">
                                <AddToFavourite product={data} >
                                    <h2 className='bg-red-500 || text-white || cursor-pointer || mb-3 || shadow-lg || border || border-red-800  || text-[10px] || text-center || py-1 || rounded-lg'>Add to Card</h2>
                                </AddToFavourite>
                                <AddtoCart product={data} >
                                    <h2 className='bg-[#ffd814] || cursor-pointer border-[#FCD200] || shadow-lg || border || text-[10px] || text-center || py-1 || rounded-lg'>Add to Card</h2>
                                </AddtoCart>
                            </div>
                        </div>
                    }

                </div>
            </div>
            <div className="container mt-5 ">
                <h2 className='text-2xl bg-white pt-5 px-5'>Products related to items in your cart</h2>
                <div className=" flex  flex-col gap-5 pb-5">
                    <SectionProducts allData={allData.filter(pro => pro.id !== data.id)} cateogry={data.category} />
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

export default productDetails;
export async function getServerSideProps(context) {
    const id = context.params.id;

    const res = await fetch(`${apiPage}allProducts/${id}`)
    const data = await res.json()
    return {
        props: {
            data
        },
    };
}