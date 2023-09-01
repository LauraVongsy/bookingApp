import { useContext, useState } from "react";
import { Context } from "../components/Context";

function SearchInput() {
  const { fetchLocationData, inputAddress, setInputAddress } =
    useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchLocationData(inputAddress);
  };

  return (
    <div className="searchInput">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          placeholder="Entrez une adresse"
        />
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
}

export default SearchInput;
