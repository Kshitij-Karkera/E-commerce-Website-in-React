import React from 'react'
import { useEffect } from 'react';
import ImageSlider from '../components/ImgSlider/ImageSlider';
import Product from '../components/Products/Product';
import ProductDetails from '../productData'
import { Link } from 'react-router-dom'

function Home() {
  useEffect(() => {
    let header = document.querySelector('.headerContainer')
    let footer = document.querySelector('.footerItems')
    header.style.display = 'flex'
    footer.style.display = 'flex'
  }, [])

  const uniqueCategory = []

  const uniqueProducts = ProductDetails.filter(element => {
    const isDuplicate = uniqueCategory.includes(element.category)
    if (!isDuplicate) {
      uniqueCategory.push(element.category);
      return true;
    }
    return false;
  })

  return (
    <div className='home'>
      <ImageSlider />
      <div className='parentHomeRow'>
        {
          uniqueProducts && uniqueProducts
          .sort((a, b) => a.category > b.category ? 1 : -1)
          .map(productCategory => {
            return(
              <div key={productCategory.id}>
                <div className='categoryHeader'>
                  <Link to={`/${productCategory.category}`}>
                    {productCategory.category}
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 256 256">
                      <g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                        <path d="M 58.33 58.799 L 15.998 16.466 c -1.059 -1.059 -1.059 -2.776 0 -3.835 L 27.834 0.794 c 1.059 -1.059 2.776 -1.059 3.835 0 l 42.333 42.333 c 1.059 1.059 1.059 2.776 0 3.835 L 62.166 58.799 C 61.107 59.858 59.39 59.858 58.33 58.799 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                        <path d="M 58.33 31.201 L 15.998 73.534 c -1.059 1.059 -1.059 2.776 0 3.835 l 11.837 11.837 c 1.059 1.059 2.776 1.059 3.835 0 l 42.333 -42.333 c 1.059 -1.059 1.059 -2.776 0 -3.835 L 62.166 31.201 C 61.107 30.142 59.39 30.142 58.33 31.201 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                      </g>
                    </svg>
                  </Link>
                </div>
                <div className='homeRow' key={productCategory.id}>
                  {
                    ProductDetails && ProductDetails
                    .map(productData => {
                      if(productData.category === productCategory.category) {
                        return (
                          <div key={productData.id}>
                            <Product 
                              id = {productData.id}
                              title = {productData.title}
                              image = {productData.image}
                              price = {productData.price}
                              rating = {productData.rating}
                              productDescription = {productData.productDescription}
                            />
                          </div>
                        )
                      } else {
                        return null
                      }
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home