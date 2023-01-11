import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiPage } from '../../api';
import { SET_NUM_CARD } from '../../Redux/cartSlice/cartSlice';
import { useSound } from "use-sound"
const AddtoCart = ({ children, product }) => {
    const [playClick] = useSound("/audio/click.mp3")
    const user = useSelector(ele => ele.auth)
    const num = useSelector(ele => ele.cart.num)
    const dispatch = useDispatch()
    useEffect(() => {
    }, [num])
    const addToCard = (product) => {
        playClick()
        if (user.isLoggedin) {
            axios.get(`${apiPage}cart`).then(res => {
                const emailPersonal = res.data.find(e => e.id === user.id)
                if (!emailPersonal) {
                    product.num = 1
                    axios.post(`${apiPage}cart`, {
                        id: user.email,
                        products: [product]
                    }).then(
                        res => {
                            dispatch(SET_NUM_CARD({ num: 1, price: product.price }))
                        }
                    )
                } else {
                    axios.get(`${apiPage}cart/${user.id}`).then(res => {
                        const productNum = res.data.products.find(e => e.id === product.id)
                        if (productNum) {
                            productNum.num += 1
                            axios.patch(`${apiPage}cart/${user.id}`, {
                                products: [...res.data.products]
                            }).then(res => {
                                let num = 0
                                let price = 0
                                res.data.products.forEach(ele => {
                                    num += ele.num
                                    price += ele.price * ele.num
                                })
                                dispatch(SET_NUM_CARD({ num, price }))
                            })
                        } else {
                            product.num = 1
                            axios.patch(`${apiPage}cart/${user.id}`, {
                                products: [...res.data.products, product]
                            }).then(res => {
                                let num = 0
                                let price = 0
                                res.data.products.forEach(ele => {
                                    num += ele.num
                                    price += ele.price * ele.num
                                })
                                dispatch(SET_NUM_CARD({ num, price }))
                            }
                            )
                        }
                    })
                }
            }
            )
            axios.get(`${apiPage}cart`).then(res => {
                const emailPersonal = res.data.find(e => e.id === user.email)
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
    }
    return (
        <div onClick={() => { addToCard(product) }}>
            {children}
        </div>
    );
};

export default AddtoCart;