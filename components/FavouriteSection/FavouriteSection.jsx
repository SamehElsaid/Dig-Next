import React, { useEffect, useState } from 'react';
import AddToFavourite from '../AddToFavourite/AddToFavourite';
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai"
import { useSelector } from 'react-redux';
import RemoveFav from '../RemoveFav/RemoveFav';
const FavouriteSection = ({ ele }) => {
    const favData = useSelector(eles => eles.cart.favProducts)
    const user = useSelector(eles => eles.auth)
    const [inFav, setInFav] = useState(false)
    const [num, setNum] = useState(1)
    useEffect(() => {
        if (user.isLoggedin) {
            if (favData) {
                const isFav = favData.find(e => e.id === ele.id)
                if (isFav) {
                    setInFav(true)
                } else {
                    setInFav(false)
                }
            } 
        }else {
            setInFav(false)
        }
    }, [user.isLoggedin, favData.length])
    return (
        <>
            {inFav ? <div className="hover:text-white mt-3 text-red-600 duration-500" >
                <RemoveFav product={ele}>
                    < AiTwotoneHeart />
                </RemoveFav>
            </div > :
                <AddToFavourite product={ele}>
                    <div className="hover:text-red-600 mt-3 text-white duration-500" onClick={() => setNum(num + 1)}>
                        <AiOutlineHeart />
                    </div>
                </AddToFavourite>
            }
        </>

    );
};

export default FavouriteSection;