import { FC } from "react";
import "./SearchPageWelcome.css";

const SearchPageWelcome: FC = () => {
  return (
    <>
      <div className="m-4">
        <h1>Welcome to the Dog-Matcher!</h1>
        <h3>Search for awesome new friends below!</h3>
      </div>
    </>
  );
};

export default SearchPageWelcome;
