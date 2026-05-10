import { useParams, Navigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import ProductDetails from '../components/Products/ProductDetails';
import EpicLoader from '../components/EpicLoader/EpicLoader';

function ProductPage() {
  const { title } = useParams();
  const [{ productDetails }] = useStateValue();

  if (!productDetails || productDetails.length === 0) {
    return <EpicLoader label="Fetching product" />;
  }

  const decodedTitle = decodeURIComponent(title);
  const product = productDetails.find(p => p.title === decodedTitle);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  return <ProductDetails product={product} />;
}

export default ProductPage;