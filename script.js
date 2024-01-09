// Importing functions from statistics.js to display mean, median,
// mode, range and SD
import {
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateRange,
  calculateSd
} from './statistics.js';

// Defining searchButton and searchInput
const searchInput = document.getElementById('searchinput')
const searchButton = document.getElementById('searchbutton');

if (searchButton !== null) {
  // Adding event listener for button click
  searchButton.addEventListener('click', searchMeasurements);
  // Search button can be activated by pressing enter aswell
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      searchButton.click();
    }
  });
}

// Function for searching
function searchMeasurements() {
  // Defining search input and making it upper case
  const searchInput = document.getElementById('searchinput').value.toUpperCase();
  // Defining rows
  const rows = document.querySelectorAll('#weather-items tr');

  // Testing each row for the search input
  rows.forEach(row => {
    let found = false;
    // Defining columns
    const cols = row.getElementsByTagName('td');

    for (let i = 0; i < cols.length; i++) {
      const colText = cols[i].textContent.toUpperCase();
      if (colText.indexOf(searchInput) > -1) {
        found = true;
        break;
      }
    }

    if (found) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}


// Function to display Weather data on index.html
function displayWeatherData(weathers) {
  const tbody = document.getElementById('weather-items');
  tbody.innerHTML = '';

  weathers.forEach(weather => {

    // This will separate the date and time 
    const [date, time] = weather.date.split('T');

    // This rounds the time to seconds
    const roundedTime = time.slice(0, 8);

    // Filling rows
    const row = tbody.insertRow(-1);

    // Adding data-measurement attribute to enable searching
    row.setAttribute('data-measurement', weather);


    let rowContent = '';

    rowContent += `<td>${date}</td>`;
    rowContent += `<td>${roundedTime}</td>`;

    // If statements to ignore undefined values from API because
    // there's only 50 values of random properties.
    // Also defining data-measurement for searches.
    if (weather.temperature !== undefined) {
      rowContent += `<td data-measurement="temperature">Temperature: <b>${Math.round(weather.temperature * 10) / 10}°C</b></td>`;
    }
    if (weather.windspeed !== undefined) {
      rowContent += `<td data-measurement="windspeed">Wind Speed: <b>${Math.round(weather.windspeed * 10) / 10} m/s</b></td>`;
    }
    if (weather.wind_direction !== undefined) {
      rowContent += `<td data-measurement="wind_direction">Wind Direction: <b>${weather.wind_direction}°</b></td>`;
    }
    if (weather.light !== undefined) {
      rowContent += `<td data-measurement="light">Light: <b>${Math.round(weather.light * 10) / 10} lux</b></td>`;
    }
    if (weather.rain !== undefined) {
      rowContent += `<td data-measurement="rain">Rain: <b>${Math.round(weather.rain * 10) / 10}</b></td>`;
    }
    if (weather.humidityout !== undefined) {
      rowContent += `<td data-measurement="humidityout">Humidity Out: <b>${Math.round(weather.humidityout * 10) / 10}%</b></td>`;
    }
    if (weather.humidityin !== undefined) {
      rowContent += `<td data-measurement="humidityin">Humidity In: <b>${Math.round(weather.humidityin * 10) / 10}%</b></td>`;
    }

    row.innerHTML = rowContent;
  });
}

// Function to create the temperature chart to view2
function temperatureChart(temps) {
  const chart = document.getElementById('temperature-chart');

  new Chart(chart, {
    type: 'bar',
    data: {
      labels: temps.map(temp => {
        // Separating date and rounding time again
        const [date, time] = temp.date.split('T');
        const roundedTime = time.slice(0, 8);
        return `${roundedTime}`;
      }),
      datasets: [{
        data: temps.map(temp => temp.temperature),
        backgroundColor: 'red',
      }]
    },
    options: {
      // Making the chart responsive
      responsive: true,
      scales: {
        x: {
          // To disable horizontal grid
          grid: {
            display: false,
          },
          // To disable x-axis text
          ticks: {
            display: false,
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.6)',
          },
          // To make y axis text darker
          ticks: {
            color: 'rgba(0, 0, 0, 1)',
          }
        }
      },
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          color: 'rgba(0, 0, 0, 1)',
          text: "Last 20 Temperature Readings",
          font: {
            size: 15,
          }
        }
      },
    }

  });
}

// Function to create the humidity chart to view3
function humidityChart(humidityData) {
  const chart = document.getElementById('humidity-chart');

  new Chart(chart, {
    type: 'bar',
    data: {
      labels: humidityData.map(Data => {
        // Separating date and rounding time again
        const [date, time] = Data.date.split('T');
        const roundedTime = time.slice(0, 8);
        return `${roundedTime}`;
      }),
      datasets: [{
        data: humidityData.map(Data => Data.humidity),
        backgroundColor: 'blue',
      }]
    },
    options: {
      // Making the chart responsive
      responsive: true,
      scales: {
        x: {
          // To disable horizontal grid
          grid: {
            display: false,
          },
          // To disable x-axis text
          ticks: {
            display: false,
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.6)',
          },
          // To make y axis text darker
          ticks: {
            color: 'rgba(0, 0, 0, 1)',
          }
        }
      },
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          color: 'rgba(0, 0, 0, 1)',
          text: "Last 20 Humidity Readings",
          font: {
            size: 15,
          }
        }
      },
    }

  });
}

