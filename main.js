//Kanye
const bannerContent = document.querySelector('.ticker-item');
const quote = fetch('https://api.kanye.rest/').then(data => data.json()).then(json => bannerContent.innerText = `Kanye said - "${json.quote}"`);

// NASA
const nasaEndpoint = `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`;
let lastImageDate;
const nasaEndpointDated = `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&date=${lastImageDate}`;

const nasaImage = document.getElementById('nasa-image');
const nasaDescription = document.getElementById('nasa-description');

fetch(nasaEndpoint)
  .then(data => data.json())
  .then(json => {
    if (json.media_type === 'image') {
      nasaImage.src = json.url;
      nasaDescription.innerText = json.title;
      lastImageDate = new Date().toISOString().split('T')[0];
    } else {
      fetch(nasaEndpointDated)
        .then(data => data.json())
        .then(json => {
          nasaImage.src = json.url;
          nasaDescription.innerText = json.title;
        });
      console.log('using last published image');
    }
  })

// countries
const countryName = document.querySelector('.country-first-line h2');
const countryFlag = document.querySelector('.country-first-line img');
const countryCapital = document.querySelector('#capital');
const countryPop = document.querySelector('#population');
const countryMap = document.querySelector('#map');

function fetchCountryInfo(event) {
  event.preventDefault();
  countryName.innerText = countryInput.value.charAt(0).toUpperCase() + countryInput.value.slice(1);
  countryMap.src = mapsEndpoint(countryInput.value);
  fetch(`https://restcountries.com/v3.1/name/${countryInput.value}`).then(data => data.json()).then(json => {
    countryFlag.src = json[0].flags.png;
    countryCapital.innerText = json[0].capital;
    countryPop.innerText = numberWithCommas(json[0].population);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const mapsEndpoint = (country) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${country}&zoom=3&size=600x300&markers=color:blue%${country}&key=${googleMapsKey}`;
}

const searchForm = document.querySelector('.search-form');
const countryInput = document.querySelector('.search');
let countryEndpoint = `https://restcountries.com/v3.1/name/${countryInput.value}`;
const suggestions = document.querySelector('.suggestions');
searchForm.addEventListener('submit', fetchCountryInfo);
