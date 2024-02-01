import { useEffect, useState } from 'react'
import './App.css'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState(null)
  const [sort, setSort] = useState("asc")

  console.log(countries)

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => setCountries(data))
  }, [])

  const sortCountries = () => {
    setCountries([...countries
      .sort((a, b) => sort === "asc" 
        ? a.population - b.population
        : b.population - a.population)
      ])
    setSort(sort === "asc" ? "desc" : "asc")
  }

  return (
    <>
      {countries
        ? <>
          <button onClick={sortCountries}>sort {sort === "asc" ? "ascending" : "descending"} by population</button>
          {countries.map((country, index) => <Country key={index} countryData={country} />)}
        </>
        : <p>loading...</p>
      }
    </>
  )
}

export default App