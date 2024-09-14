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
    <div className="my-5">
      <img
        src={countryDetails.flags.png}
        alt={`${countryDetails.name.common} flag`}
        className="w-[300px] h-[200px] mx-auto"
      />

      <div className=" mx-auto my-2 text-center">
        <h1 className="text-center font-medium">{countryDetails.name.common} Details</h1>

        <p className="my-2">
          <strong className=" uppercase font-semibold">Capital:</strong>{" "}
          {countryDetails.capital ? countryDetails.capital[0] : "No capital"}
        </p>
        <p className="my-2">
          <strong className=" uppercase font-semibold">Region:</strong> {countryDetails.region}
        </p>
        <p className="my-2">
          <strong className=" uppercase font-semibold">Population:</strong> {countryDetails.population}
        </p>
      </div>

    </div>
  );
};

export default SearchProfile;
