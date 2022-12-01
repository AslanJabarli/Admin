import {Route , Routes} from 'react-router-dom'
import React from 'react';
import Home from '../Pages/Home';
import Categories from '../Pages/Categories';
import Products from '../Pages/Products';
import MainSlider from '../Pages/MainSlider';
import Orders from '../Pages/Orders';

function Routing(props) {
    return (
        <React.Fragment>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/products' element={<Products/>} />
                <Route path='/main-slider' element={<MainSlider/>} />
                <Route path='*' element={<div>404 not found</div>} />
                <Route path='/categories' element={<Categories/>} />
                <Route path='/orders' element={<Orders/>} />
            </Routes>
        </React.Fragment>
    );
}
  
export default Routing;
