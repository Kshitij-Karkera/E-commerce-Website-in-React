import React from 'react'
import styled from 'styled-components'
import './Footer.css'

function Footer() {
  return (
    <FooterConatiner className='footerItems'>
      <div className="copyRight">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 256 256">
              <g transform="translate(128 128) scale(0.72 0.72)">
                  <g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
                  <path d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 10 c -19.299 0 -35 15.701 -35 35 s 15.701 35 35 35 s 35 -15.701 35 -35 S 64.299 10 45 10 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                  <path d="M 46.173 70 c -13.785 0 -25 -11.215 -25 -25 s 11.215 -25 25 -25 c 3.938 0 7.87 0.946 11.37 2.737 c 2.458 1.258 3.432 4.27 2.174 6.729 c -1.258 2.459 -4.269 3.433 -6.729 2.174 c -2.127 -1.088 -4.42 -1.64 -6.815 -1.64 c -8.271 0 -15 6.729 -15 15 c 0 8.271 6.729 15 15 15 c 2.396 0 4.688 -0.552 6.816 -1.64 c 2.455 -1.258 5.471 -0.286 6.728 2.175 c 1.258 2.458 0.284 5.471 -2.175 6.728 C 54.042 69.054 50.11 70 46.173 70 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
              </g>
              </g>
              </svg>
          Copyright 2022
      </div>
      <div className="socialLinks">
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="25" viewBox="0 0 256 256">
                <g transform="translate(128 128) scale(0.72 0.72)">
                    <g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
                    <linearGradient id="SVGID_3" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 0 92)"  x1="7.5528" y1="9.5531" x2="82.4473" y2="84.4475">
                        <stop offset="0%"/>
                        <stop offset="50%"/>
                        <stop offset="100%"/>
                    </linearGradient>
                    <path d="M 89.729 26.447 c -0.219 -4.79 -0.98 -8.061 -2.092 -10.923 c -1.13 -3.003 -2.901 -5.723 -5.19 -7.971 c -2.247 -2.289 -4.968 -4.062 -7.971 -5.192 C 71.614 1.25 68.343 0.49 63.553 0.272 C 58.754 0.053 57.221 0 45 0 S 31.246 0.053 26.447 0.271 c -4.79 0.219 -8.061 0.98 -10.923 2.092 c -3.003 1.13 -5.723 2.901 -7.971 5.19 c -2.289 2.247 -4.062 4.967 -5.192 7.97 C 1.25 18.386 0.49 21.657 0.272 26.446 C 0.052 31.246 0 32.779 0 45 c 0 12.222 0.052 13.755 0.272 18.554 c 0.218 4.789 0.979 8.061 2.092 10.923 c 1.13 3.002 2.901 5.723 5.19 7.97 c 2.247 2.289 4.968 4.061 7.971 5.19 c 2.862 1.113 6.133 1.873 10.923 2.092 C 31.247 89.948 32.78 90 45.001 90 s 13.754 -0.051 18.553 -0.271 c 4.79 -0.219 8.061 -0.979 10.923 -2.092 c 6.045 -2.337 10.823 -7.116 13.16 -13.16 c 1.113 -2.863 1.873 -6.134 2.092 -10.923 C 89.948 58.754 90 57.221 90 45 C 90 32.779 89.948 31.246 89.729 26.447 z M 81.629 63.185 c -0.2 4.388 -0.933 6.77 -1.549 8.356 c -1.514 3.925 -4.616 7.026 -8.54 8.54 c -1.585 0.616 -3.968 1.349 -8.356 1.549 C 58.44 81.847 57.016 81.892 45 81.892 c -12.017 0 -13.44 -0.045 -18.184 -0.262 c -4.387 -0.2 -6.77 -0.933 -8.356 -1.549 c -1.954 -0.722 -3.722 -1.872 -5.174 -3.367 c -1.495 -1.452 -2.645 -3.219 -3.367 -5.174 c -0.616 -1.585 -1.349 -3.968 -1.549 -8.356 c -0.216 -4.745 -0.262 -6.168 -0.262 -18.184 c 0 -12.016 0.046 -13.439 0.262 -18.184 c 0.201 -4.388 0.933 -6.77 1.549 -8.356 c 0.722 -1.955 1.872 -3.723 3.367 -5.175 c 1.452 -1.495 3.22 -2.645 5.175 -3.366 c 1.585 -0.617 3.968 -1.349 8.356 -1.55 C 31.561 8.154 32.984 8.108 45 8.108 h -0.001 c 12.016 0 13.439 0.046 18.184 0.263 c 4.388 0.2 6.77 0.933 8.356 1.549 c 1.954 0.722 3.722 1.872 5.174 3.366 c 1.495 1.452 2.645 3.22 3.366 5.175 c 0.617 1.585 1.35 3.968 1.55 8.356 c 0.216 4.745 0.262 6.168 0.262 18.184 C 81.891 57.017 81.846 58.439 81.629 63.185 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'url(#SVGID_3)', fillRule: 'nonzero', opacity: 1}}  transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                    <linearGradient id="SVGID_4" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 0 92)"  x1="28.6598" y1="30.66" x2="61.3394" y2="63.3397">
                        <stop offset="0%"/>
                        <stop offset="50%"/>
                        <stop offset="100%"/>
                    </linearGradient>
                    <path d="M 44.999 21.892 c -12.762 0 -23.108 10.346 -23.108 23.108 s 10.346 23.108 23.108 23.108 c 12.763 0 23.108 -10.346 23.108 -23.108 S 57.762 21.892 44.999 21.892 z M 44.999 60 C 36.716 59.999 30 53.284 30 45 c 0 -8.284 6.715 -15 15 -15 c 8.284 0.001 15 6.716 15 15 C 60 53.284 53.284 60 44.999 60 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'url(#SVGID_4)', fillRule: 'nonzero', opacity: 1}}  transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                    <linearGradient id="SVGID_5" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 0 92)"  x1="65.2021" y1="67.2024" x2="72.8391" y2="74.8394">
                        <stop offset="0%"/>
                        <stop offset="100%"/>
                    </linearGradient>
                    <path d="M 74.421 20.979 c 0 2.982 -2.418 5.4 -5.4 5.4 c -2.983 0 -5.4 -2.418 -5.4 -5.4 c 0 -2.983 2.418 -5.4 5.4 -5.4 C 72.003 15.579 74.421 17.997 74.421 20.979 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'url(#SVGID_5)', fillRule: 'nonzero', opacity: 1}}  transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                    </g>
                </g>
            </svg>
        </button>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="25" viewBox="0 0 256 256">
                <g transform="translate(128 128) scale(0.97 0.97)">
                    <g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform="translate(-130.05 -130.05000000000004) scale(2.89 2.89)" >
                    <path d="M 28.303 81.565 c 33.962 0 52.538 -28.138 52.538 -52.538 c 0 -0.799 0 -1.595 -0.054 -2.387 c 3.614 -2.614 6.733 -5.85 9.212 -9.558 c -3.37 1.493 -6.945 2.473 -10.606 2.905 c 3.855 -2.308 6.74 -5.937 8.118 -10.213 c -3.625 2.151 -7.59 3.667 -11.725 4.482 c -6.993 -7.436 -18.69 -7.795 -26.126 -0.802 c -4.796 4.51 -6.83 11.23 -5.342 17.643 C 29.473 30.352 15.64 23.34 6.264 11.804 c -4.901 8.437 -2.398 19.231 5.717 24.649 c -2.939 -0.087 -5.813 -0.88 -8.381 -2.311 c 0 0.076 0 0.155 0 0.234 c 0.002 8.79 6.198 16.36 14.814 18.101 c -2.718 0.741 -5.571 0.85 -8.338 0.317 c 2.419 7.522 9.351 12.675 17.251 12.823 c -6.539 5.139 -14.616 7.928 -22.932 7.92 C 2.926 73.534 1.459 73.445 0 73.27 c 8.444 5.419 18.27 8.293 28.303 8.28" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                    </g>
                </g>
            </svg>
        </button>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="25" viewBox="0 0 256 256">
                <g transform="translate(128 128) scale(0.72 0.72)">
                    <g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
                    <circle cx="45" cy="45" r="45" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} transform="  matrix(1 0 0 1 0 0) "/>
                    <path d="M 49.645 74.998 V 47.631 h 9.186 l 1.375 -10.665 H 49.645 v -6.809 c 0 -3.088 0.857 -5.192 5.285 -5.192 l 5.648 -0.002 v -9.539 c -0.977 -0.13 -4.329 -0.42 -8.23 -0.42 c -8.143 0 -13.717 4.97 -13.717 14.098 v 7.865 h -9.209 v 10.665 h 9.209 v 27.367 H 49.645 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,255,255)', fillRule: 'nonzero', opacity: 1}}  transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                    </g>
                </g>
            </svg>
        </button>
      </div>
  </FooterConatiner>
  )
}

export default Footer

const FooterConatiner = styled.div`
  display: flex;
  bottom: .5em;
  flex-direction: row;
  height: 6em;
  margin-top: 1em;
  align-items: center;
  border-radius: 10px;
  padding: 1em;
  width: 100%;
  background-color: var(--background-color);
  box-shadow: -3px -3px 5px var(--upper-box-shadow-foreground),
              3px 3px 5px var(--lower-box-shadow-foreground);
  transition: .5s;
  @media only screen and (max-width: 620px) {
    height: 13.5em;
  }
`