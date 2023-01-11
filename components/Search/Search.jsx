import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci"
import { apiPage } from "../../api";

const Search = () => {
    const [data, setData] = useState(false)
    const [dataSec, setDataSec] = useState(false)
    const overY = useRef()
    const overInput = useRef()
    const router = useRouter()
    const goTolink = (e) => {
        e.preventDefault()
        if (dataSec) {
            router.push(`/product/${dataSec[0].id}`)
        }
    }
const getData = (e) => {
    const searchValue = e.target.value.toLocaleLowerCase()
    axios.get(`${apiPage}allProducts`).then(res => {
        let searchData = []
        res.data.map(e => {
            if (e.title.toLocaleLowerCase().includes(searchValue) || e.price === +searchValue || e.description.toLocaleLowerCase().includes(searchValue) || e.category.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
                searchData.push(e)
            }
        })
        setData(searchData);
        setDataSec(searchData)
        if (searchValue === "") {
            setData(false);
            setDataSec(false)
        }
    })
}
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
            setData(false)
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [overInput]);

return (
    <div ref={overInput} className='flex || relative || w-full'>
        <form action="" onSubmit={goTolink} className='flex || w-full || justify-between '>
            <input onClick={(e) => {
                if (e.target.value.length > 0) {
                    setData(dataSec)
                } else {
                    setData(false)
                }
            }} onChange={getData} type="text" placeholder='Search Product Here ' className='px-3 || rounded-l-md || py-1 || outline-0 || text-[#333] || w-full' />
            <button type='submit' className='bg-[#febd69] || rounded-r-md || px-2 || text-xl || flex || justify-center || items-center || cursor-pointer'>
                <CiSearch />
            </button>
        </form>
        {data &&
            <div ref={overY} className="absolute || z-[99999]  || rounded-lg || scrollStyle || top-[100%] || max-h-[300px] ||  || px-3 || py-4  || bg-black/80 w-full">
                {data.length === 0 &&
                    <h2 className="py-1.5 text-center duration-500">Can't Find Product</h2>
                }
                {data.map(product =>
                    <Link onClick={() => {
                        setData(false)
                    }
                    } key={product.id} href={`/product/${product.id}`} >
                        <h2 className="py-1.5 hover:text-[#febd69] duration-500">{product.title}</h2>
                    </Link>
                )}
            </div>
        }
    </div>
);
};

export default Search;