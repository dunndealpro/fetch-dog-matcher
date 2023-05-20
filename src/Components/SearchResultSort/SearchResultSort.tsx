import { FC } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Row, Col } from "react-bootstrap";
import "./SearchResultSort.css";

// interface Sort{
//     sort: string;
//   }

//   interface SortDir{
//     sortDir: string
//   }

interface SearchResultSortProps {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  sortDir: string;
  setSortDir: React.Dispatch<React.SetStateAction<string>>;
}

const SearchResultSort: FC<SearchResultSortProps> = ({
  sort,
  setSort,
  sortDir,
  setSortDir,
}) => {
  function handleOnClickAge() {
    setSort("age");
  }
  function handleOnClickBreed() {
    setSort("breed");
  }
  function handleOnClickName() {
    setSort("name");
  }

  function handleOnClickAsc() {
    setSortDir("asc");
  }
  function handleOnClickDesc() {
    setSortDir("desc");
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={6}>
            <Dropdown className="">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {sort}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleOnClickAge}>Age</Dropdown.Item>
                <Dropdown.Item onClick={handleOnClickBreed}>
                  Breed
                </Dropdown.Item>
                <Dropdown.Item onClick={handleOnClickName}>Name</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={6}>
            <Dropdown className="">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
               {sortDir}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleOnClickAsc}>
                  Asending
                </Dropdown.Item>
                <Dropdown.Item onClick={handleOnClickDesc}>
                  Decscending
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        Sorting Options
      </Container>
    </>
  );
};

export default SearchResultSort;
