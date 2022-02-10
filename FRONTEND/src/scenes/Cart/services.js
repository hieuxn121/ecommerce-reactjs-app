import axios from 'axios'
const cartApi = {}

cartApi.getCart = async () => {
    try {
        const carts = await axios('https://fakestoreapi.com/carts')
        return carts;
    } catch (error) {
        return error
    }
}

export default cartApi;