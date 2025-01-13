import Home from './pages/Home';
import Login from './pages/Login';
import MyCart from './pages/MyCart';
import ProductPage from './pages/ProductPage';
import SearchCategory from './pages/SearchCategory';
import YourAccount from './pages/YourAccount';
import PageNotFound from './pages/PageNotFound';
import ForgotPassword from './pages/ForgotPassword';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { useEffect } from 'react';
import { auth } from './firebaseHandler'

function App() {

  const [{productDetails}, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
        localStorage.removeItem('item')
      }
    })
    // eslint-disable-next-line
  }, [])

  const uniqueCategory = []

  const uniqueProducts = productDetails.filter(element => {
    const isDuplicate = uniqueCategory.includes(element.category)
    if (!isDuplicate) {
      uniqueCategory.push(element.category);
      return true;
    }
    return false;
  })
 
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/login/forgotpassword' element={<ForgotPassword />} />
        <Route exact path='/cart' element={<MyCart />} />
        <Route exact path='/youraccount' element={<YourAccount />} />
        {
          productDetails.map(product => {
            let title = '/' + product.title.replaceAll(' ', '%20')
            return (<Route path={`/${title}`} element={<ProductPage />} /> )
          })
        }
        {
          uniqueProducts.map(product => {
            let title = '/' + product.category.replaceAll(' ', '%20')
            return (<Route path={`/${title}`} element={<SearchCategory />} /> )
          })
        }
        {
          productDetails.map(product => {
            let title = '/' + product.brand.brandName.replaceAll(' ', '%20') + '%20' + product.brand.subBrand.replaceAll(' ', '%20')
            return (<Route path={`/${title}`} element={<SearchCategory />} /> )
          })
        }
        <Route exact path='*' element={<PageNotFound />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;