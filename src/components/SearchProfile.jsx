import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchProfile = () => {
  const { name } = useParams(); // Get the country name from the URL
  const [countryDetails, setCountryDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );

        if (!response.ok) {
          throw new Error("Country not found");
        }

        const data = await response.json();
        setCountryDetails(data[0]); // Use the first result
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.message);
        setCountryDetails(null); // Clear previous results
      }
    };

    fetchCountryDetails();
  }, [name]);

  if (error) return <div>Error: {error}</div>;
  if (!countryDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>{countryDetails.name.common} Details</h1>
      <p>
        <strong>Capital:</strong>{" "}
        {countryDetails.capital ? countryDetails.capital[0] : "No capital"}
      </p>
      <p>
        <strong>Region:</strong> {countryDetails.region}
      </p>
      <p>
        <strong>Population:</strong> {countryDetails.population}
      </p>
      <p>
        <strong>Flag:</strong>{" "}
        <img
          src={countryDetails.flags.png}
          alt={`${countryDetails.name.common} flag`}
          width="100"
        />
      </p>
    </div>
  );
};

export default SearchProfile;
