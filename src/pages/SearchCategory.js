import { useStateValue } from '../StateProvider';
import SearchDetails from '../components/SearchDetails/SearchDetails';
import Loader from '../components/Loader/Loader';

function SearchCategory() {
  const [{ productDetails }] = useStateValue();

  if (!productDetails || productDetails.length === 0) {
    return <Loader label="Fetching results" />;
  }

  return <SearchDetails />;
}

export default SearchCategory;