import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { StarIcon, FilterIcon } from '../Icons/Icons';
import './SearchDetails.css';

function SearchDetails() {
  const [{ productDetails }] = useStateValue();
  const { category, brandName, subBrand } = useParams();
  const pathName = useMemo(() => {
    if (category) return decodeURIComponent(category);
    if (brandName && subBrand) return `${decodeURIComponent(brandName)} ${decodeURIComponent(subBrand)}`;
    return '';
  }, [category, brandName, subBrand]);

  const [checked, setChecked] = useState([]);
  const [ratingButton, setRatingButton] = useState([]);
  const [rangeValue, setRangeValue] = useState(0);
  const [sort, setSort] = useState('All');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1090);
  const [isFilterOpen, setIsFilterOpen] = useState(window.innerWidth > 1090);
  const [isFilterVisible, setIsFilterVisible] = useState(window.innerWidth > 1090);
  const filterRef = useRef(null);

  const sortByOptions = ['All', 'Featured', 'Price: Low to High', 'Price: High to Low', 'Newest Arrivals'];
  const ratingOptions = [5, 4, 3, 2, 1];

  // Toggle filter visibility on mobile
  const toggleFilter = () => {
    if (isMobileView) {
      if (isFilterOpen) {
        // Start closing animation
        setIsFilterOpen(false);
      } else {
        // Open filter immediately
        setIsFilterOpen(true);
        setIsFilterVisible(true);
      }
    }
  };

  // Handle animation end to hide filter after closing
  useEffect(() => {
    const filterElement = filterRef.current;
    if (!filterElement) return;

    const handleAnimationEnd = (event) => {
      if (event.animationName === 'filterBlur' && isMobileView && !isFilterOpen) {
        setIsFilterVisible(false);
      }
    };

    filterElement.addEventListener('animationend', handleAnimationEnd);
    return () => {
      filterElement.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isMobileView, isFilterOpen]);

  // Handle click outside to close filter in mobile view
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileView && filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileView]);

  // Handle window resize to update filter visibility and view mode
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 1090;
      setIsMobileView(isNowMobile);
      setIsFilterOpen(isNowMobile ? false : true);
      setIsFilterVisible(isNowMobile ? false : true);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle brand checkbox changes
  const handleBrandChange = (e) => {
    const value = e.target.value;
    setChecked(prev =>
      e.target.checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  // Handle rating checkbox changes
  const handleRatingChange = (e) => {
    const value = Number(e.target.value);
    setRatingButton(prev =>
      e.target.checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  // Handle range slider change
  const handleRangeChange = (e) => {
    setRangeValue(Number(e.target.value));
  };

  // Compute unique brands
  const uniqueBrands = useMemo(() => {
    const brands = productDetails
      .filter(product => product.category === pathName)
      .map(product => product.brand.brandName)
      .filter((brand, index, self) => brand && self.indexOf(brand) === index);
    return brands.sort();
  }, [productDetails, pathName]);

  // Compute min and max prices
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = productDetails
      .filter(product =>
        product.category === pathName ||
        `${product.brand.brandName} ${product.brand.subBrand}` === pathName
      )
      .map(product => product.price);
    return {
      minPrice: prices.length > 0 ? Math.min(...prices) : 0,
      maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
    };
  }, [productDetails, pathName]);

  // Initialize rangeValue
  useEffect(() => {
    setRangeValue(maxPrice + 1000);
  }, [maxPrice]);

  // Compute filtered and sorted products
  const filteredProducts = useMemo(() => {
    let products = [...productDetails];

    // Filter by category or brand
    products = products.filter(product =>
      product.category === pathName ||
      `${product.brand.brandName} ${product.brand.subBrand}` === pathName
    );

    // Apply sort
    products = products.sort((a, b) => {
      if (sort === 'Featured') return a.featured === 'yes' ? -1 : 1;
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      if (sort === 'Newest Arrivals') return a.newArrival === 'yes' ? -1 : 1;
      return a.title.localeCompare(b.title);
    });

    // Apply brand filter
    if (checked.length > 0) {
      products = products.filter(product => checked.includes(product.brand.brandName));
    }

    // Apply rating filter
    if (ratingButton.length > 0) {
      products = products.filter(product => ratingButton.includes(product.rating));
    }

    // Apply price range filter
    products = products.filter(product => product.price <= rangeValue);

    return products;
  }, [productDetails, pathName, sort, checked, ratingButton, rangeValue]);

  // Compute range ticks
  const rangeTicks = useMemo(() => {
    const ticks = [];
    const delta = (maxPrice - minPrice) / 19;
    for (let i = 0; i < 20; i++) {
      const value = Math.round(minPrice + i * delta);
      ticks.push({
        value,
        label: value.toLocaleString('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      });
    }
    return ticks;
  }, [minPrice, maxPrice]);

  return (
    <div className="searchDetailsContainer">
      <div
        className={`searchFilter ${isFilterOpen ? 'filterFocus' : 'filterBlur'} ${isMobileView ? 'mobile' : 'desktop'
          } ${!isFilterVisible ? 'hidden' : ''}`}
        ref={filterRef}
      >
        <div className="custom-select">
          <label htmlFor="sortBy">Sort By:</label>
          <select id="sortBy" value={sort} onChange={handleSortChange} aria-label="Sort products">
            {sortByOptions.map(item => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
          <span className="custom-arrow" />
        </div>
        <div className="brandFilter">
          {uniqueBrands.length > 0 && <div className="brandFilterHeader">Brands:</div>}
          {uniqueBrands.map(brand => (
            <div className="brandContainer" key={brand}>
              <input
                type="checkbox"
                id={brand}
                value={brand}
                onChange={handleBrandChange}
                aria-label={`Filter by ${brand}`}
              />
              <label htmlFor={brand}>{brand}</label>
            </div>
          ))}
          <div className="brandFilterHeader">
            Price: (Under: {rangeValue.toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })})
          </div>
          <div className="brandRangeContainer">
            <input
              type="range"
              className="range"
              min={minPrice}
              max={maxPrice}
              value={rangeValue}
              onChange={handleRangeChange}
              list="ticks"
              aria-label="Price range filter"
            />
            <datalist id="ticks">
              {rangeTicks.map(tick => (
                <option value={tick.value} label={tick.label} key={tick.value} />
              ))}
            </datalist>
          </div>
          <div className="brandFilterHeader">Customer Review:</div>
          <div className="brandReviewContainer">
            {ratingOptions.map(star => (
              <div className="brandReviewInput" key={star}>
                <input
                  type="checkbox"
                  id={`rating-${star}`}
                  value={star}
                  onChange={handleRatingChange}
                  aria-label={`Filter by ${star} star rating`}
                />
                <label htmlFor={`rating-${star}`}>
                  {Array(star).fill().map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="searchFilterDetails">
        <div className="filterButtonContainer">
          <button
            className="filterButton"
            onClick={toggleFilter}
            aria-label={isFilterOpen ? 'Close filters' : 'Open filters'}
          >
            <FilterIcon />
          </button>
        </div>
        {filteredProducts.length === 0 && (
          <div>No products found for this category or brand.</div>
        )}
        {filteredProducts.map(product => (
          <Link to={`/product/${encodeURIComponent(product.title)}`} key={product.id}>
            <div className="searchProductContainer">
              {product.featured === 'yes' && <div className="featured">FEATURED</div>}
              <div className="imgContainer">
                <img
                  src={`/${product.image}` || 'https://via.placeholder.com/150?text=No+Image'}
                  alt={product.title}
                  onError={e => {
                    e.target.src = 'https://via.placeholder.com/150?text=Image+Failed';
                  }}
                />
              </div>
              <div className="productDetails">
                <div className="productTitle">{product.title}</div>
                <div className="productDesc">{product.productDescription}</div>
                <div className="productPrice">
                  {product.price.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                  {product.newArrival === 'yes' && (
                    <div className="newArrivals">NEW ARRIVAL</div>
                  )}
                </div>
                <div className="productRating">
                  {Array(product.rating)
                    .fill()
                    .map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchDetails;