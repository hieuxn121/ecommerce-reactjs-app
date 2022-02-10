import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import classes from './index.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { GiCompass } from 'react-icons/gi';
import { FaLowVision, FaHistory } from 'react-icons/fa'
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors'
import reducer from '../Products/reducer'
import saga from '../Products/saga'
import {
    getListProductsStart
}
from '../Products/actions'
import {createStructuredSelector} from 'reselect'
import {
    makeSelectListProducts,
    makeSelectLoading,
    makeSelectorLimitProds
}
from '../Products/selectors'
const stateSelector = createStructuredSelector({
    products: makeSelectListProducts(),
    loading: makeSelectLoading(),
    limitProd: makeSelectorLimitProds()
})
const key = "productsRoot"
const Home = () => {
    useInjectReducer(key, reducer)
    useInjectSaga(key, saga)
    const dispatch = useDispatch()
    const [limit, setLimit] = useState('3')
    const {
        products,
        loading
    } = useSelector(stateSelector)
    useEffect(()=>{
        dispatch(getListProductsStart({
            limit: limit
        }));
    },[])
    return (
        <div>
        <div className = {`container ${classes.home}`}>
            <div className = "row" >
                <div className="col-6">
                    <div className = {classes.bigTitle}>
                     Design Your Comfort Zone
                    </div >
                    <div className = {classes.description}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?
                    </div>
                    <button type="button" className = {`btn ${classes.shopNow}`}>Shop Now</button>
                </div>
                <div className={`col-6 ${classes.imgContainer} `}>
                    <img className = {classes.bg1} src="./assets/image/background.jpeg" alt="background" />
                    <img className = {classes.bg2} src="./assets/image/bg2.jpeg" alt="background" />
                </div>
            </div>
        </div>
        <div className={classes.featuredProducts}>
            <div className = "container">
                <div className="row">
                    <div className="col-12">
                        <h1 style = {{fontSize: "45px"}}>Featured Products</h1>
                        <div className = {classes.underline}></div>
                    </div>
                </div>
                <div className="row" style = {{marginTop: "30px"}}>
                { loading ? <div className = "col-12">Loading ...</div> : 
                    products.map((item) => (
                    <div className = "col-4" key = {item._id}>
                        <div className={`card ${classes.item}`} style={{width: "18rem"}}>
                            <img src= {item.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-text" style = {{fontSize: '20px'}}>{item.title}</h4>
                                <p style = {{color: "#ab7a5f"}}>{item.category}</p>
                                <p style = {{color: "#ab7a5f"}}>{item.price}$</p>
                            </div>
                        </div>
                    </div>
                    ))
                }
                </div>
                <NavLink  type="button" className = {`btn ${classes.allProds}`} to="/products">All products</NavLink>
            </div>
        </div>
        <div className = {classes.mission}>
            <div className = "container">
                <div className="row">
                    <div className="col-3">
                        <h3>Custom Furniture Built Only For You </h3>
                    </div>
                    <div className="col-3"></div>
                    <div className="col-6">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum debitis consectetur reprehenderit non aliquam voluptates dolore aut vero consequuntur.</p>
                    </div>
                </div>
                <div className="row" style = {{marginTop: "50px"}}>
                    <div className= "col-4">
                        <div className = {classes.eachMission}>
                            <div className = {classes.iconMission}><GiCompass/></div>
                            <h3>Mission</h3>
                            <p className = {classes.abc}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi</p>
                        </div>
                    </div>
                    <div className= "col-4">
                        <div className = {classes.eachMission}>
                        <div className = {classes.iconMission}><FaLowVision/></div>
                        <h3>Vision</h3>
                        <p  className = {classes.abc}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi</p>
                        </div>
                    </div>
                    <div className= "col-4">
                        <div className = {classes.eachMission}>
                        <div className = {classes.iconMission}><FaHistory/></div>
                        <h3>History</h3>
                        <p className = {classes.abc}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className = {`container ${classes.discount}`}>
            <div className="row">
                <div className="col-7">
                    <h1 style = {{fontSize: "27px", letterSpacing:'2px'}}>Join our newsletter and get 20% off</h1>
                    <p style = {{color: "#617d98", width: "80%", marginTop: "20px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint unde quaerat ratione soluta veniam provident adipisci cumque eveniet tempore?</p>
                </div>
                <div className= "col-5">
                    <form className = {classes.subscribe} action="">
                        <input type="text" name = "email" placeholder="Enter Email"/>
                        <button className = "btn">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Home;
