import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { SearchIcon } from '../Icons/Icons';
import './SearchBar.css';

function SearchBar() {
  const [{ productDetails }] = useStateValue();
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isSuggestionClicked, setIsSuggestionClicked] = useState(false); // New state for tracking suggestion clicks/taps
  const searchBarRef = useRef(null);
  const suggRef = useRef(null);
  const suggestionRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const uniqueCategories = [...new Set(productDetails.map(item => item.category))];
  const uniqueBrands = [...new Set(productDetails.map(item => `${item.brand.brandName} ${item.brand.subBrand}`))];

  const animationConfig = {
    large: { focus: 'suggFocusAnimation', blur: 'suggBlurAnimation', topFocus: '5.5em', topBlur: '2.2em' },
    medium: { focus: 'suggSmallFocusAnimation', blur: 'suggSmallBlurAnimation', topFocus: '9.5em', topBlur: '6em' },
    small: { focus: 'suggExtraSmallFocusAnimation', blur: 'suggExtraSmallBlurAnimation', topFocus: '11em', topBlur: '6em' },
    xsmall: { focus: 'suggVeryExtraSmallFocusAnimation', blur: 'suggVeryExtraSmallBlurAnimation', topFocus: '10em', topBlur: '6em' },
  };

  const getAnimationConfig = () => {
    const width = window.innerWidth;
    if (width >= 1070) return animationConfig.large;
    if (width > 780) return animationConfig.medium;
    if (width > 620) return animationConfig.small;
    return animationConfig.xsmall;
  };

  const handleFocus = () => {
    const config = getAnimationConfig();
    if (suggRef.current) {
      suggRef.current.style.display = 'flex';
      suggRef.current.classList.add(config.focus);
      suggRef.current.classList.remove(config.blur);
    }
    setSearchTerm('');
    setFocusedIndex(-1);
  };

  const handleBlur = (event) => {
    const config = getAnimationConfig();
    if (isSuggestionClicked || (suggRef.current && event.relatedTarget && suggRef.current.contains(event.relatedTarget))) {
      setIsSuggestionClicked(false); // Reset the flag
      return;
    }
    if (suggRef.current) {
      suggRef.current.classList.add(config.blur);
      suggRef.current.classList.remove(config.focus);
      setTimeout(() => {
        if (suggRef.current) suggRef.current.style.display = 'none';
      }, 300); // Increased delay for mobile compatibility
    }
    setFocusedIndex(-1);
  };

  const hideSuggestions = () => {
    if (suggRef.current) {
      suggRef.current.style.display = 'none';
      suggRef.current.classList.remove(getAnimationConfig().focus);
      suggRef.current.classList.add(getAnimationConfig().blur);
    }
    setFocusedIndex(-1);
    if (searchBarRef.current) {
      searchBarRef.current.blur();
    }
  };

  const filteredCategories = uniqueCategories
    .filter(category => searchTerm === '' || category.toLowerCase().startsWith(searchTerm.toLowerCase()) || category.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  const filteredBrands = uniqueBrands
    .filter(brand =>
      searchTerm !== '' &&
      (brand.toLowerCase().startsWith(searchTerm.toLowerCase()) || brand.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort();

  const filteredProducts = productDetails
    .filter(product =>
      searchTerm !== '' &&
      (product.title.toLowerCase().startsWith(searchTerm.toLowerCase()) || product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  const allSuggestions = [
    ...filteredCategories.map(cat => ({ type: 'category', value: cat, to: `/category/${encodeURIComponent(cat)}` })),
    ...filteredBrands.map(brand => {
      const [brandName, subBrand] = brand.split(' ');
      return { type: 'brand', value: brand, to: `/brand/${encodeURIComponent(brandName)}/${encodeURIComponent(subBrand)}` };
    }),
    ...filteredProducts.map(prod => ({ type: 'product', value: prod.title, to: `/product/${encodeURIComponent(prod.title)}` })),
  ];

  const hasSuggestions = allSuggestions.length > 0;

  const handleKeyDown = (event) => {
    if (!hasSuggestions) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusedIndex(prev => {
        const newIndex = prev < allSuggestions.length - 1 ? prev + 1 : 0;
        return newIndex;
      });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusedIndex(prev => {
        const newIndex = prev > 0 ? prev - 1 : allSuggestions.length - 1;
        return newIndex;
      });
    } else if (event.key === 'Enter' && focusedIndex !== -1) {
      event.preventDefault();
      const selectedSuggestion = allSuggestions[focusedIndex];
      setSearchTerm(selectedSuggestion.value);
      hideSuggestions();
      navigate(selectedSuggestion.to);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setSearchTerm('');
      setFocusedIndex(-1);
      if (suggRef.current) {
        suggRef.current.style.display = 'none';
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (focusedIndex >= 0 && suggestionRefs.current[focusedIndex]) {
      suggestionRefs.current[focusedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [focusedIndex]);

  useEffect(() => {
    suggestionRefs.current = suggestionRefs.current.slice(0, allSuggestions.length);
  }, [allSuggestions.length]);

  useEffect(() => {
    const searchBar = searchBarRef.current;
    const handleResize = () => {
      searchBar.removeEventListener('focus', handleFocus);
      searchBar.removeEventListener('blur', handleBlur);
      searchBar.removeEventListener('keydown', handleKeyDown);
      searchBar.addEventListener('focus', handleFocus);
      searchBar.addEventListener('blur', handleBlur);
      searchBar.addEventListener('keydown', handleKeyDown);
    };

    searchBar.addEventListener('focus', handleFocus);
    searchBar.addEventListener('blur', handleBlur);
    searchBar.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      searchBar.removeEventListener('focus', handleFocus);
      searchBar.removeEventListener('blur', handleBlur);
      searchBar.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [allSuggestions]);

  return (
    <>
      <input
        type="text"
        id="searchBar"
        placeholder="Search"
        name="search"
        autoComplete="off"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          setFocusedIndex(-1);
        }}
        ref={searchBarRef}
      />
      <Link to={`/search/${encodeURIComponent(searchTerm)}`}>
        <button className="searchButton" htmlFor="search">
          <SearchIcon />
        </button>
      </Link>
      <div className="searchContainer" ref={suggRef}>
        {hasSuggestions ? (
          <>
            {filteredCategories.length > 0 && (
              <div className="suggestionGroup">
                <div className="searchCategories">Categories</div>
                {filteredCategories.map((category, index) => (
                  <Link
                    to={`/category/${encodeURIComponent(category)}`}
                    key={category}
                    className={`suggestions ${focusedIndex === index ? 'focused' : ''}`}
                    onClick={() => {
                      setSearchTerm(category);
                      hideSuggestions();
                    }}
                    onTouchStart={() => setIsSuggestionClicked(true)} // For mobile
                    onMouseDown={() => setIsSuggestionClicked(true)} // For desktop
                    ref={el => (suggestionRefs.current[index] = el)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
            {filteredBrands.length > 0 && (
              <div className="suggestionGroup">
                <div className="searchCategories">Brands</div>
                {filteredBrands.map((brand, index) => {
                  const [brandName, subBrand] = brand.split(' ');
                  const suggestionIndex = index + filteredCategories.length;
                  return (
                    <Link
                      to={`/brand/${encodeURIComponent(brandName)}/${encodeURIComponent(subBrand)}`}
                      key={brand}
                      className={`suggestions ${focusedIndex === suggestionIndex ? 'focused' : ''}`}
                      onClick={() => {
                        setSearchTerm(brand);
                        hideSuggestions();
                      }}
                      onTouchStart={() => setIsSuggestionClicked(true)} // For mobile
                      onMouseDown={() => setIsSuggestionClicked(true)} // For desktop
                      ref={el => (suggestionRefs.current[suggestionIndex] = el)}
                    >
                      {brand}
                    </Link>
                  );
                })}
              </div>
            )}
            {filteredProducts.length > 0 && (
              <div className="suggestionGroup">
                <div className="searchCategories">Products</div>
                {filteredProducts.map((product, index) => {
                  const suggestionIndex = index + filteredCategories.length + filteredBrands.length;
                  return (
                    <Link
                      to={`/product/${encodeURIComponent(product.title)}`}
                      key={product.id}
                      className={`suggestions ${focusedIndex === suggestionIndex ? 'focused' : ''}`}
                      onClick={() => {
                        setSearchTerm(product.title);
                        hideSuggestions();
                      }}
                      onTouchStart={() => setIsSuggestionClicked(true)} // For mobile
                      onMouseDown={() => setIsSuggestionClicked(true)} // For desktop
                      ref={el => (suggestionRefs.current[suggestionIndex] = el)}
                    >
                      {product.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          searchTerm && (
            <div className="suggestionGroup">
              <div className="searchCategories">No results found</div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default SearchBar;