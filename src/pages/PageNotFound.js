import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.css'

function PageNotFound() {

    useEffect(() => {
        let header = document.querySelector('.headerContainer')
        let footer = document.querySelector('.footerItems')
        header.style.display = 'none'
        footer.style.display = 'none'
    }, [])

    return (
      <div className='errorContainer'>
        <div className='error'><div className='num'>404</div> Error</div>
        <div className='pagenotfound'>Page not Found</div>
        <p>Continue to <Link to='/'>Epicstor</Link></p>
      </div>
    )

}

export default PageNotFound