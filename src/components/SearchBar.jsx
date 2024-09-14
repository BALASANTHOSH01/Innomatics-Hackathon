import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [userInput, setUserInput] = useState("");
  const [countryDetails, setCountryDetails] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    const fetchCountryDetails = async () => {
      if (userInput.trim() === "") {
        setCountryDetails([]);
        return;
      }

      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${userInput}`);
        
        if (!response.ok) {
          throw new Error("Countries not found");
        }

        const data = await response.json();
        setCountryDetails(data.slice(0, 10)); // Limit results to first 10
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.message);
        setCountryDetails([]); // Clear previous results
      }
    };

    fetchCountryDetails();
  }, [userInput]);

  return (
    <div>
      <div className=" flex justify-center items-center">
        <input
          type="text"
          value={userInput}
          onChange={handleSearch}
          placeholder="Enter country or capital name"
          className="w-[500px] max-sm:w-[350px] bg-gray-800 border p-3 px-5 text-white rounded-[10px] mx-auto"
        />
      </div>

      {error && <div>Error: {error}</div>}

      {countryDetails.length > 0 && (
        <ul className="bg-gray-300 rounded-[10px] p-1 mt-[2%] py-3">
          {countryDetails.map((country) => (
            <li key={country.cca3} className="hover:bg-white cursor-pointer p-2 rounded-[10px] ">
              <Link to={`/country/${country.name.common}`}>
                <p className="ml-[3%]">{country.name.common} - {country.capital ? country.capital[0] : "No capital"}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
