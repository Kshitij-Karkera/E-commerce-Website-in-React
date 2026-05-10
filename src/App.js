import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import { auth } from './firebaseHandler';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const MyCart = lazy(() => import('./pages/MyCart'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const SearchCategory = lazy(() => import('./pages/SearchCategory'));
const YourAccount = lazy(() => import('./pages/YourAccount'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Header = lazy(() => import('./components/Header/Header'));
const Footer = lazy(() => import('./components/Footer/Footer'));

function App() {
  const [{ productDetails }, dispatch] = useStateValue();

  // Authentication effect with cleanup
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      dispatch({
        type: 'SET_USER',
        user: authUser || null,
      });
      if (!authUser) {
        localStorage.removeItem('item');
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<div>Loading..</div>}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/forgotpassword" element={<ForgotPassword />} />
          <Route path="/cart" element={<MyCart />} />
          <Route path="/youraccount" element={<YourAccount />} />
          <Route path="/product/:title" element={<ProductPage />} />
          <Route path="/category/:category" element={<SearchCategory />} />
          <Route path="/brand/:brandName/:subBrand" element={<SearchCategory />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;