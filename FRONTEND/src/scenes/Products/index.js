import React, {useEffect, useState} from 'react'
import SectionMenu from '../../components/SectionMenu'
import classes from './index.module.css'
import {BsColumnsGap} from 'react-icons/bs'
import {AiOutlineMenu} from 'react-icons/ai'
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors'
import { createStructuredSelector } from 'reselect'
import {
    makeSelectListProducts,
    makeSelectLoading,
    makeSelectorLimitProds,
    makeSelectCategories,
    makeSelectNumberProds
}
from './selectors'
import { useDispatch, useSelector } from "react-redux";
import {
    getListProductsStart,
    getListCatStart
}
from './actions'
import reducer from './reducer'
import saga from './saga'
import LeftSideBar from './components/LeftSideBar'
import ProductList from './components/ProductList'
const key = "productsRoot"
const stateStructor = createStructuredSelector({
    products: makeSelectListProducts(),
    loading: makeSelectLoading(),
    limitProd: makeSelectorLimitProds(),
    categories: makeSelectCategories(),
    numberProds: makeSelectNumberProds()
})
const Products = () => {
    useInjectReducer(key, reducer)
    useInjectSaga(key, saga)
    const {
        products,
        loading,
        limitProd,
        categories,
        numberProds
    } = useSelector(stateStructor)
    const dispatch = useDispatch();

    const [showTypeProds, setShowTypeProds] = useState(true);
    const [cate, setCate] = useState("");
    const [keyValue, setKeyValue] = useState('');
    const [optionSort, setOptionSort] = useState('nameAZ')
    useEffect(()=>{
        dispatch(getListProductsStart({
            limit: limitProd,
            cate: cate,
            keyword: keyValue,
            sort: optionSort
        }))
    }, [cate, keyValue, optionSort])
    useEffect(() => {
        dispatch(getListCatStart(cate))
    },[])
    const handleChangeCate = (value) => {
        setCate(value);
    }
    const getAllProducts = () => {
        dispatch(getListProductsStart({
            limit: limitProd,
            cate: cate,
            keyword: keyValue,
            sort: optionSort
        }))
    }
    const handlerSearchKey = (e) => {
        e.preventDefault();
    }
    const handlerOnChangeKey = (e) => {
        setKeyValue(e.target.value);
    }
    const handlerOnChangeSort = (e) => {
        setOptionSort(e.target.value);
    }
    return (
        <div>
            <SectionMenu menuCurrent = "Products"/>
            <div className = {classes.content}>
                <div className="row">
                    <LeftSideBar
                        loading = {loading}
                        categories = {categories}
                        getAllProducts = {getAllProducts}
                        handleChangeCate = {handleChangeCate}
                        handlerSearchKey = {handlerSearchKey}
                        keyValue = {keyValue}
                        handlerOnChangeKey = {handlerOnChangeKey}/>
                    <div className="col-10">
                        <div className = "container">
                            <div className="row">
                                <div className={`col-3 ${classes.hi}`}>
                                    <span className = {showTypeProds? classes.hiActive : ""} onClick = { () => setShowTypeProds(true)}><BsColumnsGap/></span>
                                    <span className = {!showTypeProds? classes.hiActive : ""} onClick = { () => setShowTypeProds(false)}><AiOutlineMenu/></span>
                                    <p>{numberProds} Products Found</p>
                                </div>
                                <div className="col-6">
                                    <hr />
                                </div>
                                <div className={`col-3 ${classes.sortBy}`}>
                                    <form >
                                    <label htmlFor="sort">Sort by</label>
                                        <select value = {optionSort} onChange = {handlerOnChangeSort} name = "sort" id="sort" className = {classes.sortInput}>
                                            <option value = "nameAZ">Name (A-Z)</option>
                                            <option value = "nameZA">Name (Z-A)</option>
                                            <option value = "priceIncre">Price (Lowest)</option>
                                            <option value = "priceDescre">Price (Highest)</option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                            <ProductList loading = {loading} products = {products} showTypeProds = {showTypeProds}/>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default Products;
