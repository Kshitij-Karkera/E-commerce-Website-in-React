import { useState, useEffect } from 'react';
import { useStateValue } from '../../StateProvider';
import { Link, useNavigate } from 'react-router-dom';
import { StarIcon, MinusIcon, PlusIcon } from '../Icons/Icons';
import Product from './Product';
import './ProductDetails.css';

function ProductDetails({ product }) {
  const [{ basket, productDetails }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(
    basket.filter(item => item.id === product.id).length
  );

  useEffect(() => {
    setQuantity(basket.filter(item => item.id === product.id).length);
  }, [basket, product.id]);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating,
      },
    });
    setQuantity(prev => prev + 1);
  };

  const handleRemoveFromCart = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      id: product.id,
    });
    setQuantity(prev => Math.max(0, prev - 1));
  };

  const formattedPrice = product.price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const similarProducts = productDetails.filter(
    p =>
      p.title !== product.title &&
      p.brand.brandName + ' ' + p.brand.subBrand === product.brand.brandName + ' ' + p.brand.subBrand &&
      p.category === product.category
  );

  const imageSrc = product.image && typeof product.image === 'string' && product.image.trim() !== ''
    ? `/${product.image}`
    : 'https://via.placeholder.com/150?text=No+Image';


  return (
    <>
      <div className="productDetailsContainer">
        <div className="productDetailsImgContainer">
          <img
            src={imageSrc}
            alt={product.title || 'Product Image'}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150?text=Image+Failed';
              e.target.style.display = 'block';
            }}
            style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }} // Ensure visibility
          />
        </div>
        <div className="productDetailsFunction">
          <div className="productDetails">
            <div className="productDetailsTitle">{product.title}</div>
            <div className="productDetailsPrice">{formattedPrice}</div>
            <div className="productRating">
              {Array(product.rating)
                .fill()
                .map((_, i) => (
                  <StarIcon key={i} />
                ))}
            </div>
            <div className="productDetailsDesc">{product.productDescription}</div>
          </div>
          <div className="productFunctions">
            <button
              className="addToCart"
              onClick={handleAddToCart}
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
                onClick={handleRemoveFromCart}
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
                onClick={handleAddToCart}
                aria-label="Add one more item to cart"
              >
                <PlusIcon />
              </button>
            </div>
            <button
              className="buyNow"
              onClick={() => navigate('/checkout')}
              aria-label="Buy now"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {similarProducts.length > 0 && (
        <div className="moreLikeThis">
          <div className="moreLikeThisTitle">Similar Products</div>
          <div className="homeRow">
            {similarProducts.map(productData => (
              <div key={productData.id}>
                <Product
                  id={productData.id}
                  title={productData.title}
                  image={productData.image}
                  price={productData.price}
                  rating={productData.rating}
                  productDescription={productData.productDescription}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;