 const apiKey = "985063145da280256057c1d395c394cc"; // ✅ Your API key

    const searchInput = document.getElementById("searchInput");
    const city = document.getElementById("city");
    const temp = document.getElementById("temp");
    const condition = document.getElementById("condition");
    const date = document.getElementById("date");

    function getFormattedDate() {
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      return new Date().toLocaleDateString(undefined, options);
    }

    async function fetchWeather(cityName) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        if (data.cod === 200) {
          city.textContent = data.name;
          temp.textContent = `${Math.round(data.main.temp)}°C`;
          condition.textContent = data.weather[0].main;
          date.textContent = getFormattedDate();
        } else {
          alert("City not found!");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong!");
      }
    }

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const cityName = searchInput.value.trim();
        if (cityName !== "") {
          fetchWeather(cityName);
        }
      }
    });

    // Load default city
    fetchWeather("Mumbai");