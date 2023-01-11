import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { apiPage } from '../../api';
import { SET_FAVOURITE } from '../../Redux/cartSlice/cartSlice';
import { useSound } from "use-sound"
const AddToFavourite = ({ children, product }) => {
    const [playClick] = useSound("/audio/click.mp3")
    const user = useSelector(ele => ele.auth)
    const dispatch = useDispatch()
    const addToCard = (product) => {
        if (user.isLoggedin) {
            axios.get(`${apiPage}favourite`).then(res => {
                const emailPersonal = res.data.find(e => e.id === user.id)
                if (!emailPersonal) {
                    axios.post(`${apiPage}favourite`, {
                        id: user.email,
                        products: [product]
                    }).then(
                        res => {
                            playClick()
                            dispatch(SET_FAVOURITE(res.data.products))
                        }
                    )
                } else {
                    axios.get(`${apiPage}favourite/${user.id}`).then(res => {
                        const productNum = res.data.products.find(e => e.id === product.id)
                        if (!productNum) {
                            axios.patch(`${apiPage}favourite/${user.id}`, {
                                products: [...res.data.products, product]
                            }).then(res => {
                                playClick()
                                dispatch(SET_FAVOURITE(res.data.products))
                            }
                            )
                        }
                    })
                }
            }
            )
        }
    }
    return (
        <div onClick={() => { addToCard(product) }}>
            {children}
        </div>
    );
};

export default AddToFavourite;