function fetchCountry() {
    let countryName = document.getElementById("country-input").value.trim();
    
    if (countryName === "") {
        alert("Please enter a country name.");
        return;
    }

    fetch("https://restcountries.com/v3.1/name/" + countryName)
        .then(response => response.json())
        .then(data => {
            if (data.status === 404) {
                throw new Error("Country not found.");
            }

            let country = data[0];

            let info = "<h2>" + country.name.common + "</h2>";
            info += "<p>Capital: " + (country.capital ? country.capital[0] : "N/A") + "</p>";
            info += "<p>Population: " + country.population + "</p>";
            info += "<p>Region: " + country.region + "</p>";
            info += '<img src="' + country.flags.svg + '" width="100">';


            document.getElementById("country-info").innerHTML = info;
            
            console.log(country.borders);

            if (country.borders) {
                fetch("https://restcountries.com/v3.1/alpha?codes=" + country.borders.join(","))
                    .then(response => response.json())
                    .then(borderCountries => {
                        let bordersHTML = "<h3>Bordering Countries:</h3>";
                        console.log(borderCountries);
                        borderCountries.forEach(border => {
                            bordersHTML += "<p>" + border.name.common + " <img src='" + border.flags.svg + "' width='50'></p>";
                        });
                        document.getElementById("bordering-countries").innerHTML = bordersHTML;
                    })
                    .catch(() => {
                        document.getElementById("bordering-countries").innerHTML = "<p>Error loading bordering countries.</p>";
                    });
            } else {
                document.getElementById("bordering-countries").innerHTML = "<p>No bordering countries.</p>";
            }
        })
        .catch(error => {
            document.getElementById("country-info").innerHTML = "<p style='color: red;'>" + error.message + "</p>";
            document.getElementById("bordering-countries").innerHTML = "";
        });
}
