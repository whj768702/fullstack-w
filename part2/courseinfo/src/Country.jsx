import axios from 'axios';
import { useState, useEffect } from 'react';

const Country = () => {
  const [keyword, setKeyword] = useState('');
  const [tooLong, setTooLong] = useState(0);
  const [showCountries, setShowCountries] = useState([]);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3/name/${keyword}`).then(result => {
      console.log('result: ', result);
      if (result.status === 200) {
        setTooLong(result.data.length);
        setShowCountries(result.data);
      }
    })
  }, [keyword]);

  const handleShowCountry = () => {
    if (showCountries.length > 1) {
      return (
        <ul>
          {showCountries.map((country, index) => {
            return (
              <li key={index}>{country.name.common}</li>
            );
          })}
        </ul>
      );
    } else {
      const country = showCountries[0];
      if (!country) {
        return null;
      }
      return (
        <div>
          <h2>{country.name.common}</h2>
          <h4>capital {country.capital[0]}</h4>
          <h4>population {country.area}</h4>
          <div>
            <h3>language</h3>
            <ul>
              {Object.values(country.languages).map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <h2>Country</h2>
      <div>
        <span>find countries: </span>
        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </div>
      <div>
        {tooLong >= 10 ? 'Too many matches, specify another filter' : handleShowCountry()}
      </div>
    </div>
  );
}

export default Country;