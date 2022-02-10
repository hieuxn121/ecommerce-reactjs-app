import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom';
import SectionMenu from '../../../../components/SectionMenu';
import { useHistory } from "react-router-dom";
import classes from './index.module.css'
import { createStructuredSelector } from 'reselect'
import {
    makeSelectLoading,
    makeSelectProdChoosen
}
from '../../selectors'
import { useDispatch, useSelector } from "react-redux";
import {
    getDetailProdStart
}
from '../../actions'

import { useInjectReducer, useInjectSaga } from '../../../../redux/reduxInjectors'
import reducer from '../../reducer'
import saga from '../../saga'

const stateStructor = createStructuredSelector({
    prodChoosen: makeSelectProdChoosen(),
    loading: makeSelectLoading()
})
const key = "productsRoot"
const ProductDetail = () => {
    useInjectReducer(key, reducer)
    useInjectSaga(key, saga)
    let history = useHistory();
    const {
        prodChoosen,
        loading
    } = useSelector(stateStructor)
    const dispatch = useDispatch()
    const {idProd} = useParams();
    const [numberProd, setNumberProd] = useState(1)
    const [currentCart,setCurrentCart] = useState([]) 
    useEffect(() => {
        dispatch(getDetailProdStart(idProd))
        if(JSON.parse(localStorage.getItem('carts')))
            setCurrentCart(JSON.parse(localStorage.getItem('carts')));
    }, [])
    
    const goToPreviousPath = () => {
        history.goBack()
    }
    const deCreProd = () => {
        let num = numberProd
        num > 1 ? setNumberProd(--num) : setNumberProd(1)
    }
    const inCreProd = () => {
        let num = numberProd
        setNumberProd(++num)
    }
    const addtoCart = () => {
        const item = {...prodChoosen, numberProd: numberProd}
        console.log("itemChoosen: ", item);
        console.log("current: ", currentCart);
        let itemTrung = currentCart.filter(_item => _item._id === item._id);
        console.log("==== ", itemTrung);
        if(!itemTrung.length){
            currentCart.push(item)
            localStorage.setItem ('carts', JSON.stringify(currentCart));
        }
        else {
            itemTrung = itemTrung[0]
            const upDateItemTrung = {...itemTrung, numberProd: itemTrung.numberProd + numberProd}
            const objIndex = currentCart.findIndex(_item => _item.id === upDateItemTrung.id)
            currentCart[objIndex] = upDateItemTrung
        }
        localStorage.setItem ('carts', JSON.stringify(currentCart));
    }
    return (
        <div>
            <SectionMenu menuCurrent = {`Products / ${prodChoosen.category}`} />
            <div style = {{padding: "70px 70px"}}>
                <div className="row">
                    <button onClick = {goToPreviousPath} className = {classes.btn}>BACK TO PRODUCTS</button>
                </div>
                <div className = {`row`}>
                    {loading ? <div className = "col-12">Loading ...</div> : (
                    <>
                        <div className = {`col-6 `}>
                            <img src = {prodChoosen.image} width="100%" height="500px" alt = "image"/>
                        </div>
                        <div className = "col-6">
                            <h4 className="card-text" style = {{fontSize: '25px'}}>{prodChoosen.title}</h4>
                            <p style = {{color: "#ab7a5f"}}>{prodChoosen.price}$</p>
                            <p>{prodChoosen.description}</p>
                            <p className = {classes.info}>
                                <span>Available : </span>
                                In Stock
                            </p>
                            <p className = {classes.info}>
                                <span>SKU : </span>
                                RecQ0fMd8T0Vk211E
                            </p>
                            <p className = {classes.info}>
                                <span>Brand : </span>
                                Liddy
                            </p>
                            <hr />
                            <div className="row">
                                <div className={`col-12 ${classes.btnCart}`}>
                                    <button onClick = {deCreProd}>-</button>
                                    <button>{numberProd}</button>
                                    <button onClick = {inCreProd}>+</button>
                                </div>
                                <div className="col-12">
                                    <NavLink to = "/cart">
                                        <button className = {classes.btn} onClick = {addtoCart}>ADD TO CART</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </>    
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
