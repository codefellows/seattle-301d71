'use strict';

let __API_URL__ = '';
let GEOCODE_API_KEY = '';

let page = 1;
const lastLocation = {
  longitude: '',
  latitude: '',
  search_query: '',
  formatted_query: '',
  page: 0,
};

function setEventListeners() {
  $('#url-form').on('submit', handleURL);
  $('#getMoreYelps').on('click', getMoreYelps);
  $('#search-form').on('submit', fetchCityData);
}

function handleURL(event) {
  event.preventDefault();
  __API_URL__ = $('#back-end-url').val();
  $('#url-form').hide();
  $('#search-form').show();
}

function handleKey(event) {
  event.preventDefault();
  GEOCODE_API_KEY = $('#api-key').val();
  storeKey(GEOCODE_API_KEY);
  manageForms();
}

function handleReset(event) {
  event.preventDefault();
  localStorage.clear();
  GEOCODE_API_KEY = '';
  manageForms();
}

function getKey() {
  if (localStorage.getItem('geocode')) return JSON.parse(localStorage.getItem('geocode'));
}

function storeKey(key) {
  localStorage.setItem('geocode', JSON.stringify(key));
}

function manageForms() {
  GEOCODE_API_KEY ? displayMap(lastLocation) : displayPlaceholder(lastLocation);
}

function getMoreYelps() {
  ++lastLocation.page;
  getResource('yelp', lastLocation);
}

function fetchCityData(event) {

  event.preventDefault();

  // start off by clearing everything
  clearScreen();

  let searchQuery = $('#input-search').val().toLowerCase();

  const ajaxSettings = {
    method: 'GET',
    data: { city: searchQuery },
  };

  $.ajax(`${__API_URL__}/location`, ajaxSettings)
    .then(location => {
      // Set the page number to start the requests and location
      location.page = page;

      // Cache the location for subsequent (pagination) request
      for (let key in lastLocation) lastLocation[key] = location[key];
      showTitle(location);
      getResource('weather', location);
      getResource('movies', location);
      getResource('yelp', location);
      getResource('parks', location);
      manageForms();
    })
    .catch(error => {
      showError(error);
    });
}

function showTitle(location) {
  $('.query-placeholder').text(`Here are the results for ${location.formatted_query}`);
}

function displayPlaceholder(location) {

  let placeHolderData = {
    key: GEOCODE_API_KEY || 'not set',
    lat: location.latitude || 'no data from backend',
    lon: location.longitude || 'no data from backend',
    search_query: location.search_query || 'no data from backend',
    formatted_query: location.formatted_query || 'no data from backend',
    width: 800,
    height: 400,
  };

  render([placeHolderData], '#map', '#placeholder-template');
  $('#geocode-form').on('submit', handleKey);
}

function displayMap(location) {

  let mapData = {
    key: GEOCODE_API_KEY,
    lat: location.latitude,
    lon: location.longitude,
    width: 800,
    height: 400,
  };

  render([mapData], '#map', '#map-template');
  $('#key-reset').on('click', handleReset);
}

function getResource(resource, location) {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json',
    data: location,
  };

  $.ajax(`${__API_URL__}/${resource}`, ajaxSettings)
    .then(result => {
      render(result, `.${resource}-results`, `#${resource}-results-template`);
    })
    .catch(error => {
      showError(error);
    });
}

function showError(error) {
  render([error], '.error-container', '#error-template');
}

function clearScreen() {
  $('section ul').empty();
  $('section').hide();
}

function render(data, target, templateId) {
  // Only clear it out if we're on the first set of results for a column.
  // Otherwise, it's being paginated and should append to the bottom.
  if (lastLocation.page === 1) { $(target).empty(); }

  const template = $(templateId).text();

  data.forEach(obj => {
    let html = Mustache.render(template, obj);
    $(target).append(html);
  });

  $(target).closest('section').show();
}

$(() => {
  clearScreen();
  setEventListeners();
  GEOCODE_API_KEY = getKey();
});
