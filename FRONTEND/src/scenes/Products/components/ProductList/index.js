import React, {useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import classes from '../../index.module.css'
const ProductList = (props) => {
    const {
        loading,
        showTypeProds,
        products
    } = props
    return (
        <div className="row" style = {{marginTop: "30px"}}>
            { loading ? <div className = "col-12">Loading ...</div> : (
                    products.map((item) => {
                    if(showTypeProds){
                        return (
                            <div className =  "col-4" key = {item._id}>
                                <div className={`card ${classes.item}`} style={{width: "18rem"}}>
                                    <NavLink to = {`/products/${item._id}`}>
                                        <img src= {item.image} className="card-img-top" alt="..." />
                                    </NavLink>
                                    <div className="card-body">
                                        <h4 className="card-text" style = {{fontSize: '15px'}}>{item.title}</h4>
                                        <p style = {{color: "#ab7a5f"}}>{item.price}$</p>
                                    </div>
                                </div>
                            </div>
                        )} 
                    else
                        return (
                            <div className = "col-12" key = {item._id}>
                                <div className = {`row ${classes.item2}`}>
                                    <div className = {`col-4 ${classes.image2}`}>
                                        <img src= {item.image} alt="..." />
                                    </div>
                                    <div className = "col-8">
                                        <h4 className="card-text" style = {{fontSize: '25px'}}>{item.title}</h4>
                                        <p style = {{color: "#ab7a5f"}}>{item.price}$</p>
                                        <p>{item.description}</p>
                                        <NavLink to = {`/products/${item.id}`} className = {classes.btn}>Details</NavLink>
                                    </div>
                                </div>
                            </div>
                        ) 
                    }))
                }
        </div>
    )
}

export default React.memo(ProductList, (prev,next) => {
    if(prev.products !== next.products)return false
    if(prev.showTypeProds !== next.showTypeProds) return false
    return true;
})
