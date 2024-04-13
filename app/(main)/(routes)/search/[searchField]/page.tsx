import { SearchProducts } from "@/components/search-products";

interface SearchPageProps {
  params: {
    searchField: string;
  };
}
const SearchPage = ({ params }: SearchPageProps) => {
  console.log(params);
  return (
    <div>
        <SearchProducts searchField={params.searchField}/>
    </div>
  );
};

export default SearchPage;
