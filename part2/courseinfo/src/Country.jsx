import axios from 'axios';
import { useState, useEffect } from 'react';

const CountryDetail = ({ name, capital, population, languages }) => {
  return (
    <div>
      <h2>{name}</h2>
      <h4>capital {capital}</h4>
      <h4>population {population}</h4>
      <div>
        <h3>language</h3>
        <ul>
          {languages.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}

const Country = () => {
  const [keyword, setKeyword] = useState('');
  const [tooLong, setTooLong] = useState(0);
  const [showCountries, setShowCountries] = useState([]);
  const [detailStatus, setDetailStatus] = useState(new Array(10).fill(false));

  useEffect(() => {
    axios.get(`https://restcountries.com/v3/name/${keyword}`).then(result => {
      // axios.get(`https://restcountries.com/v3/all`).then(result => {
      console.log('result: ', result);
      if (result.status === 200) {
        setTooLong(result.data.length);
        setShowCountries(result.data);
      }
    })
  }, [keyword]);

  const handleShowCountryDetail = (index) => {
    detailStatus[index] = !detailStatus[index];
    setDetailStatus([...detailStatus]);
  }

  const handleShowCountry = () => {
    if (showCountries.length > 1) {
      return (
        <ul>
          {showCountries.map((country, index) => {
            return (
              <>
                <li key={index}>{country.name.common}</li>
                <button onClick={() => handleShowCountryDetail(index)}>show</button>
                {detailStatus[index] ?
                  <CountryDetail name={country.name.common} capital={country.capital[0]}
                    population={country.population} languages={Object.values(country.languages)} />
                  : ''}
              </>
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
        <CountryDetail name={country.name.common} capital={country.capital[0]}
          population={country.population} languages={Object.values(country.languages)} />
        // <div>
        //   <h2>{country.name.common}</h2>
        //   <h4>capital {country.capital[0]}</h4>
        //   <h4>population {country.area}</h4>
        //   <div>
        //     <h3>language</h3>
        //     <ul>
        //       {Object.values(country.languages).map((item, index) => <li key={index}>{item}</li>)}
        //     </ul>
        //   </div>
        // </div>
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