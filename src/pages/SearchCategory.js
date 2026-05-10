import { useStateValue } from '../StateProvider';
import SearchDetails from '../components/SearchDetails/SearchDetails';


function SearchCategory() {
  const [{ productDetails }] = useStateValue();

  // Display loading state if productDetails is not available
  if (!productDetails || productDetails.length === 0) {
    return <div>Loading..</div>;
  }

  return <SearchDetails />;
}

export default SearchCategory;