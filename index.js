let countries = [];

        async function fetchCountries() {
            const response = await fetch('https://restcountries.com/v3.1/all');
            countries = await response.json();
            displayCountries(countries);
        }

        function displayCountries(countryList) {
            const container = document.getElementById('country-container');
            container.innerHTML = ''; 
            countryList.forEach(country => {
                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = `
                    <img src="${country.flags.png}" alt="${country.name.common} flag">
                    <h3>${country.name.common}</h3>
                    <p>Population: ${country.population}</p>
                    <p>Region: ${country.region}</p>
                    <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                `;

                container.appendChild(card);
            });
        }

        document.getElementById('sort-options').addEventListener('change', (event) => {
            const sortOrder = event.target.value;
            const sortedCountries = [...countries].sort((a, b) => {
                return sortOrder === 'asc' ? a.population - b.population : b.population - a.population;
            });
            displayCountries(sortedCountries);
        });

        document.getElementById('region-filter').addEventListener('change', (event) => {
            const selectedRegion = event.target.value;
            const filteredCountries = countries.filter(country => {
                return selectedRegion ? country.region === selectedRegion : true;
            });
            displayCountries(filteredCountries);
        });

        
        fetchCountries();