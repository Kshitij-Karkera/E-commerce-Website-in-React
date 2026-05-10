import { useStateValue } from '../StateProvider';
import SearchDetails from '../components/SearchDetails/SearchDetails';
import EpicLoader from '../components/EpicLoader/EpicLoader';

function SearchCategory() {
  const [{ productDetails }] = useStateValue();

  if (!productDetails || productDetails.length === 0) {
    return <EpicLoader label="Fetching results" />;
  }

  return <SearchDetails />;
}

export default SearchCategory;