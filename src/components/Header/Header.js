import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import {useStateValue} from '../../StateProvider'
import SearchBar from '../SearchBar/SearchBar'
import { auth } from '../../firebaseHandler'

function Header() {
  const [{basket, user}] = useStateValue()
  const navigate = useNavigate()

  const signOut = () => {
    if(user !== null) {
      auth.signOut()
      navigate('/')
      window.location.reload()
    }
  }
  
  useEffect(() => {
    const themeToggle = document.querySelector('#theme-toggle')

    const enableDarkMode = () => {
      document.body.classList.remove('light-theme')
      document.body.classList.add('dark-theme')
      themeToggle.ariaLabel = 'Switch to Light Theme'
      localStorage.setItem('theme', 'dark')
    }

    const enableLightMode = () => {
      document.body.classList.remove('dark-theme')
      document.body.classList.add('light-theme')
      themeToggle.ariaLabel = 'Switch to Dark Theme'
      localStorage.setItem('theme', 'light')
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.contains('dark-theme') ?
        enableLightMode() :
        enableDarkMode()
    }) 

    localStorage.getItem('theme') === 'dark' ?
      enableDarkMode() :
      enableLightMode()
  }, [])

  useEffect(() => {
    const themeToggle = document.querySelector('#theme-toggle')
    let mainLoginButton = document.querySelector('.loginButton')
    let profileButton = document.querySelector('.profileButton')
    let mainLoginButtonText = document.querySelector('.loginButton .text')
    let cartButton = document.querySelector('.cartButton')
    let homeButton = document.querySelector('.header')

    if(!user) {
      window.addEventListener('resize', () =>{
        if(window.innerWidth > 720) {
          if(window.location.pathname === '/login') {
            mainLoginButton.style.display = 'none'
            cartButton.style.right = '1.5em'
            themeToggle.style.right = '14em'
          } else {
            mainLoginButton.style.display = 'flex'
            mainLoginButton.style.right = '1.5em'
            cartButton.style.right = '13em'
            themeToggle.style.right = '25em'
          }
          mainLoginButtonText.style.display = 'flex'
        } else if(window.innerWidth <= 620 && window.innerWidth > 350) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            mainLoginButton.style.display = 'none'
          } else {
            cartButton.style.right = '7em'
            mainLoginButton.style.display = 'flex'
            mainLoginButton.style.right = '1.5em'
          }
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 350 && window.innerWidth > 280) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            mainLoginButton.style.display = 'none'
          } else {
            cartButton.style.right = '5.5em'
            mainLoginButton.style.display = 'flex'
            mainLoginButton.style.right = '1.5em'
          }
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 280) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            mainLoginButton.style.display = 'none'
          } else {
            cartButton.style.right = '4.5em'
            mainLoginButton.style.right = '.5em'
            mainLoginButton.style.display = 'flex'
          }
          mainLoginButtonText.style.display = 'none'
        } else {
          if(window.location.pathname === '/login') {
            themeToggle.style.right = '1.5em'
            mainLoginButton.style.display = 'none'
            cartButton.style.right = '1.5em'
          } else {
            mainLoginButton.style.display = 'flex'
            mainLoginButton.style.right = '1.5em'
            cartButton.style.right = '13em'
            themeToggle.style.right = '1.5em'
          }
          mainLoginButtonText.style.display = 'flex'
        }
      })
  
      window.addEventListener('popstate', () => {
        if(window.innerWidth > 720) {
          if(window.location.pathname === '/login') {
            mainLoginButton.style.display = 'none'
            cartButton.style.right = '1.5em'
            themeToggle.style.right = '14em'
          } else {
            mainLoginButton.style.display = 'flex'
            mainLoginButton.style.right = '1.5em'
            cartButton.style.right = '13em'
            themeToggle.style.right = '25em'
          }
          mainLoginButtonText.style.display = 'flex'
        } else if(window.innerWidth <= 620 && window.innerWidth > 350) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            mainLoginButton.style.display = 'none'
          } else {
            cartButton.style.right = '7em'
            mainLoginButton.style.display = 'flex'
            mainLoginButton.style.right = '1.5em'
          }
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 350 && window.innerWidth > 280) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            mainLoginButton.style.display = 'none'
          } else {
            cartButton.style.right = '5.5em'
            mainLoginButton.style.display = 'flex'
            mainLoginButton.style.right = '1.5em'
          }
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 280) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            mainLoginButton.style.display = 'none'
          } else {
            cartButton.style.right = '4.5em'
            mainLoginButton.style.right = '.5em'
            mainLoginButton.style.display = 'flex'
          }
          mainLoginButtonText.style.display = 'none'
        } else {
          if(window.location.pathname === '/login') {
            themeToggle.style.right = '1.5em'
            mainLoginButton.style.display = 'none'
            cartButton.style.right = '1.5em'
          } else {
            mainLoginButton.style.display = 'flex'
            mainLoginButton.style.right = '1.5em'
            cartButton.style.right = '13em'
            themeToggle.style.right = '1.5em'
          }
          mainLoginButtonText.style.display = 'flex'
        }
      })
  
      if(window.location.reload) {
        if(window.innerWidth > 720) {
          if(window.location.pathname === '/login') {
            mainLoginButton.style.display = 'none'
            cartButton.style.right = '1.5em'
            themeToggle.style.right = '14em'
          } else {
            mainLoginButton.style.display = 'flex'
            mainLoginButton.style.right = '1.5em'
            cartButton.style.right = '13em'
            themeToggle.style.right = '25em'
          }
          mainLoginButtonText.style.display = 'flex'
        } else if(window.innerWidth <= 620 && window.innerWidth > 350) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            mainLoginButton.style.display = 'none'
          } else {
            cartButton.style.right = '7em'
            mainLoginButton.style.display = 'flex'
            mainLoginButton.style.right = '1.5em'
          }
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 350 && window.innerWidth > 280) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            mainLoginButton.style.display = 'none'
          } else {
            cartButton.style.right = '5.5em'
            mainLoginButton.style.display = 'flex'
            mainLoginButton.style.right = '1.5em'
          }
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 280) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            mainLoginButton.style.display = 'none'
          } else {
            cartButton.style.right = '4.5em'
            mainLoginButton.style.right = '.5em'
            mainLoginButton.style.display = 'flex'
          }
          mainLoginButtonText.style.display = 'none'
        } else {
          if(window.location.pathname === '/login') {
            themeToggle.style.right = '1.5em'
            mainLoginButton.style.display = 'none'
            cartButton.style.right = '1.5em'
          } else {
            mainLoginButton.style.display = 'flex'
            mainLoginButton.style.right = '1.5em'
            cartButton.style.right = '13em'
            themeToggle.style.right = '1.5em'
          }
          mainLoginButtonText.style.display = 'flex'
        }
      }
  
      mainLoginButton.addEventListener('click', () => {
        if(window.innerWidth > 720) {
          mainLoginButton.style.display = 'none'
          cartButton.style.right = '1.5em'
          themeToggle.style.right = '14em'
          mainLoginButtonText.style.display = 'flex'
        } else if(window.innerWidth <= 620 && window.innerWidth > 350) {
          cartButton.style.right = '1.5em'
          mainLoginButton.style.display = 'none'
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 350 && window.innerWidth > 280) {
          cartButton.style.right = '1.5em'
          mainLoginButton.style.display = 'none'
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 280) {
          cartButton.style.right = '1.5em'
          mainLoginButton.style.display = 'none'
          mainLoginButtonText.style.display = 'none'
        } else {
          themeToggle.style.right = '1.5em'
          mainLoginButton.style.display = 'none'
          cartButton.style.right = '1.5em'
        }
      })
  
      cartButton.addEventListener('click', () => {
        if(window.innerWidth > 720) {
          mainLoginButton.style.display = 'flex'
          mainLoginButton.style.right = '1.5em'
          cartButton.style.right = '13em'
          themeToggle.style.right = '25em'
          mainLoginButtonText.style.display = 'flex'
        } else if(window.innerWidth <= 620 && window.innerWidth > 350) {
          cartButton.style.right = '7em'
          mainLoginButton.style.display = 'flex'
          mainLoginButton.style.right = '1.5em'
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 350 && window.innerWidth > 280) {
          cartButton.style.right = '5.5em'
          mainLoginButton.style.display = 'flex'
          mainLoginButton.style.right = '1.5em'
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 280) {
          cartButton.style.right = '4.5em'
          mainLoginButton.style.right = '.5em'
          mainLoginButton.style.display = 'flex'
          mainLoginButtonText.style.display = 'none'
        } else {
          mainLoginButton.style.display = 'flex'
          mainLoginButton.style.right = '1.5em'
          cartButton.style.right = '13em'
          themeToggle.style.right = '1.5em'
          mainLoginButtonText.style.display = 'flex'
        }
      })
      
      homeButton.addEventListener('click', () => {
        if(window.innerWidth > 720) {
          mainLoginButton.style.display = 'flex'
          mainLoginButton.style.right = '1.5em'
          cartButton.style.right = '13em'
          themeToggle.style.right = '25em'
          mainLoginButtonText.style.display = 'flex'
        } else if(window.innerWidth <= 620 && window.innerWidth > 350) {
          cartButton.style.right = '7em'
          mainLoginButton.style.display = 'flex'
          mainLoginButton.style.right = '1.5em'
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 350 && window.innerWidth > 280) {
          cartButton.style.right = '5.5em'
          mainLoginButton.style.display = 'flex'
          mainLoginButton.style.right = '1.5em'
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 280) {
          cartButton.style.right = '4.5em'
          mainLoginButton.style.right = '.5em'
          mainLoginButton.style.display = 'flex'
          mainLoginButtonText.style.display = 'none'
        } else {
          mainLoginButton.style.display = 'flex'
          mainLoginButton.style.right = '1.5em'
          cartButton.style.right = '13em'
          themeToggle.style.right = '1.5em'
          mainLoginButtonText.style.display = 'flex'
        }
      })
    } else {
      window.addEventListener('resize', () =>{
        if(window.innerWidth > 720) {
          if(window.location.pathname === '/login') {
            profileButton.style.display = 'none'
            cartButton.style.right = '1.5em'
            themeToggle.style.right = '14em'
          } else {
            profileButton.style.display = 'flex'
            profileButton.style.right = '1.5em'
            cartButton.style.right = '13em'
            themeToggle.style.right = '25em'
          }
        } else if(window.innerWidth <= 620 && window.innerWidth > 350) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            profileButton.style.display = 'none'
          } else {
            cartButton.style.right = '7em'
            profileButton.style.display = 'flex'
            profileButton.style.right = '1.5em'
          }
        } else if(window.innerWidth <= 350 && window.innerWidth > 280) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            profileButton.style.display = 'none'
          } else {
            cartButton.style.right = '5.5em'
            profileButton.style.display = 'flex'
            profileButton.style.right = '1.5em'
          }
        } else if(window.innerWidth <= 280) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            profileButton.style.display = 'none'
          } else {
            cartButton.style.right = '4.5em'
            profileButton.style.right = '.5em'
            profileButton.style.display = 'flex'
          }
        } else {
          if(window.location.pathname === '/login') {
            themeToggle.style.right = '1.5em'
            profileButton.style.display = 'none'
            cartButton.style.right = '1.5em'
          } else {
            profileButton.style.display = 'flex'
            profileButton.style.right = '1.5em'
            cartButton.style.right = '13em'
            themeToggle.style.right = '1.5em'
          }
        }
      })
  
      window.addEventListener('popstate', () => {
        if(window.innerWidth > 720) {
          if(window.location.pathname === '/login') {
            profileButton.style.display = 'none'
            cartButton.style.right = '1.5em'
            themeToggle.style.right = '14em'
          } else {
            profileButton.style.display = 'flex'
            profileButton.style.right = '1.5em'
            cartButton.style.right = '13em'
            themeToggle.style.right = '25em'
          }
        } else if(window.innerWidth <= 620 && window.innerWidth > 350) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            profileButton.style.display = 'none'
          } else {
            cartButton.style.right = '7em'
            profileButton.style.display = 'flex'
            profileButton.style.right = '1.5em'
          }
        } else if(window.innerWidth <= 350 && window.innerWidth > 280) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            profileButton.style.display = 'none'
          } else {
            cartButton.style.right = '5.5em'
            profileButton.style.display = 'flex'
            profileButton.style.right = '1.5em'
          }
        } else if(window.innerWidth <= 280) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            profileButton.style.display = 'none'
          } else {
            cartButton.style.right = '4.5em'
            profileButton.style.right = '.5em'
            profileButton.style.display = 'flex'
          }
        } else {
          if(window.location.pathname === '/login') {
            themeToggle.style.right = '1.5em'
            profileButton.style.display = 'none'
            cartButton.style.right = '1.5em'
          } else {
            profileButton.style.display = 'flex'
            profileButton.style.right = '1.5em'
            cartButton.style.right = '13em'
            themeToggle.style.right = '1.5em'
          }
        }
      })
  
      if(window.location.reload) {
        if(window.innerWidth > 720) {
          if(window.location.pathname === '/login') {
            profileButton.style.display = 'none'
            cartButton.style.right = '1.5em'
            themeToggle.style.right = '14em'
          } else {
            profileButton.style.display = 'flex'
            profileButton.style.right = '1.5em'
            cartButton.style.right = '13em'
            themeToggle.style.right = '25em'
          }
        } else if(window.innerWidth <= 620 && window.innerWidth > 350) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            profileButton.style.display = 'none'
          } else {
            cartButton.style.right = '7em'
            profileButton.style.display = 'flex'
            profileButton.style.right = '1.5em'
          }
        } else if(window.innerWidth <= 350 && window.innerWidth > 280) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            profileButton.style.display = 'none'
          } else {
            cartButton.style.right = '5.5em'
            profileButton.style.display = 'flex'
            profileButton.style.right = '1.5em'
          }
        } else if(window.innerWidth <= 280) {
          if(window.location.pathname === '/login') {
            cartButton.style.right = '1.5em'
            profileButton.style.display = 'none'
          } else {
            cartButton.style.right = '4.5em'
            profileButton.style.right = '.5em'
            profileButton.style.display = 'flex'
          }
        } else {
          if(window.location.pathname === '/login') {
            themeToggle.style.right = '1.5em'
            profileButton.style.display = 'none'
            cartButton.style.right = '1.5em'
          } else {
            profileButton.style.display = 'flex'
            profileButton.style.right = '1.5em'
            cartButton.style.right = '13em'
            themeToggle.style.right = '1.5em'
          }
        }
      }
    }
  }, [user])

  return (
    <HeaderContainer className="headerContainer">
      <HeaderLogo className="header">
        <Link to="/">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="10em"
            height="3em"
            viewBox="0 0 3559.000000 977.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,977.000000) scale(0.100000,-0.100000)"
              stroke="none"
            >
              <path
              style={{fill: 'rgb(0, 149, 255)'}}
                d="M9845 9745 c-236 -38 -447 -110 -697 -237 -632 -321 -1261 -935
        -1810 -1767 -61 -92 -114 -174 -119 -183 -9 -17 8 -18 303 -18 l313 0 71 93
        c502 652 1120 1105 1676 1228 131 29 382 37 503 16 261 -46 463 -155 671 -362
        345 -344 544 -853 626 -1600 20 -184 17 -794 -5 -1015 -92 -909 -353 -1808
        -768 -2640 -312 -625 -674 -1145 -1084 -1556 -439 -440 -870 -702 -1310 -796
        -137 -29 -400 -31 -525 -4 -516 113 -909 542 -1114 1218 -36 121 -78 298 -97
        414 l-11 71 -62 -25 c-33 -14 -97 -30 -141 -35 -102 -13 -207 7 -307 58 -38
        19 -71 35 -72 35 -4 0 1 -69 20 -265 51 -529 191 -1038 386 -1405 116 -217
        233 -375 399 -535 688 -664 1697 -542 2704 327 132 114 409 392 535 538 688
        793 1279 1908 1636 3088 179 593 289 1151 351 1777 25 262 25 970 0 1210 -76
        712 -263 1281 -555 1695 -84 119 -271 313 -381 395 -166 125 -356 214 -560
        262 -136 32 -432 41 -576 18z"
              />
              <path
              style={{fill: 'rgb(0, 149, 255)'}}
                d="M5625 9436 c-93 -44 -144 -126 -145 -231 0 -105 62 -200 158 -241 49
        -21 147 -21 197 0 52 22 112 80 136 131 23 50 25 158 4 208 -55 133 -219 195
        -350 133z"
              />
              <path
              style={{fill: 'rgb(0, 149, 255)'}}
                d="M4643 8636 c-231 -56 -403 -275 -403 -511 1 -297 237 -530 535 -529
        256 2 461 176 512 433 63 319 -194 624 -522 620 -38 0 -94 -6 -122 -13z"
              />
              <path
                d="M11770 8443 c0 -3 16 -56 36 -117 85 -263 155 -606 190 -931 21 -204
        30 -798 15 -1036 -55 -850 -246 -1717 -568 -2573 -349 -929 -813 -1743 -1380
        -2424 -87 -104 -103 -129 -103 -158 l0 -34 2095 0 2095 0 5 22 c9 40 245 1561
        245 1580 0 17 -45 18 -1120 18 -1048 0 -1120 1 -1120 17 0 17 176 1127 185
        1171 l5 22 1048 0 1048 0 118 768 c65 422 120 777 123 790 l5 22 -1047 0
        c-833 0 -1046 3 -1043 13 3 6 45 272 94 590 l89 577 1123 0 c889 0 1124 3
        1127 13 3 6 61 372 130 812 69 440 128 815 131 833 l6 32 -1766 0 c-971 0
        -1766 -3 -1766 -7z"
              />
              <path
              style={{fill: 'rgb(0, 149, 255)'}}
                d="M6468 8287 c-161 -60 -251 -187 -251 -352 0 -104 27 -176 94 -250
        177 -193 496 -144 607 93 24 50 27 70 27 157 0 89 -3 106 -27 156 -36 72 -105
        141 -176 176 -48 23 -72 28 -147 31 -57 1 -103 -3 -127 -11z"
              />
              <path
                d="M249 7891 c-194 -62 -291 -266 -219 -456 28 -71 101 -149 175 -185
        l50 -25 990 -3 990 -3 1150 -1725 c788 -1182 1164 -1738 1194 -1764 23 -22 68
        -49 100 -61 65 -25 38 -24 737 -27 l482 -2 -73 -72 c-115 -116 -165 -234 -165
        -393 0 -158 50 -278 164 -390 217 -215 555 -215 770 1 109 108 161 234 161
        389 0 156 -52 281 -163 392 l-63 63 624 0 c343 0 725 -3 848 -6 l224 -6 -62
        -63 c-104 -105 -153 -228 -153 -380 0 -158 50 -278 164 -390 217 -215 555
        -215 770 1 109 108 161 234 161 389 0 153 -51 279 -156 385 l-57 58 176 4
        c170 3 179 4 233 31 69 34 132 100 167 175 22 47 26 72 26 137 0 93 -27 165
        -89 233 -42 48 -137 98 -198 107 -23 3 -982 12 -2131 20 -1148 7 -2089 15
        -2091 17 -1 2 -520 780 -1153 1729 -861 1293 -1160 1734 -1191 1758 -23 18
        -65 43 -94 55 -52 21 -53 21 -1147 23 -1034 2 -1098 1 -1151 -16z"
              />
              <path
                d="M3995 7441 c-182 -52 -293 -182 -264 -309 21 -93 116 -180 247 -224
        l67 -23 3283 -3 c3578 -2 3351 -6 3480 53 76 35 119 69 152 122 59 92 48 180
        -31 267 -52 57 -124 97 -215 121 -51 13 -448 15 -3359 14 -3093 0 -3304 -2
        -3360 -18z"
              />
              <path
                d="M4555 6416 c-100 -32 -188 -104 -221 -181 -66 -156 53 -331 254 -374
        38 -8 796 -11 2770 -11 2380 0 2725 2 2775 15 161 42 257 149 257 285 0 98
        -85 206 -199 252 l-56 23 -2770 2 c-2218 1 -2778 -1 -2810 -11z"
              />
              <path
                d="M20225 6189 c-253 -39 -460 -137 -623 -293 -180 -172 -268 -326 -330
        -576 l-26 -105 -4 -1535 c-2 -1069 0 -1564 8 -1632 22 -193 83 -368 179 -515
        176 -266 440 -433 770 -488 81 -14 141 -16 284 -12 161 4 196 8 299 35 371 97
        659 360 778 712 59 174 63 210 67 703 l5 457 -376 0 -376 0 0 -377 c0 -214 -5
        -406 -11 -443 -16 -103 -62 -191 -135 -259 -90 -85 -147 -105 -295 -106 -113
        0 -116 1 -191 37 -115 57 -191 151 -223 274 -14 54 -15 233 -13 1575 l3 1514
        23 54 c68 161 195 254 364 268 235 20 430 -133 467 -367 6 -36 11 -206 11
        -377 l0 -313 376 0 376 0 -5 393 c-5 420 -9 456 -63 622 -54 164 -133 294
        -253 418 -163 169 -342 267 -586 322 -84 19 -410 28 -500 14z"
              />
              <path
              style={{fill: 'rgb(0, 149, 255)'}}
                d="M22972 6189 c-258 -35 -463 -132 -627 -295 -222 -222 -335 -532 -335
        -918 0 -363 99 -658 322 -961 133 -180 256 -315 608 -665 464 -462 552 -565
        640 -745 63 -128 90 -239 90 -370 0 -114 -18 -198 -57 -264 -86 -146 -231
        -221 -429 -221 -204 0 -349 92 -428 273 -40 89 -56 191 -56 352 0 109 -3 145
        -12 145 -23 0 -682 -71 -705 -76 -22 -4 -23 -9 -23 -97 0 -433 113 -742 358
        -983 222 -219 523 -334 875 -334 620 0 1080 366 1202 955 23 109 30 328 16
        450 -52 445 -248 752 -916 1435 -444 454 -579 617 -665 804 -54 116 -73 201
        -73 331 0 176 41 294 131 376 68 64 139 91 248 97 182 9 304 -58 379 -211 47
        -97 64 -183 72 -364 3 -84 7 -153 9 -153 14 0 667 71 693 76 l34 5 -6 177 c-7
        184 -27 317 -68 441 -129 390 -415 646 -809 726 -93 19 -370 27 -468 14z"
              />
              <path
              style={{fill: 'rgb(0, 149, 255)'}}
                d="M28430 6190 c-238 -33 -434 -112 -594 -240 -248 -198 -389 -462 -425
        -798 -15 -143 -15 -2931 0 -3074 30 -278 128 -500 300 -683 142 -150 275 -234
        470 -299 251 -84 588 -88 849 -12 352 102 630 367 745 710 63 188 59 61 63
        1761 2 1145 0 1573 -8 1639 -67 506 -400 866 -905 977 -104 23 -389 34 -495
        19z m380 -739 c81 -31 146 -84 191 -153 80 -125 74 17 77 -1656 3 -1627 5
        -1558 -54 -1673 -73 -145 -208 -219 -399 -219 -154 1 -251 37 -334 125 -57 60
        -85 111 -109 198 -16 57 -17 170 -17 1542 0 1390 1 1484 18 1545 43 156 147
        262 298 305 79 22 256 15 329 -14z"
              />
              <path
                d="M15040 3615 l0 -2515 385 0 385 0 0 1020 0 1020 279 0 c154 0 314 5
        357 11 448 62 782 328 917 729 61 183 62 199 62 755 0 562 -1 577 -67 765
        -116 332 -373 576 -711 674 -181 52 -240 56 -951 56 l-656 0 0 -2515z m1270
        1784 c188 -30 319 -161 349 -349 14 -85 14 -745 0 -830 -19 -119 -79 -221
        -165 -281 -95 -65 -132 -72 -421 -77 l-263 -4 0 776 0 776 218 0 c119 0 246
        -5 282 -11z"
              />
              <path
                d="M17880 3615 l0 -2515 385 0 385 0 0 2515 0 2515 -385 0 -385 0 0
        -2515z"
              />
              <path
              style={{fill: 'rgb(0, 149, 255)'}}
                d="M24620 5770 l0 -360 420 0 420 0 0 -2155 0 -2155 380 0 380 0 0 2155
        0 2155 415 0 415 0 0 360 0 360 -1215 0 -1215 0 0 -360z"
              />
              <path
              style={{fill: 'rgb(0, 149, 255)'}}
                d="M30430 3616 l0 -2516 380 0 380 0 0 1040 0 1040 197 -2 197 -3 275
        -1037 276 -1038 393 0 c281 0 392 3 392 11 0 6 -142 511 -316 1122 l-316 1112
        23 15 c223 146 396 395 458 660 38 163 43 240 38 691 -4 403 -5 441 -26 534
        -48 215 -137 387 -276 533 -169 178 -335 268 -595 325 -89 19 -135 20 -787 24
        l-693 4 0 -2515z m1345 1765 c120 -44 205 -130 247 -251 22 -64 23 -74 23
        -475 0 -463 -1 -472 -75 -583 -48 -71 -121 -125 -211 -154 -56 -18 -96 -21
        -316 -26 l-253 -4 0 762 0 762 263 -4 c239 -4 267 -6 322 -27z"
              />
              <path
              style={{fill: 'rgb(0, 149, 255)'}}
                d="M33380 3615 l0 -2515 1080 0 1080 0 0 360 0 360 -700 0 -700 0 0 735
        0 735 555 0 555 0 0 360 0 360 -555 0 -555 0 0 700 0 700 700 0 700 0 0 360 0
        360 -1080 0 -1080 0 0 -2515z"
              />
              <path
                d="M5147 5359 c-61 -14 -112 -45 -155 -94 -132 -150 -74 -389 113 -461
        49 -19 106 -19 2255 -19 l2205 0 53 24 c31 14 70 43 96 72 132 147 87 368 -92
        456 l-57 28 -2190 2 c-1258 0 -2206 -3 -2228 -8z"
              />
            </g>
          </svg>
        </Link>
      </HeaderLogo>
      <HeaderItems className="headerItems">
        <SearchBar />
        <Link to="/cart" className="linkCartBtn">
          <button className="cartButton">
            <div className="text">
              <div className="subText1">Cart:</div>
              <div className="subText2">{basket?.length}</div>
            </div>
            <div className="image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="45"
                height="45"
                viewBox="0 0 256 256"
              >
                <g transform="translate(128 128) scale(0.48 0.48)">
                  <g
                    style={{
                      stroke: "none",
                      strokeWidth: 0,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
                  >
                    <path
                      d="M 72.975 58.994 H 31.855 c -1.539 0 -2.897 -1.005 -3.347 -2.477 L 15.199 13.006 H 3.5 c -1.933 0 -3.5 -1.567 -3.5 -3.5 s 1.567 -3.5 3.5 -3.5 h 14.289 c 1.539 0 2.897 1.005 3.347 2.476 l 13.309 43.512 h 36.204 l 10.585 -25.191 H 45 c -1.933 0 -3.5 -1.567 -3.5 -3.5 s 1.567 -3.5 3.5 -3.5 h 41.5 c 1.172 0 2.267 0.587 2.915 1.563 s 0.766 2.212 0.312 3.293 L 76.201 56.85 C 75.655 58.149 74.384 58.994 72.975 58.994 z"
                      transform=" matrix(1 0 0 1 0 0) "
                      strokeLinecap="round"
                    />
                    <circle
                      cx="28.88"
                      cy="74.33"
                      r="6.16"
                      transform="  matrix(1 0 0 1 0 0) "
                    />
                    <circle
                      cx="74.59"
                      cy="74.33"
                      r="6.16"
                      transform="  matrix(1 0 0 1 0 0) "
                    />
                  </g>
                </g>
              </svg>
            </div>
          </button>
        </Link>
        {
          user ? 
            <button className="profileButton">
            <div className="greetUser">
              Hello, <div className="userName">&nbsp;{user.displayName ? user.displayName?.split(" ")[0] : 'User'}</div>
            </div>
            <div className="profileSettings">
              Account & Lists
              <svg
                width="13px"
                height="13px"
                viewBox="0 0 256 256"
                id="Flat"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M236.77344,211.97656a23.75471,23.75471,0,0,1-20.79688,12.01563H40.02344a23.9925,23.9925,0,0,1-20.76563-36.02344L107.23437,35.97656h-.00781a24.00413,24.00413,0,0,1,41.54688,0l87.96875,151.99219A23.744,23.744,0,0,1,236.77344,211.97656Z" />
              </svg>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="50"
              height="50"
              viewBox="0 0 256 256"
            >
              <g transform="translate(128 128) scale(0.62 0.62)">
                <g
                  style={{
                    stroke: "none",
                    strokeWidth: 0,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
                >
                  <path
                    d="M 79.635 73.696 C 86.104 65.901 90 55.898 90 45 C 90 20.187 69.813 0 45 0 C 20.187 0 0 20.187 0 45 c 0 10.898 3.896 20.901 10.365 28.696 c 0.105 0.161 0.227 0.315 0.383 0.445 c 0.002 0.002 0.005 0.003 0.007 0.005 C 19.015 83.837 31.298 90 45 90 c 13.702 0 25.985 -6.163 34.245 -15.854 c 0.003 -0.002 0.005 -0.003 0.008 -0.005 C 79.408 74.01 79.53 73.857 79.635 73.696 z M 45 4 c 22.607 0 41 18.393 41 41 c 0 9.169 -3.026 17.645 -8.132 24.482 c -6.081 -6.505 -13.876 -10.99 -22.402 -13.023 c 6.497 -3.669 10.901 -10.629 10.901 -18.609 c 0 -11.782 -9.585 -21.367 -21.367 -21.367 c -11.782 0 -21.367 9.585 -21.367 21.367 c 0 7.979 4.404 14.939 10.901 18.608 c -8.526 2.033 -16.321 6.518 -22.402 13.023 C 7.026 62.645 4 54.169 4 45 C 4 22.393 22.393 4 45 4 z M 45 55.217 c -9.576 0 -17.367 -7.791 -17.367 -17.367 S 35.424 20.482 45 20.482 s 17.367 7.791 17.367 17.367 S 54.576 55.217 45 55.217 z M 45 86 c -11.986 0 -22.787 -5.171 -30.29 -13.399 C 22.48 64.079 33.418 59.217 45 59.217 c 11.581 0 22.52 4.863 30.29 13.384 C 67.787 80.829 56.986 86 45 86 z"
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </svg>
            <div className="profileSubCategories">
              <div className="greetUser">
                Hello, <div className="userName">&nbsp; {user.displayName ? user.displayName?.split(" ")[0] : 'User'}</div>
              </div>
              <Link to='/youraccount'><div>Your Account</div></Link>
              <Link to=''><div>Your Orders</div></Link>
              <Link to=''><div>Your Wish List</div></Link>
              <Link to=''><div>Your Recomendations</div></Link>
              <Link to=''><div>Your Seller Account</div></Link>
              <hr />
              <Link to=''><div>Switch Account</div></Link>
              <div onClick={signOut}>Sign Out</div>
            </div>
          </button> 
          :
          <Link to="/login" className="linkLoginBtn">
          <button className="loginButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="50"
              height="50"
              viewBox="0 0 256 256"
            >
              <g transform="translate(128 128) scale(0.62 0.62)">
                <g
                  style={{
                    stroke: "none",
                    strokeWidth: 0,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
                >
                  <path
                    d="M 79.635 73.696 C 86.104 65.901 90 55.898 90 45 C 90 20.187 69.813 0 45 0 C 20.187 0 0 20.187 0 45 c 0 10.898 3.896 20.901 10.365 28.696 c 0.105 0.161 0.227 0.315 0.383 0.445 c 0.002 0.002 0.005 0.003 0.007 0.005 C 19.015 83.837 31.298 90 45 90 c 13.702 0 25.985 -6.163 34.245 -15.854 c 0.003 -0.002 0.005 -0.003 0.008 -0.005 C 79.408 74.01 79.53 73.857 79.635 73.696 z M 45 4 c 22.607 0 41 18.393 41 41 c 0 9.169 -3.026 17.645 -8.132 24.482 c -6.081 -6.505 -13.876 -10.99 -22.402 -13.023 c 6.497 -3.669 10.901 -10.629 10.901 -18.609 c 0 -11.782 -9.585 -21.367 -21.367 -21.367 c -11.782 0 -21.367 9.585 -21.367 21.367 c 0 7.979 4.404 14.939 10.901 18.608 c -8.526 2.033 -16.321 6.518 -22.402 13.023 C 7.026 62.645 4 54.169 4 45 C 4 22.393 22.393 4 45 4 z M 45 55.217 c -9.576 0 -17.367 -7.791 -17.367 -17.367 S 35.424 20.482 45 20.482 s 17.367 7.791 17.367 17.367 S 54.576 55.217 45 55.217 z M 45 86 c -11.986 0 -22.787 -5.171 -30.29 -13.399 C 22.48 64.079 33.418 59.217 45 59.217 c 11.581 0 22.52 4.863 30.29 13.384 C 67.787 80.829 56.986 86 45 86 z"
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </svg>
            <div className="text">LOGIN</div>
          </button>
        </Link>
      }
        <button id="theme-toggle" aria-label="Switch to Dark Theme">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472.39 472.39">
            <g className="toggle-circle">
              <circle className="cls-1" cx="236.2" cy="236.2" r="103.78" />
            </g>
            <g className="toggle-sun">
              <path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
            </g>
          </svg>
        </button>
      </HeaderItems>
    </HeaderContainer>
  );
}

export default Header

const HeaderContainer = styled.div``

const HeaderLogo = styled.div``

const HeaderItems = styled.div`
  display: flex;
  @media only screen and (max-width: 1090px) {margin-top: 1em;}
  flex-direction: row;
  height: 6em;
  align-items: center;
  width: 100%;
`