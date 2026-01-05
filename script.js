document.addEventListener("DOMContentLoaded", () => {

  const searchBtn = document.getElementById("search-btn");
  const exploreBtn = document.getElementById("explore-btn");
  const countryInp = document.getElementById("country-inp");
  const result = document.getElementById("result");
  const cardsWrapper = document.getElementById("cards-wrapper");

  // 🔁 REUSABLE FUNCTION
  function fetchCountryDetails(countryName) {
    result.innerHTML = "";
    cardsWrapper.innerHTML = "";

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then(res => {
        if (!res.ok) throw new Error("Country not found");
        return res.json();
      })
      .then(data => {
        const c = data[0];

        result.innerHTML = `
          <div class="country-card">
            <img src="${c.flags.svg}" class="flag-img">
            <h2>${c.name.common}</h2>

            <div class="data-wrapper">
              <h4>Capital:</h4>
              <span>${c.capital ? c.capital[0] : "N/A"}</span>
            </div>

            <div class="data-wrapper">
              <h4>Continent:</h4>
              <span>${c.continents[0]}</span>
            </div>

            <div class="data-wrapper">
              <h4>Population:</h4>
              <span>${c.population.toLocaleString()}</span>
            </div>

            <div class="data-wrapper">
              <h4>Currency:</h4>
              <span>
                ${c.currencies
                  ? Object.values(c.currencies)[0].name +
                    " (" +
                    Object.keys(c.currencies)[0] +
                    ")"
                  : "N/A"}
              </span>
            </div>

            <div class="data-wrapper">
              <h4>Languages:</h4>
              <span>
                ${c.languages
                  ? Object.values(c.languages).join(", ")
                  : "N/A"}
              </span>
            </div>
          </div>
        `;
      })
      .catch(() => {
        result.innerHTML = "<h3>Country details not found</h3>";
      });
  }

  /* 🔍 SEARCH SINGLE COUNTRY */
  searchBtn.addEventListener("click", () => {
    const countryName = countryInp.value.trim();

    if (!countryName) {
      result.innerHTML = "<h3>Input cannot be empty</h3>";
      return;
    }

    fetchCountryDetails(countryName);
  });

  /* 🌍 EXPLORE ALL COUNTRIES */
  exploreBtn.addEventListener("click", () => {
    result.innerHTML = "";
    cardsWrapper.innerHTML = "<h3 style='color:white'>Loading...</h3>";

    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error("Invalid API response");
        }

        cardsWrapper.innerHTML = "";

        data.forEach(country => {
          const card = document.createElement("div");
          card.className = "country-card";

          card.innerHTML = `
            <img src="${country.flags.png}" alt="flag">
            <h4>${country.name.common}</h4>
          `;

          // ✅ CLICK → SHOW DETAILS
          card.addEventListener("click", () => {
            fetchCountryDetails(country.name.common);
          });

          cardsWrapper.appendChild(card);
        });
      })
      .catch(err => {
        cardsWrapper.innerHTML =
          "<h3 style='color:white'>Failed to load countries</h3>";
        console.error(err);
      });
  });

});
