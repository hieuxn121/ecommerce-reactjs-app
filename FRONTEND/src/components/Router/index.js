import React, {useEffect, useState} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import LoadableComponet from '../Loadable'
import Checkout from '../../scenes/Checkout'
import Login from '../../scenes/Login'
const Router = () => {
    const [token,setToken] = useState('');
    useEffect(() => {
        if(localStorage.getItem('token')){
            const newToken = localStorage.getItem('token')
            console.log(newToken);
            setToken(newToken)
        }
        console.log(token);
    },[])
    return (
        <Switch>
            <Route path = "/" exact component = {LoadableComponet(() => import('../../scenes/Home'))  }/>
            <Route path = "/products" exact component = {LoadableComponet(() => import('../../scenes/Products'))}/>
            <Route path = "/cart" component = {LoadableComponet(() => import('../../scenes/Cart'))}/>
            <Route path = "/products/:idProd" component = {LoadableComponet(() => import('../../scenes/Products/components/ProductDetail'))}/>
            <Route path = "/about" component = {LoadableComponet(() => import('../../scenes/About'))}/>
            <Route path = "/login">
                {token && <Redirect to="/"/>}
                {!token && <Login/>}
            </Route>
            <Route path = "/checkout">
                {token && <Checkout/>}
                {!token && <Redirect to = "/login"/>}
            </Route>
            <Route  render = {() => LoadableComponet(() => import('../../scenes/NotFound'))}/>
        </Switch>
    )
}
export default Router