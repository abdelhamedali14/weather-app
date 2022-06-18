let currentCity = "alexandria";
let searchBar = document.getElementById("search-bar"); // button (seacrh)

searchBar.addEventListener("keyup", function () {
  currentCity = searchBar.value;
  GetInfoCity();
});
// on load
GetInfoCity();

(date = new Date()),
  (weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]),
  (monthName = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ]);

async function GetInfoCity() {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`
  );
  data = await response.json();
  displayTodayWeather();
  displayNextDayWeather();
  dsiplayAfterNextDayWeather();
}
function displayTodayWeather() {
  let DateOfDay = data.forecast.forecastday[0].date;
  let date_components = DateOfDay.split("-");
  let current_day = date_components[2];
  let nameOfCity = data.location.name;
  let degreeOfTempraure = Math.round(data.current.temp_c);
  let currentCondition = data.current.condition.text;
  let todayConditionIcon = data.current.condition.icon;
  let humidty = data.current.humidity;
  let wind = data.current.wind_kph;
  let compass = data.current.wind_dir;

  document.querySelector(".dayNAme").innerHTML = weekDays[date.getDay()];
  document.querySelector(".dayNumber").innerText = `${current_day} ${
    monthName[date.getMonth(DateOfDay)]
  }`;
  document.getElementById("nameOfCity").innerHTML = nameOfCity;
  document.querySelector(
    ".tempature"
  ).innerHTML = `${degreeOfTempraure}<sup>o</sup>C`;
  document
    .querySelector(".todayConditionIcon")
    .setAttribute("src", `${todayConditionIcon}`);
  document.querySelector(".currentCondition").innerHTML = currentCondition;
  document.getElementById("humidty").innerHTML = humidty;
  document.getElementById("wind").innerHTML = wind;
  document.getElementById("compass").innerHTML = compass;
}

function displayNextDayWeather() {
  let nextDayDate = data.forecast.forecastday[1].date;
  let nextDayIcon = data.forecast.forecastday[1].day.condition.icon;
  let nextDayMaxDegree = Math.round(data.forecast.forecastday[1].day.maxtemp_c);
  let nextDayMinDegree = Math.round(data.forecast.forecastday[1].day.mintemp_c);
  let nextDayDescription = data.forecast.forecastday[1].day.condition.text;

  document.querySelector(".nextDayDate").innerHTML = getNextDays(nextDayDate);
  document.querySelector(".nextDayIcon").setAttribute("src", `${nextDayIcon}`);
  document.querySelector(
    ".max-degree"
  ).innerHTML = `${nextDayMaxDegree}<sup> o</sup>C`;
  document.querySelector(
    ".min-degree"
  ).innerHTML = `${nextDayMinDegree}<sup> o</sup>C`;
  document.querySelector(".nextDayDescription").innerHTML = nextDayDescription;
}

function dsiplayAfterNextDayWeather() {
  let afternextDayDate = data.forecast.forecastday[2].date;
  let afterNextDayIcon = data.forecast.forecastday[2].day.condition.icon;
  let AfterNExtDayhigheTemp = Math.round(
    data.forecast.forecastday[2].day.maxtemp_c
  );
  let AfterNExtDayloweTemp = Math.round(
    data.forecast.forecastday[2].day.mintemp_c
  );
  let afterNextDayDescription = data.forecast.forecastday[2].day.condition.text;

  document.querySelector(".afternextDayDate").innerHTML =
    getNextDays(afternextDayDate);
  document
    .querySelector(".afterNextDayIcon")
    .setAttribute("src", `${afterNextDayIcon}`);
  document.querySelector(
    ".AfterNExtDayhigheTemp"
  ).innerHTML = `${AfterNExtDayhigheTemp}<sup> o</sup>C`;
  document.querySelector(
    ".AfterNExtDayloweTemp"
  ).innerHTML = `${AfterNExtDayloweTemp}<sup> o</sup>C`;
  document.querySelector(".afterNextDayDescription").innerHTML =
    afterNextDayDescription;
}

//Next Day - Name Function;
function getNextDays(nextDateApi) {
  let d = new Date(nextDateApi);
  return d && weekDays[d.getDay()];
}

//Next Day - Month Function;
function getNextDayMonth(nextDateApi) {
  let m = new Date(nextDateApi);
  return m && monthName[m.getMonth()];
}
