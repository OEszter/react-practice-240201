function Country({ countryData }) { //ez egy prop, amit az App.jsx-ben felhsznaálunk, majd, amikor a Country components-et felhasználjuk
	return (
		<div>
			{countryData.name.common}
			{countryData.population}
		</div>
	)
}

export default Country