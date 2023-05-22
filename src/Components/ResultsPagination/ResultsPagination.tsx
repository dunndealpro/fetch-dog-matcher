import { FC, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./ResultsPagination.css";
import { Container, Row, Col } from "react-bootstrap";

// interface ResultsPerPage{
//   resultsPerPage: number
// }

interface SearchResult {
  resultIds: Array<any>;
  total: number;
  next: string | undefined;
  prev: string | undefined;
}

interface ResultsPaginationProps {
  searchResult: SearchResult | undefined;
  setSearchResults: React.Dispatch<
    React.SetStateAction<SearchResult | undefined>
  >;
  resultsPerPage: number;
}

const ResultsPagination: FC<ResultsPaginationProps> = ({
  searchResult,
  setSearchResults,
  resultsPerPage,
}) => {
  const searchUrl = `https://frontend-take-home-service.fetch.com`;
  const urlNext = searchUrl + searchResult?.next;
  const urlPrev = searchUrl + searchResult?.prev;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages =
    searchResult && searchResult.total && resultsPerPage
      ? Math.ceil(searchResult.total / resultsPerPage)
      : 0;

  async function handleNextClick() {
    if (urlNext) {
      console.log(urlNext);
      let results: SearchResult = await fetch(urlNext, {
        credentials: "include",
      }).then((res) => res.json());
      console.log(results);
      setSearchResults(results);
      setCurrentPage(currentPage + 1);
    }
  }

  async function handlePrevClick() {
    if (urlPrev) {
      console.log(urlPrev);
      let results: SearchResult = await fetch(urlPrev, {
        credentials: "include",
      }).then((res) => res.json());
      console.log(results);
      setSearchResults(results);
      setCurrentPage(currentPage - 1);
    }
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="rounded p-2 ">Total Results: {searchResult?.total}</div>
          </Col>
          <Col>
            <Pagination className="d-flex justify-content-center">
              <Pagination.Prev onClick={handlePrevClick} />
              <Pagination.Item>{currentPage}</Pagination.Item>
              <Pagination.Next onClick={handleNextClick} />
            </Pagination>
          </Col>
          <Col>
            <div className="rounded p-2 res-pag-color">
              Total pages: {totalPages}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResultsPagination;
