import axios from 'axios'
const productApi = {
    a: () => {}
} 
productApi.getListProducts = async(body) => {
    console.log("===",body)
    try {
        let products = []
            // products = await axios('http://localhost:3003/products')
            products = await axios({
                method: 'post',
                url: "http://localhost:3003/products",
                headers: {}, 
                data: {
                  ...body
                }
              });
        return products;  
    } catch (error) {
        return error
    }
}
productApi.getListCates = async() => {
    try {
        let token;
        if(localStorage.getItem('token')){
            token = localStorage.getItem('token')
        }
        const categories = await axios('http://localhost:3003/categories', 
        // {
        //     headers: {
        //         Authorization: 'Bearer ' + token
        //     }
        // }
        )
        return categories;  
    } catch (error) {
        return error
    }
}
productApi.getDetailProd = async(body) => {
    try {
        const url = 'http://localhost:3003/products/' + body
        const products = await axios(url)
        console.log(products)
        return products  
    } catch (error) {
        return error
    }
}
productApi.getProductSearched = async(body) => {
    try {
        const url = 'http://localhost:3003/products/' + body
        const products = await axios(url)
        console.log(products)
        return products  
    } catch (error) {
        return error
    }
}
export default productApi;