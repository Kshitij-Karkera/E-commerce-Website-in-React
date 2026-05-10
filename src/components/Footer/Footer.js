import React from 'react'
import styled from 'styled-components'
import './Footer.css'
import { CopyRightIcon, FacebookIcon, InstagramIcon, TwitterIcon } from '../Icons/Icons'

function Footer() {
    return (
        <FooterConatiner className='footerItems'>
            <div className="copyRight">
                <CopyRightIcon />
                <span>Copyright 2026</span>
            </div>
            <div className="socialLinks">
                <button>
                    <InstagramIcon />
                </button>
                <button>
                    <TwitterIcon />
                </button>
                <button>
                    <FacebookIcon />
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
  @media only screen and (max-width: 625px) {
    height: 13.5em;
  }
`