import React from 'react'
import classes from '../../index.module.css'
const leftSideBar = (props) => {
    const {
        loading,
        categories,
        handleChangeCate,
        getAllProducts,
        handlerSearchKey,
        keyValue,
        handlerOnChangeKey
    } = props
    return (
        <div className={`col-2 ${classes.filterProd}`}>
                        <form onSubmit = {(e) => handlerSearchKey(e)}>
                            <input 
                                value = {keyValue}
                                onChange = {(e) => handlerOnChangeKey(e) } 
                                className={`form-control mr-sm-2 ${classes.filter}`} 
                                type="search" placeholder="Search" aria-label="Search" />
                        </form>
                        <div className = {classes.formControl}>
                            <h5>Category</h5>
                            <div>
                                <button onClick = {getAllProducts} className = {`${classes.btnCate} ${classes.active}`}>All</button>
                                {loading ? <div className = "col-12">Loading ...</div> : (
                                    categories.map((item,key) => (
                                        <button onClick = {()=>handleChangeCate(item.name)} className = {`${classes.btnCate} ${classes.active}`} key = {key}>{item.name}</button>
                                    ))
                                )
                                
                            }
                            </div>
                        </div>
                        <div className = {classes.formControl}>
                            <h5>Price</h5>
                            <div className="form-group">
                                <input type="range" className="form-control-range" min="0" max = "10000" id="formControlRange"/>
                            </div>
                        </div>
                        <div className = {classes.formControl}>
                            <button className = "btn btn-danger">Clear Filter</button>
                        </div>
                    </div>
    )
}

export default React.memo(leftSideBar, (prevProps, nextProps) => {
    if(prevProps.categories !== nextProps.categories) 
        return false;
    if(prevProps.keyValue !== nextProps.keyValue)
        return false;
    return true;
}) 