// Displaying temperature data on view2
function displayTemperatureData(temps) {
  const tbody = document.getElementById('temperature-items');
  tbody.innerHTML = '';

  temperatureChart(temps);

  // Reversing the data because it was from oldest to newest
  temps.reverse();
  temps.forEach(temp => {

    // Separating date and time + rounding
    const [date, time] = temp.date.split('T');
    const roundedTime = time.slice(0, 8);

    // Filling table
    const row = tbody.insertRow(-1);
    let rowContent = '';

    rowContent += `<td>${date}</td>`;
    rowContent += `<td>${roundedTime}</td>`;
    rowContent += `<td>${Math.round(temp.temperature * 10) / 10}°C</td>`;

    row.innerHTML = rowContent;
  },
  )
};

// Displaying humidity data on view3
function displayHumidityData(humidityData) {
  const tbody = document.getElementById('humidity-items');
  tbody.innerHTML = '';

  humidityChart(humidityData);

  // Reversing the data because it was from oldest to newest
  humidityData.reverse();
  humidityData.forEach(humidityItem => {

    // Separating date and time + rounding
    const [date, time] = humidityItem.date.split('T');
    const roundedTime = time.slice(0, 8);

    // Filling table
    const row = tbody.insertRow(-1);
    let rowContent = '';

    rowContent += `<td>${date}</td>`;
    rowContent += `<td>${roundedTime}</td>`;
    rowContent += `<td>${Math.round(humidityItem.humidity * 10) / 10}%</td>`;

    row.innerHTML = rowContent;
  }
  )
};

// Fetching weather data
const fetchWeather = async () => {
  try {
    const response = await fetch('https://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50');
    const data = await response.json();
    const weathers = data.map(data => ({
      date: data.date_time,
      temperature: data.data.temperature,
      windspeed: data.data.wind_speed,
      wind_direction: data.data.wind_direction,
      light: data.data.light,
      rain: data.data.rain,
      humidityout: data.data.humidity_out,
      humidityin: data.data.humidity_in,
    }));

    displayWeatherData(weathers);

  } catch (error) {
    console.error(error);
  }
};

// Fetching temperature data
const fetchTemperature = async () => {
  try {
    const response = await fetch('https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature');
    const data = await response.json();
    const temps = data.map(data => ({
      date: data.date_time,
      temperature: data.temperature,
    }));

    displayTemperatureData(temps);

    // Making an array from temperatures which I will use to calculate
    // the statistical information
    const temperatures = data.map(item => parseFloat(item.temperature));

    // Calling functions from statistics.js...
    // I multiply and divide by 100 to get the desired amount of decimals
    const mean = Math.round(calculateMean(temperatures) * 100) / 100;
    const median = Math.round(calculateMedian(temperatures) * 100) / 100;
    const mode = Math.round(calculateMode(temperatures) * 100) / 100;
    const range = Math.round(calculateRange(temperatures) * 100) / 100;
    const standardDeviation = Math.round(calculateSd(temperatures) * 1000) / 1000;

    // Filling "statisticsContainer" -grid with returned values
    document.getElementById("statisticsContainer").innerHTML =
      `<p class="gridItem">Mean: <b>${mean}</b></p>
      <p class="gridItem">Median: <b>${median}</b></p>
      <p class="gridItem">Mode: <b>${mode}</b></p>
      <p class="gridItem">Range: <b>${range}</b></p>
      <p class="gridItem">Standard Deviation: <b>${standardDeviation}</b></p>`

  } catch (error) {
    console.error(error);
  }

};

// Fetching humidity data
const fetchHumidity = async () => {
  try {
    const response = await fetch('https://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_in');
    const data = await response.json();
    const humidityData = data.map(data => ({
      date: data.date_time,
      humidity: data.humidity_in,
    }));

    displayHumidityData(humidityData);

    // Making an array from humidity_in which I will use to calculate
    // the statistical information
    const humidities = data.map(item => parseFloat(item.humidity_in));
    console.log(humidities);

    // Calling functions from statistics.js...
    // I multiply and divide by 100 to get the desired amount of decimals
    const mean = Math.round(calculateMean(humidities) * 100) / 100;
    const median = Math.round(calculateMedian(humidities) * 100) / 100;
    const mode = Math.round(calculateMode(humidities) * 100) / 100;
    const range = Math.round(calculateRange(humidities) * 100) / 100;
    const standardDeviation = Math.round(calculateSd(humidities) * 1000) / 1000;

    // Filling "statisticsContainer" -grid with returned values
    document.getElementById("statisticsContainer").innerHTML =
      `<p class="gridItem">Mean: <b>${mean}</b></p>
      <p class="gridItem">Median: <b>${median}</b></p>
      <p class="gridItem">Mode: <b>${mode}</b></p>
      <p class="gridItem">Range: <b>${range}</b></p>
      <p class="gridItem">Standard Deviation: <b>${standardDeviation}</b></p>`

  } catch (error) {
    console.error(error);
  }

};

fetchWeather();
fetchTemperature();
fetchHumidity();

