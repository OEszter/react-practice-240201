import { useEffect, useState } from 'react'
import './App.css'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState(null)
  const [sort, setSort] = useState("asc")

  console.log(countries) //azért a countries értékét íratjuk ki, és nem a data-ét, mert a setCountries-zal a countries state-be tettük a data-t. null-ból a fetch alatt értéke lett.

  //A usEffect csak egyszer fut le betöltődéskor ill akkor, amikor a dependenciezben [] megadjuk neki, hogy mit figyeljen, minek a váltoására fusson le megint a fetch.
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => setCountries(data))  // a 2. then-ben létezik az adatunk
  }, [])


//Mindenképpen sortolunk egy array-t, [...countries] kell, met különben nem érzékeli a változást a setter. Így egyéblént a countries megartja az eredeti értékét is.
  const sortCountries = () => {
    setCountries([...countries
      .sort((a, b) => sort === "asc" 
        ? a.population - b.population
        : b.population - a.population)
      ])
    setSort(sort === "asc" ? "desc" : "asc") //mert különben a setternél bele van égetve az "asc" érték
  }

  return (
    <>
      {countries
        ? <> {/* A turnery-nél egyszerre egy állítást tud lefuttatni, ezért bele kell tenni egy közös szülőelembe. Legegyszerűbb a react fragment. */}
          <button onClick={sortCountries}>sort {sort === "asc" ? "ascending" : "descending"} by population</button>
          {countries.map((country, index) => <Country key={index} countryData={country} />)}
          {/* A key akkor kell, amikor forEach-et, map-et, stb használunk. */}
        </>
        : <p>loading...</p>
      }
    </>
  )
}

export default App