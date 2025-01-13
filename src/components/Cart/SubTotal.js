import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../../reducer'
import { useStateValue } from '../../StateProvider'
import './SubTotal.css'

function SubTotal() {

  const [{basket}] = useStateValue()

  return (
    <div className='subTotal'>
        <CurrencyFormat 
            renderText={(value) => (
                <>
                    <p>
                        SubTotal ({basket.length} items):
                        <strong> {value}</strong>
                    </p>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={'text'}
            thousandSpacing='2s'
            thousandSeparator={true}
            prefix={'₹'}
        />
        <button className='checkOutButton'>Proceed to Checkout</button>
    </div>
  )
}

export default SubTotal