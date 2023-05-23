import { FC, useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";

import "./ResultsPagination.css";

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
  const searchUrl = process.env.REACT_APP_API_URL + ``;
  const urlNext = searchUrl + searchResult?.next;
  const urlPrev = searchUrl + searchResult?.prev;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages =
    searchResult && searchResult.total && resultsPerPage
      ? Math.ceil(searchResult.total / resultsPerPage)
      : 0;

  async function handleNextClick() {
    if (urlNext) {
      let results: SearchResult = await fetch(urlNext, {
        credentials: "include",
      }).then((res) => res.json());
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
      setSearchResults(results);
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {}, []);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="rounded p-2 ">
              Total Results: {searchResult?.total}
            </div>
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
