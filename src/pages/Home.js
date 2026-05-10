import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../components/ImgSlider/ImageSlider';
import Product from '../components/Products/Product';
import ProductDetails from '../productData';
import { PreviousIcon } from '../components/Icons/Icons';

const Home = () => {
  const uniqueProducts = useMemo(() => {
    const uniqueCategory = new Set();
    return ProductDetails.filter(product => {
      if (!uniqueCategory.has(product.category)) {
        uniqueCategory.add(product.category);
        return true;
      }
      return false;
    }).sort((a, b) => a.category.localeCompare(b.category));
  }, []);

  return (
    <div className="home">
      <ImageSlider />
      <div className="parentHomeRow">
        {uniqueProducts.map(productCategory => (
          <div key={productCategory.id}>
            <div className="categoryHeader">
              <Link to={`/category/${productCategory.category}`}>
                {productCategory.category}
                <PreviousIcon />
              </Link>
            </div>
            <div className="homeRow">
              {ProductDetails.filter(product => product.category === productCategory.category).map(productData => (
                <Product
                  key={productData.id}
                  id={productData.id}
                  title={productData.title}
                  image={productData.image}
                  price={productData.price}
                  rating={productData.rating}
                  productDescription={productData.productDescription}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;