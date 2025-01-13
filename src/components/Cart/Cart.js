import React from 'react'
import { useStateValue } from '../../StateProvider'
import { Link } from 'react-router-dom'
import './Cart.css'
import CartProduct from './CartProduct'
import SubTotal from './SubTotal'

function CheckoutComponent() {
  const [{basket}] = useStateValue()
  const uniqueIds = []

  const uniqueItems = basket.filter(element => {
    const isDuplicate = uniqueIds.includes(element.id)

    if (!isDuplicate) {
      uniqueIds.push(element.id)

      return true
    }
    return false
  })

  return (
    <div className='checkoutContainer'>
        <div className='checkoutLeft'>
          
          {basket.length <= 0 &&
            <div>
              <h2 className='checkoutTitle'>Your Epicstore Cart is Empty</h2>
              <p className='checkoutEmptyPara'>
              Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.<br />
              Continue shopping on the <Link to='/'>Epicstore</Link> homepage
              </p> 
            </div>
          }

          {basket.length > 0 &&
            <h2 className='checkoutTitle'>Your Epicstore Shopping Cart</h2>
          }
          
          {
            uniqueItems.map(item => (
              <div key={item.id}>
                <CartProduct 
                  id = {item.id}
                  title = {item.title}
                  image = {item.image}
                  price = {item.price}
                  rating = {item.rating}
                />
              </div>
            ))
          }
          
        </div>
        <div className='checkoutRight'>
          <SubTotal />
        </div>
    </div>
  )
}

export default CheckoutComponent