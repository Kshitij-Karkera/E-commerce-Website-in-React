import React, { useState } from 'react'
import { useEffect } from 'react'
import './SearchDetails.css'
import {useStateValue} from '../../StateProvider'
import { Link } from 'react-router-dom'

function SearchDetails() {
  const [{productDetails}] = useStateValue()
  const sortedproductDetails = productDetails.sort((a, b) => a.title > b.title ? 1 : -1)

  const [checked, setchecked] = useState([])

  const sortByOptions = ['All','Featured', 'Price: Low to High', 'Price: High to Low', 'Newest Arrivals']
  const [sort, setsort] = useState(sortByOptions[0])

  const [ratingButton, setratingButton] = useState([])

  let rating = [5, 4, 3, 2, 1]

  let pathName = window.location.pathname.slice(1).replaceAll('%20', ' ')

  let uniqueCategory = []

  const uniqueProducts = productDetails.map((product) => {
    if(product.category === pathName) {
      return product.brand.brandName
    } else {
      return null
    }
  }).filter(element => {
    const isDuplicate = uniqueCategory.includes(element)
    if (!isDuplicate) {
      uniqueCategory.push(element);
      return true;
    }
    return false;
  })

  const results = uniqueProducts.filter(element => {
    return element !== null;
  }).sort()

  const rangeSlider = (e) => {
    setrangeValue(e.target.value)
  }
  
  const maxRangeValue = sortedproductDetails
  .sort((a, b) => a.featured > b.featured ? -1 : 1)
  .sort((a, b) => {
    if(sort === 'Price: Low to High') {
      return a.price - b.price
    } else if (sort === 'Price: High to Low') {
      return b.price - a.price
    } else {
      return a
    }
  })
  .filter(product => {
    if(product.category === pathName) {
      return product.category === pathName
    } else if (product.brand.brandName + ' ' + product.brand.subBrand === pathName) {
      return product.brand.brandName + ' ' + product.brand.subBrand === pathName
    } else {
      return null
    }
  })
  .filter(product => {
    if(sort === 'Featured') {
      return product.featured === 'yes'
    } else if(sort === 'Newest Arrivals') {
      return product.newArrival === 'yes'
    } else {
      return product
    }
  })
  .filter(product => {
    if(checked.length === 0) {
      return product
    } else {
      return checked.includes(product.brand.brandName)
    }
  })
  .reduce((a, b) => a.price > b.price ? a : b)

  const minRangeValue = sortedproductDetails
  .sort((a, b) => a.featured > b.featured ? -1 : 1)
  .sort((a, b) => {
    if(sort === 'Price: Low to High') {
      return a.price - b.price
    } else if (sort === 'Price: High to Low') {
      return b.price - a.price
    } else {
      return a
    }
  })
  .filter(product => product.category === pathName || product.brand.brandName + ' ' + product.brand.subBrand === pathName)
  .filter(product => {
    if(sort === 'Featured') {
      return product.featured === 'yes'
    } else if(sort === 'Newest Arrivals') {
      return product.newArrival === 'yes'
    } else {
      return product
    }
  })
  .filter(product => {
    if(checked.length === 0) {
      return product
    } else {
      return checked.includes(product.brand.brandName)
    }
  })
  .reduce((a, b) => a.price > b.price ? b : a)
  
  const [rangeValue, setrangeValue] = useState(maxRangeValue.price + 1000)

  const pushValue = (e) => {
    if(e.target.checked) {
      setchecked(checked => [...checked, e.target.value])
    } else if(!e.target.checked) {
      setchecked((brand) => brand.filter((item) => item !== e.target.value))
    }
  }

  const ratingFilter = (e) => {
    if(e.target.checked) {
      setratingButton(ratingButton => [...ratingButton, e.target.value])
    } else if(!e.target.checked) {
      setratingButton((brand) => brand.filter((item) => item !== e.target.value))
    }
  }

  const sortByFunc = (e) => {
    setsort(e.target.value)
  }

  useEffect(() => {
    let searchFilter = document.querySelector('.searchFilter')
    let filterButton = document.querySelector('.filterButton')

    if(window.innerWidth <= 1000) {
      filterButton.addEventListener('focus', () => {
        setTimeout(() => {
          searchFilter.style.display = 'flex'
        }, 100)
        searchFilter.classList.add('filterFocus')
        searchFilter.classList.remove('filterBlur')
      })
  
      filterButton.addEventListener('blur', () => {
        setTimeout(() => {
          searchFilter.style.display = 'none'
        }, 1000)
        searchFilter.classList.add('filterBlur')
        searchFilter.classList.remove('filterFocus')
      })
    } else {
        searchFilter.style.display = 'flex'
      searchFilter.classList.remove('filterBlur')
      searchFilter.classList.remove('filterFocus')
    }

    window.addEventListener('resize', () => {
      if(window.innerWidth <= 1000) {
        filterButton.addEventListener('focus', () => {
          setTimeout(() => {
            searchFilter.style.display = 'flex'
          }, 100)
          searchFilter.classList.add('filterFocus')
          searchFilter.classList.remove('filterBlur')
        })
    
        filterButton.addEventListener('blur', () => {
          setTimeout(() => {
            searchFilter.style.display = 'none'
          }, 1000)
          searchFilter.classList.add('filterBlur')
          searchFilter.classList.remove('filterFocus')
        })
      } else {
        searchFilter.style.display = 'flex'
        searchFilter.classList.remove('filterBlur')
        searchFilter.classList.remove('filterFocus')
      }
    })

    window.addEventListener('load', () => {
      if(window.innerWidth <= 1000) {
        filterButton.addEventListener('focus', () => {
          setTimeout(() => {
            searchFilter.style.display = 'flex'
          }, 100)
          searchFilter.classList.add('filterFocus')
          searchFilter.classList.remove('filterBlur')
        })
    
        filterButton.addEventListener('blur', () => {
          setTimeout(() => {
            searchFilter.style.display = 'none'
          }, 1000)
          searchFilter.classList.add('filterBlur')
          searchFilter.classList.remove('filterFocus')
        })
      } else {
        searchFilter.style.display = 'flex'
        searchFilter.classList.remove('filterBlur')
        searchFilter.classList.remove('filterFocus')
      }
    })
  })

  function split(left, right, parts) {
    var result = [],
        delta = (right - left) / (parts - 1)
    while (left < right) {
        result.push(left)
        left += delta
    }
    result.push(right)
    return result
  }

  useEffect(() => {
    setrangeValue(maxRangeValue.price + 1000)
  }, [maxRangeValue])

  return (
    <div className='searchDetailsContainer'>
        <div className='searchFilter'>
          <div className='custom-select'>
            <label htmlFor="sortBy">Sort By:</label>
            <select value={sort} onChange={sortByFunc}>
              {
                sortByOptions.map(item => {
                  return <option value={item} key={item}>{item}</option>
                })
              }
            </select>
            <span className='custom-arrow'></span>
          </div>
          <div className='brandFilter'>
            {
              results.length === 0 ?
                null:
                <div className='brandFilterHeader'>Brands:</div>
            }
            
            {
              results.map(product => {
                return (
                  <div className='brandContainer' key={product}>
                    <input type='checkbox' name={product} id={product} value={product} onChange={pushValue} />
                    <label htmlFor={product}>{product}</label>
                  </div>
                )
              })
            }
            <div className='brandFilterHeader'>Price: (Under: ₹{
              rangeValue.toString().length === 7 ?
                rangeValue.toString().slice(0, 2) + ',' + rangeValue.toString().slice(2, 4) + ',000' :

                rangeValue.toString().length === 6 ?
                  rangeValue.toString().slice(0, 1) + ',' + rangeValue.toString().slice(1, 3) + ',000' :

                  rangeValue.toString().length === 5 ?
                    rangeValue.toString().slice(0, 2) + ',000' :

                    rangeValue.toString().length === 3 ?
                      rangeValue :
                      rangeValue.toString().slice(0, 1) + ',000'
            })</div>
            <div className='brandRangeContainer'>
              <input type='range' className='range' min={minRangeValue.price + 1000} max={maxRangeValue.price + 1000} value={rangeValue} onChange={rangeSlider} list='ticks' />
              <datalist id='ticks'>
                {
                  split(minRangeValue.price, maxRangeValue.price, 20)
                  .map(item => {
                    const stops = Math.trunc(item)
                    return(
                      <option value={
                        stops.toString().length === 7 ?
                          stops.toString().slice(0, 2) + ',' + stops.toString().slice(2, 4) + ',000' :
          
                          stops.toString().length === 6 ?
                            stops.toString().slice(0, 1) + ',' + stops.toString().slice(1, 3) + ',000' :
          
                            stops.toString().length === 5 ?
                              stops.toString().slice(0, 2) + ',000' :
          
                              stops.toString().length === 3 ?
                                stops :
                                stops.toString().slice(0, 1) + ',000'
                      } key={stops}>{
                        stops.toString().length === 7 ?
                          stops.toString().slice(0, 2) + ',' + stops.toString().slice(2, 4) + ',000' :
          
                          stops.toString().length === 6 ?
                            stops.toString().slice(0, 1) + ',' + stops.toString().slice(1, 3) + ',000' :
          
                            stops.toString().length === 5 ?
                              stops.toString().slice(0, 2) + ',000' :
          
                              stops.toString().length === 3 ?
                                stops :
                                stops.toString().slice(0, 1) + ',000'
                      }</option>
                    )
                  })
                }
              </datalist>
                
            </div>
            <div className='brandFilterHeader'>Customer Review:</div>
            <div className='brandReviewContainer'>
              {
                rating
                .map(star => (
                  <div className='brandReviewInput' key={star}>
                    <input type='checkbox' name={star} id={star} value={star} onChange={ratingFilter} />
                    <label htmlFor={star}>
                      {
                        Array(star)
                        .fill()
                        .map((_, i) => {
                          return (
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 256 256" key={i}>
                              <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                                <path d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c -1.398 0 -2.649 0.778 -3.268 2.031 L 29.959 27.911 c -0.099 0.2 -0.29 0.338 -0.51 0.37 L 3.122 32.107 c -1.383 0.201 -2.509 1.151 -2.941 2.48 c -0.432 1.329 -0.079 2.76 0.922 3.736 l 19.049 18.569 c 0.16 0.156 0.233 0.38 0.195 0.599 L 15.85 83.71 c -0.236 1.377 0.319 2.743 1.449 3.564 c 1.129 0.821 2.6 0.927 3.839 0.279 l 23.547 -12.381 c 0.098 -0.051 0.206 -0.077 0.314 -0.077 C 51.721 53.905 50.301 28.878 45 2.024 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                                <path d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c 1.398 0 2.649 0.778 3.268 2.031 l 11.773 23.856 c 0.099 0.2 0.29 0.338 0.51 0.37 l 26.326 3.826 c 1.383 0.201 2.509 1.151 2.941 2.48 c 0.432 1.329 0.079 2.76 -0.922 3.736 L 69.847 56.892 c -0.16 0.156 -0.233 0.38 -0.195 0.599 L 74.15 83.71 c 0.236 1.377 -0.319 2.743 -1.449 3.564 c -1.129 0.821 -2.6 0.927 -3.839 0.279 L 45.315 75.172 c -0.098 -0.051 -0.206 -0.077 -0.314 -0.077 C 37.08 54.593 38.849 29.395 45 2.024 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              </g>
                            </svg>
                          )
                        })
                      }
                  </label>
                </div>
                ))
              } 
            </div>
          </div> 
        </div>
        <div className='searchFilterDetails'>
          <div className='filterButtonContainer'>
            <button className='filterButton'>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="25" viewBox="0 0 90 90">
                <g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transhtmlform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                  <path d="M 87 22.681 H 33.355 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 H 87 c 1.657 0 3 1.343 3 3 S 88.657 22.681 87 22.681 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transhtmlform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                  <path d="M 74.016 39.561 h -40.66 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 40.66 c 1.657 0 3 1.343 3 3 S 75.673 39.561 74.016 39.561 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transhtmlform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                  <path d="M 61.032 56.439 H 33.355 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 27.677 c 1.657 0 3 1.343 3 3 S 62.689 56.439 61.032 56.439 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transhtmlform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                  <path d="M 48.048 73.319 H 33.355 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 14.692 c 1.657 0 3 1.343 3 3 S 49.705 73.319 48.048 73.319 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transhtmlform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                  <path d="M 11.629 73.319 c -1.657 0 -3 -1.343 -3 -3 V 19.681 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 v 50.638 C 14.629 71.977 13.286 73.319 11.629 73.319 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transhtmlform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                  <path d="M 3 31.311 c -0.768 0 -1.536 -0.293 -2.121 -0.879 c -1.172 -1.171 -1.172 -3.071 0 -4.242 l 8.629 -8.629 c 1.171 -1.172 3.071 -1.171 4.242 0 l 8.63 8.629 c 1.172 1.172 1.172 3.071 0 4.243 c -1.172 1.172 -3.072 1.171 -4.243 0 l -6.509 -6.508 l -6.508 6.508 C 4.536 31.018 3.768 31.311 3 31.311 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transhtmlform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                </g>
              </svg>
            </button>
          </div>
          {
            sortedproductDetails
            .sort((a, b) => a.featured > b.featured ? -1 : 1)
            .sort((a, b) => {
              if(sort === 'Price: Low to High') {
                return a.price - b.price
              } else if (sort === 'Price: High to Low') {
                return b.price - a.price
              } else {
                return a
              }
            })
            .filter(product => product.category === pathName)
            .filter(product => {
              if(sort === 'Featured') {
                return product.featured === 'yes'
              } else if(sort === 'Newest Arrivals') {
                return product.newArrival === 'yes'
              } else {
                return product
              }
            })
            .filter(product => {
              if(checked.length === 0) {
                return product
              } else {
                return checked.includes(product.brand.brandName)
              }
            })
            .filter(product => {
              if(product.price <= rangeValue) {
                return product.price <= rangeValue
              } else {
                return product.price < rangeValue
              }
            })
            .filter(product => {
              if(ratingButton.length === 0) {
                return product
              } else {
                return ratingButton.includes(product.rating.toString())
              }
            })
            .map(product => {
              if(product.category === pathName) {
                return (
                  <Link to={`/${product.title}`} key={product.id}>
                    <div className='searchProductContainer'>
                      {
                        product.featured === 'yes' ?
                        <div className='featured'>FEATURED</div> :
                        null
                      }
                      <div className='imgContainer'>
                        <img src={product.image} alt=''/>
                      </div>
                      <div className='productDetails'>
                        <div className='productTitle'>{product.title}</div>
                        <div className='productDesc'>{product.productDescription}</div>
                        <div className='productPrice'>
                          ₹{
                            product.price.toString().length === 7 ?
                              product.price.toString().slice(0, 2) + ',' + product.price.toString().slice(2, 4) + ',' + product.price.toString().slice(-3) :

                              product.price.toString().length === 6 ?
                                product.price.toString().slice(0, 1) + ',' + product.price.toString().slice(1, 3) + ',' + product.price.toString().slice(-3):

                                product.price.toString().length === 5 ?
                                  product.price.toString().slice(0, 2) + ',' + product.price.toString().slice(-3) :

                                  product.price.toString().length === 3 ?
                                    product.price :
                                    product.price.toString().slice(0, 1) + ',' + product.price.toString().slice(-3)
                          }
                          {
                            product.newArrival === 'yes' ?
                            <div className='newArrivals'>NEW ARRIVAL</div> :
                            null
                          }
                        </div>
                        <div className='productRating'>
                          {
                            Array(product.rating)
                            .fill()
                            .map((_, i) => (
                              <p key={i}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 256 256">
                                <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                                  <path d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c -1.398 0 -2.649 0.778 -3.268 2.031 L 29.959 27.911 c -0.099 0.2 -0.29 0.338 -0.51 0.37 L 3.122 32.107 c -1.383 0.201 -2.509 1.151 -2.941 2.48 c -0.432 1.329 -0.079 2.76 0.922 3.736 l 19.049 18.569 c 0.16 0.156 0.233 0.38 0.195 0.599 L 15.85 83.71 c -0.236 1.377 0.319 2.743 1.449 3.564 c 1.129 0.821 2.6 0.927 3.839 0.279 l 23.547 -12.381 c 0.098 -0.051 0.206 -0.077 0.314 -0.077 C 51.721 53.905 50.301 28.878 45 2.024 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                                  <path d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c 1.398 0 2.649 0.778 3.268 2.031 l 11.773 23.856 c 0.099 0.2 0.29 0.338 0.51 0.37 l 26.326 3.826 c 1.383 0.201 2.509 1.151 2.941 2.48 c 0.432 1.329 0.079 2.76 -0.922 3.736 L 69.847 56.892 c -0.16 0.156 -0.233 0.38 -0.195 0.599 L 74.15 83.71 c 0.236 1.377 -0.319 2.743 -1.449 3.564 c -1.129 0.821 -2.6 0.927 -3.839 0.279 L 45.315 75.172 c -0.098 -0.051 -0.206 -0.077 -0.314 -0.077 C 37.08 54.593 38.849 29.395 45 2.024 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                                </g>
                                </svg>
                              </p>
                            ))
                          }
                          </div>
                        </div>
                      </div>
                    </Link>
                    
                )
              } else {
                return null
              }
            })
          }
          


          {
            sortedproductDetails
            .sort((a, b) => a.featured > b.featured ? -1 : 1)
            .sort((a, b) => {
              if(sort === 'Price: Low to High') {
                return a.price - b.price
              } else if (sort === 'Price: High to Low') {
                return b.price - a.price
              } else {
                return a
              }
            })
            .filter(product => product.brand.brandName + ' ' + product.brand.subBrand === pathName)
            .filter(product => {
              if(sort === 'Featured') {
                return product.featured === 'yes'
              } else if(sort === 'Newest Arrivals') {
                return product.newArrival === 'yes'
              } else {
                return product
              }
            })
            .filter(product => {
              if(checked.length === 0) {
                return product
              } else {
                return checked.includes(product.brand.brandName)
              }
            })
            .filter(product => {
              if(product.price <= rangeValue) {
                return product.price <= rangeValue
              } else {
                return product.price < rangeValue
              }
            })
            .filter(product => {
              if(ratingButton.length === 0) {
                return product
              } else {
                return ratingButton.includes(product.rating.toString())
              }
            })
            .map(product => {
              if(product.brand.brandName + ' ' + product.brand.subBrand === pathName) {
                return (
                  <Link to={`/${product.title}`} key={product.id}>
                    <div className='searchProductContainer'>
                      {
                        product.featured === 'yes' ?
                        <div className='featured'>FEATURED</div> :
                        null
                      }
                      <div className='imgContainer'>
                        <img src={product.image} alt=''/>
                      </div>
                      <div className='productDetails'>
                        <div className='productTitle'>{product.title}</div>
                        <div className='productDesc'>{product.productDescription}</div>
                        <div className='productPrice'>
                          ₹{
                            product.price.toString().length === 7 ?
                              product.price.toString().slice(0, 2) + ',' + product.price.toString().slice(2, 4) + ',' + product.price.toString().slice(-3) :

                              product.price.toString().length === 6 ?
                                product.price.toString().slice(0, 1) + ',' + product.price.toString().slice(1, 3) + ',' + product.price.toString().slice(-3):

                                product.price.toString().length === 5 ?
                                  product.price.toString().slice(0, 2) + ',' + product.price.toString().slice(-3) :

                                  product.price.toString().length === 3 ?
                                    product.price :
                                    product.price.toString().slice(0, 1) + ',' + product.price.toString().slice(-3)
                          }
                          {
                            product.newArrival === 'yes' ?
                            <div className='newArrivals'>NEW ARRIVAL</div> :
                            null
                          }
                        </div>
                        <div className='productRating'>
                          {
                            Array(product.rating)
                            .fill()
                            .map((_, i) => (
                              <p key={i}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 256 256">
                                <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                                  <path d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c -1.398 0 -2.649 0.778 -3.268 2.031 L 29.959 27.911 c -0.099 0.2 -0.29 0.338 -0.51 0.37 L 3.122 32.107 c -1.383 0.201 -2.509 1.151 -2.941 2.48 c -0.432 1.329 -0.079 2.76 0.922 3.736 l 19.049 18.569 c 0.16 0.156 0.233 0.38 0.195 0.599 L 15.85 83.71 c -0.236 1.377 0.319 2.743 1.449 3.564 c 1.129 0.821 2.6 0.927 3.839 0.279 l 23.547 -12.381 c 0.098 -0.051 0.206 -0.077 0.314 -0.077 C 51.721 53.905 50.301 28.878 45 2.024 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                                  <path d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c 1.398 0 2.649 0.778 3.268 2.031 l 11.773 23.856 c 0.099 0.2 0.29 0.338 0.51 0.37 l 26.326 3.826 c 1.383 0.201 2.509 1.151 2.941 2.48 c 0.432 1.329 0.079 2.76 -0.922 3.736 L 69.847 56.892 c -0.16 0.156 -0.233 0.38 -0.195 0.599 L 74.15 83.71 c 0.236 1.377 -0.319 2.743 -1.449 3.564 c -1.129 0.821 -2.6 0.927 -3.839 0.279 L 45.315 75.172 c -0.098 -0.051 -0.206 -0.077 -0.314 -0.077 C 37.08 54.593 38.849 29.395 45 2.024 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                                </g>
                                </svg>
                              </p>
                            ))
                          }
                          </div>
                        </div>
                      </div>
                    </Link> 
                )
              } else {
                return null
              }
            })
          }
          
          
        </div>
    </div>
  )
}

export default SearchDetails