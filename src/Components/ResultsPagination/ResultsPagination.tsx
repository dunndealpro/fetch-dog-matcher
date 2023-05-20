import { FC } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./ResultsPagination.css";

interface SearchResult {
  resultIds: Array<any>;
  total: number;
  next: string | undefined;
  prev: string | undefined;
}

interface ResultsPaginationProps {
  searchResult: SearchResult | undefined;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult | undefined>
  >;
}

const ResultsPagination: FC<ResultsPaginationProps> = ({
  searchResult,
  setSearchResults,
}) => {

  let searchUrl = `https://frontend-take-home-service.fetch.com`;
  let urlNext = searchUrl+searchResult?.next;
  let urlPrev = searchUrl+searchResult?.prev;
  async function handleNextClick() {
    if (urlNext) {
        console.log(urlNext)
      let results: SearchResult = await fetch(urlNext, {
        credentials: "include",
      }).then((res) => res.json());
      console.log(results);
      setSearchResults(results);
    }
  }

  async function handlePrevClick() {
    if (urlPrev) {
        console.log(urlPrev)
        let results: SearchResult = await fetch(urlPrev, {
          credentials: "include",
        }).then((res) => res.json());
        console.log(results);
        setSearchResults(results);
      }
  }
  return (
    <>
      <div>
        
        <Pagination className="d-flex justify-content-center">
          {/* <Pagination.First /> */}
          <Pagination.Prev onClick={handlePrevClick} />
          {/* <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>
        
        <Pagination.Ellipsis />
    <Pagination.Item>{20}</Pagination.Item> */}
          <Pagination.Next onClick={handleNextClick} />
          {/* <Pagination.Last /> */}
        </Pagination>
      </div>
    </>
  );
};

export default ResultsPagination;
