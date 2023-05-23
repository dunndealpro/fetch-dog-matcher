import { FC } from "react";
import { Col, Dropdown } from "react-bootstrap";
import "./SearchResultSort.css";

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
      <Col xs={6} sm={6} md={2} lg={2} xl={1} xxl={1} className="mt-2">
        Sort By:
      </Col>
      <Col xs={3} sm={3} md={2} lg={2} xl={1} xxl={1} className="mt-2">
        <Dropdown className="sort-drop rounded ">
          <Dropdown.Toggle className="sort-drop rounded" variant="" id="">
            {sort}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOnClickAge}>Age</Dropdown.Item>
            <Dropdown.Item onClick={handleOnClickBreed}>Breed</Dropdown.Item>
            <Dropdown.Item onClick={handleOnClickName}>Name</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col xs={3} sm={3} md={2} lg={2} xl={1} xxl={1} className="mt-2 ">
        <Dropdown className="sort-drop rounded ">
          <Dropdown.Toggle className="sort-drop rounded" variant="" id="">
            {sortDir}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOnClickAsc}>Asending</Dropdown.Item>
            <Dropdown.Item onClick={handleOnClickDesc}>
              Decscending
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </>
  );
};

export default SearchResultSort;
