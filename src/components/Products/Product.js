import React, { useEffect } from 'react'
import styled from 'styled-components'
import './Product.css'
import {useStateValue} from '../../StateProvider'
import {Link} from 'react-router-dom'

function Product(props) {
  const {id, image, title, price, rating, productDescription} = props
  const [{basket}, dispatch] = useStateValue()

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      }
    })
  }

  const filtered = basket.filter((item) => item.id === id)
  const filteredArray = [...filtered]

  const removeFromCart = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      id: id,
    })
  }

  useEffect(() => {
    let productRow = document.querySelectorAll('.homeRow')
    let addToCartButton = document.querySelectorAll('.addToCart')
    let addMore = document.querySelectorAll('.noOfItemsProduct')
    let removeFromCart = document.querySelectorAll('.removeProductinCart')
    let quantity = document.querySelectorAll('.quantityOfItems')

    for(let i = 0; i <= addToCartButton.length - 1; i++) {
      addToCartButton[i].addEventListener('click', () => {
        addToCartButton[i].style.display = 'none'
        addMore[i].style.display = 'flex'
      })

      if(quantity[i].value <= 0) {
        addToCartButton[i].style.display = 'flex'
        addMore[i].style.display = 'none'
      } else {
        addToCartButton[i].style.display = 'none'
        addMore[i].style.display = 'flex'
      }
    }
    
    filteredArray.filter(item => {
      for(let i = 0; i <= addToCartButton.length - 1; i++) {
        addToCartButton[i].addEventListener('click', () => {
          if (filteredArray.length > 0) {
              addToCartButton[i].style.display = 'none'
              addMore[i].style.display = 'flex'
            }
        })

        removeFromCart[i].addEventListener('click', () => {
          if (filteredArray.length <= 1) {
            addToCartButton[i].style.display = 'flex'
            addMore[i].style.display = 'none'
          } else if (filteredArray.length > 1) {
            addToCartButton[i].style.display = 'none'
            addMore[i].style.display = 'flex'
          }
        })

      } 
      return null
    }) 
    
    window.addEventListener('resize', () => {
      for(let i = 0; i <= productRow.length - 1; i++) {
        if(productRow[i].querySelectorAll('.productContainer').length === 1) {
          let product = productRow[i].querySelectorAll('.productContainer').item(0)
          if(window.location.pathname === '/') {
            product.style.width = '100%'
            product.parentElement.style.width = '100%'
          }
          if(product.style.width === '100%') {
            if(window.innerWidth < 768 && window.innerWidth > 350) {
              product.lastChild.style.display = 'none'
              product.childNodes[0].lastChild.style.flexDirection = 'column'
              product.childNodes[0].childNodes[0].style.width = '20em'
              product.childNodes[0].childNodes[0].style.height = '16em'
              product.childNodes[0].childNodes[0].style.bottom = '8em'
              product.childNodes[0].childNodes[0].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.bottom = '8em'
              product.childNodes[0].childNodes[2].style.left = 'auto'
              product.childNodes[0].childNodes[2].style.position = 'absolute'
              product.childNodes[0].childNodes[2].style.bottom = '1em'
              product.childNodes[0].childNodes[2].style.right = 'auto'
            } else if( window.innerWidth <= 350) {
              product.childNodes[0].childNodes[0].style.width = '15em'
              product.childNodes[0].childNodes[0].style.height = '16em'
              product.lastChild.style.display = 'none'
              product.childNodes[0].lastChild.style.flexDirection = 'column'
              product.childNodes[0].childNodes[0].style.bottom = '8em'
              product.childNodes[0].childNodes[0].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.bottom = '8em'
              product.childNodes[0].childNodes[2].style.left = 'auto'
              product.childNodes[0].childNodes[2].style.position = 'absolute'
              product.childNodes[0].childNodes[2].style.bottom = '1em'
              product.childNodes[0].childNodes[2].style.right = 'auto'
            } else {
              product.lastChild.style.display = 'flex'
              product.childNodes[0].lastChild.style.flexDirection = 'row'
              product.childNodes[0].childNodes[0].style.width = '20em'
              product.childNodes[0].childNodes[0].style.height = '16em'
              product.childNodes[0].childNodes[0].style.position = 'absolute'          
              product.childNodes[0].childNodes[0].style.top = '0'
              product.childNodes[0].childNodes[1].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.bottom = '6em'
              product.childNodes[0].childNodes[2].style.position = 'absolute'          
              product.childNodes[0].childNodes[2].style.bottom = '2em'
              product.childNodes[0].childNodes[2].style.left = '4em'
              product.childNodes[0].childNodes[2].style.width = '30em'
            } 
          } else {
            product.lastChild.style.display = 'none'
          } 
        } else {
          let product = productRow[i].querySelectorAll('.productContainer').item(0)
          product.style.width = '15em'
          product.lastChild.style.display = 'none'
        }
      }
    })

    window.addEventListener('load', () => {
      for(let i = 0; i <= productRow.length - 1; i++) {
        if(productRow[i].querySelectorAll('.productContainer').length === 1) {
          let product = productRow[i].querySelectorAll('.productContainer').item(0)
          if(window.location.pathname === '/') {
            product.style.width = '100%'
            product.parentElement.style.width = '100%'
          }
          if(product.style.width === '100%') {
            if(window.innerWidth < 768 && window.innerWidth > 350) {
              product.lastChild.style.display = 'none'
              product.childNodes[0].lastChild.style.flexDirection = 'column'
              product.childNodes[0].childNodes[0].style.width = '20em'
              product.childNodes[0].childNodes[0].style.height = '16em'
              product.childNodes[0].childNodes[0].style.bottom = '8em'
              product.childNodes[0].childNodes[0].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.bottom = '8em'
              product.childNodes[0].childNodes[2].style.left = 'auto'
              product.childNodes[0].childNodes[2].style.position = 'absolute'
              product.childNodes[0].childNodes[2].style.bottom = '1em'
              product.childNodes[0].childNodes[2].style.right = 'auto'
            } else if( window.innerWidth <= 350) {
              product.childNodes[0].childNodes[0].style.width = '15em'
              product.childNodes[0].childNodes[0].style.height = '16em'
              product.lastChild.style.display = 'none'
              product.childNodes[0].lastChild.style.flexDirection = 'column'
              product.childNodes[0].childNodes[0].style.bottom = '8em'
              product.childNodes[0].childNodes[0].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.bottom = '8em'
              product.childNodes[0].childNodes[2].style.left = 'auto'
              product.childNodes[0].childNodes[2].style.position = 'absolute'
              product.childNodes[0].childNodes[2].style.bottom = '1em'
              product.childNodes[0].childNodes[2].style.right = 'auto'
            } else {
              product.lastChild.style.display = 'flex'
              product.childNodes[0].lastChild.style.flexDirection = 'row'
              product.childNodes[0].childNodes[0].style.width = '20em'
              product.childNodes[0].childNodes[0].style.height = '16em'
              product.childNodes[0].childNodes[0].style.position = 'absolute'          
              product.childNodes[0].childNodes[0].style.top = '0'
              product.childNodes[0].childNodes[1].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.bottom = '6em'
              product.childNodes[0].childNodes[2].style.position = 'absolute'          
              product.childNodes[0].childNodes[2].style.bottom = '2em'
              product.childNodes[0].childNodes[2].style.left = '4em'
              product.childNodes[0].childNodes[2].style.width = '30em'
            }
          } else {
            product.lastChild.style.display = 'none'
          } 
        } else {
          let product = productRow[i].querySelectorAll('.productContainer').item(0)
          product.style.width = '15em'
          product.lastChild.style.display = 'none'
        }
      }
    })

    if(window.location.pathname === '/') {
      for(let i = 0; i <= productRow.length - 1; i++) {
        if(productRow[i].querySelectorAll('.productContainer').length === 1) {
          let product = productRow[i].querySelectorAll('.productContainer').item(0)
          product.style.width = '100%'
          product.parentElement.style.width = '100%'
          if(product.style.width === '100%') {
            if(window.innerWidth < 768 && window.innerWidth > 350) {
              product.lastChild.style.display = 'none'
              product.childNodes[0].lastChild.style.flexDirection = 'column'
              product.childNodes[0].childNodes[0].style.width = '20em'
              product.childNodes[0].childNodes[0].style.height = '16em'
              product.childNodes[0].childNodes[0].style.bottom = '8em'
              product.childNodes[0].childNodes[0].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.bottom = '8em'
              product.childNodes[0].childNodes[2].style.left = 'auto'
              product.childNodes[0].childNodes[2].style.position = 'absolute'
              product.childNodes[0].childNodes[2].style.bottom = '1em'
              product.childNodes[0].childNodes[2].style.right = 'auto'
            } else if( window.innerWidth <= 350) {
              product.childNodes[0].childNodes[0].style.width = '15em'
              product.childNodes[0].childNodes[0].style.height = '16em'
              product.lastChild.style.display = 'none'
              product.childNodes[0].lastChild.style.flexDirection = 'column'
              product.childNodes[0].childNodes[0].style.bottom = '8em'
              product.childNodes[0].childNodes[0].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.bottom = '8em'
              product.childNodes[0].childNodes[2].style.left = 'auto'
              product.childNodes[0].childNodes[2].style.position = 'absolute'
              product.childNodes[0].childNodes[2].style.bottom = '1em'
              product.childNodes[0].childNodes[2].style.right = 'auto'
            } else {
              product.lastChild.style.display = 'flex'
              product.childNodes[0].lastChild.style.flexDirection = 'row'
              product.childNodes[0].childNodes[0].style.width = '20em'
              product.childNodes[0].childNodes[0].style.height = '16em'
              product.childNodes[0].childNodes[0].style.position = 'absolute'          
              product.childNodes[0].childNodes[0].style.top = '0'
              product.childNodes[0].childNodes[1].style.position = 'absolute'          
              product.childNodes[0].childNodes[1].style.bottom = '6em'
              product.childNodes[0].childNodes[2].style.position = 'absolute'          
              product.childNodes[0].childNodes[2].style.bottom = '2em'
              product.childNodes[0].childNodes[2].style.left = '4em'
              product.childNodes[0].childNodes[2].style.width = '30em'
            }
          } else {
            product.lastChild.style.display = 'none'
          } 
        } else {
          let product = productRow[i].querySelectorAll('.productContainer').item(0)
          product.style.width = '15em'
          product.lastChild.style.display = 'none'
        }
      }
    }
  })

  return (
    <ProductContainer className='productContainer'>
      <div className='productInfo'>        
        <div className='productImg'>
          <Link to={`/${title}`}>
            <img src={image} alt='' />
          </Link>
        </div>
        <Link to={`/${title}`}><div className='productTitle'>{title}</div></Link>
        <div className='productPriceRatingButtons'>
          <div className='productPriceRating'>
            <div className='productPrice'>
              <div className='currency'>₹</div>
              <div className='price'>
                {
                 price.toString().length === 7 ?
                 price.toString().slice(0, 2) + ',' + price.toString().slice(2, 4) + ',' + price.toString().slice(-3) :

                 price.toString().length === 6 ?
                   price.toString().slice(0, 1) + ',' + price.toString().slice(1, 3) + ',' + price.toString().slice(-3):

                   price.toString().length === 5 ?
                     price.toString().slice(0, 2) + ',' + price.toString().slice(-3) :

                     price.toString().length === 3 ?
                       price :
                       price.toString().slice(0, 1) + ',' + price.toString().slice(-3)
                }
              </div>
            </div>
            <div className='productRating'>
              {
                Array(rating)
                .fill()
                .map((_, i) => (
                  <p key={i}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 256 256">
                    <defs>
                    </defs>
                    <g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                      <path d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c -1.398 0 -2.649 0.778 -3.268 2.031 L 29.959 27.911 c -0.099 0.2 -0.29 0.338 -0.51 0.37 L 3.122 32.107 c -1.383 0.201 -2.509 1.151 -2.941 2.48 c -0.432 1.329 -0.079 2.76 0.922 3.736 l 19.049 18.569 c 0.16 0.156 0.233 0.38 0.195 0.599 L 15.85 83.71 c -0.236 1.377 0.319 2.743 1.449 3.564 c 1.129 0.821 2.6 0.927 3.839 0.279 l 23.547 -12.381 c 0.098 -0.051 0.206 -0.077 0.314 -0.077 C 51.721 53.905 50.301 28.878 45 2.024 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,200,80)', fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                      <path d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c 1.398 0 2.649 0.778 3.268 2.031 l 11.773 23.856 c 0.099 0.2 0.29 0.338 0.51 0.37 l 26.326 3.826 c 1.383 0.201 2.509 1.151 2.941 2.48 c 0.432 1.329 0.079 2.76 -0.922 3.736 L 69.847 56.892 c -0.16 0.156 -0.233 0.38 -0.195 0.599 L 74.15 83.71 c 0.236 1.377 -0.319 2.743 -1.449 3.564 c -1.129 0.821 -2.6 0.927 -3.839 0.279 L 45.315 75.172 c -0.098 -0.051 -0.206 -0.077 -0.314 -0.077 C 37.08 54.593 38.849 29.395 45 2.024 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,220,100)', fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                    </g>
                    </svg>
                  </p>
                ))
              }
            </div>
          </div>
          <button className='addToCart' onClick={addToCart}>Add to Cart</button>
          <div className='noOfItemsProduct'>
            <button className='removeProductinCart' onClick={removeFromCart}>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="14" height="14" viewBox="0 0 256 256">
                <g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                  <path d="M 86.5 48.5 h -83 C 1.567 48.5 0 46.933 0 45 s 1.567 -3.5 3.5 -3.5 h 83 c 1.933 0 3.5 1.567 3.5 3.5 S 88.433 48.5 86.5 48.5 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                  <path d="M 86.5 48.5 h -83 C 1.567 48.5 0 46.933 0 45 s 1.567 -3.5 3.5 -3.5 h 83 c 1.933 0 3.5 1.567 3.5 3.5 S 88.433 48.5 86.5 48.5 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                </g>
              </svg>
            </button>
            <input type='number' min={0} max={10} value={filtered.length} onChange={() => filtered.length} className='quantityOfItems'/>
            <button className='addProductinCart' onClick={addToCart}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="14" height="14" viewBox="0 0 256 256">
                <g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                    <path d="M 45 90 c -2.761 0 -5 -2.238 -5 -5 V 5 c 0 -2.761 2.239 -5 5 -5 c 2.762 0 5 2.239 5 5 v 80 C 50 87.762 47.762 90 45 90 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                    <path d="M 85 50 H 5 c -2.761 0 -5 -2.238 -5 -5 c 0 -2.761 2.239 -5 5 -5 h 80 c 2.762 0 5 2.239 5 5 C 90 47.762 87.762 50 85 50 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                </g>
                </svg>
            </button>
          </div>
        </div>
      </div>
      <div className='productInfoDetailed'>
        <div className='descTitle'>Description:</div>
        <div className='productDesc'>{productDescription}</div>
      </div>
    </ProductContainer>
  )
}

export default Product

const ProductContainer = styled.div``