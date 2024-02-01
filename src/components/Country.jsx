function Country({ countryData }) {
	return (
		<div>
			{countryData.name.common}
			{countryData.population}
		</div>
	)
}

export default Country