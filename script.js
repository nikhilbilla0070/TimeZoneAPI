let timezone = document.getElementById("timezone");
let latitude = document.getElementById("lat");
let longitude = document.getElementById("lon");
let offsetstd = document.getElementById("std");
let offsetstdSeconds = document.getElementById("std-sec");
let offsetdst = document.getElementById("dst");
let offsetdstSeconds = document.getElementById("dst-sec");
let country = document.getElementById("country");
let postcode = document.getElementById("pst-code");
let city = document.getElementById("city");
function getlocation() {
  navigator.geolocation.getCurrentPosition((location) => {
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    async function getData() {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=2456a09e75ce484c8c0b8cbf94131188`
        );
        const data = await response.json();
        showdata(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  });
}
function showdata(data) {
  timezone.innerHTML += `${data.results[0].timezone.name}`;
  latitude.innerHTML += `${data.results[0].lat}`;
  longitude.innerHTML += `${data.results[0].lon}`;
  offsetstd.innerHTML += `${data.results[0].timezone.offset_STD}`;
  offsetdstSeconds.innerHTML += `${data.results[0].timezone.offset_STD_seconds}`;
  offsetdst.innerHTML += `${data.results[0].timezone.offset_DST}`;
  offsetdstSeconds.innerHTML += `${data.results[0].timezone.offset_DST_seconds}`;
  country.innerHTML += `${data.results[0].country}`;
  postcode.innerHTML += `${data.results[0].postcode}`;
  city.innerHTML += `${data.results[0].city}`;
}
// getlocation();

let addressInput = document.getElementById("addressinput");
let getTimezoneButton = document.getElementById("btn");

let timezone1 = document.getElementById("timezone1");
let latitude1 = document.getElementById("lat1");
let longitude1 = document.getElementById("lon1");
let offsetstd1 = document.getElementById("std1");
let offsetstdSeconds1 = document.getElementById("std-sec1");
let offsetdst1 = document.getElementById("dst1");
let offsetdstSeconds1 = document.getElementById("dst-sec1");
let country1 = document.getElementById("country1");
let postcode1 = document.getElementById("pst-code1");
let city1 = document.getElementById("city1");

function search() {
  console.log(addressInput.value);
  const url = `https://api.geoapify.com/v1/geocode/search?text=${addressInput.value}&apiKey=2456a09e75ce484c8c0b8cbf94131188`;

  async function searchData() {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${addressInput.value}&apiKey=2456a09e75ce484c8c0b8cbf94131188`
      );
      const result = await response.json();
      resetDetails()
      searchedData(result);
      console.log(result.features);
    } catch (err) {
      console.log(err);
    }
  }
  searchData();
  function searchedData(result) {
    if (result.features.length > 0) {
      document.getElementById("correctData").style.display = "block";
      document.getElementById("errorMessage").style.display = "none";
      timezone1.innerHTML += `${result.features[0].properties.timezone.name}`;
      latitude1.innerHTML += `${result.features[0].properties.lat}`;
      longitude1.innerHTML += `${result.features[0].properties.lon}`;
      offsetstd1.innerHTML += `${result.features[0].properties.timezone.offset_STD}`;
      offsetdstSeconds1.innerHTML += `${result.features[0].properties.timezone.offset_STD_seconds}`;
      offsetdst1.innerHTML += `${result.features[0].properties.timezone.offset_DST}`;
      offsetdstSeconds1.innerHTML += `${result.features[0].properties.timezone.offset_DST_seconds}`;
      country1.innerHTML += `${result.features[0].properties.country}`;
      postcode1.innerHTML += `${result.features[0].properties.postcode}`;
      city1.innerHTML += `${result.features[0].properties.city}`;
    } else {
      document.getElementById("errorMessage").style.display = "block";
      document.getElementById("correctData").style.display = "none";
    }
  }
}

getlocation();
getTimezoneButton.addEventListener("click", search);

function resetDetails() {
  timezone1.innerHTML = "";
  latitude1.innerHTML = "";
  longitude1.innerHTML = "";
  offsetstd1.innerHTML = "";
  offsetstdSeconds1.innerHTML = "";
  offsetdst1.innerHTML = "";
  offsetdstSeconds1.innerHTML = "";
  country1.innerHTML = "";
  postcode1.innerHTML = "";
  city1.innerHTML = "";
  document.getElementById("correctData").style.display = 'none';
}