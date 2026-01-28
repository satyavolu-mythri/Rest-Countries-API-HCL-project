// document.addEventListener("DOMContentLoaded", () => {

//   const searchBtn = document.getElementById("search-btn");
//   const exploreBtn = document.getElementById("explore-btn");
//   const countryInp = document.getElementById("country-inp");
//   const result = document.getElementById("result");
//   const cardsWrapper = document.getElementById("cards-wrapper");
//   const mapDiv = document.getElementById("map");

//   let map;

// function showMap(lat, lng, countryName) {
//     mapDiv.style.display = "block";

//     if (map) {
//       map.remove();
//     }

//     map = L.map("map").setView([lat, lng], 4);

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "© OpenStreetMap contributors"
//     }).addTo(map);

//     L.marker([lat, lng])
//       .addTo(map)
//       .bindPopup(`<b>${countryName}</b>`)
//       .openPopup();
//   }


//   // 🔁 REUSABLE FUNCTION
//   function fetchCountryDetails(countryName) {
//     //clean the screen first
//     result.innerHTML = "";
//     cardsWrapper.innerHTML = "";

//     fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
//       .then(res => {
//         //http status check
//         if (!res.ok) throw new Error("Country not found");
//         return res.json();
//       })
//       //extract the country data
//       .then(data => {
//        console.log(data);
//         const c = data[0];
//         //display country details
//         result.innerHTML = 
//         //dynamically injecting HTML using template literals
//         `
//           <div class="country-card">
//             <img src="${c.flags.svg}" class="flag-img">
//             <h2>${c.name.common}</h2>

//             <button id="map-btn">View on Map 🌍</button>


//             <div class="data-wrapper">
//               <h4>Capital:</h4>
//               <span>${c.capital ? c.capital[0] : "N/A"}</span>
//             </div>

//             <div class="data-wrapper">
//               <h4>Continent:</h4>
//               <span>${c.continents[0]}</span>
//             </div>

//             <div class="data-wrapper">
//               <h4>Population:</h4>
//               <span>${c.population.toLocaleString()}</span>
//             </div>

//             <div class="data-wrapper">
//               <h4>Currency:</h4>
//               <span>
//                 ${c.currencies
//                   ? Object.values(c.currencies)[0].name +
//                     " (" +
//                     Object.keys(c.currencies)[0] +
//                     ")"
//                   : "N/A"}
//               </span>
//             </div>

//             <div class="data-wrapper">
//               <h4>Languages:</h4>
//               <span>
//                 ${c.languages
//                   ? Object.values(c.languages).join(", ")
//                   : "N/A"}
//               </span>
//             </div>
//           </div>
//         `;


//         document.getElementById("map-btn").addEventListener("click", () => {
//           if (!c.latlng) {
//             alert("Map data not available");
//             return;
//           }
//           showMap(c.latlng[0], c.latlng[1], c.name.common);
//         });
//       })
//       .catch(() => {
//         result.innerHTML = "<h3>Country details not found</h3>";
//       });
//   }

//   /* 🔍 SEARCH SINGLE COUNTRY */
//   searchBtn.addEventListener("click", () => {
//     const countryName = countryInp.value.trim();

//     if (!countryName) {
//       result.innerHTML = "<h3>Input cannot be empty</h3>";
//       return;
//     }

//     fetchCountryDetails(countryName);
//   });

//   /* 🌍 EXPLORE ALL COUNTRIES */
//   exploreBtn.addEventListener("click", () => {
//     result.innerHTML = "";
//     cardsWrapper.innerHTML = "<h3 style='color:white'>Loading...</h3>";

//     fetch("https://restcountries.com/v3.1/all?fields=name,flags")
//       .then(res => {
//         if (!res.ok) throw new Error("API error");
//         return res.json();
//       })
//       .then(data => {
//         if (!Array.isArray(data)) {
//           throw new Error("Invalid API response");
//         }

//         cardsWrapper.innerHTML = "";

//         data.forEach(country => {
//           const card = document.createElement("div");
//           card.className = "country-card";

//           card.innerHTML = `
//             <img src="${country.flags.png}" alt="flag">
//             <h4>${country.name.common}</h4>
//             <button>View on Map 🌍</button>
//           `;

//           card.querySelector("button").addEventListener("click", () => {
            
            
//             if (country.latlng) {
//               showMap(
//                 country.latlng[0],
//                 country.latlng[1],
//                 country.name.common
//               );
//             }
//           });

//           // // ✅ CLICK → SHOW DETAILS
//           // card.addEventListener("click", () => {
//           //   fetchCountryDetails(country.name.common);
//           // });

//           cardsWrapper.appendChild(card);
//         });
//       })
//       .catch(err => {
//         cardsWrapper.innerHTML =
//           "<h3 style='color:white'>Failed to load countries</h3>";
//         console.error(err);
//       });
//   });

// });







document.addEventListener("DOMContentLoaded", () => {

  const searchBtn = document.getElementById("search-btn");
  const exploreBtn = document.getElementById("explore-btn");
  const countryInp = document.getElementById("country-inp");
  const result = document.getElementById("result");
  const cardsWrapper = document.getElementById("cards-wrapper");
  const mapDiv = document.getElementById("map");

  let map;

  // 🗺️ MAP FUNCTION
  function showMap(lat, lng, countryName) {
    mapDiv.style.display = "block";

    if (map) {
      map.remove();
    }

    map = L.map("map").setView([lat, lng], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`<b>${countryName}</b>`)
      .openPopup();

    // 🧠 Leaflet render fix
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }

  // 🔁 REUSABLE FUNCTION — DETAILS
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

            <button id="map-btn">View on Map 🌍</button>

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

        document.getElementById("map-btn").addEventListener("click", (e) => {
          e.stopPropagation();

          if (!c.latlng) {
            alert("Map data not available");
            return;
          }

          showMap(c.latlng[0], c.latlng[1], c.name.common);
          mapDiv.scrollIntoView({ behavior: "smooth" });
        });

        result.scrollIntoView({ behavior: "smooth" });
      })
      .catch(() => {
        result.innerHTML = "<h3>Country details not found</h3>";
      });
  }

  // 🔍 SEARCH
  searchBtn.addEventListener("click", () => {
    const countryName = countryInp.value.trim();

    if (!countryName) {
      result.innerHTML = "<h3>Input cannot be empty</h3>";
      return;
    }

    fetchCountryDetails(countryName);
  });

  // 🌍 EXPLORE ALL
  exploreBtn.addEventListener("click", () => {
    result.innerHTML = "";
    mapDiv.style.display = "none";
    cardsWrapper.innerHTML = "<h3 style='color:white'>Loading...</h3>";

    // 🚨 IMPORTANT: latlng ADDED
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,latlng")
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        cardsWrapper.innerHTML = "";

        data.forEach(country => {
          const card = document.createElement("div");
          card.className = "country-card";

          card.innerHTML = `
            <img src="${country.flags.png}" alt="flag">
            <h4>${country.name.common}</h4>
            <button style=" background-color: blueviolet; color:white; padding:4px; border-radius: 20px; border: none ">View on Map 🌍</button>
          `;

          // 👉 CARD CLICK → DETAILS
          card.addEventListener("click", () => {
            fetchCountryDetails(country.name.common);
          });

          // 👉 BUTTON CLICK → MAP ONLY
          card.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();

            if (!country.latlng) {
              alert("Map data not available");
              return;
            }

            showMap(
              country.latlng[0],
              country.latlng[1],
              country.name.common
            );

            mapDiv.scrollIntoView({ behavior: "smooth" });
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


