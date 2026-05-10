import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { StarIcon, MinusIcon, PlusIcon } from '../Icons/Icons';
import './Product.css';

function Product({ id, image, title, price, rating, productDescription }) {
  const [{ basket }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(basket.filter(item => item.id === id).length);
  }, [basket, id]);

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
    setQuantity(prev => prev + 1);
  };

  const removeFromCart = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      id,
    });
    setQuantity(prev => Math.max(0, prev - 1));
  };

  const formattedPrice = price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  let displayImage = `/${image}`;

  const MAX_TITLE_LENGTH = 20;
  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
      ? title.slice(0, MAX_TITLE_LENGTH) + '...'
      : title;


  return (
    <div className="productContainer">
      <div className="productInfo">
        <div className="productImg">
          <Link to={`/product/${encodeURIComponent(title)}`}>
            <img
              src={displayImage}
              alt={title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=Product+Error';
                e.target.style.display = 'block';
              }}
              style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
            />
            <div className="productTitle" title={title}>{truncatedTitle}</div>
          </Link>
        </div>
        <div className="productPriceRatingButtons">
          <div className="productPriceRating">
            <div className="productPrice">{formattedPrice}</div>
            <div className="productRating">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <StarIcon key={i} />
                ))}
            </div>
          </div>
          <button
            className="addToCart"
            onClick={addToCart}
            style={{ display: quantity > 0 ? 'none' : 'block' }}
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
          <div
            className="noOfItemsProduct"
            style={{ display: quantity > 0 ? 'flex' : 'none' }}
          >
            <button
              className="removeProductinCart"
              onClick={removeFromCart}
              aria-label="Remove one item from cart"
            >
              <MinusIcon />
            </button>
            <input
              type="number"
              min={0}
              max={10}
              value={quantity}
              onChange={e => setQuantity(Math.min(10, Math.max(0, Number(e.target.value))))}
              className="quantityOfItems"
              aria-label="Quantity in cart"
            />
            <button
              className="addProductinCart"
              onClick={addToCart}
              aria-label="Add one more item to cart"
            >
              <PlusIcon />
            </button>
          </div>
        </div>
        <div className="productInfoDetailed">
          <div className="descTitle">Description:</div>
          <div className="productDesc">{productDescription}</div>
        </div>
      </div>
    </div>
  );
}

export default Product;