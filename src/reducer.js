import ProductDetails from './productData'

export const initialState = {
    basket: [],
    productDetails: [],
    user: null,
}

ProductDetails.map(product => {
    initialState.productDetails.push(product)
    return null
})

export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
    switch(action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                basket: [...state.basket, action.item]
            }

        case "REMOVE_FROM_CART":
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            )
            let newBasket = [...state.basket]

            if(index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.warn(
                    `Can't remove product (${action.title}) as it is not in the cart!`
                )
            }

            return {
                ...state,
                basket: newBasket
            }

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        default:
            return state
    }
}


export default reducer