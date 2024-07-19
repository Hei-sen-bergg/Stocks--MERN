import React from 'react'
import  Products  from '../components/Product';
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';
const Product = () => {

  const { categoryId } = useParams();

  return (
    <div>
     <Navbar />
      <Products categoryId={categoryId}/>
    </div>
  )
}

export default Product
