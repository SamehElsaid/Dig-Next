import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import { apiPage } from '../../api';
import { SET_FAVOURITE } from '../../Redux/cartSlice/cartSlice';

const RemoveFav = ({ children, product }) => {
    const dispatch = useDispatch()
    const user = useSelector(ele => ele.auth.id)
    const [playClick] = useSound("/audio/click.mp3")
    const removeFav = () => {
        axios.get(`${apiPage}favourite/${user}`).then(res=>{
            axios.patch(`${apiPage}favourite/${user}`,{
                products:[...res.data.products.filter(ele=> ele.id !== product.id)]
            }).then(res=>{
                playClick()
                dispatch(SET_FAVOURITE(res.data.products))
            })
        })
    }
    return (
        <div className='mt-3' onClick={removeFav}>
            {children}
        </div>
    );
};

export default RemoveFav;