import { FC, useEffect } from "react";

const SearchPage: FC = () => {
  let url = `https://frontend-take-home-service.fetch.com/dogs/breeds`;
  async function getAllBreeds() {
    let response = await fetch(url, {
        credentials: "include",     
    }).then(res => res.json());
    console.log(response);
  }

  useEffect(() => {
    getAllBreeds();
  }, []);

  return (
  <>Search Page</>
  );
};

export default SearchPage;
