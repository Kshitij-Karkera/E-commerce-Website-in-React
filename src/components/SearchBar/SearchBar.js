import React from 'react'
import { useEffect } from 'react'
import './SearchBar.css'
import {useStateValue} from '../../StateProvider'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function SearchBar() {
  const [{productDetails}] = useStateValue()
  const [searchTerm, setsearchTerm] = useState('')

  const uniqueCategory = []
  const uniqueCategoryBrand = []

  const uniqueProducts = productDetails.filter(element => {
    const isDuplicate = uniqueCategory.includes(element.category)
    if (!isDuplicate) {
      uniqueCategory.push(element.category);
      return true;
    }
    return false;
  })

  const uniqueProductsBrand = productDetails.filter(element => {
    const isDuplicate = uniqueCategoryBrand.includes(element.brand.brandName + '' + element.brand.subBrand)
    if (!isDuplicate) {
      uniqueCategoryBrand.push(element.brand.brandName + '' + element.brand.subBrand);
      return true;
    }
    return false;
  })

  useEffect(() => {
      let searchBar = document.getElementById('searchBar')
      let sugg = document.querySelector('.searchContainer')

      if(window.innerWidth >= 1070) {
        searchBar.addEventListener('focus', () => {
          sugg.style.display = 'flex'
          sugg.classList.add('suggFocusAnimation')
          sugg.classList.remove('suggBlurAnimation')
        })

        searchBar.addEventListener('blur', () => {
          sugg.classList.add('suggBlurAnimation')
          sugg.classList.remove('suggFocusAnimation')
          setTimeout(() => {
            sugg.style.display = 'none'
          }, 500)
        })
      } else if(window.innerWidth < 1070 && window.innerWidth > 780) {
        searchBar.addEventListener('focus', () => {
          sugg.style.display = 'flex'
          sugg.classList.add('suggSmallFocusAnimation')
          sugg.classList.remove('suggSmallBlurAnimation')
        })

        searchBar.addEventListener('blur', () => {
          sugg.classList.add('suggSmallBlurAnimation')
          sugg.classList.remove('suggSmallFocusAnimation')
          setTimeout(() => {
            sugg.style.display = 'none'
          }, 500)
        })
      } else if (window.innerWidth <= 780 && window.innerWidth > 620) {
        searchBar.addEventListener('focus', () => {
            setTimeout(() => {
              sugg.style.display = 'flex'
            }, 500)
            sugg.classList.add('suggExtraSmallFocusAnimation')
            sugg.classList.remove('suggExtraSmallBlurAnimation')
          })
  
          searchBar.addEventListener('blur', () => {
            sugg.classList.add('suggExtraSmallBlurAnimation')
            sugg.classList.remove('suggExtraSmallFocusAnimation')
            setTimeout(() => {
              sugg.style.display = 'none'
            }, 500)
          })
      } else if (window.innerWidth <= 620) {
          searchBar.addEventListener('focus', () => {
            setTimeout(() => {
              sugg.style.display = 'flex'
            }, 500)
            sugg.classList.add('suggVeryExtraSmallFocusAnimation')
            sugg.classList.remove('suggVeryExtraSmallBlurAnimation')
          })
  
          searchBar.addEventListener('blur', () => {
            sugg.classList.add('suggVeryExtraSmallBlurAnimation')
            sugg.classList.remove('suggVeryExtraSmallFocusAnimation')
            setTimeout(() => {
              sugg.style.display = 'none'
            }, 500)
          })
        }

      window.addEventListener('resize', () => {
        if(window.innerWidth >= 1070) {
          searchBar.addEventListener('focus', () => {
            setTimeout(() => {
              sugg.style.display = 'flex'
            }, 500)
            sugg.classList.add('suggFocusAnimation')
            sugg.classList.remove('suggBlurAnimation')
          })
  
          searchBar.addEventListener('blur', () => {
            sugg.classList.add('suggBlurAnimation')
            sugg.classList.remove('suggFocusAnimation')
            setTimeout(() => {
              sugg.style.display = 'none'
            }, 500)
          })
        } else if(window.innerWidth < 1070 && window.innerWidth > 780) {
          searchBar.addEventListener('focus', () => {
            setTimeout(() => {
              sugg.style.display = 'flex'
            }, 500)
            sugg.classList.add('suggSmallFocusAnimation')
            sugg.classList.remove('suggSmallBlurAnimation')
          })
  
          searchBar.addEventListener('blur', () => {
            sugg.classList.add('suggSmallBlurAnimation')
            sugg.classList.remove('suggSmallFocusAnimation')
            setTimeout(() => {
              sugg.style.display = 'none'
            }, 500)
          })
        } else if (window.innerWidth <= 780 && window.innerWidth > 620) {
          searchBar.addEventListener('focus', () => {
            setTimeout(() => {
              sugg.style.display = 'flex'
            }, 500)
            sugg.classList.add('suggExtraSmallFocusAnimation')
            sugg.classList.remove('suggExtraSmallBlurAnimation')
          })
  
          searchBar.addEventListener('blur', () => {
            sugg.classList.add('suggExtraSmallBlurAnimation')
            sugg.classList.remove('suggExtraSmallFocusAnimation')
            setTimeout(() => {
              sugg.style.display = 'none'
            }, 500)
          })
        } else if (window.innerWidth < 620) {
          searchBar.addEventListener('focus', () => {
            setTimeout(() => {
              sugg.style.display = 'flex'
            }, 500)
            sugg.classList.add('suggVeryExtraSmallFocusAnimation')
            sugg.classList.remove('suggVeryExtraSmallBlurAnimation')
          })
  
          searchBar.addEventListener('blur', () => {
            sugg.classList.add('suggVeryExtraSmallBlurAnimation')
            sugg.classList.remove('suggVeryExtraSmallFocusAnimation')
            setTimeout(() => {
              sugg.style.display = 'none'
            }, 500)
          })
        }
      })   
  }, [])

  return (
    <>
      <input type="text" id='searchBar' placeholder="Search" name="search" autoComplete='off' value={searchTerm} onChange={(event) => {
        setsearchTerm(event.target.value)
      }} />
      <Link to={searchTerm}>
        <button className="searchButton" htmlFor="search">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 256 256">
              <g transform="translate(168 160) scale(0.62 0.62)">
                <g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform="translate(-175.05 -175.05000000000004) scale(2.3 2.3)" >
                <path d="M 88.535 81.465 L 65.846 58.776 c 10.891 -14.351 9.801 -34.954 -3.288 -48.043 C 55.638 3.812 46.435 0 36.646 0 c -9.789 0 -18.992 3.812 -25.913 10.733 S 0 26.857 0 36.646 c 0 9.788 3.812 18.991 10.733 25.912 c 7.144 7.145 16.528 10.717 25.913 10.717 c 7.808 0 15.612 -2.482 22.13 -7.429 l 22.689 22.689 C 82.44 89.512 83.721 90 85 90 s 2.56 -0.488 3.535 -1.465 C 90.488 86.583 90.488 83.417 88.535 81.465 z M 17.805 55.488 C 12.771 50.455 10 43.764 10 36.646 c 0 -7.118 2.771 -13.809 7.805 -18.842 C 22.837 12.771 29.529 10 36.646 10 c 7.117 0 13.809 2.771 18.842 7.805 c 10.389 10.389 10.389 27.294 0 37.684 C 45.098 65.878 28.193 65.876 17.805 55.488 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                </g>
              </g>
          </svg>
        </button>
      </Link>
      <div className='searchContainer'>
        <div className='searchCategories'>Search by category</div>
        {
          uniqueProducts
            .filter((product) => {
              if(searchTerm === '') {
                return product.category
              } else if (product.category.toLowerCase().startsWith(searchTerm.toLowerCase(), 0)) {
                return product.category
              } else {
                return null
              }
            })
            .sort((a, b) => a.category > b.category ? 1 : -1)
            .map((product) => {
              return (
                <Link to={product.category} key={product.id}>
                  <button className='suggestions' htmlFor="search" onClick={() => {
                    setsearchTerm(product.category)
                  }}>{product.category}</button>
                </Link>
              )
            })
        } 
        {
          uniqueProductsBrand
            .filter((product) => {
              if(searchTerm === '') {
                return null
              } else if (product.brand.brandName.toLowerCase().startsWith(searchTerm.toLowerCase(), 0)) {
                return product.brand.brandName + ' ' + product.brand.subBrand
              } else if (product.brand.subBrand.toLowerCase().startsWith(searchTerm.toLowerCase(), 0)) {
                return product.brand.brandName + ' ' + product.brand.subBrand
              } else {
                return null
              }
            })
            .map((product) => {
              return (
                <div key={product.id}>
                  <Link to={product.brand.brandName + ' ' + product.brand.subBrand}>
                    <button className='suggestions' htmlFor="search" onClick={() => {
                      setsearchTerm(product.brand.brandName + ' ' + product.brand.subBrand)
                    }}>{product.brand.brandName + ' ' + product.brand.subBrand}</button>
                  </Link>
                </div>
              )
            })
        } 
        
        {
          productDetails
            .filter((product) => {
              if(searchTerm === '') {
                return null
              } else if (product.title.toLowerCase().startsWith(searchTerm.toLowerCase(), 0) || product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return product.title
              } else {
                return null
              }
            })
            .map((product) => {
              return (
                <div key={product.id}>
                  <Link to={product.title}>
                    <button className='suggestions' htmlFor="search" onClick={() => {
                      setsearchTerm(product.title)
                    }}>{product.title}</button>
                  </Link>
                </div>
              )
            })
        } 
      </div>
    </>
  )
}

export default SearchBar