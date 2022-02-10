import React, {useEffect, useState, useCallback} from 'react'
import SectionMenu from '../../components/SectionMenu'
import classes from './index.module.css'
import { NavLink } from 'react-router-dom'
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors'
import { createStructuredSelector } from 'reselect'
import { useDispatch, useSelector } from "react-redux";
import reducer from './reducer'
import saga from './saga'
import {
    makeSelectProdInCart,
    makeSubtotalPrice
}
from '../../redux/global/selectors'
import {
    getCartProdStart
}
from './actions'
import {
    deleteProductInCart
}
from '../../redux/global/actions'
const key = "cartRoot"
const stateStructor = createStructuredSelector({
   prodInCart: makeSelectProdInCart(),
   subTotalPrice: makeSubtotalPrice()
})
const Cart = () => {
    useInjectReducer(key, reducer)
    useInjectSaga(key, saga)
    const {
        prodInCart,
        subTotalPrice
    } = useSelector(stateStructor)
    const dispatch = useDispatch();
    
    const [cart,setCart] = useState([])
    const [prodChoosen, setProdChoosen] = useState({})
    let [subTotal, setSubTotal] = useState(0)
    useEffect(
        () => {
            if(JSON.parse(localStorage.getItem('carts')))
                setCart(JSON.parse(localStorage.getItem('carts')))
        }, [prodChoosen])
    const clearCart = () => {
        localStorage.removeItem('carts');
        setCart([])
    }
    const decreNumProd = (id) => {
        const objId = cart.findIndex(item => item._id === id);
        const upDateProd = cart[objId];
        if (upDateProd.numberProd === 1){
            cart.splice(objId,1);
           setProdChoosen({});
        } 
        else {
            upDateProd.numberProd--;
            setProdChoosen(upDateProd);
        } 
        localStorage.setItem ('carts', JSON.stringify(cart));
    }
    const increNumProd = (id) => {
        const objId = cart.findIndex(item => item._id === id)
        const upDateProd = cart[objId];
        upDateProd.numberProd++;
        setProdChoosen(upDateProd)
        localStorage.setItem ('carts', JSON.stringify(cart));
    }
    const deleteItem = (id) => {
        const objId = cart.findIndex(item => item._id === id)
        cart.splice(objId,1)
        setProdChoosen({})
        localStorage.setItem ('carts', JSON.stringify(cart));
    }
    return (
        <div className = {classes.fillCart}>
            {
                !cart.length ? 
                ( 
                <div style = {{paddingTop: "70px", textAlign: "center"}}>
                    <h1>Your Cart Is Empty</h1>
                    <NavLink to = "/products">
                        <button className = {`btn ${classes.BTN}`}>
                            FILL IT
                        </button>
                    </NavLink>
                </div>) : (
                <>
                <SectionMenu menuCurrent = "Cart"/>
                <div className = {classes.cart}>
                    <table className="table" style = {{textAlign:"center"}}>
                        <thead>
                            <tr>
                            <th colSpan="2">Item</th>
                            <th >Price</th>
                            <th >Quantity</th>
                            <th >Subtotal</th>
                            <th ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => { 
                                const subTotalItem = item.numberProd * item.price;
                                subTotal += subTotalItem
                                return (
                                <tr key = {item.id}>
                                <td colSpan="2">
                                    <div className = "row" style = {{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                                        <div className="col-6">
                                            <img src={item.image} width="100px" height="120px" alt="" />
                                        </div>
                                        <div className="col-6">
                                            <p>{item.title}</p>
                                        </div>
                                    </div>
                                </td>
                                <td >${item.price}</td>
                                <td className = {classes.btnInDe}>
                                    <button onClick = {() => decreNumProd(item._id)}>-</button>
                                    <button>{item.numberProd}</button>
                                    <button onClick = {() => increNumProd(item._id)}>+</button>
                                </td>
                                <td>${subTotalItem}</td>
                                <td>
                                    <button onClick = {() => deleteItem(item._id)} className = {`btn ${classes.btnDel}`}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                    <hr />
                    <div className="row" style = {{marginTop:"50px"}}>
                        <div className="col-6">
                            <NavLink to = "/products">
                                <button className = {`btn ${classes.BTN}`}>
                                    Continue Shopping
                                </button>
                            </NavLink>
                        </div>
                        <div className="col-6" style = {{display: 'flex', justifyContent: "flex-end"}}>
                            <button 
                                onClick = {clearCart}
                                className = {`btn ${classes.BTN}`} 
                                style = {{background:'black'}} >
                                 Clear Shooping Cart
                            </button>
                        </div>
                    </div>
                    <div className="row"  style = {{display:"flex", justifyContent:"flex-end"}}>
                        <div className={classes.receipt}>
                            <h5 className = {classes.abc}>Subtotal: <span>${subTotal}</span></h5> 
                            <p className = {classes.abc}>Shipping Fee: <span>$2.02</span></p> 
                            <hr />
                            <h4 className = {classes.abc} >Order Total: 
                            <span>${subTotal === 0 ? subTotal : subTotal + 2.02}</span>
                            </h4>
                        </div>  
                    </div>
                    <div className={`row ${classes.loginButton}`}>
                        <NavLink to="/login" className = {`col-3 btn ${classes.BTN}`} >Login</NavLink>  
                    </div>
                </div>
                </>
                )
            }
        </div>
    )
}

export default Cart
